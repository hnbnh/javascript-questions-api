import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { QuizEntity } from '../shared';
import { EntityRepository } from '@mikro-orm/core';
import { FindQuizDto } from './dto';

@Injectable()
export class QuizzesService {
  constructor(@InjectRepository(QuizEntity) private readonly quizRepo: EntityRepository<QuizEntity>) {}

  async find(dto: FindQuizDto) {
    const { languageId, limit, offset } = dto;

    return this.quizRepo.findAndCount(
      { translations: { language: { id: languageId } } },
      {
        limit,
        offset,
        populate: {
          translations: {
            options: true,
          },
        },
      },
    );
  }
}
