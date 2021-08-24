import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import fetch from 'node-fetch';
import { LanguageEntity, QuizEntity, QuizOptionEntity, QuizTranslationEntity } from '../../src/shared';

const baseUrl = `https://raw.githubusercontent.com/lydiahallie/javascript-questions/master`;
const languageRegex = /- \[(?<name>.*?)\]\((?<path>.*?)\)/gm;
const quizRegex =
  /#{6} \d+\. (?<question>(.+))\n+(```\w*\n(?<code>(.|\n)*?)\n+```)*\n+(?<options>(.|\n)*?)\n+<details>(.|\n)*?#### (.*?): (?<answer>[A-D])\n+(?<explanation>(.|\n)*?)\n+<\/p>\n<\/details>/gm;
const optionRegex = /- (?<label>[ABCD])(?:\: )(?<option>.*)/gm;

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const englishPage = await (await fetch(`${baseUrl}/README.md`)).text();

    const availableLanguages = this.getMatches(languageRegex, englishPage) as any[];

    // get all pages
    const pages = [
      englishPage,
      ...(await Promise.all(availableLanguages.map(async (l) => (await fetch(`${baseUrl}/${l.path}`)).text()))),
    ];

    const languagesMatches: ILanguageMatch[] = [{ name: '🇬🇧 English', path: '/en-US/' }, ...availableLanguages];
    const allLanguages = languagesMatches.map(({ name, path }, i) => {
      return em.create(LanguageEntity, { id: i + 1, name, code: path.split('/')[1] });
    });
    em.persist(allLanguages);

    // generate quizzes
    const quizMatches: IQuizMatch[] = this.getMatches(quizRegex, englishPage) as any[];
    const quizzes = quizMatches.map(({ code }, i) => em.create(QuizEntity, { id: i + 1, code }));
    em.persist(quizzes);

    await em.flush();

    // seed quizzes translations
    for (let pi = 0; pi < pages.length; pi++) {
      const page = pages[pi];

      const quizMatches: IQuizMatch[] = this.getMatches(quizRegex, page) as any[];

      for (let qi = 0; qi < quizMatches.length; qi++) {
        const { options, answer, explanation, question } = quizMatches[qi];
        const quizTranslation = em.create(QuizTranslationEntity, {
          language: allLanguages[pi].id,
          quiz: quizzes[qi],
          answer,
          explanation,
          question,
        });
        em.persist(quizTranslation);

        const optionMatches: IQuizOptionMatch[] = this.getMatches(optionRegex, options) as any[];
        for (const { label, option } of optionMatches) {
          const quizOption = em.create(QuizOptionEntity, { quizTranslation, option, label });
          em.persist(quizOption);
        }
      }
    }
  }

  private getMatches(regex: RegExp, text: string) {
    const matches: Record<string, string>[] = [];

    let match = null;
    while ((match = regex.exec(text))) {
      matches.push(match.groups!);
    }

    return matches;
  }
}

interface ILanguageMatch {
  name: string;
  path: string;
}

interface IQuizMatch {
  question: string;
  code: string;
  options: string;
  answer: string;
  explanation: string;
}

interface IQuizOptionMatch {
  label: string;
  option: string;
}
