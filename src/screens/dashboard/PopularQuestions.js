import React, { useState } from 'react'
import './PopularQuestions.scss'
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import RightArrow from '../../assets/images/right-arrow.png';
import ReactGA from 'react-ga4';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import RightBlueArrow from '../../assets/images/blue-right-arrow.png';
import CloseImg from '../../assets/images/close_icon.png';
import { Tooltip } from 'react-tooltip'
import quesIcon from '../../assets/images/i-icon.png';
import RightWhiteArrow from '../../assets/images/right-arrow.png';

function PopularQuestions({ handleBackButtonClick, mostOnFrruitGpt, chatSuggestions, handleViewAllClick }) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const routePromptFrruitGPT = (question, flag) => {
        ReactGA.event({
            category: 'Dashboard',
            action: 'mostonfrruit_prompt_click',
            label: 'MostonFrruit Prompt Click'
        });
        navigate("/frruit-gpt", {
            state: { question, fundamental: flag },
        });
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleShow2 = () => {
        setShow2(true);
    };

    const handleClose2 = () => {
        setShow2(false);
    };

    return (
        <>
            <div className='hide-on-large-screens-dashboard'>
                <div className='dashboardTextForMobile'>Home</div>
                <div onClick={handleViewAllClick} className='dashboardTextForMobile'>Latest News<img src={RightWhiteArrow} width={16} height={16} style={{ objectFit: 'contain', cursor: 'pointer' }} /></div>
            </div>
            <div className='popular-questions-css'>
                <div className='d-flex justify-content-start align-items-center' style={{ marginBottom: 20 }}>
                    <button onClick={handleBackButtonClick} className='light-blue-btn me-2'><img src={BackBtnArrow} style={{ width: 7, height: 13, objectFit: 'contain', marginRight: 5, marginTop: -2 }} />Back</button>
                </div>
                <div className='heading-text'>Popular Questions</div>
                <div className='desc-text mt-1'>Explore popular and most-asked questions to guide your AI search</div>
                {mostOnFrruitGpt?.rows?.length > 0 &&
                    <>
                        <div className='box-content position-relative mt-3'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='title'>Most on Frruit</div>
                                <div onClick={handleShow} style={{ cursor: 'pointer', color: '#4563E4', fontWeight: 600 }}>View All</div>
                            </div>
                            <div className='row mt-1 hide-in-mobile'>
                                {mostOnFrruitGpt?.rows?.slice(0, 9).map((text, index) => (
                                    <div onClick={() => { routePromptFrruitGPT(text?.question, 'fund') }} key={index} className='col-lg-4'>
                                        <div className='mostOnFrruitBox mb-2'>
                                            <div className='d-flex justify-content-between align-items-center' >
                                                <p className='text'>{text?.question?.replace(/\b\w/g, char => char.toUpperCase())}</p>
                                                <img style={{ width: 24, objectFit: 'contain' }} src={RightArrow} alt={`Arrow ${index}`} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex flex-column mt-3 hide-in-desktop " >
                                {[0, 3].map((startIdx) => (
                                    <div className="d-flex mb-3 mobile-scroll" key={startIdx}>
                                        {mostOnFrruitGpt?.rows?.slice(startIdx, startIdx + 3).map((text, index) => (
                                            <div
                                                onClick={() => { routePromptFrruitGPT(text?.question, 'fund') }}
                                                key={index}
                                                className="col-11 me-3"
                                            >
                                                <div className="mostOnFrruitBox mb-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="text">
                                                            {text?.question?.replace(/\b\w/g, char => char.toUpperCase())}
                                                        </p>
                                                        <img
                                                            style={{ width: 24, objectFit: 'contain' }}
                                                            src={RightArrow}
                                                            alt={`Arrow ${index}`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </>
                }
                {chatSuggestions?.length > 0 &&
                    <>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='title mt-3'>Suggested Prompts</div>
                            <div onClick={handleShow2} style={{ cursor: 'pointer', color: '#4563E4', fontWeight: 600 }}>View All</div>
                        </div>
                        <div className='row hide-in-mobile' >
                            {chatSuggestions.slice(0, 9).map((item, index) => (
                                <div onClick={() => { routePromptFrruitGPT(item?.prompt_text, 'fund') }} key={index} className='col-lg-4' style={{ cursor: 'pointer' }}>
                                    <div className='prompts-text-bg mt-2' style={{ cursor: 'pointer' }}>
                                        <div className=' d-flex justify-content-between align-items-center w-100' >
                                            <p className='prompts-text'>{item?.prompt_text}</p>
                                            <img style={{ width: 24, objectFit: 'contain' }} src={quesIcon} className={`my-anchor-element-${index}`} />
                                        </div>

                                    </div>
                                    <Tooltip absolute fixed anchorSelect={`.my-anchor-element-${index}`} place="left" className="bg-primary">
                                        <div style={{ width: '370px', fontSize: '14px' }}>
                                            {item?.prompt_description ? item?.prompt_description : item?.prompt_text}</div>
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex flex-column hide-in-desktop">
                            {[0, 3].map((startIdx) => (
                                <div
                                    className="d-flex mb-3 mobile-scroll"
                                    key={startIdx}
                                >
                                    {chatSuggestions.slice(startIdx, startIdx + 3).map((item, index) => (
                                        <div
                                            onClick={() => { routePromptFrruitGPT(item?.prompt_text, 'fund') }}
                                            key={index}
                                            className="col-11 me-3"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="prompts-text-bg mb-2" style={{ cursor: 'pointer' }}>
                                                <div className="d-flex justify-content-between align-items-center w-100">
                                                    <p className="prompts-text">{item?.prompt_text}</p>
                                                    <img
                                                        style={{ width: 24, objectFit: 'contain' }}
                                                        src={quesIcon}
                                                        className={`my-anchor-element-${index}`}
                                                        alt={`Icon ${index}`}
                                                    />
                                                </div>
                                            </div>
                                            <Tooltip
                                                absolute
                                                fixed
                                                anchorSelect={`.my-anchor-element-${index}`}
                                                place="left"
                                                className="bg-primary"
                                            >
                                                <div style={{ width: '370px', fontSize: '14px' }}>
                                                    {item?.prompt_description ? item?.prompt_description : item?.prompt_text}
                                                </div>
                                            </Tooltip>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                    </>
                }
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                size='lg'
                className='viewModal'
                scrollable
                centered
            >
                <Modal.Header>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                        <div className='header-text'>Most on Frruit</div>
                        <div onClick={() => handleClose()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                            <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='viewModal'>
                        <div>
                            {mostOnFrruitGpt?.rows?.map((text, index) => (
                                <div onClick={() => { routePromptFrruitGPT(text?.question, 'fund') }} key={index} className='d-flex justify-content-between align-items-center blue-box mb-2' style={{ cursor: 'pointer' }}>
                                    <p className='text'>{text?.question?.replace(/\b\w/g, char => char.toUpperCase())}</p>
                                    <img src={RightBlueArrow} className='me-1 ms-2' width={10} style={{ objectFit: 'contain' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={show2}
                onHide={handleClose2}
                size='lg'
                className='viewModal'
                scrollable
                centered
            >
                <Modal.Header>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                        <div className='header-text'>Suggested Prompts</div>
                        <div onClick={() => handleClose2()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                            <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='viewModal'>
                        <div>
                            {chatSuggestions?.map((text, index) => (
                                <div onClick={() => { routePromptFrruitGPT(text?.prompt_text, 'fund') }} key={index} className='d-flex justify-content-between align-items-center blue-box mb-2' style={{ cursor: 'pointer' }}>
                                    <p className='text'>{text?.prompt_text?.replace(/\b\w/g, char => char.toUpperCase())}</p>
                                    <div>
                                        <img style={{ width: 24, objectFit: 'contain' }} src={quesIcon} className={`my-anchor-element-${index} hide-in-mobile`} />
                                        <img src={RightBlueArrow} className='me-1 ms-3' width={10} style={{ objectFit: 'contain' }} />
                                    </div>
                                    <Tooltip absolute fixed anchorSelect={`.my-anchor-element-${index}`} place="left" className="bg-primary  hide-in-mobile">
                                        <div style={{ width: '370px', fontSize: '14px' }}>
                                            {text?.prompt_description ? text?.prompt_description : text?.prompt_text}</div>
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PopularQuestions