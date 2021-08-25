import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { QuizEntity, QuizOptionEntity, QuizTranslationEntity } from '../shared';

@Module({
  imports: [MikroOrmModule.forFeature([QuizEntity, QuizTranslationEntity, QuizOptionEntity])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
