import React from 'react';
import './BuySellStockCard.scss';
import BuyIcon from '../../assets/images/buy-icon.png';
import SellIcon from '../../assets/images/sell-icon.png';
import UpArrow from '../../assets/images/green_up-arrow.png'
import DownArrow from '../../assets/images/red_down-arrow.png'

function BuySellStockCard({ companyName, ltpValue, percentageChange, changeInLastMonth }) {
    // const isPositiveChange = percentageChange > 0;

    return (
        <div className='BuySellStockCard-css'>
            <div className='card'>
                {/* <div className='d-flex justify-content-between align-items-start'> */}
                    <div>
                        <div className='d-flex justify-content-between align-items-center'>
                        <div className='black-text-heading'>{companyName}</div>
                            {/* <div className='LTP-text me-2'>LTP</div> */}
                            <div className={`green-text me-2`} style={{ color: percentageChange.includes('-') ? '#EA5455' : '#28C76F' }}>{ltpValue}</div>
                            <div className='d-flex justify-content-between align-items-center'>
                            <div className={`green-text me-2`} style={{ color: percentageChange.includes('-') ? '#EA5455' : '#28C76F' }}>{percentageChange}%</div>
                            <img src={percentageChange.includes('-') ? DownArrow : UpArrow} style={{ width: 18, objectFit: 'contain' }} alt='Arrow' />
                            </div>
                        </div>
                    {/* </div> */}
                    {/* <div>
                        <img src={BuyIcon} style={{ width: 32, objectFit: 'contain', cursor: 'pointer' }} alt='Buy' />
                    </div> */}
                </div>
                {/* <div className='d-flex justify-content-between align-items-end'>
                    <div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className={`black-text-price me-2`}>{changeInLastMonth}</div>
                            <div className='grey-text me-2'>(Last 1 month)</div>
                        </div>
                    </div>
                    <div>
                        <img src={SellIcon} style={{ width: 32, objectFit: 'contain', cursor: 'pointer' }} alt='Sell' />
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default BuySellStockCard;
