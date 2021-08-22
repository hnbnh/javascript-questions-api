import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class QuizEntity {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'text' })
  code?: string;
}
