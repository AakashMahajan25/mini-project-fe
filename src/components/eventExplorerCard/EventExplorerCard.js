import React from 'react';
import './EventExplorerCard.scss';
import RightArrow from '../../assets/images/right-arrow.png';

function EventExplorerCard(props) {
    const { question, category, buttonBackgroundColor, buttonTextColor, onCardClick } = props;

    return (
        <>
            <div className='m-2' onClick={onCardClick} style={{ cursor: 'pointer'}}>
                <div className='eventExplorerCard-css'>
                    <p className='title'>{question}</p>
                    <button
                        className='card-blue-btn'
                        style={{
                            marginBottom: 20,
                            backgroundColor: buttonBackgroundColor ? buttonBackgroundColor : '#ECEFFC',
                            color: buttonTextColor ? buttonTextColor : '#4563E3'
                        }}
                    >
                        {category}
                    </button>
                    <div className='d-flex justify-content-start align-items-center' style={{ cursor: 'pointer', width: 'max-content' }}>
                        <p className='knowMore-text'>{'Know More'}</p>
                        <img style={{ width: 18, objectFit: 'contain' }} src={RightArrow} alt="Right Arrow" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventExplorerCard;
