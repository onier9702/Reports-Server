import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { Response } from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) {}

  @Get('html-report')
  async getHtmlReport(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getHtmlReport();
    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'HTML-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('dinamic-html-report')
  async getDinamicHtmlReport(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getDinamicHtmlReport();
    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'Dinamic-HTML-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('custom-page-size')
  getCustomPageSizeReport(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getCustomSizeReport();
    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'Custom-Size';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

}
