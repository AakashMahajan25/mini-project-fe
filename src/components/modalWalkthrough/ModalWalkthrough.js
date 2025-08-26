import React, { useEffect, useState } from 'react';
import './ModalWalkthrough.scss';
import FundamentalWalkthrough from '../../assets/images/fundamental-walkthrough.png';
import FundamentalWalkthrough2 from '../../assets/images/fundamental-walkthrough2.png';
import VideosWalkthrough from '../../assets/images/videos-walkthrough.png';
import VideosWalkthrough2 from '../../assets/images/videos-walkthrough2.png';
import SocialMediaWalkthrough from '../../assets/images/social-media-walkthrough.png';
import SocialMediaWalkthrough2 from '../../assets/images/reddit-image-walkthrough.png';
import NewsWalkthrough from '../../assets/images/news-walkthrough.png';
import NewsWalkthrough2 from '../../assets/images/news-walkthrough2.png';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import GreyBackArrow from '../../assets/images/grey-back-arrow.png';
import CloseImg from '../../assets/images/close_icon.png';
import WhiteChevronRight from '../../assets/images/chevron-left.png';

function ModalWalkthrough({ showModalWalkthrough, setShowModalWalkthrough }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClose = () => setShowModalWalkthrough(false);

    const slidesData = [
        // {
        //     mainImage: FundamentalWalkthrough,
        //     overlayImage: FundamentalWalkthrough2,
        //     title: 'Fundamentals',
        //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        // },
        {
            mainImage: NewsWalkthrough,
            overlayImage: NewsWalkthrough2,
            title: 'News',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        // {
        //     mainImage: VideosWalkthrough,
        //     overlayImage: VideosWalkthrough2,
        //     title: 'Videos',
        //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        // },
        {
            mainImage: SocialMediaWalkthrough,
            overlayImage: SocialMediaWalkthrough2,
            title: 'Social Media',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
        },
    ];

    useEffect(() => {
        if (showModalWalkthrough) {
            setActiveIndex(0);
        }
    }, [showModalWalkthrough]);

    const handleNext = () => {
        if (activeIndex < slidesData.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    const handlePrev = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    const handleDone = () => {
        handleClose();
    };

    return (
        <Modal
            show={showModalWalkthrough}
            onHide={handleClose}
            size='md'
            className='view-walkthrough-modal'
            scrollable
            centered
        >
            <Modal.Header className='flex-end pb-0'>
                <img
                    onClick={handleClose}
                    src={CloseImg}
                    width={32}
                    style={{ objectFit: 'contain', cursor: 'pointer' }}
                    alt="Close"
                />
            </Modal.Header>
            <Modal.Body className='p-0'>
                <Carousel activeIndex={activeIndex} controls={false} indicators={true}>
                    {slidesData.map((slide, index) => (
                        <Carousel.Item key={index}>
                            <div className='position-relative'>
                                <img src={slide.mainImage} alt={slide.title} style={{ width: '100%' }} />
                                <img src={slide.overlayImage} className='absolute-image' alt={`${slide.title} overlay`} />
                            </div>
                            <div style={{ marginBottom: 45 }}>
                                <div className='carousel-text'>{slide.title}</div>
                                <div className='carousel_desc-text'>{slide.description}</div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Modal.Body>
            <Modal.Footer className='justify-content-between mx-3 p-3'>
                {activeIndex > 0 && (
                    <button onClick={handlePrev} className='back-button m-0'>
                        <img src={GreyBackArrow} className='back-arrow me-2' alt="Back" />
                        Back
                    </button>
                )}
                {activeIndex < slidesData.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className={`next-button m-0 ${activeIndex === 0 ? 'w-100' : ''}`} // Apply full width if activeIndex is 0
                    >
                        Next
                        <img src={WhiteChevronRight} className='back-arrow ms-2' alt="Next" />
                    </button>
                ) : (
                    <button onClick={handleDone} className='next-button m-0'>
                        Done
                    </button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalWalkthrough;
