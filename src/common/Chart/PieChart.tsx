import * as React from 'react';

import 'chart.js/auto';

import { Pie } from 'react-chartjs-2';

interface IPieChartProps {
    data: Array<any>;
    prefix?: string;
    label?: string;
    height?: string;
}

const PieChart: React.FunctionComponent<IPieChartProps> = ({ data, prefix = ' ', label = 'items', height = '25rem' }) => {
    const chartData = {
        labels: data.map((v) => v.label),
        datasets: [
            {
                data: data.map((v) => v.count),
                backgroundColor: data.map((v) => v.backgroundColor),
                borderColor: data.map((v) => v.borderColor),
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        cutout: '70%',
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return ` ${prefix}${tooltipItem.raw} ${label}`;
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', height: height }}>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;
