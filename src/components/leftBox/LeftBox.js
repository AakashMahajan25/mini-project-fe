import React, { useEffect, useState } from 'react';
import './LeftBox.scss';
import SearchIcon from '../../assets/images/search-icon.png';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import GreenArrow from '../../assets/images/green_up-arrow.png';
import RedArrow from '../../assets/images/red_down-arrow.png';
import { getTickersById, getUserWatchLists } from '../../screens/dashboard/slice';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeFirstLetter, trimText } from '../../utils/utils';

function LeftBox() {
    const [value, setValue] = useState(0);
    const dispatch = useDispatch()
    const { watchLists, tickers } = useSelector(state => state.dashboardSlice);

    const handleChange = (event, newValue) => {
        setValue(newValue)
        const id = Number(watchLists[newValue]?.watchlist_id)
        dispatch(getTickersById(id))

    };

    useEffect(() => {
        dispatch(getUserWatchLists())
        getWatchListData()
    }, [])

    const getWatchListData = () => {
        dispatch(getUserWatchLists())
            .unwrap()
            .then(res => {
                const id = Number(res[0]?.watchlist_id)
                dispatch(getTickersById(id))
            })
    }


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
                        {
                            watchLists?.map((item, index) => (
                                <Tab key={index} label={item?.watchlist_name} className='tab-css' />
                            ))
                        }
                    </Tabs>
                </Box>
                <div>
                    { tickers?.rows?.length > 0 ?
                    tickers?.rows?.map((stock, index) => (
                        <div key={index} className='stock-price-list mb-2'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='stock-name'>{trimText(stock?.ticker_name,12)}</p>
                                <div>
                                    <div className='d-flex justify-content-end align-items-center'>
                                        <p className='ltp-text me-2'>{stock?.ticker}</p>
                                        <p className='stock-price me-2' style={{ color: stock?.ticker_change_percent.includes('-') ? '#EA5455' : '#28C76F' }}>{stock?.ticker_price}</p>
                                        <p className='stock-price me-2' style={{ color: stock?.ticker_change_percent.includes('-') ? '#EA5455' : '#28C76F' }}>{stock?.ticker_change_percent}</p>
                                        {stock?.ticker_change_percent.includes('-') ? (
                                            <img style={{ width: 24, objectFit: 'contain' }} src={RedArrow} alt="Red Arrow" />
                                        ) : (
                                            <img style={{ width: 24, objectFit: 'contain' }} src={GreenArrow} alt="Green Arrow" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <div className='d-flex align-items-center justify-content-center mt-5'>
                    <p className='watchlistText'>{`Add Stock to ${watchLists[value]?.watchlist_name && capitalizeFirstLetter(watchLists[value]?.watchlist_name)}`}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default LeftBox;
