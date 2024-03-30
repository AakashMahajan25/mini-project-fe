import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

function SingleBarGraph(props) {
    const { graphData, index, yAxisLabel, xAxisLabel, showXAxis } = props;

    useEffect(() => {
        const ctx = document.getElementById(`myChart${index}`).getContext('2d');
        const existingChart = Chart.getChart(ctx);

        if (existingChart) {
            existingChart.destroy();
        }

        const XAxis = graphData.labels;
        const YAxis = graphData.data;
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: XAxis,
                datasets: [{
                    data: YAxis,
                    backgroundColor: [
                        '#F1F4FD',
                    ],
                    borderRadius: 5,
                    borderColor: '#4563E4',
                    borderWidth: 1
                }],
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        ticks: {
                            fontColor: 'red',
                            fontStyle: 'bold',
                            beginAtZero: true,
                            maxTicksLimit: 6,
                            padding: 10,
                        },
                        grid: {
                            zeroLineColor: 'transparent',
                            tickColor: 'white',
                            color: '#D1E9FF'
                        },
                        title: {
                            display: true,
                            text: yAxisLabel,
                            padding: 0,
                        },
                        border: {
                            display: false,
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            padding: 10,
                            fontColor: 'rgba(0,0,0,0.5)',
                            fontStyle: 'bold',
                            display: showXAxis
                        },
                        title: {
                            display: true,
                            text: xAxisLabel,
                            padding: 0,
                        },
                        border: {
                            display: false
                        },
                    },

                },

            },
        });
    }, [graphData]);

    return (
        <div className="border-grey position-relative">
            <div className='graph-dashboard'>
                <canvas id={`myChart${index}`}></canvas>
            </div>
        </div>
    )
}

export default SingleBarGraph;
