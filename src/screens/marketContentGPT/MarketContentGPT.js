import React, { useEffect, useRef, useState } from 'react'
import './MarketContentGPT.scss';
import MarketContentGptLeftBox from '../../components/marketContentGptLeftBox/MarketContentGptLeftBox';
import BottomBar from '../../components/marketContentGPT/BottomBar';
import ChatGpt from '../../components/frruitGpt/ChatGpt';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addDocument, clearContentChatHistory, deleteContentPrompt, getContentPromptHistory, getContentPromptList, getUploadURL, setCancelTokens, setChatHistory, triggerContentAttachmentGraph, triggerContentLinkGraph, triggerContentPrompt, triggerDocumentChat, updateUploadURL } from './slice';
import { clearChatHistory } from '../frruitGPT/slice';
import Modal from 'react-bootstrap/Modal';
import CloseImg from '../../assets/images/close_icon.png';
import HistoryImg from '../../assets/images/history_icon.png';
import axios from 'axios';
import { replaceSpaceWithUnderscore } from '../../utils/utils';
import ReactGA from 'react-ga4';
import Offcanvas from 'react-bootstrap/Offcanvas';
// import CloseImg from '../../assets/images/close_icon.png';

function MarketContentGPT() {
    const dispatch = useDispatch();
    const gptRef = useRef(null)
    const [question, setQuestion] = useState('')
    const isNewChat = useRef(true)
    const { contentChatHistory, cancelTokens } = useSelector(state => state.contentGPTSlice);
    const [selectedChat, setSelectedChat] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [showQuestion, setShowQuestion] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [fileName, setFileName] = useState('');
    const [show2, setShow2] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showHistory, setShowHistory] = useState(false);
    const handleHistoryClose = () => setShowHistory(false);
    const handleHistoryShow = () => setShowHistory(true);

    useEffect(() => {
        dispatch(clearContentChatHistory())
        dispatch(getContentPromptList('link'))
        dispatch(clearChatHistory())
    }, [])

    const scrollToBottom = () => {
        if (gptRef.current) {
            gptRef.current.scrollTop = gptRef.current.scrollHeight;
        }
    };

    const scrollDown = (amount) => {
        if (gptRef.current) {
            gptRef.current.scrollTop += amount;
        }
    };

    const clearQuestionAndToastError = (error) => {
        setQuestion('');
        toast.error(error?.message);
    };



    useEffect(() => {
        if (contentChatHistory?.length > 0) {
            const lastChat = contentChatHistory[contentChatHistory?.length - 1]
            if (lastChat?.person === "user") {
                scrollToBottom();
            }
        }
    }, [contentChatHistory])

    const askContentGpt = async () => {
        setQuestion('');
        const requestData = {
            link: question
        }

        ReactGA.event({
            category: 'MarketContentGPT',
            action: 'chat_youtube_link',
            label: 'New Chat Youtube Link'
        });

        isNewChat.current = false
        dispatch(setChatHistory([{
            person: "user",
            text: requestData?.link,
            type: "text"
        }]))
        const token = axios.CancelToken.source()
        dispatch(setCancelTokens(token))

        dispatch(triggerContentPrompt({ requestData, cancelToken: token }))
            .unwrap()
            .then(res => {
                scrollDown(500)
                if (res && res?.data !== undefined) {
                    const token = axios.CancelToken.source()
                    dispatch(setCancelTokens(token))
                    dispatch(triggerContentLinkGraph({ question, id: res.prompt_id, cancelToken: token })).unwrap()
                        .then(res => {
                            scrollToBottom()
                        })
                }
                dispatch(getContentPromptList('link'))
                setSelectedChat(res.prompt_id)
                setQuestion('');

            })
            .catch(error => {
                setQuestion('');
                if (error?.code != "ERR_CANCELED") {
                    // toast.error(error?.message)
                }
            })
    }

    const getUrlOfAttchment = async () => {
        if (!selectedFile) return;
        try {
            isNewChat.current = false;
            const res = await dispatch(getUploadURL(selectedFile)).unwrap();
            const data = { url: res.data, file: selectedFile };
            setFileName(selectedFile?.name)
            const updateRes = await dispatch(updateUploadURL(data)).unwrap();
            if (updateRes.status === 200) {
                const requestData = {
                    object_key: selectedFile?.name,
                };
                const documentRes = await dispatch(addDocument(requestData)).unwrap();
                setShowQuestion(true);
                setSelectedChat(documentRes?.prompt_id);
                // setSelectedFile(null)
                askAttachmentContentGpt(documentRes?.prompt_id, question);
                dispatch(getContentPromptList('attachment'));
            }
        } catch (error) {
            clearQuestionAndToastError(error);
            setSelectedFile(null)
        }
    }

    const askAttachmentContentGpt = async (promptId, title) => {
        const token = axios.CancelToken.source()
        setQuestion('');
        ReactGA.event({
            category: 'MarketContentGPT',
            action: 'chat_document_upload',
            label: 'New Chat Document Upload'
        });
        if (!question) {
            dispatch(setChatHistory([{
                person: "bot",
                text: "Please ask the question about your Document",
                type: "attachment"
            }]));
            return;
        }
        const requestData = {
            prompt_id: promptId,
            message: title ? title : question,
        };
        dispatch(setChatHistory([{
            person: "user",
            text: requestData.message,
            type: "text"
        }]));
        dispatch(setCancelTokens(token))
        try {
            dispatch(triggerDocumentChat({ requestData, cancelToken: token })).unwrap()
                .then(res => {
                    scrollToBottom()
                    if (res && selectedFile) {
                        const token = axios.CancelToken.source()
                        dispatch(setCancelTokens(token))
                        dispatch(triggerContentAttachmentGraph({ question: selectedFile?.name, id: promptId, cancelToken: token })).unwrap()
                            .then(res => {
                                scrollToBottom()
                            })
                    }
                    setQuestion('');
                    setSelectedFile(null)
                });
        } catch (error) {
            if (error?.code != "ERR_CANCELED")
                clearQuestionAndToastError(error);
        }
    }

    const handleAskPress = async (type) => {
        if (type === 'link') {
            if (!question) return;
            handleNewChat()
            askContentGpt(null, null);
        } else if (type === 'attachment' || selectedType === 'attachment') {
            setSelectedType(type)
            if (isNewChat.current) {
                await getUrlOfAttchment();
            } else {
                askAttachmentContentGpt(selectedChat, question);
            }
        }
    };

    const handleNewChat = () => {
        setShowHistory(false)
        isNewChat.current = true
        dispatch(clearContentChatHistory())
        setSelectedChat(null)
        setShowQuestion(false)
        setSelectedFile(null)
    }

    const handleHistory = (Id, type, name) => {
        if (cancelTokens)
            cancelTokens.cancel("cancelled")
        dispatch(getContentPromptHistory(Id))
            .unwrap()
            .then(res => {
                isNewChat.current = false
                setSelectedChat(Id)
                scrollToBottom();
                if (name) {
                    setFileName(name)
                }
                if (type === 'attachment') {
                    setShowQuestion(true)
                }
                setSelectedType(type)
                setShowHistory(false)
            })
            .catch(error => {
                console.log('error', error)
            })
    }
    const handleClose2 = () => {
        setShow2(false);
        setDeleteId(null)
    }

    const handleShow2 = (event, id) => {
        event.stopPropagation();
        setShow2(true);
        setDeleteId(id)
    }
    const handleDeleteChat = async () => {
        setShow2(false);
        await dispatch(deleteContentPrompt(deleteId))
        await dispatch(getContentPromptList(selectedType ? selectedType : 'link'))
        if (deleteId === selectedChat) {
            isNewChat.current = true
            dispatch(clearContentChatHistory())
            setShowQuestion(false)
        }
    }
    const leftBoxComponent = (
        <MarketContentGptLeftBox
            handleNewChat={handleNewChat}
            handleHistory={handleHistory}
            selectedChat={selectedChat}
            setShowQuestion={setShowQuestion}
            handleShow2={handleShow2}
        />
    );

    return (
        <>
            <div className='market-content-gpt-css'>
                <div className='row justify-content-between m-0'>
                    <div className='col-lg-3 col-md-4 column-pad marketContentGptLeftBoxHideClass'>
                        {leftBoxComponent}
                    </div>
                    <div className='col-lg-9 col-md-8 column-pad position-relative'>
                        <div className='hide-on-large-screens'><img src={HistoryImg} onClick={handleHistoryShow} className='history-icon-css' /></div>
                        <ChatGpt containerRef={gptRef} newChat={isNewChat.current} docStatus={true} docName={fileName} selectedType={selectedType} />
                        <BottomBar
                            handleNewChat={handleNewChat}
                            setQuestion={setQuestion}
                            question={question}
                            setSelectedFile={setSelectedFile}
                            selectedFile={selectedFile}
                            showQuestion={showQuestion}
                            selectedType={selectedType}
                            handleAskPress={handleAskPress}
                        />
                    </div>
                </div>
            </div>

            <Modal show={show2}
                onHide={handleClose2}
                size='md'
                centered
                className='marketGpt-left-box-modal'

            >
                <Modal.Header>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                        <div className='header-text'>Are you sure you want to Delete ?</div>
                        <div onClick={() => handleClose2()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                            <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-text-css'>Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry</div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex justify-content-center align-items-center'>
                        <button onClick={handleClose2} type="submit" className='light-blue-btn2 mx-2 px-5'>Cancel</button>
                        <button onClick={handleDeleteChat} type="submit" className='blue-btn mx-2 px-5'>Delete</button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Offcanvas show={showHistory} onHide={handleHistoryClose}>
                <Offcanvas.Header>
                    <Offcanvas.Title>History</Offcanvas.Title>
                    <div onClick={() => handleHistoryClose()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                        <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                    </div>
                </Offcanvas.Header>
                <div className='bottom-boder-offcanvas'></div>
                <Offcanvas.Body>
                    {leftBoxComponent}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default MarketContentGPT
