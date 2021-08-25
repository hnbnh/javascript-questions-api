import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PickType } from '@nestjs/mapped-types';

export class FindQuizDto {
  @IsInt()
  @Type(() => Number)
  languageId = 1;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  offset?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}

export class FindRandomQuizDto extends PickType(FindQuizDto, ['languageId']) {}
