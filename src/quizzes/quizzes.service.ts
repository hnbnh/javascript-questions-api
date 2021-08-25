import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { QuizEntity } from '../shared';
import { EntityRepository } from '@mikro-orm/postgresql';
import { FindQuizDto } from './dto';

@Injectable()
export class QuizzesService {
  constructor(@InjectRepository(QuizEntity) private readonly quizRepo: EntityRepository<QuizEntity>) {}

  async find(id: number, dto: FindQuizDto) {
    const { limit, offset } = dto;

    const [data, total] = await this.quizRepo.findAndCount(
      { translations: { language: { id } } },
      {
        limit,
        offset,
        populate: { translations: { options: true } },
      },
    );

    return { data, total };
  }

  async findRandom(id: number) {
    return this.quizRepo.find(
      { translations: { language: { id } } },
      {
        limit: 1,
        populate: { translations: { options: true } },
        orderBy: { 'RANDOM()': 'ASC' },
      },
    );
  }
}
