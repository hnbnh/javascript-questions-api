import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { QuizTranslationEntity } from './quiz-translation.entity';

@Entity()
export class QuizOptionEntity {
  @ManyToOne({ primary: true, hidden: true })
  quizTranslation!: QuizTranslationEntity;

  @Property({ primary: true })
  label!: string;

  @Property({ columnType: 'text' })
  option!: string;
}
