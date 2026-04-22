import React, { useEffect, useState } from 'react';
import './NewsViewAll.scss';
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import NewsImg from '../../assets/images/newsImg.png';
import Time from '../../assets/images/time-clock.png';
import NewsImg2 from '../../assets/images/news-img-2.png';
import RightArrow from '../../assets/images/right-arrow.png';
import { formatTimeAgo, replaceQuestionMarkWithMetrix, trimText } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import CloseImg from '../../assets/images/close_icon.png';
import BullishImg from '../../assets/images/bullish_img.png';
import BearishImg from '../../assets/images/bearish_img.png';
import GreenArrow from '../../assets/images/green_up-arrow.png';
import SortImg from '../../assets/images/sort-img.png';
import FilterImg from '../../assets/images/filter-img.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNews } from '../../screens/dashboard/slice';

function NewsViewAll({ backBtnClick,sentiment,sortOrder,filtersApplied,onSentimentChange,onSortOrderChange,onResetFilters }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [groupedData, setGroupedData] = useState([])
    const [selected, setSelected] = useState(null)
    const [show, setShow] = useState(false);
    // const [sentiment, setSentiment] = useState('');
    const { cmotsNews } = useSelector(state => state.dashboardSlice);
    // const [sortOrder, setSortOrder] = useState('desc');
    const [isActive, setIsActive] = useState(false);
    const [isSortActive, setIsSortActive] = useState(false);
    const [sentimentLabel, setSentimentLabel] = useState('');
    const [sortLabel, setSortLabel] = useState('');

    const options = [
        { value: '', label: 'All' },
        { value: 'veryBullish', label: 'Very Bullish' },
        { value: 'bullish', label: 'Bullish' },
        { value: 'neutral', label: 'Neutral' },
        { value: 'bearish', label: 'Bearish' },
        { value: 'veryBearish', label: 'Very Bearish' },
    ];

    const sortOptions = [
        { value: 'asc', label: 'Sort in Ascending' },
        { value: '', label: 'Sort in Descending' },
    ];

    useEffect(() => {
        const groupedNews = cmotsNews?.rows?.reduce((acc, news) => {
            if (!acc[news.type]) {
                acc[news.type] = [];
            }
            acc[news.type].push(news);
            return acc;
        }, {});
        
        const groupedNewsArray = Object.entries(groupedNews)?.map(([type, newsItems]) => ({
            type,
            newsItems,
            section_name: newsItems[0]?.section_name
        }));
        
        setGroupedData(groupedNewsArray);
        
    }, [cmotsNews])    
    
    const handleShow = (data) => {
        setShow(true)
        setSelected(data)
        setIsActive(false);
        setIsSortActive(false);
    };

    const handleClose = () => {
        setShow(false)
        setSelected(null)
    };

    const routeNews = (src) => {
        navigate("/news", {
            state: { src },
        });
    };

    const momentTime = (time) => {
        return moment(time, 'HH:mm').format('h:mm A')
    }

    const momentDate = (time) => {
        return moment(time).format('Do MMM, YYYY');
    }

    useEffect(() => {
        const queryParams = `?sentiment=${sentiment}&sortOrder=${sortOrder}`;
        dispatch(fetchAllNews(queryParams));
    }, [sentiment, sortOrder, dispatch]);

    const handleResetClick = () => {
        onResetFilters();
        setSentimentLabel('');
        setSortLabel('');
        setIsActive(false)
        setIsSortActive(false)
    }

    const handleSentimentChange = (value, label) => {
        onSentimentChange(value);
        setSentimentLabel(label);
    };

    const handleSortChange = (value, label) => {
        onSortOrderChange(value);
        setSortLabel(label);
    };

    const removeFilter = () => {
        onSentimentChange('');
        setSentimentLabel('');
    };

    const removeSortFilter = () => {
        onSortOrderChange('');
        setSortLabel('');
    };
    return (
        <>
            <div className='news-view-all'>
                <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: 20,position:'relative' }}>
                    <button onClick={backBtnClick} className='light-blue-btn'>
                        <img src={BackBtnArrow} style={{ width: 6, height: 11, objectFit: 'contain', marginRight: 4, marginTop: -2 }} />
                        Back
                    </button>
                    <div className='d-flex align-items-center justify-content-center'>
                        <button className='light-blue-btn ms-3' onClick={handleResetClick}>Reset</button>
                        {sortLabel && (
                            <div className='d-flex align-items-center hide-in-mobile news-button-css ms-3'>
                                <button className='neutral-btn'>
                                    {sortLabel}
                                    <img src={CloseImg} className='close-img' onClick={removeSortFilter} />
                                </button>
                            </div>
                        )}
                        {sentimentLabel && (
                            <div className='d-flex align-items-center hide-in-mobile news-button-css ms-3'>
                                <button className={ sentimentLabel === 'Bullish' ? 'bullish-btn' : sentimentLabel === 'Very Bullish' ? 'very-bullish-btn' : sentimentLabel === 'Very Bearish' ? 'very-bearish-btn' : sentimentLabel === 'Bearish' ? 'bearish-btn' :'neutral-btn'}>{sentimentLabel}
                                { (sentimentLabel === 'Very Bullish'|| sentimentLabel === 'Bullish') && <img src={BullishImg} className='button-img-size' />}
                                { (sentimentLabel === 'Very Bearish' || sentimentLabel === 'Bearish') &&<img src={BearishImg} className='button-img-size' />}
                                <img src={CloseImg} className='close-img' onClick={removeFilter} />
                                </button>
                            </div>
                        )}
                        <button className='light-blue-btn ms-3' onClick={(e) => { setIsActive(false); setIsSortActive(!isSortActive) }}>
                            Sort
                            <img src={SortImg} style={{ width: 16, height: 13, objectFit: 'contain', marginLeft: 5, marginTop: -2 }} />
                        </button>
                        <button className='light-blue-btn ms-3' onClick={(e) => { setIsActive(!isActive); setIsSortActive(false) }}>
                            Filter
                            <img src={FilterImg} style={{ width: 16, height: 14, objectFit: 'contain', marginLeft: 5, marginTop: -2 }} />
                        </button>
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-end hide-in-desktop'>
                    {sortLabel && (
                        <div className='d-flex align-items-center news-button-css'>
                            <button className='neutral-btn'>
                                {sortLabel}
                                <img src={CloseImg} className='close-img' onClick={removeSortFilter} />
                            </button>
                        </div>
                    )}
                    {sentimentLabel && (
                        <div className='d-flex align-items-center news-button-css ms-3'>
                            <button className={ sentimentLabel === 'Bullish' ? 'bullish-btn' : sentimentLabel === 'Very Bullish' ? 'very-bullish-btn' : sentimentLabel === 'Very Bearish' ? 'very-bearish-btn' : sentimentLabel === 'Bearish' ? 'bearish-btn' : 'neutral-btn'}>
                                {sentimentLabel}
                                {(sentimentLabel === 'Very Bullish' || sentimentLabel === 'Bullish') && <img src={BullishImg} className='button-img-size' />}
                                {(sentimentLabel === 'Very Bearish' || sentimentLabel === 'Bearish') && <img src={BearishImg} className='button-img-size' />}
                                <img src={CloseImg} className='close-img' onClick={removeFilter} />
                            </button>
                        </div>
                    )}
                </div>
                <div className='dashboard-custom-dropdown'>
                    <div className="dropdown">
                        <div className="dropdown-content" style={{ display: isActive ? "block" : "none" }}>
                            {options?.map((option, index) => (
                                <div
                                    key={index}
                                    className="item"
                                    onClick={() => {
                                        setIsActive(!isActive);
                                        handleSentimentChange(option.value, option.label);
                                    }}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='dashboard-custom-dropdown'>
                    <div className="dropdown">
                        <div className="dropdown-content" style={{ display: isSortActive ? "block" : "none" }}>
                            {sortOptions?.map((option, index) => (
                                <div
                                    key={index}
                                    className="item"
                                    onClick={() => {
                                        setIsSortActive(!isSortActive);
                                        handleSortChange(option.value,option.label);
                                    }}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            <div>
                {groupedData?.map((item, index) => (
                    <>
                        <div className='headline-text mb-3 mt-3'>{item?.section_name}</div>
                        <div className='row m-0'>
                            {
                                item?.newsItems?.map((el, i) => (
                                    <div key={i} className='col-lg-4 column-pad'>
                                        <a onClick={() => handleShow(el)} target='_blank' style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                            <div className='headline-news-card'>
                                                <div className='d-flex align-items-center m-0'>
                                                    {/* <div className=''>
                                                <img src={item.image} className='mx-2' width={60} height={60} style={{ objectFit: 'fill', borderRadius: 10 }} />
                                            </div> */}
                                                        <div className=''>
                                                            <div className='text-area p-3'>
                                                                <div className='news-title'>{trimText(el?.heading, 120)}</div>
                                                                <div className='news-info'>{el.source}</div>
                                                                {/* <div className='d-flex align-items-center news-button-css'>
                                                                    <button className='bearish-btn mb-1'> Bearish <img src={BearishImg} className='button-img-size' /></button>
                                                                </div> */}
                                                                
                                                                {/* <div className='d-flex align-items-center news-button-css'>
                                                                    <button className='neutral-btn mb-1'> Neutral </button>
                                                                </div> */}
                                                                <div className='flex'>
                                                                    {/* <img src={Time} width={16} style={{ objectFit: 'contain', marginRight: 5 }} /> */}
                                                                    <div className='time-info mt-2'>{momentDate(el?.date)}<span className='ms-2'>{momentTime(el?.time)}</span></div>
                                                                </div>
                                                                <div className='d-flex align-items-center news-button-css mt-2'>
                                                                    <button className={ el?.sentiment === 'Bullish' ? 'bullish-btn' : el?.sentiment === 'Very bullish' ? 'very-bullish-btn' : el?.sentiment === 'Very bearish' ? 'very-bearish-btn' : el?.sentiment === 'Bearish' ? 'bearish-btn' :'neutral-btn'}>{el?.sentiment}
                                                                    { (el?.sentiment === 'Very bullish'|| el?.sentiment === 'Bullish') && <img src={BullishImg} className='button-img-size' />}
                                                                    { (el?.sentiment === 'Very bearish' || el?.sentiment === 'Bearish') &&<img src={BearishImg} className='button-img-size' />}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>

                                    ))
                                }
                            </div>
                        </>
                    ))}
                </div>
                {/* <div>
                    <div className='Featured-News-text'>Featured News</div>
                    <div className='row m-0'>
                        {newsData?.slice(6, 10).map((item, index) => (
                            <div key={index} className='col-lg-3 column-pad'>
                                <div className='Featured-News-card'>
                                    <img src={item.image} width={'100%'} style={{ objectFit: 'cover', height: 283, borderRadius: 10, border: 'solid 1px #EDEDED' }} />
                                    <div className='inner-card'>
                                        <div className='inner-card-2'>
                                            <div className='Featured-News-title'>{trimText(item?.title, 50)}</div>
                                            <div className='Featured-News-title2'>{item.source}</div>
                                            <div className='flex2'>
                                                <div className='flex3'>
                                                    <img src={Time} width={16} style={{ objectFit: 'contain', marginRight: 5 }} />
                                                    <div className='time-info2'>{formatTimeAgo(item?.timeStamp)}</div>
                                                </div>
                                                <a onClick={()=>routeNews(item?.newsLink)} target='_blank' style={{ textDecoration: 'none', cursor:'pointer' }}>
                                                    <div className='know-more-text'>Know more <img src={RightArrow} width={24} style={{ objectFit: 'contain' }} /></div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
            <Modal show={show}
                    onHide={handleClose}
                    size='lg'
                    scrollable 
                    className='latest-news-modal'
                    style={{ animation: show ? 'slideInRight 0.3s ease-in-out' : 'none' }}
                >
                    <Modal.Header className='pb-0'>
                        <div className='d-flex justify-content-start align-items-center' style={{ marginBottom: 20 }}>
                            <button onClick={() => handleClose()} className='light-blue-btn'>
                                <img src={BackBtnArrow} style={{ width: 7, height: 13, objectFit: 'contain', marginRight: 5, marginTop: -2 }} />
                                Back
                            </button>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='latest-news-modal'>
                            <div className='d-flex align-items-end'>
                                <div className='blue-text-box'>{selected?.section_name}</div>
                            </div>
                            <div className='small-time-text mt-2'>{momentDate(selected?.date)}<span className='ms-2'>{momentTime(selected?.time)}</span></div>
                        <div className='d-flex align-items-center news-button-css mt-2'>
                            <button className={selected?.sentiment === 'Bullish' ? 'bullish-btn' : selected?.sentiment === 'Very bullish' ? 'very-bullish-btn' : selected?.sentiment === 'Very bearish' ? 'very-bearish-btn' : selected?.sentiment === 'Bearish' ? 'bearish-btn' : 'neutral-btn'}>{selected?.sentiment}
                                {(selected?.sentiment === 'Very bullish' || selected?.sentiment === 'Bullish') && <img src={BullishImg} className='button-img-size' />}
                                {(selected?.sentiment === 'Very bearish' || selected?.sentiment === 'Bearish') && <img src={BearishImg} className='button-img-size' />}
                            </button>
                        </div>
                        </div>
                        <div className='title-text mb-2'> {selected?.heading} </div>
                        {/* <div className='d-flex justify-content-between align-items-center'>
                            <div className='border-box'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='dark-text'>TCS</div>
                                    <div className='d-flex justify-content-between align-items-center ms-3'>
                                        <div className='green-price-text'>3903</div>
                                        <div className='green-price-text mx-1' style={{ fontSize: 12 }}>0.5%</div>
                                        <img src={GreenArrow} style={{ width: 13, objectFit: 'contain' }} />
                                    </div>
                                </div>
                            </div>
                            <div className='border-box'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='dark-text'>TCS</div>
                                    <div className='d-flex justify-content-between align-items-center ms-3'>
                                        <div className='green-price-text'>3903</div>
                                        <div className='green-price-text mx-1' style={{ fontSize: 12 }}>0.5%</div>
                                        <img src={GreenArrow} style={{ width: 13, objectFit: 'contain' }} />
                                    </div>
                                </div>
                            </div>
                            <div className='border-box'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='dark-text'>TCS</div>
                                    <div className='d-flex justify-content-between align-items-center ms-3'>
                                        <div className='green-price-text'>3903</div>
                                        <div className='green-price-text mx-1' style={{ fontSize: 12 }}>0.5%</div>
                                        <img src={GreenArrow} style={{ width: 13, objectFit: 'contain' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='text-blue my-3'>#LoremIpsum #LoremIpsum #LoremIpsum</div>
                        <div className='text-dark-blue'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        </div> */}
                        <div className='description-text mt-3'>
                            <div dangerouslySetInnerHTML={{ __html: replaceQuestionMarkWithMetrix(selected?.arttext || '') }} />
                        </div>
                    </Modal.Body>
                    {/* <Modal.Footer className='d-flex align-items-center justify-content-start pt-1'>
                        <div className='footer-text'>Source: Times of India, CNBC.</div>
                    </Modal.Footer> */}
                </Modal>
            {/* <Modal show={show}
                    onHide={handleClose}
                    size='lg'
                    className='viewModal'
                    scrollable
                    centered
                >
                    <Modal.Header>
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <div className='header-text'>{selected?.heading}</div>
                            <div onClick={() => handleClose()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                                <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='viewModal'>
                            <div dangerouslySetInnerHTML={{ __html: selected?.arttext }} />
                        </div>
                    </Modal.Body>
                </Modal> */}
        </>
    );
}

export default NewsViewAll;
