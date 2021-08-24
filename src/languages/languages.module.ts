import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { LanguageEntity } from '../shared';

@Module({
  imports: [MikroOrmModule.forFeature([LanguageEntity])],
  providers: [LanguagesService],
  controllers: [LanguagesController],
})
export class LanguagesModule {}
