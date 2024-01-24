import React from 'react';
import './DashboardRightBox.scss';
import RightArrow from '../../assets/images/right-arrow.png';
import NewsImg from '../../assets/images/newsImg.png';
import NewsTime from '../../assets/images/time-clock.png';

function DashboardRightBox() {
    const texts = [
        'Current stock ratings and targets?',
        'Another text for the second instance',
        'And one more for the third instance',
        'Current stock ratings and targets?',
        'Current stock ratings and targets?',
        'Current stock ratings and targets?',
    ];

    const newsData = [
        {
            imageUrl: NewsImg,
            title: 'Post Financial crisis fine paid by Citigroup',
            source: 'THE WALL STREET JOURNAL...',
            time: '1 Hr ago'
        },
        {
            imageUrl: NewsImg,
            title: 'Post Financial crisis fine paid by Citigroup',
            source: 'THE WALL STREET JOURNAL...',
            time: '1 Hr ago'
        },{
            imageUrl: NewsImg,
            title: 'Post Financial crisis fine paid by Citigroup',
            source: 'THE WALL STREET JOURNAL...',
            time: '1 Hr ago'
        },
    ];

    return (
        <>
            <div className='Right-box'>
                <div className='box'>
                    <div className='title' style={{ marginBottom: 20 }}>Most on Frruit</div>
                    {texts.map((text, index) => (
                        <div key={index} className='mostOnFrruitBox mb-2'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='text'>{text}</p>
                                <img style={{ width: 24, objectFit: 'contain' }} src={RightArrow} alt={`Arrow ${index}`} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className='box'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='title' style={{ marginBottom: 20 }}>Latest News</div>
                        <div className='viewAllTeaxt' style={{ marginBottom: 20 }}>View All</div>
                    </div>
                    {newsData.map((newsItem, index) => (
                        <div key={index} className='newsBox' style={{ marginBottom: 20 }}>
                            <div className='d-flex justify-content-start'>
                                <img style={{ width: 85, objectFit: 'contain', marginRight: '10px' }} src={newsItem.imageUrl} />
                                <div>
                                    <p className='newsTitle'>{newsItem.title}</p>
                                    <p className='newsPara' style={{ marginBottom: '5px' }}>{newsItem.source}</p>
                                    <div className='d-flex justify-content-start align-items-center'>
                                        <img style={{ width: 16, objectFit: 'contain', marginRight: '5px' }} src={NewsTime} />
                                        <p className='newsPara'>{newsItem.time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default DashboardRightBox;
