import { TDocumentDefinitions } from "pdfmake/interfaces";
import { getDonutChart } from "./charts/donut.chart";
import { table } from "console";
import { headerSection } from "./sections/header.section";
import { getLineChart } from "./charts/line.chart";

interface TopCountry {
    country: string;
    customers: number;
}

interface ReportOptions {
    topCountries: TopCountry[];
    title?: string;
    subtitle?: string;
}

export const getStatisticsReport = async (options: ReportOptions): Promise<TDocumentDefinitions> => {
    const { topCountries } = options;

    const [ donutChart, lineChart ] = await Promise.all([
        getDonutChart({
            entries: topCountries.map((c) => ({
                label: c.country,
                value: c.customers,
            })),
            position: 'left',
        })
        , getLineChart()
    ]);

    const docDefinition: TDocumentDefinitions = {
        pageMargins: [40, 110, 40, 60],
        header: headerSection({
            title: 'Statistics - Report',
            showDate: true,
            showLogo: true,
        }),
        content: [
            // Donut and table chart
            {
                columns: [
                    {
                        stack: [
                            {
                                text: 'Top 10 countries with most clients',
                                alignment: 'center',
                                margin: [0, 0, 0 , 10],
                                bold: true,
                            },
                            {
                                image: donutChart,
                                width: 300,
                            },
                        ],
                    },
                    // table countries
                    {
                        layout: 'lightHorizontalLines',
                        width: 'auto',
                        table: {
                            headerRows: 1,
                            widths: [100, 'auto'],
                            body: [
                                ['Country', 'Customers'],

                                ...options.topCountries.map((c) => [c.country, c.customers]),
                            ],
                        }
                    }
                ],
            },
            // Line Chart
            {
                image: lineChart,
                width: 500,
                margin: [0, 20],
            }
        ],
    }

    return docDefinition;
}
