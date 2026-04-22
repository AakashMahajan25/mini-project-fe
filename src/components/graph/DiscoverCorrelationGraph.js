import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

function DiscoverCorrelationGraph(props) {
    const { graphData, index } = props;

    useEffect(() => {
        const ctx = document.getElementById(`myChart${index}`).getContext('2d');
        const existingChart = Chart.getChart(ctx);

        const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, 'rgba(21, 112, 239, 1)');
        gradientStroke.addColorStop(1, 'rgba(21, 112, 239, 1)');

        const gradientFill = ctx.createLinearGradient(0, 0, 0, 200);
        gradientFill.addColorStop(0, 'rgba(21, 112, 239, 0.5)');
        gradientFill.addColorStop(1, 'rgba(21, 112, 239, 0.05)');

        if (existingChart) {
            existingChart.destroy();
        }

        const XAxis = graphData.labels;
        const YAxis = graphData.data;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: XAxis,
                datasets: [
                    {
                        borderColor: gradientStroke,
                        pointBorderColor: gradientStroke,
                        pointBackgroundColor: 'white',
                        pointHoverBackgroundColor: gradientStroke,
                        pointHoverBorderColor: gradientStroke,
                        pointBorderWidth:2,
                        pointHoverRadius: 0,
                        pointHoverBorderWidth: 1,
                        pointRadius: 3,
                        fill: true,
                        backgroundColor: gradientFill,
                        borderWidth: 0.8,
                        data: YAxis,
                        tension: 0.2
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            boxWidth: 20, // Width of each legend box
                            padding: 20, // Padding between each legend item
                            font: {
                                size: 14, // Font size of legend labels
                            }
                        }
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
                            color:'#D1E9FF'
                        },
                        title: {
                            display: true,
                            text: `Money`,
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
                            display: false,
                        },
                        title: {
                            display: true,
                            text: `Date`,
                            padding: 0,
                        },
                        border: {
                            display: false
                        }
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

export default DiscoverCorrelationGraph;
