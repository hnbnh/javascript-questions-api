import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { LanguagesModule } from './languages/languages.module';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
  imports: [CoreModule, LanguagesModule, QuizzesModule],
})
export class AppModule {}
