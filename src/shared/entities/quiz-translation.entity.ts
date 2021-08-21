import { Entity, ManyToOne, OneToOne, Property } from '@mikro-orm/core';
import { QuizEntity } from './quiz.entity';
import { LanguageEntity } from './language.entity';

@Entity()
export class QuizTranslationEntity {
  @ManyToOne({ primary: true })
  quiz!: QuizEntity;

  @OneToOne()
  language!: LanguageEntity;

  @Property()
  question!: string;

  @Property()
  answer!: string;

  @Property()
  explanation!: string;
}
