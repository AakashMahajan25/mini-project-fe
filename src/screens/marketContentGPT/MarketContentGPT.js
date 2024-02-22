import React, { useEffect, useRef, useState } from 'react'
import './MarketContentGPT.scss';
import MarketContentGptLeftBox from '../../components/marketContentGptLeftBox/MarketContentGptLeftBox';
import BottomBar from '../../components/marketContentGPT/BottomBar';
import ChatGpt from '../../components/frruitGpt/ChatGpt';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addDocument, clearAttactmentUrl, clearContentChatHistory, getUploadURL, setChatHistory, triggerContentPrompt, triggerDocumentChat, updateUploadURL } from './slice';
import { clearChatHistory } from '../frruitGPT/slice';

function MarketContentGPT() {
    const dispatch = useDispatch();
    const gptRef = useRef(null)
    const [question, setQuestion] = useState('')
    const isNewChat = useRef(true)
    const { chatHistory } = useSelector(state => state.contentGPTSlice);
    const [selectedChat, setSelectedChat] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [showQuestion, setShowQuestion] = useState(false);
    const [promptId, setPromptId] = useState(null);


    useEffect(() => {
        dispatch(clearContentChatHistory())
        dispatch(clearChatHistory())
    }, [])


    useEffect(() => {
        if (chatHistory?.length > 0) {
            const lastChat = chatHistory[chatHistory?.length - 1]
            if (lastChat?.person === "user") {
                scrollToBottom();
            }
        }
    }, [chatHistory])

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
                setQuestion('');
                scrollDown(250)
            })
            .catch(error => {
                setQuestion('');
                toast.error(error?.message)
            })
    }

    const getUrlOfAttchment = async () => {
        if (promptId) {
            askAttachmentContentGpt(promptId,question)
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
                        type: "attachment"
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
                                        setPromptId(res?.prompt_id)
                                        askAttachmentContentGpt(promptId)
                                        setQuestion('');
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
        setQuestion('');
        if(question){
            const requestData = {
                prompt_id: promptId,
                message: title?title:question,
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
        }else{
            
            dispatch(setChatHistory([{
                person: "bot",
                text: "Please ask the question about your Document",
                type: "attachment"
            }]))
        }
    }

    const handleAskPress = (type) => {
        if (type === 'link') {
            handleNewChat()
            if (!question) {
                return;
            }
            // if (isNewChat.current)
            // handleLinkClick()
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
        setPromptId(null)
        setShowQuestion(false)
        setSelectedFile(null)
    }

    const handleHistory = (Id) => {
        // dispatch(getPromptHistory(Id))
        //     .unwrap()
        //     .then(res => {
        //         isNewChat.current = false
        //         setSelectedChat(Id)
        //         scrollToBottom();
        //     })
        //     .catch(error => {
        //         console.log('error', error)
        //     })
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
