import React, { useRef, useState } from 'react'
import './BottomBar.scss'
import AttachIcon from '../../assets/images/fluent_attach-20-regular.png'
import LinkIcon from '../../assets/images/link_icon.png'
import SendIcon from '../../assets/images/send_icon.png'
import DocImg from '../../assets/images/file-upload-img.png'
import CloseIcon from '../../assets/images/close_icon.png'
import UploadDocImg from '../../assets/images/doc-img.png'
import Modal from 'react-bootstrap/Modal';
import { clearAttactmentUrl } from '../../screens/marketContentGPT/slice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import CloseImg from '../../assets/images/close_icon.png';

function BottomBar(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [inputValue, setInputValue] = useState('');
    const fileInputRef = useRef(null);
    const [type, setType] = useState(null);
    const dispatch = useDispatch();


    const {
        setQuestion = () => { },
        question = '',
        showQuestion = null,
        selectedFile = null,
        setSelectedFile = () => { },
        handleAskPress = () => { }
    } = props


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleDone = (e) => {
        handleClose2()
        setQuestion(inputValue)
        setInputValue('')
        setType('link')
    }

    const handleAttachDone = (e) => {
        handleClose()
        setType('attachment')
    }

    const handleRemove = (event) => {
        event.stopPropagation();
        setQuestion('')
        setSelectedFile(null);
        dispatch(clearAttactmentUrl())
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAskPress();
        }
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // setSelectedFile(file);
            const modifiedName = addTimestampToFileName(file.name);
            const modifiedFile = new File([file], modifiedName, { type: file.type });
            setSelectedFile(modifiedFile);
        } else {
            setSelectedFile(null);
        }
    };

    const addTimestampToFileName = (fileName) => {
        const timestamp = Date.now();
        const parts = fileName.split('.');
        const extension = parts.pop();
        const newName = `${parts.join('.')}_${timestamp}.${extension}`;
        return newName;
    };
    const handleChange = (e) => {
        setQuestion(e.target.value)
    }


    return (
        <>
            <div className='BottomBar'>
                {!showQuestion &&
                    <div className='attachment' onClick={handleShow}>
                        <div>
                            {(selectedFile && !show && !showQuestion) && <div>
                                <div className='attached-document-text'>Attached Document</div>
                                <div className='d-flex'>
                                    <div className='attached-doc-white-box'>
                                        <img src={UploadDocImg} width={44} style={{ objectFit: 'contain' }} />
                                        <div className='pdf-name me-2'>{selectedFile?.name}</div>
                                        <img src={CloseIcon} width={16} style={{ objectFit: 'contain', cursor: 'pointer' }} onClick={handleRemove} />
                                    </div>
                                </div>
                                <div className='select-text-css'>Summary</div>
                                <div className='bottom-boder-css'></div>
                            </div>}
                            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: 44 }}>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <p className='attach-text'>Attach</p>
                                    <img src={AttachIcon} className='img-styles' />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {showQuestion && <div class="form-group">
                    <input
                        class="form-control"
                        value={question}
                        onChange={handleChange}
                        placeholder="Type your message here"
                        onKeyDown={handleKeyPress}
                    />
                </div>}
                {!showQuestion && <div className='linkUrl' onClick={handleShow2}>
                    <div>
                        {(question && type === 'link') &&
                            <div>
                                <div className='url-text'>URL</div>
                                <div className='d-flex'>
                                    <div className='url-white-box'>
                                        <div className='url-name me-2'>{question}</div>
                                        <img src={CloseIcon} width={16} style={{ objectFit: 'contain', cursor: 'pointer' }} onClick={handleRemove} />
                                    </div>
                                </div>
                            </div>}
                        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: 44 }}>
                            <div className='d-flex justify-content-center align-items-center'>
                                <p className='linkUrl-text'>Link URL</p>
                                <img src={LinkIcon} className='img-styles' />
                            </div>
                        </div>
                    </div>
                </div>}
                <div className='sendIcon' onClick={() => handleAskPress(type)}>
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
                <Modal.Header>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                        <div className='header-text'>Attach Documents</div>
                        <div onClick={() => handleClose()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                            <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {selectedFile ? <div className='upload-img-box' onClick={handleUploadButtonClick}>
                        <img src={UploadDocImg} width={44} style={{ objectFit: 'contain', marginBottom: 6 }} />
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            multiple={false}
                        />
                        <div className='header-title mb-2'>Attached Document</div>
                        <div className='doc-jpg-text' style={{ color: '#4563E4' }}>{selectedFile?.name}</div>
                    </div>
                        :
                        <div className='upload-img-box' onClick={handleUploadButtonClick}>
                            <img src={DocImg} width={44} style={{ objectFit: 'contain', marginBottom: 6 }} />
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple={false}
                            />
                            <div className='header-title mb-2'>Attach Document</div>
                            <div className='doc-jpg-text'>(Accepted format: pdf, docx)</div>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <div className='footer-header-text'>Select the following to get the data about the Document: </div>
                    <div className='select-btn-class'>
                        <div className='selected'>Summary</div>
                        <div className='unSelected'>Key Highlights</div>
                        <div className='unSelected'>Sentiments</div>
                        <div className='unSelected'>Select All</div>
                    </div>
                    <div className='d-flex justify-content-end align-items-center'>
                        <button onClick={handleAttachDone} type="submit" className='blue-btn'>Done</button>
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
                <Modal.Header>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                        <div className='header-text'>Paste youtube link here</div>
                        <div onClick={() => handleClose2()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                            <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className="form-control form-control-input"
                        placeholder='URL'
                        style={{ color: 'black', textIndent: 5 }}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex justify-content-end align-items-center'>
                        <button onClick={handleDone} type="submit" className='blue-btn'>Done</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BottomBar
