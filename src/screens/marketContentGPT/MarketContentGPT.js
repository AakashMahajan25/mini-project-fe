import React, { useEffect, useState } from 'react'
import './MarketContentGPT.scss';
import MarketContentGptLeftBox from '../../components/marketContentGptLeftBox/MarketContentGptLeftBox';
import BottomBar from '../../components/marketContentGPT/BottomBar';
import ChatGpt from '../../components/frruitGpt/ChatGpt';

function MarketContentGPT() {
    return (
        <>
            <div className='market-content-gpt-css'>
                <div className='row justify-content-between m-0'>
                    <div className='col-lg-3 column-pad'>
                        <MarketContentGptLeftBox />
                    </div>
                    <div className='col-lg-9 column-pad position-relative'>
                        <ChatGpt />
                        <BottomBar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarketContentGPT
