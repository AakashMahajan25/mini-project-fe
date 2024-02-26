import React from 'react';
import './NewsViewAll.scss';
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import NewsImg from '../../assets/images/newsImg.png';
import Time from '../../assets/images/time-clock.png';
import NewsImg2 from '../../assets/images/news-img-2.png';
import RightArrow from '../../assets/images/right-arrow.png';
import { formatTimeAgo, trimText } from '../../utils/utils';

function NewsViewAll({ backBtnClick, newsData }) {


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
                    <div className='headline-text'>Today’s Headline</div>
                    <div className='row m-0'>
                        {newsData?.slice(0, 6).map((item, index) => (
                            <div key={index} className='col-lg-4 column-pad'>
                                <a href={item?.newsLink} target='_blank' style={{ textDecoration: 'none' }}>
                                    <div className='headline-news-card'>
                                        <div className='d-flex align-items-center m-0'>
                                            <div className=''>
                                                <img src={item.image} className='mx-2' width={60} height={60} style={{ objectFit: 'fill', borderRadius: 10 }} />
                                            </div>
                                            <div className=''>
                                                <div className='text-area'>
                                                    <div className='news-title'>{trimText(item?.title, 40)}</div>
                                                    <div className='news-info'>{item.source}</div>
                                                    <div className='flex'>
                                                        <img src={Time} width={16} style={{ objectFit: 'contain', marginRight: 5 }} />
                                                        <div className='time-info'>{formatTimeAgo(item?.timeStamp)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
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
                                                <a href={item?.newsLink} target='_blank' style={{ textDecoration: 'none' }}>
                                                    <div className='know-more-text'>Know more <img src={RightArrow} width={24} style={{ objectFit: 'contain' }} /></div>
                                                </a>
                                            </div>
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

export default NewsViewAll;
