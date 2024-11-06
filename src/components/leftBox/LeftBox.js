import React, { useEffect, useRef, useState } from 'react';
import './LeftBox.scss';
import SearchIcon from '../../assets/images/search-icon.png';
// import Tabs from '@mui/material/Tabs';
import {Tabs, Tab as MuiTab} from '@mui/material';
import Box from '@mui/material/Box';
import GreenArrow from '../../assets/images/green_up-arrow.png';
import RedArrow from '../../assets/images/red_down-arrow.png';
import StockMiniLogo from '../../assets/images/frruit-mini-logo.png';
import AddIcon from '../../assets/images/add-icon.png';
import DeleteRedIcon from '../../assets/images/delete-red-icon.png';
import EditStock from '../../assets/images/edit-stock-name.png';
import DeleteStock from '../../assets/images/delete-stock-img.png';
import AddstockBtn from '../../assets/images/add-stock-btn.png';
import CancelRed from '../../assets/images/cancel-round-red-icon.png';
import RightGreen from '../../assets/images/right-green-circle-icon.png';
import BlueTick from '../../assets/images/charm_tick.png';
import { addTickertoWatchList, addWatchList, deleteWatchList, editWatchList, getFinancialsPeers, getFinancialsResults, getFinancialsShareHolding, getGraphDetail, getStockBySearch, getStockOverview, getStockRevenue, getStockStatistics, getStocksCompanyDetail, getTickersById, getUserWatchLists, removeTickerFromWatchList, resetStockDetail } from '../../screens/dashboard/slice';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeFirstLetter, formatPrice, trimText } from '../../utils/utils';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import TataLogo from '../../assets/images/Tata_Consultancy_Services_Logo.png'
import UpGreenArrow from '../../assets/images/up-arrow-outline.png'
import Slider from 'react-slick'
// import BarChart from '../barChart/BarChart'
import DiscoverCorrelationGraph from '../graph/DiscoverCorrelationGraph'
import { useLoading, ThreeDots } from '@agney/react-loading';
import moment from 'moment';
import { toast } from 'react-toastify';
import ReactGA from 'react-ga4';
import { Tab } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import RevenuePage from './RevenuePage';
import OverviewPage from './OverviewPage';
import FinancialPage from './FinancialPage';
import EventsPage from './EventsPage';
import Loader from '../loader/Loader';

function LeftBox() {
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <ThreeDots width="50" color="blue" />,
    });
    const [value, setValue] = useState(0);
    const dispatch = useDispatch()
    const location = useLocation()
    const { isLoading, watchlistLoading, watchLists, tickers, stockSearchData, stockSearchLoading, companyDetails, companyStatistics, graphDetails, companyOverview, financialPeer, financialsShareHoldings, companyRevenues } = useSelector(state => state.dashboardSlice);
    const country = localStorage.getItem('marketType')
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
    const [cocode, setCocode] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const last7Days = new Date(currentDate);
    last7Days.setDate(currentDate.getDate() - 30);
    const handleClose = () => setShow(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const searchBoxRef = useRef(null);

    useEffect(() => {
        // Function to handle clicks outside the search box
        function handleClickOutside(event) {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                // Clicked outside the search box, hide the search results
                setSearchParam('');
                setShowSearchResults(false);
            }
        }

        // Attach the event listener when the search results are shown
        if (showSearchResults) {
            document.addEventListener('click', handleClickOutside);
        } else {
            // Remove the event listener when the search results are hidden
            document.removeEventListener('click', handleClickOutside);
        }

        // Cleanup function to remove event listener on component unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showSearchResults]);


    const handleClose2 = () => {
        setShow2(false);
        setSelectedId('')
    }

    const handleShow = (stocks) => {
        setTickerSymbol(stocks.ticker);
        setTickerName(stocks.ticker_name);
        setCocode(stocks.cocode);
        const queryParams = `?cocode=${stocks.cocode}`;
        dispatch(resetStockDetail());
        dispatch(getStockOverview(queryParams)).unwrap().then(res => {
            if(res?.companyDetail){
                setShow(true);
            }else{
                toast.error("Error in fetching Details");
            }
        }).catch(error => {
            toast.error(error?.message)
        });
        dispatch(getStockRevenue(queryParams))
        dispatch(getFinancialsResults(queryParams))
        // const queryParams = `?symbol=${tickerSymbol}`
        // dispatch(getStocksCompanyDetail(queryParams))
        // dispatch(getStockStatistics(queryParams))
        // dispatch(getGraphDetail({ symbol: tickerSymbol, multiplier: 1, timespan: 'day', from: moment(last7Days).format('YYYY-MM-DD'), to: moment(currentDate).format('YYYY-MM-DD'), limit: 120 }))
    }
    const handleShow2 = (stocks) => {
        setShow2(true);
        setTickerSymbol(stocks.nsesymbol);
        setTickerName(stocks.companyname);
        setCocode(stocks.co_code);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
        const id = Number(watchLists[newValue]?.watchlist_id)
        dispatch(getTickersById(id))

    };

    useEffect(() => {
        // dispatch(getUserWatchLists())
        getWatchListData()
    }, [])

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchParam) {
                dispatch(getStockBySearch(searchParam));
                ReactGA.event({
                    category: 'Dashboard',
                    action: 'stock_search',
                    label: 'User Stock Search'
                });
            }
        }, 500);
        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchParam]);

    const getWatchListData = (watchlist_id = null) => {
        dispatch(getUserWatchLists())
            .unwrap()
            .then(res => {
                const id = Number(res[0]?.watchlist_id)
                if(id)
                    dispatch(getTickersById((watchlist_id ? watchlist_id : id)))
            })
    }

    const handleEdit = (event, index, name) => {
        event.stopPropagation();
        setIsEdit(true)
        setChangedName(name)
        setEditIndex(index);
    }

    const handleDelete = (event, index, name) => {
        event.stopPropagation();
        setEditIndex(index);
        setChangedName(name)
    }

    const handleCancel = (event) => {
        event.stopPropagation();
        setIsEdit(false)
        setChangedName('')
        setEditIndex(null);
    }

    const handleOkClick = (event) => {
        event.stopPropagation();
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

    const removeTickerFromWatchListFunc = (data) => {
        dispatch(removeTickerFromWatchList(data?.id)).then(res => {
            toast.success(res?.message);
            dispatch(getTickersById(data?.watchlist_id));
            dispatch(getUserWatchLists());
        }).catch(error => {
            toast.error(error.message || 'Error in adding in watchlist');
        });
    }

    const handleAddNew = () => {
        dispatch(addWatchList(addName))
            .then(res => {
                setChangedName('')
                setAddNew(false)
                setAddName('');
                ReactGA.event({
                    category: 'Dashboard',
                    action: 'watchlist_created',
                    label: 'New Watchlist Created'
                });
                dispatch(getUserWatchLists())
                setEditIndex(null);
            })
            .catch(error => console.log('error', error))
    }

    const handleSave = (id, index) => {
        setSelectedId(id)
        if (id) {
            const data = {
                watchlist_id: id,
                ticker: tickerSymbol,
                ticker_name: tickerName,
                cocode
            }
            dispatch(addTickertoWatchList(data)).unwrap()
                .then(res => {
                    ReactGA.event({
                        category: 'Watchlist',
                        action: 'stock_added_to_watchlist',
                        label: 'Stock Added to Watchlist'
                    });
                    toast.success(res?.message)
                    setSelectedId('')
                    handleClose2()
                    dispatch(getUserWatchLists());
                    setValue(index);
                    getWatchListData(id);
                }).catch(error => 
                    {
                        toast.error(error.message || 'Error in adding in watchlist');
                    }
            
            
            )
        }
    }

    const getFinancialsPeersFunc = () => {
        const queryParams = `?cocode=${cocode}`
        dispatch(getFinancialsPeers(queryParams)).unwrap().then(res => {

        }).catch(error => {
            toast.error(error.message || 'Error in fetching peers');
        });
    }

    const getFinancialsShareHoldingFunc = () => {
        const queryParams = `?cocode=${cocode}`
        dispatch(getFinancialsShareHolding(queryParams)).unwrap().then(res => {

        }).catch(error => {
            toast.error(error.message || 'Error in fetching shareholding');
        });
    }

    const getFinancialsResultsFunc = () => {
        const queryParams = `?cocode=${cocode}`
        dispatch(getFinancialsResults(queryParams)).unwrap().then(res => {

        }).catch(error => {
            toast.error(error.message || 'Error in fetching shareholding');
        })
    }

    const getStockRevenueFunc = () => {
        const queryParams = `?cocode=${cocode}`
        dispatch(getStockRevenue(queryParams)).unwrap().then(res => {

        }).catch(error => {
            toast.error(error.message || 'Error in fetching shareholding');
        });
    }

    const dataForMapping = [
        { text1: 'Px/Chg 1D (USD)', text2: '1379.76/-5.41%', text3: '0.00' },
        { text1: '52 Wk H (01/21/21)', text2: '2020', text3: '0.00' },
        { text1: '52 Wk L (03/18/20)', text2: '49.9M/47.6M', text3: '0.00' },
        { text1: 'YTD Change/%', text2: '422.22', text3: '0.00' },
        { text1: 'mkt Cap (USD)', text2: '-195.46/-17.64%', text3: '0.00' },
        { text1: 'Shrs out/float', text2: '68,808.3M', text3: '0.00' },
    ];
    const dataForMapping2 = [
        { text1: 'Date', text2: '05/05/21', text3: '0.00' },
        { text1: 'P/E', text2: 'N.A.', text3: '0.00' },
        { text1: 'estimate P/E', text2: '711.58', text3: '0.00' },
        { text1: 'T12M EPS (USD)', text2: '-0.07', text3: '0.00' },
        { text1: 'Est EPS', text2: '1.94', text3: '0.00' },
        { text1: 'Est PEG', text2: '5.14', text3: '0.00' },

    ];
    const dataForMapping3 = [
        { text1: 'Ind Gross Yield', text2: '.', text3: '0.00' },
        { text1: 'Cash Dividened Discontinued', text2: 'N.A.', text3: '0.00' },
    ];
    const dataForMapping4 = [
        { text1: 'www.xyz.com', text2: '.', text3: '' },
        { text1: 'Buenos Aires, AR', text2: '', text3: '' },
        { text1: 'Empls', text2: '5,201 12/31/21', text3: '' },
    ];
    const dataForMapping5 = [
        { text1: 'Jay Bhatt', text2: 'CEO/Founder', text3: '' },
        { text1: 'Yaksh Rathod', text2: 'CFO', text3: '' },
        { text1: 'Hitesh Sutar', text2: 'Exec VP', text3: '' },
    ];
    const dataForMapping6 = [
        { text1: '12M Tot Ret', text2: '119.75%', text3: '' },
        { text1: 'Beta vs SPX', text2: '1.20', text3: '' },
        { text1: 'Hitesh Sutar', text2: 'Exec VP', text3: '' },
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
    const navigate = useNavigate();
    const getFrruitClick = (stock) => {
        navigate("/frruit-gpt", {
            state: { question: 'What is the news on ' + stock + '?', fundamental:'news' },
        });
    };

    const [activeTab, setActiveTab] = useState("OverView");

    const handleTabChange = key => {
        setActiveTab(key);
    };

    // const settings1 = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    // };

    return (
        <>
            <div className='left-box'>
                {
                    (location.pathname !== '/discover-correlation' && (isLoading || watchlistLoading))  && <Loader />
                }
                <div className='box' style={{ height: window.innerHeight - 68 }}>
                    <div className="position-relative" style={{ marginBottom: 10, padding: '0px 16px' }}>
                        <input type="text" className="form-control form-control-search" placeholder='Search Here' value={searchParam}
                            onChange={event => setSearchParam(event.target.value)} ref={searchBoxRef}
                            onClick={() => setShowSearchResults(true)} />
                        <div className="position-absolute" style={{ left: 31, top: '15%' }}>
                            <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                        </div>
                    </div>
                    {
                        // (searchParam?.length > 0 && stockSearchData?.length > 0) &&
                        (showSearchResults && searchParam.length > 0) &&
                        <div style={{ position: 'relative', margin: '0px 16px' }}>
                            <div className='search-box-menu' style={{ backgroundColor: stockSearchLoading ? '#F1F4FD' : '#fff' }}>
                                <>
                                    {
                                        stockSearchData.length > 0 &&
                                        stockSearchData?.map((stocks, index) => (
                                            <div className='d-flex justify-content-between align-items-center mb-2' style={{ backgroundColor: '#F1F4FD', borderRadius: '15px', padding: 10 }}>
                                                <div className='d-flex justify-content-start align-items-center'>
                                                    <div className='me-2 stock-name'>{trimText(stocks?.companyname, 15)}</div>
                                                    <div className='me-2 ltp-text'>{stocks?.nsesymbol}</div>
                                                    {/* <div className='me-2 stock-price'>3903</div>
                                                <div className='me-1 stock-price'>0.5%</div> */}
                                                    {/* <img style={{ width: 24, objectFit: 'contain' }} src={RedArrow} alt="Red Arrow" /> */}
                                                    {/* <img style={{ width: 24, objectFit: 'contain' }} src={GreenArrow} alt="Green Arrow" /> */}
                                                </div>

                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <div>
                                                        <img className='me-2' onClick={() => getFrruitClick(stocks?.companyname)} style={{ width: 24, objectFit: 'contain', cursor: 'pointer' }} src={StockMiniLogo} alt="mini-logo" />
                                                    </div>
                                                    <div>
                                                        <img onClick={() => handleShow2(stocks)} style={{ width: 24, objectFit: 'contain', cursor: 'pointer' }} src={AddstockBtn} alt="mini-logo" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        // :
                                        // <div className='d-flex justify-content-center align-items-center' style={{ height: 300 }}>
                                        //     <div className='me-2 stock-name'>{`No data Found`}</div>
                                        // </div>
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
                        // <div style={{ position: 'relative',margin:'0px 16px' }}>
                        //     <div className='search-box-menu-nodata d-flex justify-content-center align-items-center' style={{ backgroundColor: stockSearchLoading ? '#F1F4FD' : '#fff' }}>
                        //     <div className='me-2 stock-name' style={{fontSize:'700'}}>{`No data Found`}</div>
                        //     </div>
                        // </div>
                    }
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='watchlistText'>Watchlist</div>
                        <div className='d-flex align-items-center'>
                            <div className='watchlistText' onClick={handleShow2} style={{ cursor: 'pointer', color: '#4563E4', paddingRight: 10 }}>View All</div>
                            <div className='watchlistTextPlus' onClick={handleShow2} style={{ cursor: 'pointer', color: '#4563E4' }}>+ Watchlist</div>
                        </div>
                    </div>
                    <Box marginBottom={'20px'} sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }} style={{ paddingLeft: watchLists?.length > 3 ? 0 : 16 }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            {
                                watchLists?.map((item, index) => (
                                    <MuiTab key={index} label={item?.watchlist_name} className='tab-css' />
                                ))
                            }
                        </Tabs>
                    </Box>

                    <div style={{ padding: '0px 16px' }}>
                        {watchLists?.length > 0 ?
                            tickers?.rows?.length > 0 ?
                                tickers?.rows?.map((stock, index) => (
                                    // <div key={index} onClick={() => handleShow(stock)} className='stock-price-list mb-2' style={{ cursor: 'pointer' }}>
                                    //     <div className='d-flex justify-content-between align-items-center'>
                                    //         {/* <p className='stock-name'>{trimText(stock?.ticker_name, 12)}</p> */}
                                    //         <p className='stock-name me-2' >{stock?.ticker}</p>
                                    //         <div>
                                    //             <div className='d-flex justify-content-end align-items-center'>
                                    //                 <p className='stock-price me-2' style={{ color: stock?.ticker_change_percent.includes('-') ? '#EA5455' : '#28C76F' }}>{formatPrice(stock?.ticker_price, country)}</p>
                                    //                 <p className='stock-price me-2' style={{ color: stock?.ticker_change_percent.includes('-') ? '#EA5455' : '#28C76F' }}>{`${stock?.ticker_change_percent.includes('-') ? stock?.ticker_change : '+' + stock?.ticker_change}`}</p>
                                    //                 <p className='stock-price me-2' style={{ color: stock?.ticker_change_percent.includes('-') ? '#EA5455' : '#28C76F' }}>{parseFloat(stock?.ticker_change_percent).toFixed(2)}</p>
                                    //                 {stock?.ticker_change_percent.includes('-') ? (
                                    //                     <img className='watchlist-image' src={RedArrow} alt="Red Arrow" />
                                    //                 ) : (
                                    //                     <img className='watchlist-image' src={GreenArrow} alt="Green Arrow" />
                                    //                 )}
                                    //                 <img className='watchlist-image' onClick={() => getFrruitClick(stock?.ticker)} style={{ cursor: 'pointer' }} src={StockMiniLogo} alt="mini-logo" />
                                    //             </div>
                                    //         </div>
                                    //     </div>
                                    // </div>
                                    <div key={index} className='stock-price-list mb-2' style={{ position: 'relative' }}>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <p className='stock-name me-2'>{stock?.ticker}</p>
                                            {/* <div>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <p className='stock-price me-2' style={{ color: stock?.ticker_change_percent.includes('-') ? '#EA5455' : '#28C76F' }}>{formatPrice(stock?.ticker_price, country)}</p>
                                                    <p className='stock-price me-2' style={{ color: stock?.ticker_change_percent.includes('-') ? '#EA5455' : '#28C76F' }}>{`${stock?.ticker_change_percent.includes('-') ? stock?.ticker_change : '+' + stock?.ticker_change}`}</p>
                                                    <p className='stock-price me-2' style={{ color: stock?.ticker_change_percent.includes('-') ? '#EA5455' : '#28C76F' }}>{parseFloat(stock?.ticker_change_percent).toFixed(2)}</p>
                                                    {stock?.ticker_change_percent.includes('-') ? (
                                                        <img className='watchlist-image' src={RedArrow} alt="Red Arrow" />
                                                    ) : (
                                                        <img className='watchlist-image' src={GreenArrow} alt="Green Arrow" />
                                                    )}
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="blurred-layer"></div>
                                        <div className="button-icon-container">
                                            <div className='d-flex justify-content-end align-items-center'>
                                                <button className="blue-btn" style={{ padding: '3px 15px', fontSize: 12 }} onClick={() => handleShow(stock)}>Stock Details</button>
                                                <img className='watchlist-image ms-2' onClick={()=>removeTickerFromWatchListFunc(stock)} style={{ cursor: 'pointer' }} src={DeleteRedIcon} alt="mini-logo" />
                                                <img className='watchlist-image ms-2 me-2' onClick={() => getFrruitClick(stock?.ticker)} style={{ cursor: 'pointer' }} src={StockMiniLogo} alt="mini-logo" />
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
                            {/* <div className='image-stock'>
                                <img src={TataLogo} />
                            </div> */}
                            <div className='stock-text'>
                                <h3 className='stock-title'>{companyOverview?.companyDetail?.LNAME}</h3>
                                <div className='d-flex align-items-center mt-1'>
                                    <h5 className='stock-subTitle'>{companyOverview?.companyDetail?.nsesymbol}</h5>
                                    {/* <h5 className='stock-price-green'>3903</h5> */}
                                    {/* <h5 className='stock-price-green'>0.5%</h5> */}
                                    {/* <img src={UpGreenArrow} className='arrow' /> */}
                                </div>
                            </div>
                        </div>
                        {/* <div className='button-stock-list'>
                            <button className='btn-green-buy'>Buy</button>
                            <button className='btn-red-sell'>Sell</button>
                        </div> */}
                    </div>
                    {/* <div class="container">
                        <div class="row">
                            <div class="col-2" style={{ marginLeft: -27 }}>
                                <div class="textPart d-flex m-3">
                                    <div class="text-part1 d-flex">
                                        <span style={{ color: "#4563E4", marginRight: 17 }} > FIGI</span> 
                                        <p style={{ color: "#6F7387" }}> BBG000GQPB11</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="textPart d-flex m-3">
                                    <div class="text-part2 d-flex">
                                        <span className='mr-2' style={{ color: "#4563E4", marginRight: 17 }}>Classification</span>  <p style={{ color: "#6F7387" }}>Online Marketplace</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}


                        <div className='tabspage'>
                            <div className='tab-box'>
                                <Tab.Container defaultActiveKey="OverView" onSelect={handleTabChange}>
                                    <div className={window.innerWidth < 900 ? `` : 'd-flex justify-content-between align-items-center'}>
                                        <div>
                                            <Nav variant="underline">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="OverView" className={window.innerWidth < 700 ? `m-0` : ''}>Overview</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Revenue" className={window.innerWidth < 700 ? `m-0` : ''}>Revenue</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Financials" className={window.innerWidth < 700 ? `m-0` : ''}>Financials</Nav.Link>
                                                </Nav.Item>
                                                {/* <Nav.Item>
                                                    <Nav.Link eventKey="Events" className={window.innerWidth < 700 ? `m-0` : ''}>Events</Nav.Link>
                                                </Nav.Item> */}
                                            </Nav>
                                        </div>
                                    </div>
                                    <div>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="OverView">
                                                <OverviewPage companyOverview={companyOverview}/>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="Revenue">
                                                <RevenuePage getStockRevenue={getStockRevenueFunc} companyRevenues={companyRevenues}/>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="Financials">
                                                <FinancialPage financialPeer={financialPeer} getFinancialsPeers={getFinancialsPeersFunc} getFinancialsShareHolding={getFinancialsShareHoldingFunc} financialsShareHoldings={financialsShareHoldings} getFinancialsResults={getFinancialsResultsFunc} />

                                            </Tab.Pane>
                                            {/* <Tab.Pane eventKey="Events">
                                                <EventsPage />
                                            </Tab.Pane> */}
                                        </Tab.Content>
                                    </div>
                                </Tab.Container>
                            </div>
                        </div>

                    {/* <div className='modal-pera'>
                        Tata Consultancy Services Limited (TCS) is an India-based company engaged in providing information technology (IT) services, consulting, and business solutions. It operates through Banking; Capital Markets; Consumer Goods and Distribution; Communications, Media, and Information Services; Education; Energy, Resources, and Utilities; Healthcare; High Tech; Insurance; Life Sciences; Manufacturing; Public Services; Retail; Travel and Logistics.
                    </div>
                    <div className='StockPriceNgraph'>

                        <div className='row'>
                            <div className='col-lg-6 column-pad'>
                                <div className='blackBorderBox'>
                                    <h4 className='title'>Price Chart</h4>
                                    <div id='chartSmall'>
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

                             <div className='col-lg-6  column-pad'>
                                <div className='blackBorderBox' style={{ height: 309 }}>
                                    <div className='justify-content-between'>
                                        <div className=''>
                                            {dataForMapping.map((item, index) => (
                                                <div key={index} className='d-flex justify-content-between '>
                                                    <div className='blue-priceText' style={{ margin: 3 }}>{item.text1}</div>
                                                    <div className='blue-priceText' style={{ color: "#6F7387" }}>{item.text2}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
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
                        <div class='d-flex' >
                            <div className='col-lg-4  column-pad'>
                                <div className='blackBorderBox'>
                                    <div className='justify-content-between'>
                                        <div className=''>
                                            <p style={{ fontSize: 15, fontWeight: "bold" }}>Estimates | EE</p>
                                            {dataForMapping2.map((item, index) => (
                                                <div key={index} className='d-flex justify-content-between '>
                                                    <div className='blue-priceText' style={{ margin: 3 }}>{item.text1}</div>
                                                    <div className='blue-priceText' style={{ color: "#6F7387" }}>{item.text2}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4  column-pad'>
                                <div className='blackBorderBox'>
                                    <div className='justify-content-between'>
                                        <div className=''>
                                            <p style={{ fontSize: 15, fontWeight: "bold" }}>Dividened | DVD</p>

                                            {dataForMapping3.map((item, index) => (
                                                <div key={index} className='d-flex justify-content-between '>
                                                    <div className='blue-priceText' style={{ margin: 3 }}>{item.text1}</div>
                                                    <div className='blue-priceText' style={{ color: "#6F7387" }}>{item.text2}</div>
                                                </div>
                                            ))}
                                            <p style={{ fontSize: 15, fontWeight: "bold" }}>Corporate Info</p>
                                            {dataForMapping4.map((item, index) => (
                                                <div key={index} className='d-flex justify-content-between '>
                                                    <div className='blue-priceText' style={{ margin: 3 }}>{item.text1}</div>
                                                    <div className='blue-priceText' style={{ color: "#6F7387" }}>{item.text2}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4  column-pad'>
                                <div className='blackBorderBox'>
                                    <div className='justify-content-between'>
                                        <div className=''>
                                            <p style={{ fontSize: 15, fontWeight: "bold" }}>Management | MGMT</p>
                                            {dataForMapping5.map((item, index) => (
                                                <div key={index} className='d-flex justify-content-between '>
                                                    <div className='blue-priceText'>{item.text1}</div>
                                                    <div className='blue-priceText' style={{ color: "#6F7387" }}>{item.text2}</div>
                                                </div>
                                            ))}
                                            <hr />
                                            {dataForMapping6.map((item, index) => (
                                                <div key={index} className='d-flex justify-content-between '>
                                                    <div className='blue-priceText'>{item.text1}</div>
                                                    <div className='blue-priceText' style={{ color: "#6F7387" }}>{item.text2}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                     </div> */}
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
                                            <input type="text" className="form-control form-control-search-custom" placeholder='Add Watchlist' value={addName} onChange={event => setAddName(event.target.value)} />
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
                                    <div className='blue-box' onClick={tickerName ? () => handleSave(item?.watchlist_id, index) : ()  => handleChange(null, index)} style={{ border: selectedId === item?.watchlist_id ? '1px solid #4563E4' : null }}>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div className='d-flex align-items-center'>
                                                {
                                                    selectedId === item?.watchlist_id &&
                                                    <img src={BlueTick} style={{ marginRight: 0, objectFit: 'contain', height: 18, width: 18 }} />
                                                }
                                                <div>
                                                    <input type="text" className="form-control form-control-search-custom" value={editIndex === index ? changedName : item?.watchlist_name} disabled={editIndex === index ? false : true} onChange={event => setChangedName(event.target.value)} onClick={event => event.stopPropagation()} />
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
                                                        <div onClick={(event) => handleEdit(event, index, item?.watchlist_name)}>
                                                            <img src={EditStock} width={24} style={{ objectFit: 'contain', cursor: 'pointer' }} className='me-1' />
                                                        </div>
                                                        <div onClick={(event) => handleDelete(event, index, item?.watchlist_name)}>
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
