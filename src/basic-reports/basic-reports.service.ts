import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PrinterService } from '../printer/printer.service';

import {
    getEmploymentLetterReport,
    getEmploymentLetterByIdReport,
    getHelloWorldReport,
} from '../reports/index';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {

    constructor(
        private readonly printerService: PrinterService,
    ) {
        super();
    }

    async onModuleInit() {
        await this.$connect();
        console.log('connected to the database');
    }

    getOne(): PDFKit.PDFDocument {
        const docDefinition = getHelloWorldReport();
        var doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

    employmentLetter(): PDFKit.PDFDocument {
        const docDefinition = getEmploymentLetterReport();
        var doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

    async employmentLetterById(employeeId: number): Promise<PDFKit.PDFDocument> {
        const employee = await this.employees.findUnique({
            where: {
                id: employeeId,
            }
        });

        if (!employee) {
            throw new NotFoundException(`Employee with ID: ${employeeId} not found.`);
        }

        const docDefinition = getEmploymentLetterByIdReport({
            employerName: 'Onier Crestelo',
            employerPosition: 'Gerente',
            employeeName: employee.name,
            employeePosition: employee.position,
            employeeStartDate: employee.start_date,
            employeeHours: employee.hours_per_day,
            employeeWorkSchedule: employee.work_schedule,
            employerCompany: 'Reino Digital Corp.',
        });
        var doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

}
