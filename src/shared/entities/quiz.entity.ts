import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { QuizTranslationEntity } from './quiz-translation.entity';

@Entity()
export class QuizEntity {
  @PrimaryKey()
  id!: number;

  @OneToMany(() => QuizTranslationEntity, (q) => q.quiz)
  translations = new Collection<QuizTranslationEntity>(this);

  @Property({ columnType: 'text' })
  code?: string;
}
