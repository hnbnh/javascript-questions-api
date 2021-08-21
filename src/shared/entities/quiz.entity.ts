import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class QuizEntity {
  @PrimaryKey()
  id!: number;
}
