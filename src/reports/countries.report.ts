import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";
import { footerSection } from "./sections/footer.section";

import { countries as Country } from '@prisma/client';

interface ICountries {
    title?: string;
    subtitle?: string;
    countries: Country[];
}


export const getCountriesReport = (
    options: ICountries,
): TDocumentDefinitions => {

    const { title, subtitle, countries } = options;
    
    return {
        pageOrientation: 'landscape',
        header: headerSection({
            title: 'Countries-Report',
            subTitle: 'List-Countries',
        }),
        footer: footerSection,
        pageMargins: [40, 110, 40, 60],
        content: [
            {
              // layout: 'lightHorizontalLines', // optional, others layouts ['noBorders', 'headerLineOnly']
              layout: 'customLayout01',
              table: {
                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers
                headerRows: 1,
                widths: [ 50, 50, 50, '*', 'auto', '*' ],
        
                body: [
                  [ 'ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'LocalName' ],
                  ...countries.map((country) => [
                    country.id.toString(),
                    country.iso2,
                    country.iso3,
                    { text: country.name, bold: true },
                    country.continent,
                    country.local_name,
                  ]),
                  // [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
                ]
              }
            },

            // Total table
            {
              layout: 'noBorders',
              margin: [0, 20, 0, 0],
              table: {
                headerRows: 1,
                widths: [ 120, 70, 50, '*', 'auto', '*' ],
                body: [
                  [
                    { text: 'Total countries:', bold: true, fontSize: 17 },
                    { text: countries.length.toString(), bold: true, fontSize: 17 },
                    {},
                    {},
                    {},
                    {},
                  ]
                ]
              }
            }
        ],
    };
}
