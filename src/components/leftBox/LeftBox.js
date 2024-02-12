import React, { useEffect, useState } from 'react';
import './LeftBox.scss';
import SearchIcon from '../../assets/images/search-icon.png';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import GreenArrow from '../../assets/images/green_up-arrow.png';
import RedArrow from '../../assets/images/red_down-arrow.png';
import StockMiniLogo from '../../assets/images/frruit-mini-logo.png';
import AddstockBtn from '../../assets/images/add-stock-btn.png';
import { getTickersById, getUserWatchLists } from '../../screens/dashboard/slice';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeFirstLetter, trimText } from '../../utils/utils';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

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

    const [anchorElNotification, setAnchorElNotification] = React.useState(null);


    const handleOpenNotificationMenu = (event) => {
        setAnchorElNotification(event.currentTarget);
    };


    const handleCloseNotificationMenu = () => {
        setAnchorElNotification(null);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <div className='left-box'>
                <div className='box' style={{ height: window.innerHeight - 130 }}>
                    <div className="position-relative" style={{ marginBottom: 20 }} onClick={handleOpenNotificationMenu}>
                        <input type="text" className="form-control form-control-search" placeholder='Search Here' />
                        <div className="position-absolute" style={{ left: 15, top: '15%' }}>
                            <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                        </div>
                    </div>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElNotification}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElNotification)}
                        onClose={handleCloseNotificationMenu}
                        PaperProps={{
                            style: {
                                width: '22%',
                                borderRadius: '10px',
                                boxShadow: '0px 2px 10px 0px #00000026'
                            },
                        }}
                    >
                        <div className='px-2'>
                            {tickers?.rows?.length > 0 ?
                                tickers?.rows?.map((stock, index) => (
                                    <div key={index} className='d-flex justify-content-between align-items-center mb-2' style={{ backgroundColor: '#F1F4FD', borderRadius: '15px', padding: 10 }}>
                                        <div className='d-flex justify-content-start align-items-center'>
                                            <div className='me-2' style={{ lineHeight: '22px', fontWeight: 400, fontSize: 14, color: '#171E42', fontFamily: 'Roboto, sans-serif' }}
                                            >{trimText(stock?.ticker_name, 12)}</div>
                                            <div className='me-2' style={{ lineHeight: '22px', fontWeight: 400, fontSize: 14, color: '#6F7387', fontFamily: 'Roboto, sans-serif' }}
                                            >{stock?.ticker}</div>
                                            <div className='me-2' style={{ lineHeight: '22px', fontWeight: 400, fontSize: 14, color: stock?.ticker_change_percent.includes('-') ? '#EA5455' : '#28C76F', fontFamily: 'Roboto, sans-serif' }}
                                            >{stock?.ticker_price}</div>
                                            <div className='me-1' style={{ lineHeight: '22px', fontWeight: 400, fontSize: 14, color: stock?.ticker_change_percent.includes('-') ? '#EA5455' : '#28C76F', fontFamily: 'Roboto, sans-serif' }}
                                            >{stock?.ticker_change_percent}</div>
                                            {stock?.ticker_change_percent.includes('-') ? (
                                                <img style={{ width: 24, objectFit: 'contain' }} src={RedArrow} alt="Red Arrow" />
                                            ) : (
                                                <img style={{ width: 24, objectFit: 'contain' }} src={GreenArrow} alt="Green Arrow" />
                                            )}
                                        </div>
                                        <div>
                                            <img className='me-2' style={{ width: 24, objectFit: 'contain', cursor: 'pointer' }} src={StockMiniLogo} alt="mini-logo" />
                                            <img  style={{ width: 24, objectFit: 'contain', cursor: 'pointer' }} src={AddstockBtn} alt="mini-logo" />
                                        </div>
                                    </div>
                                ))
                                :
                                <div className='d-flex align-items-center justify-content-center mt-5'>
                                    <p className='watchlistText'>{`Add Stock to ${watchLists[value]?.watchlist_name && capitalizeFirstLetter(watchLists[value]?.watchlist_name)}`}</p>
                                </div>
                            }

                        </div>
                        {/* <Divider />
                    <Typography>
                        <div>hi</div>
                    </Typography> */}
                    </Menu>
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
                        {tickers?.rows?.length > 0 ?
                            tickers?.rows?.map((stock, index) => (
                                <div key={index} className='stock-price-list mb-2'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p className='stock-name'>{trimText(stock?.ticker_name, 12)}</p>
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LeftBox;
