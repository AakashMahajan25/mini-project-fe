import React, { useEffect, useState } from 'react';
import './LeftBox.scss';
import SearchIcon from '../../assets/images/search-icon.png';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import GreenArrow from '../../assets/images/green_up-arrow.png';
import RedArrow from '../../assets/images/red_down-arrow.png';
import StockMiniLogo from '../../assets/images/frruit-mini-logo.png';
import AddIcon from '../../assets/images/add-icon.png';
import EditStock from '../../assets/images/edit-stock-name.png';
import DeleteStock from '../../assets/images/delete-stock-img.png';
import AddstockBtn from '../../assets/images/add-stock-btn.png';
import CancelRed from '../../assets/images/cancel-round-red-icon.png';
import RightGreen from '../../assets/images/right-green-circle-icon.png';
import BlueTick from '../../assets/images/charm_tick.png';
import { addTickertoWatchList, addWatchList, deleteWatchList, editWatchList, getGraphDetail, getStockBySearch, getStockStatistics, getStocksCompanyDetail, getTickersById, getUserWatchLists } from '../../screens/dashboard/slice';
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
import { useLoading, ThreeDots } from '@agney/react-loading';
import moment from 'moment';

function LeftBox() {
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <ThreeDots width="50" color="blue" />,
    });
    const [value, setValue] = useState(0);
    const dispatch = useDispatch()
    const { watchLists, tickers, stockSearchData, stockSearchLoading, companyDetails, companyStatistics, graphDetails } = useSelector(state => state.dashboardSlice);
    const [anchorElNotification, setAnchorElNotification] = useState(null);
    const [show, setShow] = useState(false);
    const [searchParam, setSearchParam] = useState('')
    const [show2, setShow2] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [changedName, setChangedName] = useState('');
    const [isEdit, setIsEdit] = useState(false)
    const [addNew, setAddNew] = useState(false);
    const [addName, setAddName] = useState('');
    const [selectedId, setSelectedId] = useState('');
    const [tickerSymbol, setTickerSymbol] = useState('');
    const [tickerName, setTickerName] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const last7Days = new Date(currentDate);
    last7Days.setDate(currentDate.getDate() - 30);

    const handleClose = () => setShow(false);

    const handleClose2 = () => setShow2(false);

    const handleShow = (stocks) => {
        console.log('stocks===============', stocks)
        setShow(true);
        setTickerSymbol(stocks.ticker);
        setTickerName(stocks.ticker_name);
        const queryParams = `?symbol=${tickerSymbol}`
        dispatch(getStocksCompanyDetail(queryParams))
        dispatch(getStockStatistics(queryParams))
        dispatch(getGraphDetail({ symbol: tickerSymbol, multiplier: 1, timespan: 'day', from: moment(last7Days).format('YYYY-MM-DD'), to: moment(currentDate).format('YYYY-MM-DD'), limit: 120 }))
    }

    console.log('companyDetails', companyDetails)
    console.log('companyStatistics', companyStatistics)
    console.log('graphDetails', graphDetails)
    
    const handleShow2 = (stocks) => {
        setShow2(true);
        setTickerSymbol(stocks.symbol);
        setTickerName(stocks.name);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
        const id = Number(watchLists[newValue]?.watchlist_id)
        dispatch(getTickersById(id))

    };

    useEffect(() => {
        dispatch(getUserWatchLists())
        getWatchListData()
    }, [])

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchParam) {
                dispatch(getStockBySearch(searchParam));
            }
        }, 500);
        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchParam]);

    const getWatchListData = () => {
        dispatch(getUserWatchLists())
            .unwrap()
            .then(res => {
                const id = Number(res[0]?.watchlist_id)
                dispatch(getTickersById(id))
            })
    }

    const handleOpenNotificationMenu = (event) => {
        setAnchorElNotification(event.currentTarget);
    };


    const handleEdit = (index, name) => {
        setIsEdit(true)
        setChangedName(name)
        setEditIndex(index);
    }

    const handleDelete = (index, name) => {
        setEditIndex(index);
        setChangedName(name)
    }

    const handleCancel = () => {
        setIsEdit(false)
        setChangedName('')
        setEditIndex(null);
    }

    const handleOkClick = () => {
        if (isEdit) {
            dispatch(editWatchList({ watchlistId: watchLists[editIndex]?.watchlist_id, watchListName: changedName }))
                .then(res => {
                    setIsEdit(false)
                    setChangedName('')
                    dispatch(getUserWatchLists())
                    setEditIndex(null);
                })
                .catch(error => console.log('error', error))
        } else {
            dispatch(deleteWatchList(watchLists[editIndex]?.watchlist_id))
                .then(res => {
                    setEditIndex(null);
                    dispatch(getUserWatchLists())
                    setChangedName('')
                })
                .catch(error => console.log('error', error))
        }
    }

    const handleAddNew = () => {
        dispatch(addWatchList(addName))
            .then(res => {
                setChangedName('')
                setAddNew(false)
                setAddName('');
                dispatch(getUserWatchLists())
                setEditIndex(null);
            })
            .catch(error => console.log('error', error))
    }

    const handleSave = () => {
        const data = {
            watchlist_id: selectedId,
            ticker: tickerSymbol,
            ticker_name: tickerName
        }
        dispatch(addTickertoWatchList(data))
            .then(res => {
                setSelectedId('')
                handleClose2()
                dispatch(getUserWatchLists());

            })
    }

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
                    <div className="position-relative" style={{ marginBottom: 10,padding:'0px 16px' }} onClick={handleOpenNotificationMenu}>
                        <input type="text" className="form-control form-control-search" placeholder='Search Here' value={searchParam}
                            onChange={event => setSearchParam(event.target.value)} />
                        <div className="position-absolute" style={{ left: 27, top: '15%' }}>
                            <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                        </div>
                    </div>
                    {
                        (searchParam.length > 0 || stockSearchData.length > 0) &&
                        <div style={{ position: 'relative' }}>
                            <div className='search-box-menu' style={{ backgroundColor: stockSearchLoading ? '#F1F4FD' : '#fff' }}>
                                <>
                                    {
                                        stockSearchData.length > 0 ?
                                        stockSearchData?.map((stocks, index) => (
                                            <div className='d-flex justify-content-between align-items-center mb-2' style={{ backgroundColor: '#F1F4FD', borderRadius: '15px', padding: 10 }}>
                                                <div onClick={() => handleShow(stocks)} className='d-flex justify-content-start align-items-center' style={{ cursor: 'pointer' }}>
                                                    <div className='me-2 stock-name'>{trimText(stocks?.name, 15)}</div>
                                                    <div className='me-2 ltp-text'>{stocks?.symbol}</div>
                                                    {/* <div className='me-2 stock-price'>3903</div>
                                                <div className='me-1 stock-price'>0.5%</div> */}
                                                    {/* <img style={{ width: 24, objectFit: 'contain' }} src={RedArrow} alt="Red Arrow" /> */}
                                                    {/* <img style={{ width: 24, objectFit: 'contain' }} src={GreenArrow} alt="Green Arrow" /> */}
                                                </div>

                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <div>
                                                        <img className='me-2' style={{ width: 24, objectFit: 'contain', cursor: 'pointer' }} src={StockMiniLogo} alt="mini-logo" />
                                                    </div>
                                                    <div>
                                                        <img onClick={() => handleShow2(stocks)} style={{ width: 24, objectFit: 'contain', cursor: 'pointer' }} src={AddstockBtn} alt="mini-logo" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        :
                                        <div className='d-flex justify-content-center align-items-center' style={{ height: 300 }}>
                                            <div className='me-2 stock-name'>{`No data Found`}</div>
                                        </div>
                                    }
                                    {
                                        stockSearchLoading &&
                                        <div className='d-flex justify-content-center align-items-center' style={{ height: 300 }}>
                                            <section {...containerProps}>
                                                {indicatorEl} {/* renders only while loading */}
                                            </section>
                                        </div>
                                    }
                                </>

                            </div>
                        </div>
                    }
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
                    <div style={{padding:'0px 16px'}}>
                        {watchLists?.length > 0 ?
                            tickers?.rows?.length > 0 ?
                                tickers?.rows?.map((stock, index) => (
                                    <div key={index} onClick={() => handleShow(stock)} className='stock-price-list mb-2' style={{ cursor: 'pointer' }}>
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
                            :
                            <div className='d-flex align-items-center justify-content-center mt-5'>
                                <p className='watchlistText'>{` Add new watchlist `}</p>
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
            <Modal show={show2}
                onHide={handleClose2}
                size='sm'
                className='search-modal'
                scrollable
            >
                <Modal.Body>
                    <div>
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <div className='watchlist-text'>Watchlist</div>
                            <div onClick={() => setAddNew(true)} className='d-flex align-items-center' style={{ cursor: 'pointer' }}>
                                <img src={AddIcon} className='me-1' width={12} style={{ objectFit: 'contain' }} />
                                <div className='add-text'>add</div>
                            </div>
                        </div>
                        {
                            addNew === true &&
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='blue-box'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div>
                                            <input type="text" className="form-control form-control-search-custom" placeholder='Add Wacthlist' value={addName} onChange={event => setAddName(event.target.value)} />
                                            <div className='watchlist-text2'>{'0'}</div>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div onClick={() => { setAddNew(false); setAddName('') }}>
                                                <img src={CancelRed} width={24} style={{ objectFit: 'contain', cursor: 'pointer' }} className='me-1' />
                                            </div>
                                            <div onClick={handleAddNew}>
                                                <img src={RightGreen} width={24} style={{ objectFit: 'contain', cursor: 'pointer' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        {
                            watchLists.length > 0 && watchLists.map((item, index) => (
                                <div className='d-flex justify-content-between align-items-center' style={{ cursor: "pointer" }}>
                                    <div className='blue-box' onClick={() => { setSelectedId(item?.watchlist_id); handleSave() }} style={{ border: selectedId === item?.watchlist_id ? '1px solid #4563E4' : null }}>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div className='d-flex align-items-center'>
                                                {
                                                    selectedId === item?.watchlist_id &&
                                                    <img src={BlueTick} style={{ marginRight: 0, objectFit: 'contain', height: 18, width: 18 }} />
                                                }
                                                <div>
                                                    <input type="text" className="form-control form-control-search-custom" value={editIndex === index ? changedName : item?.watchlist_name} disabled={editIndex === index ? false : true} onChange={event => setChangedName(event.target.value)} />
                                                    <div className='watchlist-text2'>{item?.stockcount}</div>
                                                </div>
                                            </div>
                                            {
                                                editIndex === index ?
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <div onClick={handleCancel}>
                                                            <img src={CancelRed} width={24} style={{ objectFit: 'contain', cursor: 'pointer' }} className='me-1' />
                                                        </div>
                                                        <div onClick={handleOkClick}>
                                                            <img src={RightGreen} width={24} style={{ objectFit: 'contain', cursor: 'pointer' }} />
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <div onClick={() => handleEdit(index, item?.watchlist_name)}>
                                                            <img src={EditStock} width={24} style={{ objectFit: 'contain', cursor: 'pointer' }} className='me-1' />
                                                        </div>
                                                        <div onClick={() => handleDelete(index, item?.watchlist_name)}>
                                                            <img src={DeleteStock} width={24} style={{ objectFit: 'contain', cursor: 'pointer' }} />
                                                        </div>
                                                    </div>}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default LeftBox;
