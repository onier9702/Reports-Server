import * as Utils from 'src/helpers/chart-utils';

interface DonutEntry {
    label: string;
    value: number;
}

interface DonutOptions {
    entries: DonutEntry[];
    position?: 'left' | 'right' | 'top' | 'bottom';
}

export const getDonutChart = async (options: DonutOptions): Promise<string> => {

    const { position = 'left', entries } = options;

    const data = {
        labels: entries.map((e) => e.label),
        datasets: [
            {
                label: '',
                data: entries.map((e) => e.value),
                backgroundColor: Object.values(Utils.CHART_COLORS)
            }
        ],
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            legend: {
                position,
            },
            // title: {
            //     display: true,
            //     text: 'Top 10 countries'
            // }
            plugins: {
                datalabels: {
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: 18,
                    },
                },
            },
        },
    };

    return await Utils.chartJsToImage(config);
}
