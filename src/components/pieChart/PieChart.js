import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

function PieChart(props) {
    const { graphData, index } = props;

    useEffect(() => {
        const ctx = document.getElementById(`myChart${index}`).getContext('2d');
        const existingChart = Chart.getChart(ctx);

        if (existingChart) {
            existingChart.destroy();
        }

        const XAxis = graphData.labels;
        const YAxis = graphData.data;
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: XAxis,
                datasets: [{
                    data: YAxis,
                    backgroundColor: [
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
            },
        });
    }, [graphData]);

    return (
        <div className="border-grey position-relative">
            <div className='graph-dashboard' style={{ width: 400, height: 322 }}>
                <canvas id={`myChart${index}`}></canvas>
            </div>
        </div>
    )
}

export default PieChart;
