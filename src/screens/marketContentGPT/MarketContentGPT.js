import React, { useEffect, useRef, useState } from 'react'
import './MarketContentGPT.scss';
import MarketContentGptLeftBox from '../../components/marketContentGptLeftBox/MarketContentGptLeftBox';
import BottomBar from '../../components/marketContentGPT/BottomBar';
import ChatGpt from '../../components/frruitGpt/ChatGpt';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearChatHistory, setChatHistory, triggerContentPrompt } from './slice';

function MarketContentGPT() {
    const dispatch = useDispatch();
    const gptRef = useRef(null)
    const [question, setQuestion] = useState('')
    const isNewChat = useRef(true)
    const { chatHistory } = useSelector(state => state.contentGPTSlice);
    const [selectedChat, setSelectedChat] = useState(null)


    useEffect(() => {
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
        const searchText = question
        setQuestion('');
        const requestData = {
            link: question
        }
        console.log('requestData', requestData)
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

    const handleAskPress = () => {
        handleNewChat()
        if (!question) {
            return;
        }
        // if (isNewChat.current)
        // handleLinkClick()
        else
        askContentGpt(null, null)
    }

    const handleNewChat = () => {
        isNewChat.current = true
        dispatch(clearChatHistory())
        setSelectedChat(null)
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
                        <ChatGpt  containerRef={gptRef}/>
                        <BottomBar 
                        handleNewChat={handleNewChat}
                         setQuestion={setQuestion}
                         question={question}
                         handleAskPress={handleAskPress}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarketContentGPT
