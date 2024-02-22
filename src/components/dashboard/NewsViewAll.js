import React from 'react';
import './NewsViewAll.scss';
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import NewsImg from '../../assets/images/newsImg.png';
import Time from '../../assets/images/time-clock.png';
import NewsImg2 from '../../assets/images/news-img-2.png';
import RightArrow from '../../assets/images/right-arrow.png';

function NewsViewAll({ backBtnClick }) {
    // Sample data for demonstration
    const newsData = [
        {
            title: 'Post Financial crisis fine paid by Citigroup',
            source: 'THE WALL STREET JOURNAL',
            time: '1 Hr ago',
            image: NewsImg
        },
        {
            title: 'Another headline',
            source: 'BBC NEWS',
            time: '2 Hrs ago',
            image: NewsImg
        },
        {
            title: 'Post Financial crisis fine paid by Citigroup',
            source: 'THE WALL STREET JOURNAL',
            time: '1 Hr ago',
            image: NewsImg
        },
        {
            title: 'Post Financial crisis fine paid by Citigroup',
            source: 'THE WALL STREET JOURNAL',
            time: '1 Hr ago',
            image: NewsImg
        },
        {
            title: 'Another headline',
            source: 'BBC NEWS',
            time: '2 Hrs ago',
            image: NewsImg
        },
        {
            title: 'Post Financial crisis fine paid by Citigroup',
            source: 'THE WALL STREET JOURNAL',
            time: '1 Hr ago',
            image: NewsImg
        },
    ];

    const featuredNewsData = [
        {
            title: 'Post Financial crisis fine paid by Citigroup over US $100m',
            source: 'THE WALL STREET JOURNAL',
            time: '1 Hr ago',
            image: NewsImg2
        },
        {
            title: 'Post Financial crisis fine paid by Citigroup over US $100m',
            source: 'THE WALL STREET JOURNAL',
            time: '1 Hr ago',
            image: NewsImg2
        },
        {
            title: 'Post Financial crisis fine paid by Citigroup over US $100m',
            source: 'THE WALL STREET JOURNAL',
            time: '1 Hr ago',
            image: NewsImg2
        },
        {
            title: 'Post Financial crisis fine paid by Citigroup over US $100m',
            source: 'THE WALL STREET JOURNAL',
            time: '1 Hr ago',
            image: NewsImg2
        },
        
    ];

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
                        {newsData.map((item, index) => (
                            <div key={index} className='col-lg-4 column-pad'>
                                <div className='headline-news-card'>
                                    <div className='row m-0'>
                                        <div className='col-lg-3 column-pad'>
                                            <img src={item.image} width={85} style={{ objectFit: 'contain' }} />
                                        </div>
                                        <div className='col-lg-9 column-pad'>
                                            <div className='text-area'>
                                                <div className='news-title'>{item.title}</div>
                                                <div className='news-info'>{item.source}</div>
                                                <div className='flex'>
                                                    <img src={Time} width={16} style={{ objectFit: 'contain', marginRight: 5 }} />
                                                    <div className='time-info'>{item.time}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className='Featured-News-text'>Featured News</div>
                    <div className='row m-0'>
                        {featuredNewsData.map((item, index) => (
                            <div key={index} className='col-lg-3 column-pad'>
                                <div className='Featured-News-card'>
                                    <img src={item.image} width={'100%'} style={{ objectFit: 'contain' }} />
                                    <div className='inner-card'>
                                        <div className='inner-card-2'>
                                            <div className='Featured-News-title'>{item.title}</div>
                                            <div className='Featured-News-title2'>{item.source}</div>
                                            <div className='flex2'>
                                                <div className='flex3'>
                                                    <img src={Time} width={16} style={{ objectFit: 'contain', marginRight: 5 }} />
                                                    <div className='time-info2'>{item.time}</div>
                                                </div>
                                                <div style={{ cursor: 'pointer' }}>
                                                    <div className='know-more-text'>Know more <img src={RightArrow} width={24} style={{ objectFit: 'contain' }} /></div>
                                                </div>
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
