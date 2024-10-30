import React from 'react'
import CloseImg from '../../assets/images/close_icon.png';
import RocketImage from '../../assets/images/RocketImage.png';
import Modal from 'react-bootstrap/Modal';
import './ActivateWebSearch.scss';

function ActivateWebSearch({ show2, handleClose2, handleClose1 }) {
    return (
        <>
            <Modal
                show={show2}
                onHide={handleClose2}
                size='lg'
                className='ActivateWebSearchStyles'
                centered
            >
                <Modal.Header className='header'>
                    <div onClick={() => handleClose2()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                        <img src={CloseImg} className='me-1 closeimage' width={32} style={{ objectFit: 'contain' }} />
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='centerImg'>
                        <img src={RocketImage} className='RocketImageImg' />
                        <div className='webSearchText'>Activate Web Search to enhance your news search experience!</div>
                        <div className='subheading'>
                            By enabling this feature, Frruit will not only pull results from premium data sources but also extend the search across the internet, providing you with even broader insights. Please note that activating web search incurs an additional <b>3-credit</b> charge per search.
                        </div>
                        <div className='proceed-text text-center'>
                            Do you want to proceed?
                        </div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <button onClick={() => handleClose1()} type="submit" className='blue-btn'>Proceed</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ActivateWebSearch