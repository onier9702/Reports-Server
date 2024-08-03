import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PrinterService } from '../printer/printer.service';
import { 
    getBasicSvgChartReport,
    getStatisticsReport,
    orderByIdReport,
} from 'src/reports';


@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {

    async onModuleInit() {
        await this.$connect();
    }

    constructor(
        private readonly printerService: PrinterService,
    ) {
        super();
    }

    async getOrderReportById(orderId: number) {
        const order = await this.orders.findUnique({
            where: {
                order_id: orderId,
            },
            include: {
                customers: true,
                order_details: {
                    include: {
                        products: true,
                    }
                }
            }
        });

        if (!order) {
            throw new NotFoundException(`Order with ID: ${orderId} not found`);
        }

        console.log(JSON.stringify(order, null, 2));

        const docDefinition = orderByIdReport({data: order});
        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

    async getSvgChart(): Promise<PDFKit.PDFDocument> {
        const docDefinition = await getBasicSvgChartReport();
        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }
    
    async getStatistics(): Promise<PDFKit.PDFDocument> {
        const topCountries = await this.customers.groupBy({
            by: ['country'],
            _count: true,
            orderBy: {
                _count: {
                    country: 'desc',
                }
            },
            take: 10,
        });

        const topCountryData = topCountries.map(({country, _count}) => {
            return {
                country,
                customers: _count,
            };
        });

        const docDefinition = await getStatisticsReport({
            topCountries: topCountryData,
        });
        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

}
