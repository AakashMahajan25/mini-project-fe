import React from 'react'
import './BuySellStockCard.scss';
import BuyIcon from '../../assets/images/buy-icon.png';
import SellIcon from '../../assets/images/sell-icon.png';

function BuySellStockCard() {
    return (
        <>
            <div className='BuySellStockCard-css'>
                <div className='card'>
                    <div className='d-flex justify-content-between align-items-start'>
                        <div>
                            <div>TCS</div>
                            <div className='d-flex justify-content-center align-items-center'>
                                <div>LTP</div>
                                <div>3903</div>
                                <div>0.5%</div>
                            </div>
                        </div>
                        <div>
                            <img src={BuyIcon} style={{ width: 32, objectFit: 'contain' }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuySellStockCard