import React from 'react'
import TopBar from '../../components/topBar/TopBar'
import StockPriceScroll from '../../components/stockPriceScroll/StockPriceScroll'
import LeftBox from '../../components/leftBox/LeftBox'
import DashboardRightBox from '../../components/dashboardRightBox/DashboardRightBox'

function Dashboard() {
    return (
        <>
            <TopBar />
            <StockPriceScroll />
            <div className='row justify-content-between m-0'>
                <div className='col-lg-3'>
                    <LeftBox />
                </div>
                <div className='col-lg-6'>
                    <p>shubham</p>
                    <p>shubham</p>
                    <p>shubham</p>
                </div>
                <div className='col-lg-3'>
                    <DashboardRightBox />
                </div>
            </div>
        </>
    )
}

export default Dashboard