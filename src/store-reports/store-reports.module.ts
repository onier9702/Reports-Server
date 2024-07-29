import { Module } from '@nestjs/common';

import { PrinterModule } from '../printer/printer.module';

import { StoreReportsController } from './store-reports.controller';
import { StoreReportsService } from './store-reports.service';

@Module({
  controllers: [StoreReportsController],
  providers: [StoreReportsService],
  imports: [

    PrinterModule,

  ],
})
export class StoreReportsModule {}
