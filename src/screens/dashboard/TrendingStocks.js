import React from 'react'
import './TrendingStocks.scss'
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import TrendingStocksCard from '../../components/trendingStocks/TrendingStocksCard';

function TrendingStocks({ handleBackButtonClick, trendingStocks }) {
    return (
        <>
            <div className='trending-stocks-css'>
                <div className='d-flex justify-content-start align-items-center' style={{ marginBottom: 20 }}>
                    <button onClick={handleBackButtonClick} className='light-blue-btn me-2'>
                        <img src={BackBtnArrow} style={{ width: 7, height: 13, objectFit: 'contain', marginRight: 5, marginTop: -2 }} />
                        Back
                    </button>
                </div>
                <div className='heading-text'>Trending Stocks</div>
                <div className='desc-text mt-1'>Explore trending stocks curated by AI</div>
                
                {trendingStocks?.length > 0 && (
                    <div className='box-content position-relative mt-3'>
                        <div className='row'>
                            {trendingStocks.map((stockData, index) => (
                                <div key={index} className='col-lg-3 col-md-4 col-sm-6 col-6 mb-3 px-2'>
                                    <TrendingStocksCard {...stockData} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default TrendingStocks
