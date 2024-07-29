import { Content } from 'pdfmake/interfaces';

import { DateFormatter } from '../../helpers/index';

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

const currentDate: Content = {
  text: DateFormatter.getDDMMMMYYYY(new Date()),
  alignment: 'right',
  margin: [20, 20],
  bold: true,
  width: 150,
};

interface HeaderOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { title, subTitle, showLogo = true, showDate = true } = options;

  const headerLogo: Content = showLogo ? logo : null;
  const headerTitle: Content = title ? buildHeaderTitle(title, subTitle) : null;
  const headerDate: Content = showDate ? currentDate : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};

const buildHeaderTitle = (
  title: string,
  subtitle: string|null,
): Content => {
  const titleContent: Content = {
    stack: [
      {
        text: title,
        alignment: 'center',
        margin: [0, 15, 0, 0],
        style: {
          bold: true,
          fontSize: 22,
        },
      },
      
      subtitle ? buildHeaderSubtitle(subtitle) : null,
      
    ],
  };

  return titleContent;
}

const buildHeaderSubtitle = (subtitle: string): Content => {
  return {
    text: subtitle,
    alignment: 'center',
    margin: [0, 2, 0, 0],
    style: {
      bold: true,
      fontSize: 16,
    },
  };
}
