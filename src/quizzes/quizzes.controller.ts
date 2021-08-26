import { Controller, Get, Param, ParseIntPipe, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { FindQuizDto } from './dto';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get(':languageId')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ description: 'Get all quizzes by languageId' })
  @ApiParam({ name: 'languageId' })
  @ApiImplicitQuery({ name: 'limit', required: false })
  @ApiImplicitQuery({ name: 'offset', required: false })
  find(@Param('languageId', new ParseIntPipe()) id: number, @Query() dto: FindQuizDto) {
    return this.quizzesService.find(id, dto);
  }

  @Get(':languageId/random')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({ description: 'Get a random quiz by languageId' })
  @ApiParam({ name: 'languageId' })
  findRandom(@Param('languageId', new ParseIntPipe()) id: number) {
    return this.quizzesService.findRandom(id);
  }
}
