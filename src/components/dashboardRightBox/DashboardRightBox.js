import React from 'react';
import './DashboardRightBox.scss';
import RightArrow from '../../assets/images/right-arrow.png';
import NewsImg from '../../assets/images/newsImg.png';
import NewsTime from '../../assets/images/time-clock.png';
import { formatTimeAgo, trimText } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

function DashboardRightBox({ newsData, mostFrruitData }) {
    const texts = [
        'Current stock ratings and targets?',
        'Another text for the second instance',
        'And one more for the third instance',
    ];

    const navigate = useNavigate();
    const routeChangeFrruitGPT = (question) => {
        navigate("/frruit-gpt", {
            state: { question },
        });

    };

    return (
        <>
            <div className='Right-box'>
                <div className='box' style={{ height: window.innerHeight - 105 }}>
                    {mostFrruitData?.length > 0 &&
                        <>
                            <div className='box-content'>
                                <div className='title' style={{ marginBottom: 20 }}>Most on Frruit</div>
                                {mostFrruitData?.map((text, index) => (
                                    <div onClick={() => { routeChangeFrruitGPT(text?.question) }} key={index} className='mostOnFrruitBox mb-2'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <p className='text'>{text?.question}</p>
                                            <img style={{ width: 24, objectFit: 'contain' }} src={RightArrow} alt={`Arrow ${index}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ backgroundColor: '#E5E5E5', width: '100%', height: 1, marginBottom: 16 }} />
                        </>
                    }
                    <div className='box-content'>
                        {newsData?.length > 0 &&
                            <>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='title' style={{ marginBottom: 20 }}>Latest News</div>
                                    <div className='viewAllTeaxt' style={{ marginBottom: 20 }}>View All</div>
                                </div>
                                {
                                    newsData?.slice(0, 3).map((newsItem, index) => (

                                        <a href={newsItem?.newsLink} target='_blank' style={{ textDecoration: 'none' }}>
                                            <div key={index} className='newsBox' style={{ marginBottom: 20, cursor: 'pointer' }}>
                                                <div className='d-flex justify-content-start'>
                                                    <img style={{ width: 60, objectFit: 'contain', marginRight: '10px' }} src={newsItem?.image} />
                                                    <div>
                                                        <p className='newsTitle'>{trimText(newsItem?.title, 30)}</p>
                                                        <p className='newsPara' style={{ marginBottom: '5px' }}>{newsItem?.source}</p>
                                                        <div className='d-flex justify-content-start align-items-center'>
                                                            <img style={{ width: 16, objectFit: 'contain', marginRight: '5px' }} src={NewsTime} />
                                                            <p className='newsPara'>{formatTimeAgo(newsItem?.timeStamp)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardRightBox;
