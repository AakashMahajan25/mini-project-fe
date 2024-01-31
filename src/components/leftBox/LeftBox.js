import './LeftBox.scss';
import SearchIcon from '../../assets/images/search-icon.png';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import * as React from 'react';
import GreenArrow from '../../assets/images/green_up-arrow.png';
import RedArrow from '../../assets/images/red_down-arrow.png';

function LeftBox() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const renderStockData = (watchlistNumber) => {
        switch (watchlistNumber) {
            case 1:
                return [
                    { name: 'TCS', price: '3903', percentage: '0.5%' },
                    { name: 'TCS', price: '3903', percentage: '-0.5%' },
                    { name: 'TCS', price: '3903', percentage: '0.5%' },
                    { name: 'TCS', price: '3903', percentage: '-0.5%' },
                    { name: 'TCS', price: '3903', percentage: '0.5%' },
                    { name: 'TCS', price: '3903', percentage: '0.5%' },
                    { name: 'TCS', price: '3903', percentage: '-0.5%' },
                    { name: 'TCS', price: '3903', percentage: '0.5%' },
                    { name: 'TCS', price: '3903', percentage: '-0.5%' },
                    { name: 'TCS', price: '3903', percentage: '0.5%' },
                    { name: 'TCS', price: '3903', percentage: '0.5%' },
                    { name: 'TCS', price: '3903', percentage: '-0.5%' },
                    { name: 'TCS', price: '3903', percentage: '0.5%' },
                    { name: 'TCS', price: '3903', percentage: '-0.5%' },
                    { name: 'TCS', price: '3903', percentage: '0.5%' },
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
                    { name: 'SBI Bank', price: '2903', percentage: '0.9%' },
                    { name: 'SBI Bank', price: '5403', percentage: '-0.10%' },
                    { name: 'SBI Bank', price: '4603', percentage: '0.7%' },
                    { name: 'SBI Bank', price: '3903', percentage: '-0.2%' },
                    { name: 'SBI Bank', price: '5903', percentage: '0.1%' },
                ];
            case 4:
                return [
                    { name: 'MRI', price: '2903', percentage: '0.9%' },
                    { name: 'MRI', price: '5403', percentage: '-0.10%' },
                    { name: 'MRI', price: '4603', percentage: '0.7%' },
                    { name: 'MRI', price: '3903', percentage: '-0.2%' },
                    { name: 'MRI', price: '5903', percentage: '0.1%' },
                ];
            case 5:
                return [
                    { name: 'TATA Power', price: '2903', percentage: '0.9%' },
                    { name: 'TATA Power', price: '5403', percentage: '-0.10%' },
                    { name: 'TATA Power', price: '4603', percentage: '0.7%' },
                    { name: 'TATA Power', price: '3903', percentage: '-0.2%' },
                    { name: 'TATA Power', price: '5903', percentage: '0.1%' },
                ];
            case 6:
                return [
                    { name: 'Boat', price: '2903', percentage: '0.9%' },
                    { name: 'Boat', price: '5403', percentage: '-0.10%' },
                    { name: 'Boat', price: '4603', percentage: '0.7%' },
                    { name: 'Boat', price: '3903', percentage: '-0.2%' },
                    { name: 'Boat', price: '5903', percentage: '0.1%' },
                ];
            case 7:
                return [
                    { name: 'TATA', price: '2903', percentage: '0.9%' },
                    { name: 'TATA', price: '5403', percentage: '-0.10%' },
                    { name: 'TATA', price: '4603', percentage: '0.7%' },
                    { name: 'TATA', price: '3903', percentage: '-0.2%' },
                    { name: 'TATA', price: '5903', percentage: '0.1%' },
                ];
            default:
                return [];
        }
    };

    const stockData = renderStockData(value + 1);

    return (
        <div className='left-box'>
            <div className='box' style={{ height: window.innerHeight - 130 }}>
                <div className="position-relative" style={{ marginBottom: 20 }}>
                    <input type="text" className="form-control form-control-search" placeholder='Search Here' />
                    <div className="position-absolute" style={{ left: 15, top: '15%' }}>
                        <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                    </div>
                </div>
                <div className='watchlistText'>Watchlist</div>
                <Box marginBottom={'20px'} sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Watchlist 1" className='tab-css' />
                        <Tab label="Watchlist 2" className='tab-css' />
                        <Tab label="Watchlist 3" className='tab-css' />
                        <Tab label="Watchlist 4" className='tab-css' />
                        <Tab label="Watchlist 5" className='tab-css' />
                        <Tab label="Watchlist 6" className='tab-css' />
                        <Tab label="Watchlist 7" className='tab-css' />
                    </Tabs>
                </Box>
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
    );
}

export default LeftBox;
