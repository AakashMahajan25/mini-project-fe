import React from 'react'
import PieChart from '../pieChart/PieChart'
import '../leftBox/RevenuePage.scss'
import BarChart from '../barChart/BarChart';

function RevenuePage() {

  const pieData = {
    labels: ['Consultancy services', 'Equipment and software licences'],
    data: [98, 2],
  };

  const customColors = ['#4563E4', '#AFBCF3'];
  const graphData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    data: [
      [65, 59, 80, 81, 56], // Dataset 1
      [28, 48, 40, 19, 86], // Dataset 2
      [45, 30, 60, 35, 75], // Dataset 3
    ],
  };

  const index = 1; // Unique identifier for the chart canvas
  const yAxisLabel = 'Value'; // Label for the Y axis
  const xAxisLabel = 'Months'; // Label for the X axis
  const showXAxis = true; // Whether to display the X axis
  const legendLabels = ['Dataset 1', 'Dataset 2', 'Dataset 3']; // Labels for the legend

  return (
    <div className='graphpage'>
      <div className='piechart-box'>
        <p>Latest</p>
        <PieChart graphData={pieData} index={0} isDonut={true} customColors={customColors} />
      </div>
      <div>
        <BarChart
          graphData={graphData}
          index={index}
          yAxisLabel={yAxisLabel}
          xAxisLabel={xAxisLabel}
          showXAxis={showXAxis}
          legendLabels={legendLabels}
        />
      </div>
    </div>
  )
}

export default RevenuePage