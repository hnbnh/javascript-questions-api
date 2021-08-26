import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { LanguageEntity, QuizEntity, QuizOptionEntity, QuizTranslationEntity } from '../shared';

const logger = new Logger('MikroORM');

const ormConfig: Options = {
  metadataProvider: TsMorphMetadataProvider,
  entities: [LanguageEntity, QuizEntity, QuizOptionEntity, QuizTranslationEntity],
  type: 'postgresql',
  clientUrl: process.env.POSTGRES_URL,
  debug: process.env.NODE_ENV === 'development',
  logger: logger.log.bind(logger),
  migrations: { disableForeignKeys: false },
  driverOptions: {
    connection: { ssl: { rejectUnauthorized: process.env.SSL_CONNECTION } },
  },
};

export default ormConfig;
