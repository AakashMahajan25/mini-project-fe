import React, { useState } from 'react';
import './DashboardRightBox.scss';
import RightArrow from '../../assets/images/right-arrow.png';
import NewsImg from '../../assets/images/newsImg.png';
import NewsTime from '../../assets/images/time-clock.png';
import RightBlueArrow from '../../assets/images/blue-right-arrow.png';
import CloseImg from '../../assets/images/close_icon.png';
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import GreenArrow from '../../assets/images/green_up-arrow.png';
import { formatTimeAgo, trimText } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import moment from 'moment';

function DashboardRightBox({ newsData, mostFrruitData, onViewAllClick }) {
    const [selected, setSelected] = useState(null)
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
    const routeNews = (src) => {
        navigate("/news", {
            state: { src },
        });
    };
    const [show, setShow] = useState(false);

    const handleShow = (data) => {
        setShow(true)
        setSelected(data)
    };

    const handleClose = () => {
        setShow(false)
        setSelected(null)
    };

    const momentTime = (time) => {
        return moment(time, 'HH:mm').format('h:mm A')
    }

    const momentDate = (time) => {
        return moment(time).format('Do MMM, YYYY');
    }

    return (
        <>
            <div className='Right-box'>
                <div className='box' style={{ height: window.innerHeight - 105 }}>
                    {/* {mostFrruitData?.length > 0 &&
                        <>
                            <div className='box-content'>
                                <div className='d-flex align-items-center justify-content-between mb-3'>
                                    <div className='title'>Most on Frruit</div>
                                    <div onClick={handleShow} style={{ cursor: 'pointer', color: '#4563E4', fontWeight: 600 }}>View All</div>
                                </div>
                                {mostFrruitData?.slice(0, 3).map((text, index) => (
                                    <div onClick={() => { routeChangeFrruitGPT(text?.question) }} key={index} className='mostOnFrruitBox mb-2'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <p className='text'>{text?.question}</p>
                                            <img style={{ width: 24, objectFit: 'contain' }} src={RightArrow} alt={`Arrow ${index}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ backgroundColor: '#E5E5E5', width: '100%', height: 1, marginBottom: 5 }} />
                        </>
                    } */}
                    <div className='box-content'>
                        {newsData?.length > 0 &&
                            <>
                                <div className='d-flex justify-content-between align-items-center'>
                                    {/* <div className='title' style={{ marginBottom: 20 }}>Latest News</div> */}
                                    <div className='viewAllTeaxt' onClick={onViewAllClick} style={{ marginBottom: 20 }}>View All</div>
                                </div>
                                {
                                    newsData?.slice(0, 8).map((newsItem, index) => (
                                        <div key={index} className='newsBox' style={{ marginBottom: 20, cursor: 'pointer' }} onClick={() => handleShow(newsItem)}>
                                            <div className='d-flex justify-content-start'>
                                                {/* <img style={{ width: 60, objectFit: 'cover', marginRight: '10px',borderRadius:10,border: 'solid 1px #e5e5e5' }} src={newsItem?.image} /> */}
                                                <div>
                                                    <p className='newsTitle'>{trimText(newsItem?.heading, 70)}</p>
                                                    <p className='newsPara' style={{ marginBottom: '5px' }}>{newsItem?.section_name}</p>
                                                    <div className='d-flex justify-content-start align-items-center'>
                                                        {/* <img height={16} style={{ width: 16, objectFit: 'cover', marginRight: '5px' }} src={NewsTime} /> */}
                                                        <p className='newsPara'>{momentTime(newsItem?.time)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </>
                        }
                    </div>
                </div>
                <Modal show={show}
                    onHide={handleClose}
                    size='lg'
                    scrollable
                    className='latest-news-modal'
                    style={{ animation: show ? 'slideInRight 0.3s ease-in-out' : 'none' }}
                >
                    <Modal.Header className='pb-0'>
                        <div className='d-flex justify-content-start align-items-center' style={{ marginBottom: 20 }}>
                            <button onClick={() => handleClose()} className='light-blue-btn'>
                                <img src={BackBtnArrow} style={{ width: 7, height: 13, objectFit: 'contain', marginRight: 5, marginTop: -2 }} />
                                Back
                            </button>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                    <div className='latest-news-modal'>
                            <div className='d-flex align-items-end'>
                                <div className='blue-text-box'>{selected?.section_name}</div>
                            </div>
                            <div className='small-time-text mt-2'>{momentDate(selected?.date)}<span className='ms-3'>{momentTime(selected?.time)}</span></div>
                        </div>
                        <div className='title-text mb-2'> {selected?.heading} </div>
                        {/* <div className='d-flex justify-content-between align-items-center'>
                            <div className='border-box'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='dark-text'>TCS</div>
                                    <div className='d-flex justify-content-between align-items-center ms-3'>
                                        <div className='green-price-text'>3903</div>
                                        <div className='green-price-text mx-1' style={{ fontSize: 12 }}>0.5%</div>
                                        <img src={GreenArrow} style={{ width: 13, objectFit: 'contain' }} />
                                    </div>
                                </div>
                            </div>
                            <div className='border-box'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='dark-text'>TCS</div>
                                    <div className='d-flex justify-content-between align-items-center ms-3'>
                                        <div className='green-price-text'>3903</div>
                                        <div className='green-price-text mx-1' style={{ fontSize: 12 }}>0.5%</div>
                                        <img src={GreenArrow} style={{ width: 13, objectFit: 'contain' }} />
                                    </div>
                                </div>
                            </div>
                            <div className='border-box'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='dark-text'>TCS</div>
                                    <div className='d-flex justify-content-between align-items-center ms-3'>
                                        <div className='green-price-text'>3903</div>
                                        <div className='green-price-text mx-1' style={{ fontSize: 12 }}>0.5%</div>
                                        <img src={GreenArrow} style={{ width: 13, objectFit: 'contain' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='text-blue my-3'>#LoremIpsum #LoremIpsum #LoremIpsum</div>
                        <div className='text-dark-blue'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        </div> */}
                        <div className='description-text mt-3'>
                            <div dangerouslySetInnerHTML={{ __html: selected?.arttext }} />
                        </div>
                    </Modal.Body>
                    {/* <Modal.Footer className='d-flex align-items-center justify-content-start pt-1'>
                        <div className='footer-text'>Source: Times of India, CNBC.</div>
                    </Modal.Footer> */}
                </Modal>
                {/* <Modal show={show}
                    onHide={handleClose}
                    size='lg'
                    className='viewModal'
                    scrollable
                    centered
                >
                    <Modal.Header>
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <div className='header-text'>{selected?.heading}</div>
                            <div onClick={() => handleClose()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                                <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='viewModal'>
                            <div dangerouslySetInnerHTML={{ __html: selected?.arttext }} />
                        </div>
                    </Modal.Body>
                </Modal> */}
            </div>
        </>
    );
}

export default DashboardRightBox;
