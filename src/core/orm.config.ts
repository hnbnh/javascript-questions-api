import "dotenv-safe/config";
import { Logger } from "@nestjs/common";
import { Options } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { LanguageEntity, QuizEntity, QuizOptionEntity, QuizTranslationEntity } from "../shared";

const logger = new Logger("MikroORM");

const ormConfig: Options = {
  metadataProvider: TsMorphMetadataProvider,
  entities: [LanguageEntity, QuizEntity, QuizOptionEntity, QuizTranslationEntity],
  type: "postgresql",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB,
  debug: process.env.NODE_ENV === "development",
  logger: logger.log.bind(logger),
  migrations: { disableForeignKeys: false },
  driverOptions: process.env.SSL_CONNECTION === "false" ? { connection: { ssl: { rejectUnauthorized: false } } } : {},
  seeder: { path: "./database/seeders" },
};

export default ormConfig;
