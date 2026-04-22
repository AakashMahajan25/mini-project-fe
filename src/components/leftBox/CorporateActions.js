import React from 'react'
import './CorporateActions.scss'
import RightArrow from "../../assets/images/blue-right-arrow.png"

function CorporateActions() {

    const eventsdata = [
        {
            mainheading: 'Quaterly Results',
            announcetext: 'Annoucement Date',
            datetext: 'Jan 16, 2024',
        },
        {
            mainheading: 'Quaterly Results',
            announcetext: 'Annoucement Date',
            datetext: 'Jan 16, 2024',
        },
        {
            mainheading: 'Quaterly Results',
            announcetext: 'Annoucement Date',
            datetext: 'Jan 16, 2024',
        }
    ]

    return (
        <div className='corporate-actions'>
            <p className='page-heading'>Events</p>
            {eventsdata.map((item) => (
                <div className='col-lg-12 eventsbox'>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex'>
                            <p className='main-heading'>{item.mainheading}</p>
                            <img src={RightArrow} className='right_arrow' />
                        </div>
                        <div>
                            <p className='announce_text'>{item.announcetext}</p>
                            <p className='date-text'>{item.datetext}</p>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default CorporateActions