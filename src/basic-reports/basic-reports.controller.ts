import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  getHello( @Res() response: Response ) {
    const pdfDoc = this.basicReportsService.getOne();
    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'Hello-World';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  employmentLetter(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();
    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'Employment-Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:id')
  async employmentLetterById(
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const pdfDoc = await this.basicReportsService.employmentLetterById(+id);
    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'Employment-Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

}
