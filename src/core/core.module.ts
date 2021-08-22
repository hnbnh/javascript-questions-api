import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import ormConfig from './orm.config';
import { ConfigModule } from '@nestjs/config';
import { apiConfig, validationSchema } from './api.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [apiConfig],
      validationSchema,
    }),
    MikroOrmModule.forRoot(ormConfig),
  ],
})
export class CoreModule {}
