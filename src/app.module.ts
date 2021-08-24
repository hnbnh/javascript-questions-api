import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { LanguagesModule } from './languages/languages.module';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
  imports: [CoreModule, LanguagesModule, QuizzesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
