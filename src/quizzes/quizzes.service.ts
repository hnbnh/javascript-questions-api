import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { QuizEntity } from '../shared';
import { EntityRepository } from '@mikro-orm/postgresql';
import { FindQuizDto, FindRandomQuizDto } from './dto';

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
        populate: { translations: { options: true } },
      },
    );
  }

  async findRandom(dto: FindRandomQuizDto) {
    const { languageId } = dto;

    return this.quizRepo.find(
      { translations: { language: { id: languageId } } },
      {
        limit: 1,
        populate: { translations: { options: true } },
        orderBy: { 'RANDOM()': 'ASC' },
      },
    );
  }
}
