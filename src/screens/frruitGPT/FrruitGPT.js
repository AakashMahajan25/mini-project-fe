import React from 'react'
import TopBar from '../../components/topBar/TopBar'
import StockPriceScroll from '../../components/stockPriceScroll/StockPriceScroll'
import FrruitGPTLeftBox from '../../components/FrruitGPTLeftBox/FrruitGPTLeftBox'
import LeftBox from '../../components/leftBox/LeftBox'
import PromptsLibrary from '../../components/promptsLibrary/PromptsLibrary'
import BottomSearchBar from '../../components/frruitGpt/BottomSearchBar'
import ChatGpt from '../../components/frruitGpt/ChatGpt'

function FrruitGPT() {
    return (
        <>
            <div className='row justify-content-between m-0'>
                <div className='col-lg-3 column-pad'>
                    <FrruitGPTLeftBox />
                </div>
                <div className='col-lg-9 column-pad position-relative'>
                    <ChatGpt />
                    <PromptsLibrary />
                    <BottomSearchBar />
                </div>
            </div>
        </>
    )
}

export default FrruitGPT
