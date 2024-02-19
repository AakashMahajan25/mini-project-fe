import React from 'react';
import PropTypes from 'prop-types';
import './TrendingStocksCard.scss';
// import UpArrow from '../../assets/images/up-arrow-outline.png';
// import DownArrow from '../../assets/images/down-arrow-outline.png';
import RightWhiteArrow from '../../assets/images/white-right.png';
import UpArrow from '../../assets/images/green_up-arrow.png'
import DownArrow from '../../assets/images/red_down-arrow.png'
import { trimText } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

function TrendingStocksCard({ name, symbol, change, changesPercentage }) {
    const navigate = useNavigate();
    const isPositiveChange = parseFloat(changesPercentage) > 0;

    const getFrruitClick = () => {
        navigate("/frruit-gpt", {
            state: { question: 'What is happening in ' + symbol + ' stock' },
        });
    }

    return (
        <div className='trendingStockCard' style={{ marginRight: 10 }}>
            <div className='card'>
                    <div className='d-flex align-items-center justify-content-between' style={{ marginBottom: 8 }}>
                        <p className='text me-2'>{symbol}</p>
                <div className='d-flex justify-content-between align-items-center' >
                        <p className={`text2 me-2`} style={{ color: isPositiveChange ? '#28C76F' : '#EA5455' }}>{change}</p>
                        <p className={`text2 me-2`} style={{ color: isPositiveChange ? '#28C76F' : '#EA5455' }}>{`${changesPercentage}%`}</p>
                        <img src={isPositiveChange ? UpArrow : DownArrow} style={{ width: 18, objectFit: 'contain' }} alt='Arrow' />
                    </div>
                </div>
                    <p className='stockname' style={{ marginBottom: 8 }}>{trimText(name,40)}</p>
                <div>
                    <div className='row px-2'>
                        {/* <div className='col-lg-4 column-pad'>
                            <div className='mx-1'>
                                <button className='green-btn'>{'Buy'}</button>
                            </div>
                        </div>
                        <div className='col-lg-4 column-pad'>
                            <div className='mx-1'>
                                <button className='red-btn'>{'Sell'}</button>
                            </div>
                        </div> */}
                        <div className='col-lg-4 column-pad'>
                            <div className='mx-1'>
                                <button className='blue-btn  d-flex align-items-center justify-content-center' onClick={getFrruitClick}>{'Get Frruit'}  <img src={RightWhiteArrow} style={{ width: 6, objectFit: 'contain', marginLeft: 5 }} /></button>
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
