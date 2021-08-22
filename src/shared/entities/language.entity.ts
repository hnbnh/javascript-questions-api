import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { QuizTranslationEntity } from './quiz-translation.entity';

@Entity()
export class LanguageEntity {
  @PrimaryKey()
  id!: number;

  @ManyToMany()
  quizTranslation = new Collection<QuizTranslationEntity>(this);

  @Property({ unique: true })
  code!: string;

  @Property({ unique: true })
  name!: string;
}
