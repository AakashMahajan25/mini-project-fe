import React from 'react';
import './EventExplorerCard.scss';
import RightArrow from '../../assets/images/right-arrow.png';

function EventExplorerCard(props) {
    const { title, eventType, buttonLabel, buttonBackgroundColor, buttonTextColor, onCardClick } = props;

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
                    <div onClick={onCardClick} className='d-flex justify-content-start align-items-center' style={{ cursor: 'pointer', width: 'max-content' }}>
                        <p className='knowMore-text'>{buttonLabel}</p>
                        <img style={{ width: 18, objectFit: 'contain' }} src={RightArrow} alt="Right Arrow" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventExplorerCard;
