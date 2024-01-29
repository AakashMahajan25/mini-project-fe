import React from 'react';
import PropTypes from 'prop-types';
import './TrendingStocksCard.scss';
import UpArrow from '../../assets/images/up-arrow-outline.png';
import DownArrow from '../../assets/images/down-arrow-outline.png';
import RightWhiteArrow from '../../assets/images/white-right.png';

function TrendingStocksCard({ stockName, ltpLabel, ltpValue, percentageChange, buyButtonText, sellButtonText, fruitButtonText }) {
    const isPositiveChange = parseFloat(percentageChange) > 0;

    return (
        <div className='trendingStockCard' style={{ marginRight: 10 }}>
            <div className='card'>
                <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: 8 }}>
                    <p className='stockname'>{stockName}</p>
                    <div className='d-flex align-items-center justify-content-start'>
                        <p className='text me-2'>{ltpLabel}</p>
                        <p className={`text2 me-2`} style={{ color: isPositiveChange ? '#28C76F' : '#EA5455' }}>{ltpValue}</p>
                        <p className={`text2 me-2`} style={{ color: isPositiveChange ? '#28C76F' : '#EA5455' }}>{percentageChange}</p>
                        <img src={isPositiveChange ? UpArrow : DownArrow} style={{ width: 18, objectFit: 'contain' }} alt='Arrow' />
                    </div>
                </div>
                <div>
                    <div className='row px-2'>
                        <div className='col-lg-4'>
                            <div className='mx-1'>
                                <button className='green-btn'>{buyButtonText}</button>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='mx-1'>
                                <button className='red-btn'>{sellButtonText}</button>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='mx-1'>
                                <button className='blue-btn  d-flex align-items-center justify-content-center'>{fruitButtonText}  <img src={RightWhiteArrow} style={{ width: 6, objectFit: 'contain', marginLeft: 5 }} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

TrendingStocksCard.propTypes = {
    stockName: PropTypes.string.isRequired,
    ltpLabel: PropTypes.string.isRequired,
    ltpValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    percentageChange: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    buyButtonText: PropTypes.string.isRequired,
    sellButtonText: PropTypes.string.isRequired,
    fruitButtonText: PropTypes.string.isRequired,
};

export default TrendingStocksCard;
