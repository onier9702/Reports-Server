import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { Decimal } from "@prisma/client/runtime/library";

import { CurrencyFormater, DateFormatter } from "src/helpers";
import { footerSection } from "./sections/footer.section";
import { text } from 'stream/consumers';

const logo: Content = {
    image: 'src/assets/tucan-banner.png',
    height: 50,
    margin: [40, 30],
    width: 120,
}

const styles: StyleDictionary = {
    header: {
        fontSize: 20,
        bold: true,
    }
};

export interface IOrderToComplete {
    order_id:      number;
    customer_id:   number;
    order_date:    Date;
    customers:     Customers;
    order_details: OrderDetail[];
}

export interface Customers {
    customer_id:   number;
    customer_name: string;
    contact_name:  string;
    address:       string;
    city:          string;
    postal_code:   string;
    country:       string;
}

export interface OrderDetail {
    order_detail_id: number;
    order_id:        number;
    product_id:      number;
    quantity:        number;
    products:        Products;
}

export interface Products {
    product_id:   number;
    product_name: string;
    category_id:  number;
    unit:         string;
    price:        Decimal;
}


interface IOrderDetail {
    title?: string;
    subtitle?: string;
    data: IOrderToComplete;
}

export const orderByIdReport = (options: IOrderDetail): TDocumentDefinitions => {

    const { data } = options;
    const { customers: customer, order_date, order_id, order_details } = data;

    const subtotal = order_details.reduce(
        (acc, detail) => acc + (detail.quantity * +detail.products.price)
        , 0
    );

    const total = subtotal * 1.15; // 15% of IVA

    return {
        styles,

        // Header
        header: logo,

        // footer
        footer: footerSection,

        pageMargins: [40, 120, 40, 60],
        content: [
            // Address and bill number
            { text: 'Tucan Code', style: 'header' },
            {
                columns: [
                    {
                        text: '15 Montgomery Str, Suite 100, \nOttawa ON K2Y 9x1, Canada \nBN:12989838929382\nhttps:reinodigitalcr.com',
                    },
                    {
                        text: [
                            { text: `Recibo No. ${order_id}\n`, bold: true },
                            `Fecha del recibo ${DateFormatter.getDDMMMMYYYY(order_date)}
                            Pagar antes del ${DateFormatter.getDDMMMMYYYY(new Date())}`,
                        ],
                        alignment: 'right',
                    }
                ],
            },

            // QR code
            { qr: 'https://reinodigitalcr.com/#/dashboard/contact', fit: 75, alignment: 'right' },

            // client address
            {
                text: [
                    { text: `Cobrar a:\n`, bold: true },
                    `Razon social: ${customer.customer_name},
                    Contacto: ${customer.contact_name}`,
                ],
            },

            // Table of products
            {
                layout: 'headerLineOnly',
                margin: [0, 20],
                table: {
                    headerRows: 1,
                    widths: [50, '*', 'auto', 'auto', 'auto'],
                    body: [
                        ['ID', 'Description', 'Amount', 'Price', 'Total'],

                        ...order_details.map((orderDetail) => [
                            orderDetail.order_id.toString(),
                            orderDetail.products.product_name,
                            orderDetail.quantity.toString(),
                            CurrencyFormater.formatCurrency(+orderDetail.products.price),
                            {
                                text: CurrencyFormater.formatCurrency(
                                    +orderDetail.products.price * orderDetail.quantity
                                ),
                                style: {
                                    alignment: 'right',
                                }
                            }
                        ]),
                        // ['1', 'Product 1', '1', '100', CurrencyFormater.formatCurrency(100)],
                        // ['2', 'Product 2', '2', '200', CurrencyFormater.formatCurrency(400)],
                        // ['3', 'Product 3', '3', '300', CurrencyFormater.formatCurrency(900)],
                    ],
                },
            },

            // subtotal and total
            {
                columns: [
                    {
                        width: '*',
                        text: '',
                    },
                    {
                        width: 'auto',
                        layout: 'noBorders',
                        table: {
                            body: [
                                [
                                    'Subtotal',
                                    {
                                        text: CurrencyFormater.formatCurrency(subtotal),
                                        alignment: 'right',
                                    }
                                ],
                                [
                                    { text: 'Total', bold: true },
                                    {
                                        text: CurrencyFormater.formatCurrency(total),
                                        bold: true,
                                        alignment: 'right',
                                    }
                                ],
                            ]
                        }
                    }
                ],
            }
        ],
    };

}
