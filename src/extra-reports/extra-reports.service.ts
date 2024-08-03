import { Injectable } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import fs from 'fs';
import { getHtmlContent } from 'src/helpers/html-to-pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';
import { footerSection } from 'src/reports/sections/footer.section';

@Injectable()
export class ExtraReportsService {

    constructor(
        private readonly printerService: PrinterService,
    ) {}

    getHtmlReport(): PDFKit.PDFDocument {

        const html = fs.readFileSync('src/reports/html/basic-02.html', 'utf8');
        const content = getHtmlContent(html);

        const docDefinition: TDocumentDefinitions = {
            pageMargins: [40, 60],
            header: headerSection({
                title: 'HTML-To-Pdfmake',
                subTitle: 'TEST',
            }),
            content,
        };
        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

    getDinamicHtmlReport(): PDFKit.PDFDocument {

        const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf8');
        const content = getHtmlContent(html, {
            client: 'Onier Crestelo',
            title: 'Testing dinamic html to pdfmake',
        });

        const docDefinition: TDocumentDefinitions = {
            pageMargins: [40, 110, 40, 60],
            header: headerSection({
                title: 'Dinamic-HTML-To-Pdfmake',
                subTitle: 'With-Variables',
            }),
            content,
            footer: footerSection,
        };
        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

    getCustomSizeReport() {
        const doc = this.printerService.createPdf({
            // pageSize: 'TABLOID',
            // IMPORTANT
            pageSize: {
                height: 300, // Like an invoice
                width: 150, // Like an invoice
            },
            content: [
                {
                    qr: 'https://reinodigitalcr.com',
                    fit: 100,
                    alignment: 'center',
                },
                {
                    text: 'Report with an especific size like an invoice or billing',
                    fontSize: 14,
                    alignment: 'center',
                    margin: [0, 20],
                }
            ],
        });

        return doc;
    }
}

