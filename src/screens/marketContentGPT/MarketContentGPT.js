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
    const [fileName, setFileName] = useState('');


    useEffect(() => {
        dispatch(clearContentChatHistory())
        dispatch(getContentPromptList())
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
        dispatch(setChatHistory([{
            person: "user",
            text: requestData?.link,
            type: "text"
        }]))

        dispatch(triggerContentPrompt(requestData))
            .unwrap()
            .then(res => {
                dispatch(getContentPromptList('link'))
                setSelectedChat(res.prompt_id)
                setQuestion('');
                scrollDown(500)
            })
            .catch(error => {
                setQuestion('');
                toast.error(error?.message)
            })
    }

    const getUrlOfAttchment = async () => {
        if (!selectedFile) return;
        try {
            const res = await dispatch(getUploadURL(selectedFile)).unwrap();
            const data = { url: res.data, file: selectedFile };
            setShowQuestion(true);
            const updateRes = await dispatch(updateUploadURL(data)).unwrap();
            if (updateRes.status === 200) {
                const requestData = {
                    object_key: selectedFile?.name,
                    file_name: selectedFile?.name,
                };
                const documentRes = await dispatch(addDocument(requestData)).unwrap();
                setSelectedChat(documentRes?.prompt_id);
                askAttachmentContentGpt(documentRes?.prompt_id, question);
                dispatch(getContentPromptList('attachment'));
                isNewChat.current = false;
            }
        } catch (error) {
            clearQuestionAndToastError(error);
        }
    }

    const askAttachmentContentGpt = async (promptId, title) => {
        setQuestion('');
        if (question) {
            const requestData = {
                prompt_id: promptId,
                message: title ? title : question,
            };
            dispatch(setChatHistory([{
                person: "user",
                text: requestData.message,
                type: "text"
            }]));
            try {
                dispatch(triggerDocumentChat(requestData)).unwrap()
                    .then(res => {
                        setQuestion('');
                        scrollDown(250);
                        setSelectedFile(null)
                    });
            } catch (error) {
                clearQuestionAndToastError(error);
            }
        }
    }

    const handleAskPress = async (type) => {
        if (type === 'link') {
            if (!question) return;
            handleNewChat()
            askContentGpt(null, null);
        } else if (type === 'attachment' || selectedType === 'attachment') {
            if (isNewChat.current) {
                setFileName(selectedFile?.name)
                await getUrlOfAttchment();
            } else {
                askAttachmentContentGpt(selectedChat, question);
            }
        }
    };

    const handleNewChat = () => {
        isNewChat.current = true
        dispatch(clearContentChatHistory())
        setSelectedChat(null)
        setShowQuestion(false)
        setSelectedFile(null)
    }

    const handleHistory = (Id, type, name) => {
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
            })
            .catch(error => {
                console.log('error', error)
            })
    }

    return (
        <>
            <div className='market-content-gpt-css'>
                <div className='row justify-content-between m-0'>
                    <div className='col-lg-3 column-pad'>
                        <MarketContentGptLeftBox
                            handleNewChat={handleNewChat}
                            handleHistory={handleHistory}
                            selectedChat={selectedChat}
                            setShowQuestion={setShowQuestion}
                        />
                    </div>
                    <div className='col-lg-9 column-pad position-relative'>
                        <ChatGpt containerRef={gptRef} newChat={isNewChat.current} docStatus={true} docName={fileName} />
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
        </>
    )
}

export default MarketContentGPT
