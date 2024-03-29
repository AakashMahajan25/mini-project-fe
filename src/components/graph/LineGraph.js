import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

function LineGraph(props) {
    const { graphData, index, xAxisLabel, yAxisLabel, legendLabels } = props;

    useEffect(() => {
        const ctx = document.getElementById(`myChart${index}`).getContext('2d');
        const existingChart = Chart.getChart(ctx);

        const bgColors = ['#43BE9A', "#4563E4", '#8361D9', '#BB68C8', "#FC9F9F",]

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
                datasets: YAxis.map((yData, index) => ({
                    data: yData,
                    label: legendLabels[index],
                    // fill: true,
                    backgroundColor: bgColors[index % bgColors.length],
                    borderColor: bgColors[index % bgColors.length],
                    borderWidth: 3,
                    tension: 0.2,
                    pointBorderWidth: 3,
                    pointHoverRadius: 3,
                    pointHoverBorderWidth: 1,
                    pointRadius: 5,
                    pointBorderColor: bgColors[index % bgColors.length],
                    pointBackgroundColor: 'white',
                    pointHoverBackgroundColor: 'white',
                    pointHoverBorderColor: bgColors[index % bgColors.length],
                })),
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
                            color: 'transparent'
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
                            fontColor: 'red',
                            fontStyle: 'bold',
                            padding: 10,
                        },
                        title: {
                            display: true,
                            text: xAxisLabel,
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

export default LineGraph;
