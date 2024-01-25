import React from 'react';
import './EventExplorerCard.scss';
import RightArrow from '../../assets/images/right-arrow-blue-small.png';

function EventExplorerCard(props) {
    const { title, eventType, buttonLabel, buttonBackgroundColor, buttonTextColor } = props;

    return (
        <>
        <div className='m-2'>
            <div className='eventExplorerCard-css'>
                <p className='title'>{title}</p>
                <button
                    className='card-blue-btn'
                    style={{
                        marginBottom: 20,
                        backgroundColor: buttonBackgroundColor,
                        color: buttonTextColor
                    }}
                >
                    {eventType}
                </button>
                <div className='d-flex justify-content-start align-items-center' style={{ cursor: 'pointer' }}>
                    <p className='knowMore-text'>{buttonLabel}</p>
                    <img style={{ width: 18, objectFit: 'contain' }} src={RightArrow} alt="Right Arrow" />
                </div>
            </div>
            </div>
        </>
    );
}

export default EventExplorerCard;
