import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../pieChart/PieChart.scss';

function PieChart(props) {
    const { graphData, index, isDonut, customColors } = props;
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const existingChart = Chart.getChart(ctx);

        if (existingChart) {
            existingChart.destroy();
        }

        if (!graphData || !graphData.labels || !graphData.data) {
            console.error('Invalid graphData structure');
            return;
        }

        new Chart(ctx, {
            type: isDonut ? 'doughnut' : 'pie',
            data: {
                labels: graphData.labels,
                datasets: [{
                    data: graphData.data,
                    backgroundColor: customColors || [
                        '#F1F4FD',
                        'red',
                        '#F1F4FD',
                    ],
                }],
            },
            options: {
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                },
                cutout: isDonut ? '50%' : 0, // Makes the chart a donut if isDonut is true
            },
        });
    }, [graphData, isDonut, customColors]);

    return (
        <div className='piechart-css'>
            <div className="border-grey position-relative">
                <div className='graph-dashboard' style={{ width: 460, height: 322 }}>
                    <canvas ref={chartRef} id={`myChart${index}`}></canvas>
                </div>
            </div>
        </div>

    );
}

export default PieChart;
