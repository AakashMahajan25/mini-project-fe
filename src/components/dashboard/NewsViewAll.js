import React, { useEffect, useState } from 'react';
import './NewsViewAll.scss';
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import NewsImg from '../../assets/images/newsImg.png';
import Time from '../../assets/images/time-clock.png';
import NewsImg2 from '../../assets/images/news-img-2.png';
import RightArrow from '../../assets/images/right-arrow.png';
import { formatTimeAgo, trimText } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import CloseImg from '../../assets/images/close_icon.png';
import BullishImg from '../../assets/images/bullish_img.png';
import BearishImg from '../../assets/images/bearish_img.png';

function NewsViewAll({ backBtnClick, newsData }) {
    const navigate = useNavigate();
    const [groupedData, setGroupedData] = useState([])
    const [selected, setSelected] = useState(null)
    const [show, setShow] = useState(false);

    useEffect(() => {
        const groupedNews = newsData?.reduce((acc, news) => {
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
        
    }, [newsData])    
    
    const handleShow = (data) => {
        setShow(true)
        setSelected(data)
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

    return (
        <>
            <div className='news-view-all' style={{ height: window.innerHeight - 120, overflowY: 'scroll' }}>
                <div className='d-flex justify-content-start align-items-center' style={{ marginBottom: 20 }}>
                    <button onClick={backBtnClick} className='light-blue-btn'>
                        <img src={BackBtnArrow} style={{ width: 7, height: 13, objectFit: 'contain', marginRight: 5, marginTop: -2 }} />
                        Back
                    </button>
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
                                                                <div className='d-flex align-items-center news-button-css'>
                                                                    <button className='very-bullish-btn mb-1'> Very Bullish <img src={BullishImg} className='button-img-size' /></button>
                                                                </div>
                                                                {/* <div className='d-flex align-items-center news-button-css'>
                                                                    <button className='neutral-btn mb-1'> Neutral </button>
                                                                </div> */}
                                                                <div className='flex'>
                                                                    {/* <img src={Time} width={16} style={{ objectFit: 'contain', marginRight: 5 }} /> */}
                                                                    <div className='time-info'>{momentTime(el?.time)}</div>
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
                </Modal>
        </>
    );
}

export default NewsViewAll;
