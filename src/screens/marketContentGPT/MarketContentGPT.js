import React, { useEffect, useRef, useState } from 'react'
import './MarketContentGPT.scss';
import MarketContentGptLeftBox from '../../components/marketContentGptLeftBox/MarketContentGptLeftBox';
import BottomBar from '../../components/marketContentGPT/BottomBar';
import ChatGpt from '../../components/frruitGpt/ChatGpt';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addDocument, clearAttactmentUrl, clearContentChatHistory, getContentPromptHistory, getContentPromptList, getUploadURL, setChatHistory, triggerContentPrompt, triggerDocumentChat, updateUploadURL } from './slice';
import { clearChatHistory } from '../frruitGPT/slice';

function MarketContentGPT() {
    const dispatch = useDispatch();
    const gptRef = useRef(null)
    const [question, setQuestion] = useState('')
    const isNewChat = useRef(true)
    const { contentChatHistory } = useSelector(state => state.contentGPTSlice);
    const [selectedChat, setSelectedChat] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [showQuestion, setShowQuestion] = useState(false);
    const [selectedType, setSelectedType] = useState(null);


    useEffect(() => {
        dispatch(clearContentChatHistory())
        dispatch(getContentPromptList())
        dispatch(clearChatHistory())
    }, [])


    useEffect(() => {
        if (contentChatHistory?.length > 0) {
            const lastChat = contentChatHistory[contentChatHistory?.length - 1]
            if (lastChat?.person === "user") {
                scrollToBottom();
            }
        }
    }, [contentChatHistory])

    const askContentGpt = async (promptId, title) => {
        // const searchText = question
        setQuestion('');
        const requestData = {
            link: question
        }
        dispatch(setChatHistory([{
            person: "user",
            text: requestData?.link,
            type: "text"
        }]))

        dispatch(triggerContentPrompt(requestData))
            .unwrap()
            .then(res => {
                dispatch(getContentPromptList('link'))
                setQuestion('');
                scrollDown(250)
            })
            .catch(error => {
                setQuestion('');
                toast.error(error?.message)
            })
    }

    
    console.log('selectedType', selectedType)
    const getUrlOfAttchment = async () => {
        if (selectedChat) {
            askAttachmentContentGpt(selectedChat, question)
        }
        else {
            dispatch(getUploadURL(selectedFile))
                .unwrap()
                .then(res => {
                    const data = {
                        url: res?.data,
                        file: selectedFile
                    }
                    dispatch(setChatHistory([{
                        person: "user",
                        text: selectedFile?.name,
                        type: "attach"
                    }]))
                    setShowQuestion(true)
                    dispatch(updateUploadURL(data))
                        .unwrap()
                        .then(res => {
                            if (res.status === 200) {
                                dispatch(clearAttactmentUrl())
                                const requestData = {
                                    object_key: selectedFile?.name,
                                    file_name: selectedFile?.name,
                                }
                                dispatch(addDocument(requestData))
                                    .unwrap()
                                    .then(res => {
                                        setSelectedChat(res?.prompt_id)
                                        askAttachmentContentGpt(res?.prompt_id)
                                        setQuestion('');
                                        dispatch(getContentPromptList('attachment'))
                                        // setSelectedFile(null)
                                    })
                                    .catch(error => {
                                        setQuestion('');
                                        toast.error(error?.message)
                                    })
                            }
                        })
                })
                .catch(error => {
                    toast.error(error?.message)
                })
        }
    }

    const askAttachmentContentGpt = async (promptId, title) => {
        // setQuestion('');
        if (question) {
            const requestData = {
                prompt_id: promptId,
                message: title ? title : question,
            }
            dispatch(setChatHistory([{
                person: "user",
                text: requestData?.message,
                type: "text"
            }]))

            dispatch(triggerDocumentChat(requestData))
                .unwrap()
                .then(res => {
                    setQuestion('');
                    scrollDown(250)
                })
                .catch(error => {
                    setQuestion('');
                    toast.error(error?.message)
                })
        } else {
            dispatch(setChatHistory([{
                person: "bot",
                text: "Please ask the question about your Document",
                type: "attachment"
            }]))
        }
    }

    const handleAskPress = (type) => {
        if (type === 'link') {
            if (!question) {
                return;
            }
            // if (isNewChat.current)
            // handleNewChat()
            else
            askContentGpt(null, null)
        }
        else if (type === 'attachment') {
            setQuestion(selectedFile?.name)
            if (!selectedFile?.name) {
                return;
            }
            else
                getUrlOfAttchment(null, null)
        }
    }

    const handleNewChat = () => {
        isNewChat.current = true
        dispatch(clearContentChatHistory())
        setSelectedChat(null)
        setShowQuestion(false)
        setSelectedFile(null)
    }

    const handleHistory = (Id,type) => {
        dispatch(getContentPromptHistory(Id))
            .unwrap()
            .then(res => {
                isNewChat.current = false
                setSelectedChat(Id)
                scrollToBottom();
                setShowQuestion(true)
                setSelectedType(type)
            })
            .catch(error => {
                console.log('error', error)
            })
    }

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


    return (
        <>
            <div className='market-content-gpt-css'>
                <div className='row justify-content-between m-0'>
                    <div className='col-lg-3 column-pad'>
                        <MarketContentGptLeftBox
                            handleNewChat={handleNewChat}
                            handleHistory={handleHistory}
                            selectedChat={selectedChat}
                        />
                    </div>
                    <div className='col-lg-9 column-pad position-relative'>
                        <ChatGpt containerRef={gptRef} />
                        <BottomBar
                            handleNewChat={handleNewChat}
                            setQuestion={setQuestion}
                            question={question}
                            setSelectedFile={setSelectedFile}
                            selectedFile={selectedFile}
                            showQuestion={showQuestion}
                            handleAskPress={handleAskPress}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarketContentGPT
