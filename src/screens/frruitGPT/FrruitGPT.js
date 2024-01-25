import React from 'react'
import TopBar from '../../components/topBar/TopBar'
import StockPriceScroll from '../../components/stockPriceScroll/StockPriceScroll'
import LeftBox from '../../components/leftBox/LeftBox'

function FrruitGPT() {
    return (
        <>
            <TopBar />
            <StockPriceScroll />
            <div className='row justify-content-between m-0'>
                <div className='col-lg-3'>
                    <LeftBox />
                </div>
                <div className='col-lg-6'>
                </div>
                <div className='col-lg-3'>
                </div>
            </div>
        </>
    )
}

export default FrruitGPT
