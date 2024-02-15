import React, { useState } from 'react'
import './BottomBar.scss'
import AttachIcon from '../../assets/images/fluent_attach-20-regular.png'
import LinkIcon from '../../assets/images/link_icon.png'
import SendIcon from '../../assets/images/send_icon.png'
import DocImg from '../../assets/images/file-upload-img.png'
import CloseIcon from '../../assets/images/close_icon.png'
import UploadDocImg from '../../assets/images/doc-img.png'
import Modal from 'react-bootstrap/Modal';

function BottomBar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    return (
        <>
            <div className='BottomBar'>
                <div className='attachment' onClick={handleShow}>
                    <div>
                        <div>
                            <div className='attached-document-text'>Attached Document</div>
                            <div className='d-flex'>
                                <div className='attached-doc-white-box'>
                                    <img src={UploadDocImg} width={44} style={{ objectFit: 'contain' }} />
                                    <div className='pdf-name me-2'>document.pdf</div>
                                    <img src={CloseIcon} width={16} style={{ objectFit: 'contain', cursor: 'pointer' }} />
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: 44 }}>
                            <div className='d-flex justify-content-center align-items-center'>
                                <p className='attach-text'>Attach</p>
                                <img src={AttachIcon} className='img-styles' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='linkUrl' onClick={handleShow2}>
                    <div>
                        <div>
                            <div className='url-text'>URL</div>
                            <div className='d-flex'>
                                <div className='url-white-box'>
                                    <div className='url-name me-2'>https://www.youtube.com/watch?v=_SkmYu84zIw&ab_channel</div>
                                    <img src={CloseIcon} width={16} style={{ objectFit: 'contain', cursor: 'pointer' }} />
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: 44 }}>
                            <div className='d-flex justify-content-center align-items-center'>
                                <p className='linkUrl-text'>Link URL</p>
                                <img src={LinkIcon} className='img-styles' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='sendIcon'>
                    <img src={SendIcon} className='sendIcon-styles' />
                </div>
            </div>
            <Modal show={show}
                onHide={handleClose}
                size='lg'
                centered
                className='Attach-modal'
                scrollable
            >
                <Modal.Header closeButton>
                    <div className='header-title'>Attach Documents</div>
                </Modal.Header>
                <Modal.Body>
                    <div className='upload-img-box'>
                        <img src={DocImg} width={44} style={{ objectFit: 'contain', marginBottom: 6 }} />
                        <div className='header-title mb-2'>Attach Document</div>
                        <div className='doc-jpg-text'>(Accepted format: jpg, png, pdf, docx)</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex justify-content-end align-items-center'>
                        <button onClick={handleClose} type="submit" className='blue-btn'>Done</button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Modal show={show2}
                onHide={handleClose2}
                size='lg'
                centered
                className='Attach-modal'
                scrollable
            >
                <Modal.Header closeButton>
                    <div className='header-title'>Paste youtube link here</div>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className="form-control form-control-input"
                        placeholder='URL'
                        style={{ color: 'black', textIndent: 5 }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex justify-content-end align-items-center'>
                        <button onClick={handleClose2} type="submit" className='blue-btn'>Done</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BottomBar
