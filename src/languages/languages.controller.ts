import { Controller, Get } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  @ApiOkResponse({ description: 'Get all available languages' })
  findAll() {
    return this.languagesService.findAll();
  }
}
