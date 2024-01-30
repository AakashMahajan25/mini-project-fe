import React from 'react'
import TopBar from '../../components/topBar/TopBar'
import StockPriceScroll from '../../components/stockPriceScroll/StockPriceScroll'
import PromptsLibrary from '../../components/promptsLibrary/PromptsLibrary'
import FrruitGPTLeftBox from '../../components/FrruitGPTLeftBox/FrruitGPTLeftBox'

function FrruitGPT() {
    return (
        <>
            <div className='row justify-content-between m-0'>
                <div className='col-lg-3 column-pad'>
                    <FrruitGPTLeftBox />
                </div>
                <div className='col-lg-9 column-pad'>
                    <PromptsLibrary />
                </div>
            </div>
        </>
    )
}

export default FrruitGPT
