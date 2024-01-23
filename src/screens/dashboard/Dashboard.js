import React from 'react'
import TopBar from '../../components/topBar/TopBar'
import StockPriceScroll from '../../components/stockPriceScroll/StockPriceScroll'
import LeftBox from '../../components/leftBox/LeftBox'

function Dashboard() {
    return (
        <>
            <TopBar />
            <StockPriceScroll />
            <LeftBox />
        </>
    )
}

export default Dashboard