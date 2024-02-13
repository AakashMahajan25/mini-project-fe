import React, { useEffect, useState } from 'react'
import './MarketContentGPT.scss';
import MarketContentGptLeftBox from '../../components/marketContentGptLeftBox/MarketContentGptLeftBox';
import BottomBar from '../../components/marketContentGPT/BottomBar';

function MarketContentGPT() {
    return (
        <>
            <div className='market-content-gpt-css'>
                <div className='row justify-content-between m-0'>
                    <div className='col-lg-3 column-pad'>
                        <MarketContentGptLeftBox />
                    </div>
                    <div className='col-lg-9 column-pad position-relative'>
                        <BottomBar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarketContentGPT
