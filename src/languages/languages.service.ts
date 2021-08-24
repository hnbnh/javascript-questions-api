import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { LanguageEntity } from '../shared';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class LanguagesService {
  constructor(@InjectRepository(LanguageEntity) private readonly languageRepo: EntityRepository<LanguageEntity>) {}

  findAll() {
    return this.languageRepo.findAll();
  }
}
