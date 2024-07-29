import { Content } from "pdfmake/interfaces";

export const footerSection = (currentPage: number, pageCount: number): Content => {
    return {
        text: `Page ${currentPage} of ${pageCount}`,
        alignment: 'right',
        margin: [0, 10, 10, 30],
        fontSize: 12,
        bold: true,
    };
}
