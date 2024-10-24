import React from 'react'
import PieChart from '../pieChart/PieChart'
import '../leftBox/RevenuePage.scss'
import BarChart from '../barChart/BarChart';

function RevenuePage({ companyRevenues }) {

  const pieData = {
    labels: ['Consultancy services', 'Equipment and software licences'],
    data: [98, 2],
  };

  const customColors = ['#4563E4', '#AFBCF3'];
  const graphData = {
    labels: companyRevenues ? Object.keys(companyRevenues) : [],
    data: [
      companyRevenues ? Object.values(companyRevenues) : []
    ],
  };

  const index = 1; // Unique identifier for the chart canvas
  const yAxisLabel = 'Crores'; // Label for the Y axis
  const xAxisLabel = 'Years'; // Label for the X axis
  const showXAxis = true; // Whether to display the X axis
  const legendLabels = ['Revenue']; // Labels for the legend

  return (
    <div className='graphpage'>
      {/* <div className='piechart-box'>
        <p>Latest</p>
        <PieChart graphData={pieData} index={0} isDonut={true} customColors={customColors} />
      </div> */}
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