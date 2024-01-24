import React from 'react'
import TopBar from '../../components/topBar/TopBar'
import StockPriceScroll from '../../components/stockPriceScroll/StockPriceScroll'
import LeftBox from '../../components/leftBox/LeftBox'

function DiscoverCorrelation() {
    return (
        <>
            <TopBar />
            <StockPriceScroll />
            <div className='row justify-content-between m-0'>
                <div className='col-lg-2'>
                    <LeftBox />
                </div>
                <div className='col-lg-10'>

                </div>
            </div>
        </>
    )
}

export default DiscoverCorrelation
