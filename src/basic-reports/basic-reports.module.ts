import { Module } from '@nestjs/common';

import { PrinterModule } from '../printer/printer.module';

import { BasicReportsController } from './basic-reports.controller';

import { BasicReportsService } from './basic-reports.service';

@Module({
  controllers: [BasicReportsController],
  providers: [BasicReportsService],
  imports: [

    PrinterModule,

  ],
})
export class BasicReportsModule {}
