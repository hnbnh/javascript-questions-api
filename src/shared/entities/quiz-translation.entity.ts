import { Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { QuizEntity } from './quiz.entity';
import { LanguageEntity } from './language.entity';
import { QuizOptionEntity } from './quiz-option.entity';

@Entity()
export class QuizTranslationEntity {
  @ManyToOne({ primary: true })
  quiz!: QuizEntity;

  @ManyToOne({ primary: true })
  language!: LanguageEntity;

  @OneToMany(() => QuizOptionEntity, (q) => q.quizTranslation)
  quizOption = new Collection<QuizOptionEntity>(this);

  @Property({ columnType: 'text' })
  question!: string;

  @Property()
  answer!: string;

  @Property({ columnType: 'text' })
  explanation!: string;
}
