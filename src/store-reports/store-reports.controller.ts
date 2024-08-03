import { Controller, Get, Param, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('order/:orderId')
  async getOrderReport(
    @Param('orderId') orderId: string,
    @Res() response: Response,
  ) {
    
    const pdfDoc = await this.storeReportsService.getOrderReportById(+orderId);
    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'Order-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('svg-charts')
  async getSbgChart(@Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getSvgChart();
    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'SVG-Chart';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('statistics')
  async getStatistics(@Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getStatistics();
    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'Statistics-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

}
