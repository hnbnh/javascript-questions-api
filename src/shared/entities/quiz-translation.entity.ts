import { Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core';
import { QuizEntity } from './quiz.entity';
import { LanguageEntity } from './language.entity';

@Entity()
export class QuizTranslationEntity {
  @ManyToOne({ primary: true })
  quiz!: QuizEntity;

  @ManyToMany()
  language = new Collection<LanguageEntity>(this);

  @Property({ columnType: 'text' })
  question!: string;

  @Property()
  answer!: string;

  @Property({ columnType: 'text' })
  explanation!: string;
}
