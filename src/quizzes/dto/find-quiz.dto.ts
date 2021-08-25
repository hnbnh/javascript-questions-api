import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

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
