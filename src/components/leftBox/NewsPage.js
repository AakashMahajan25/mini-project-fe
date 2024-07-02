import React from 'react';
import '../leftBox/NewsPage.scss'
import ClockIcon from '../../assets/images/clock-icon.png'

function NewsPage() {

    const newsdata = [
        {
            mainheading: 'Tech View: Nifty 50 call writers hike position',
            subheading: 'The Economic Times',
            timetext: '1 Hr ago',
        },
        {
            mainheading: 'Tech View: Nifty 50 call writers hike position',
            subheading: 'The Economic Times',
            timetext: '1 Hr ago',
        },
        {
            mainheading: 'Tech View: Nifty 50 call writers hike position',
            subheading: 'The Economic Times',
            timetext: '1 Hr ago',
        },
    ]


    return (

        <div className='newspage'>
            <p className='page-heading'>Latest News</p>
            {newsdata.map((item) => (
                <div className='col-lg-12 newsbox'>
                    <p className='box-heading'>{item.mainheading}</p>
                    <div className='d-flex justify-content-between align-items-center sub-box'>
                        <p className='box-subheading'>{item.subheading}</p>
                        <div className='d-flex'>
                            <img src={ClockIcon} className='clockicon' />
                            <p className='box-subheading'>{item.timetext}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default NewsPage