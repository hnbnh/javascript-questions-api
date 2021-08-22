import { EntityManager, wrap } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import fetch from 'node-fetch';
import { LanguageEntity, QuizEntity, QuizOptionEntity, QuizTranslationEntity } from '../../src/shared';

const baseUrl = `https://raw.githubusercontent.com/lydiahallie/javascript-questions/master`;
const languageRegex = /- \[(?<name>.*?)\]\((?<path>.*?)\)/gm;
const quizRegex =
  /#{6} \d+\. (?<question>(.+))\n+(```\w*\n(?<code>(.|\n)*?)\n+```)*\n+(?<options>(.|\n)*?)\n+<details>(.|\n)*?#### Answer: (?<answer>[A-D]).*\n+(?<explanation>(.|\n)*?)\n+<\/p>\n<\/details>/gm;
const optionRegex = /- (?<label>[ABCD])(?:\: )(?<option>.*)/gm;

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const text = await (await fetch(`${baseUrl}/README.md`)).text();

    const languageMatches = this.getMatches(languageRegex, text) as any as ILanguageMatch[];
    const quizMatches = this.getMatches(quizRegex, text) as any as IQuizMatch[];

    const english = em.create(LanguageEntity, { id: 1, name: '🇬🇧 English', code: 'en-US' });
    em.persist(english);

    for (let i = 0; i < languageMatches.length; i++) {
      const { name, path } = languageMatches[i];
      const language = em.create(LanguageEntity, { id: i + 2, name, code: path.split('/')[1] });
      em.persist(language);
    }

    for (let i = 0; i < quizMatches.length; i++) {
      const { code, options, answer, explanation, question } = quizMatches[i];

      const quiz = em.create(QuizEntity, { id: i + 1, code });
      const quizTranslation = em.create(QuizTranslationEntity, { language: 1, quiz, answer, explanation, question });
      em.persist([quiz, quizTranslation]);

      const optionMatches = this.getMatches(optionRegex, options) as any as IQuizOptionMatch[];
      for (const { label, option } of optionMatches) {
        const quizOption = em.create(QuizOptionEntity, { quiz, option, label });
        em.persist(quizOption);
      }
    }
  }

  private getMatches(regex: RegExp, text: string) {
    const matches: Record<string, string>[] = [];

    let match;
    while ((match = regex.exec(text)) != null) {
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
