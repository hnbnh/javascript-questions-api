import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { QuizEntity } from './quiz.entity';

@Entity()
export class QuizOptionEntity {
  @ManyToOne({ primary: true })
  quiz!: QuizEntity;

  @Property()
  label!: string;

  @Property()
  option!: string;
}
