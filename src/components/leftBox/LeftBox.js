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
import TataLogo from '../../assets/images/Tata_Consultancy_Services_Logo.png'
import UpGreenArrow from '../../assets/images/up-arrow-outline.png'
import Slider from 'react-slick'
import BarChart from '../barChart/BarChart'
import DiscoverCorrelationGraph from '../graph/DiscoverCorrelationGraph'

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

    const dataForMapping = [
        { text1: '0.00', text2: '0', text3: '0.00' },
        { text1: '0.00', text2: '0', text3: '0.00' },
        { text1: '0.00', text2: '0', text3: '0.00' },
        { text1: '0.00', text2: '0', text3: '0.00' },
        { text1: '0.00', text2: '0', text3: '0.00' },
        { text1: '0.00', text2: '0', text3: '0.00' },
        { text1: '0.00', text2: '0', text3: '0.00' },
        { text1: '0.00', text2: '0', text3: '0.00' },
    ];
    const dataForMapping2 = [
        { text1: '0.00', text2: '0', text3: '0.00' },
        { text1: '0.00', text2: '0', text3: '0.00' },
        { text1: '0.00', text2: '0', text3: '0.00' },
        { text1: '0.00', text2: '0', text3: '0.00' },
        { text1: '0.00', text2: '0', text3: '0.00' },
        { text1: '0.00', text2: '0', text3: '0.00' },
        { text1: '0.00', text2: '0', text3: '0.00' },
        { text1: '0.00', text2: '0', text3: '0.00' },
    ];
    const openStockData = [
        { heading: 'Open', amount: '3800.8' },
        { heading: 'Open', amount: '3800.8' },
        { heading: 'Open', amount: '3800.8' },
        { heading: 'Open', amount: '3800.8' },
        { heading: 'Open', amount: '3800.8' },
        { heading: 'Open', amount: '3800.8' },
        { heading: 'Open', amount: '3800.8' },
        { heading: 'Open', amount: '3800.8' },
    ];
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8.5,
        swipeToSlide: true,
        arrows: false,
    };
    const fundamental = [
        {
            title: 'Market Cap',
            value: '1295'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
    ]


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
                                boxShadow: '0px 2px 10px 0px #00000026',
                                zIndex: '0'
                            },
                        }}
                    >
                        <div className='px-2'>
                            {tickers?.rows?.length > 0 ?
                                tickers?.rows?.map((stock, index) => (
                                    <div key={index} className='d-flex justify-content-between align-items-center mb-2' style={{ backgroundColor: '#F1F4FD', borderRadius: '15px', padding: 10 }}>
                                        <div onClick={handleShow} className='d-flex justify-content-start align-items-center'>
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
                                            <img style={{ width: 24, objectFit: 'contain', cursor: 'pointer' }} src={AddstockBtn} alt="mini-logo" />
                                        </div>
                                    </div>
                                ))
                                :
                                <div className='d-flex align-items-center justify-content-center mt-5'>
                                    <p className='watchlistText'>{`Add Stock to ${watchLists[value]?.watchlist_name && capitalizeFirstLetter(watchLists[value]?.watchlist_name)}`}</p>
                                </div>
                            }
                        </div>
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

            <Modal show={show}
                onHide={handleClose}
                size='xl'
                centered
                className='left-box-modal'
                scrollable
            >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <div className='stock-list'>
                        <div className='d-flex align-items-center'>
                            <div className='image-stock'>
                                <img src={TataLogo} />
                            </div>
                            <div className='stock-text'>
                                <h3 className='stock-title'>TCS</h3>
                                <div className='d-flex align-items-center mt-1'>
                                    <h5 className='stock-subTitle'>LTP</h5>
                                    <h5 className='stock-price-green'>3903</h5>
                                    <h5 className='stock-price-green'>0.5%</h5>
                                    <img src={UpGreenArrow} className='arrow' />
                                </div>
                            </div>
                        </div>
                        <div className='button-stock-list'>
                            <button className='btn-green-buy'>Buy</button>
                            <button className='btn-red-sell'>Sell</button>
                        </div>
                    </div>
                    <div className='modal-pera'>Tata Consultancy Services Limited (TCS) is an India-based company engaged in providing information technology (IT) services, consulting, and business solutions. It operates through Banking; Capital Markets; Consumer Goods and Distribution; Communications, Media, and Information Services; Education; Energy, Resources, and Utilities; Healthcare; High Tech; Insurance; Life Sciences; Manufacturing; Public Services; Retail; Travel and Logistics. </div>
                    <div className='StockPriceNgraph'>
                        <div className='row'>
                            <div className='col-lg-6 column-pad'>
                                <div className='blackBorderBox'>
                                    <div className='row justify-content-center align-items-center'>
                                        <div className='col-lg-6' style={{ borderRight: '1px solid #E5E5E5' }}>
                                            <div className='d-flex justify-content-between mb-2'>
                                                <div className='stock-headtext'>BID</div>
                                                <div className='stock-headtext'>ORDERS</div>
                                                <div className='stock-headtext'>QTY.</div>
                                            </div>
                                            {dataForMapping.map((item, index) => (
                                                <div key={index} className='d-flex justify-content-between mb-1'>
                                                    <div className='blue-priceText'>{item.text1}</div>
                                                    <div className='blue-priceText'>{item.text2}</div>
                                                    <div className='blue-priceText'>{item.text3}</div>
                                                </div>
                                            ))}
                                            <div className='d-flex justify-content-between mt-3'>
                                                <div className='blue-priceText'>TOTAL</div>
                                                <div className='blue-priceText'>00,000</div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='d-flex justify-content-between mb-2'>
                                                <div className='stock-headtext'>BID</div>
                                                <div className='stock-headtext'>ORDERS</div>
                                                <div className='stock-headtext'>QTY.</div>
                                            </div>
                                            {dataForMapping2.map((item, index) => (
                                                <div key={index} className='d-flex justify-content-between mb-1'>
                                                    <div className='red-priceText'>{item.text1}</div>
                                                    <div className='red-priceText'>{item.text2}</div>
                                                    <div className='red-priceText'>{item.text3}</div>
                                                </div>
                                            ))}
                                            <div className='d-flex justify-content-between mt-3'>
                                                <div className='red-priceText'>TOTAL</div>
                                                <div className='red-priceText'>00,000</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 column-pad'>
                                <div className='blackBorderBox'>
                                    <h4 className='title'>Price Chart</h4>
                                    <DiscoverCorrelationGraph
                                        index={2}
                                        graphData={{
                                            labels: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20'],
                                            data: [800, 650, 300, 550, 852, 157, 900, 350, 1000, 432]
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-6 column-pad'>
                                <div className='blackBorderBox'>
                                    <div className='row'>
                                        {openStockData.map((data, index) => (
                                            <div key={index} className='col-lg-4'>
                                                <div className='black-box-boder'>
                                                    <div className='stock-details-heading'>{data.heading}</div>
                                                    <div className='stock-details-amount'>{data.amount}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 column-pad'>
                                <div className='blackBorderBox'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <h4 className='title'>Financials</h4>
                                        <div className='d-flex align-items-center'>
                                            <div className='blue-btn me-3' style={{ padding: '8px 33px', cursor: 'pointer' }}>Revenue</div>
                                            <div className='light-blue-btn me-3' style={{ padding: '8px 33px', cursor: 'pointer' }}>Profit</div>
                                            <div className='light-blue-btn' style={{ padding: '8px 33px', cursor: 'pointer' }}>Net Worth</div>
                                        </div>
                                    </div>
                                    <BarChart
                                        index={3}
                                        yAxisLabel={'Users'}
                                        xAxisLabel={'Date'}
                                        graphData={{
                                            labels: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20'],
                                            data: [800, 650, 300, 550, 852, 157, 900, 350, 1000, 432]
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='fundamental-container'>
                            <h2 className='fundamental-maintitle'>Fundamentals</h2>
                            <Slider {...settings}>
                                {fundamental.map((fundamental) => (
                                    <>
                                        <div className='fundamental'>
                                            <h4 className='fundamental-title'>{fundamental?.title}</h4>
                                            <h4 className='fundamental-value'>{fundamental?.value}</h4>
                                        </div>
                                    </>

                                ))}
                            </Slider>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LeftBox;
