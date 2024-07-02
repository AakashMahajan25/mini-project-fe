import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import '../../components/barChart/BarChart.scss'

function BarChart(props) {
    const { graphData, index, yAxisLabel, xAxisLabel, showXAxis, legendLabels, highlightTopCorners } = props;

    useEffect(() => {
        const ctx = document.getElementById(`myChart${index}`).getContext('2d');
        const existingChart = Chart.getChart(ctx);

        if (existingChart) {
            existingChart.destroy();
        }

        const bgColors = ['#43BE9A', "#4563E4", '#8361D9', '#BB68C8', "#FC9F9F",]
        const XAxis = graphData.labels;
        const YAxis = graphData.data;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: XAxis,
                datasets: YAxis.map((yData, index) => ({
                    data: yData,
                    label: legendLabels[index],
                    backgroundColor: bgColors[index % bgColors.length],
                    borderRadius: highlightTopCorners ? [8, 8, 0, 0] : 5, // Conditionally set border radius
                }))
            },
            options: {
                animation: false,
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
                            padding: 10,
                            fontColor: 'rgba(0,0,0,0)',
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
    }, [graphData, highlightTopCorners]);

    return (
        <div className='barchart-css'>
            <div className={`border-grey position-relative ${highlightTopCorners ? 'highlight-top-corners' : ''}`}>
                <div className='graph-dashboard'>
                    <canvas id={`myChart${index}`}></canvas>
                </div>
            </div>
        </div>
    )
}

export default BarChart;
