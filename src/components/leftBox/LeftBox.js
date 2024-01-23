import React, { useRef, useState } from 'react';
import './LeftBox.scss';
import SearchIcon from '../../assets/images/search-icon.png';
import Nav from 'react-bootstrap/Nav';
import GreenArrow from '../../assets/images/green_up-arrow.png';
import RedArrow from '../../assets/images/red_down-arrow.png';

function LeftBox() {
    const itemsRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [activeWatchlist, setActiveWatchlist] = useState(1);

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setStartX(e.pageX - itemsRef.current.offsetLeft);
        setScrollLeft(itemsRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsMouseDown(false);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleMouseMove = (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - itemsRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        itemsRef.current.scrollLeft = scrollLeft - walk;
        requestAnimationFrame(() => handleMouseMove(e));
    };

    const handleWatchlistClick = (watchlistNumber) => {
        setActiveWatchlist(watchlistNumber);
    };

    const renderStockData = () => {
        switch (activeWatchlist) {
            case 1:
                return [
                    { name: 'TCS', price: '3903', percentage: '0.5%' },
                    { name: 'TCS', price: '3903', percentage: '-0.5%' },
                    { name: 'TCS', price: '3903', percentage: '0.5%' },
                    { name: 'TCS', price: '3903', percentage: '-0.5%' },
                    { name: 'TCS', price: '3903', percentage: '0.5%' },
                ];
            case 2:
                return [
                    { name: 'TATA', price: '2903', percentage: '0.9%' },
                    { name: 'TATA', price: '5403', percentage: '-0.10%' },
                    { name: 'TATA', price: '4603', percentage: '0.7%' },
                    { name: 'TATA', price: '3903', percentage: '-0.2%' },
                    { name: 'TATA', price: '5903', percentage: '0.1%' },
                ];
            case 3:
                return [
                    { name: 'Birla Soft', price: '2903', percentage: '0.9%' },
                    { name: 'Birla Soft', price: '5403', percentage: '-0.10%' },
                    { name: 'Birla Soft', price: '4603', percentage: '0.7%' },
                    { name: 'Birla Soft', price: '3903', percentage: '-0.2%' },
                    { name: 'Birla Soft', price: '5903', percentage: '0.1%' },
                ];
            case 4:
                return [
                    { name: 'SBI Bank', price: '2903', percentage: '0.9%' },
                    { name: 'SBI Bank', price: '5403', percentage: '-0.10%' },
                    { name: 'SBI Bank', price: '4603', percentage: '0.7%' },
                    { name: 'SBI Bank', price: '3903', percentage: '-0.2%' },
                    { name: 'SBI Bank', price: '5903', percentage: '0.1%' },
                ];
            case 5:
                return [
                    { name: 'TATA', price: '2903', percentage: '0.9%' },
                    { name: 'TATA', price: '5403', percentage: '-0.10%' },
                    { name: 'TATA', price: '4603', percentage: '0.7%' },
                    { name: 'TATA', price: '3903', percentage: '-0.2%' },
                    { name: 'TATA', price: '5903', percentage: '0.1%' },
                ];
            case 6:
                return [
                    { name: 'HDFC', price: '2903', percentage: '0.9%' },
                    { name: 'HDFC', price: '5403', percentage: '-0.10%' },
                    { name: 'HDFC', price: '4603', percentage: '0.7%' },
                    { name: 'HDFC', price: '3903', percentage: '-0.2%' },
                    { name: 'HDFC', price: '5903', percentage: '0.1%' },
                ];
            default:
                return [];
        }
    };

    const stockData = renderStockData();

    return (
        <>
            <div className='left-box'>
                <div className='box'>
                    <div className="position-relative" style={{ marginBottom: 20 }}>
                        <input type="text" className="form-control form-control-search" placeholder='Search Here'></input>
                        <div className="position-absolute" style={{ left: 15, top: '15%' }}>
                            <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                        </div>
                    </div>
                    <div className='watchlistText' style={{ marginBottom: 20 }}>Watchlist</div>
                    <div
                        className='scroll-tabs-btn'
                        ref={itemsRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        <Nav variant="pills" defaultActiveKey="/home">
                            {[1, 2, 3, 4, 5, 6].map((watchlistNumber) => (
                                <Nav.Item key={watchlistNumber}>
                                    <Nav.Link
                                        className={`me-3 ${activeWatchlist === watchlistNumber ? 'active' : ''}`}
                                        eventKey={`link-${watchlistNumber}`}
                                        onClick={() => handleWatchlistClick(watchlistNumber)}
                                    >
                                        Watchlist {watchlistNumber}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </div>
                    <div>
                        {stockData.map((stock, index) => (
                            <div key={index} className='stock-price-list mb-2'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p className='stock-name'>{stock.name}</p>
                                    <div>
                                        <div className='d-flex justify-content-end align-items-center'>
                                            <p className='ltp-text me-2'>LTP</p>
                                            <p className='stock-price me-2' style={{ color: stock.percentage.includes('-') ? '#EA5455' : '#28C76F' }}>{stock.price}</p>
                                            <p className='stock-price me-2' style={{ color: stock.percentage.includes('-') ? '#EA5455' : '#28C76F' }}>{stock.percentage}</p>
                                            {stock.percentage.includes('-') ? (
                                                <img style={{ width: 24, objectFit: 'contain' }} src={RedArrow} alt="Red Arrow" />
                                            ) : (
                                                <img style={{ width: 24, objectFit: 'contain' }} src={GreenArrow} alt="Green Arrow" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default LeftBox;
