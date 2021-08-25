import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { FindQuizDto, FindRandomQuizDto } from './dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  find(@Query() dto: FindQuizDto) {
    return this.quizzesService.find(dto);
  }

  @Get('random')
  @UsePipes(new ValidationPipe({ transform: true }))
  findRandom(@Query() dto: FindRandomQuizDto) {
    return this.quizzesService.findRandom(dto);
  }
}
