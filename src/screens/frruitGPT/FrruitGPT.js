import React, { useEffect, useRef, useState } from 'react'
import TopBar from '../../components/topBar/TopBar'
import StockPriceScroll from '../../components/stockPriceScroll/StockPriceScroll'
import FrruitGPTLeftBox from '../../components/FrruitGPTLeftBox/FrruitGPTLeftBox'
import LeftBox from '../../components/leftBox/LeftBox'
import PromptsLibrary from '../../components/promptsLibrary/PromptsLibrary'
import BottomSearchBar from '../../components/frruitGpt/BottomSearchBar'
import ChatGpt from '../../components/frruitGpt/ChatGpt'
import { useLocation } from 'react-router-dom'
import { addChatPrompt, clearChatHistory, getPromptHistory, getPromptList, getPromptSuggestion, setChatHistory, triggerFrruitGpt, triggerFrruitGptGraph } from './slice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getStockIndexes } from '../dashboard/slice'

function FrruitGPT() {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const location = useLocation();
    const isNewChat = useRef(true)
    const gptRef = useRef(null)
    const [question, setQuestion] = useState('')
    const [selectedChat, setSelectedChat] = useState(null)

    const { chatHistory } = useSelector(state => state.fruitGPTSlice);

    useEffect(() => {
        dispatch(getPromptSuggestion(5))
        dispatch(getPromptList())
        dispatch(clearChatHistory())
        dispatch(getStockIndexes())
    }, [])

    useEffect(() => {
        if (state?.question && state.question !== '') {
            dispatch(clearChatHistory())
            addFrruitPrompt(state?.question)
            clearState()
        }
    }, [state?.question])

    useEffect(() => {
        if (chatHistory?.length > 0) {
            const lastChat = chatHistory[chatHistory?.length - 1]
            if (lastChat?.person === "user") {
                scrollToBottom();
            }
        }
    }, [chatHistory])    

    const clearState = () => {
        const updatedLocation = {
            ...location,
            state: {}
        };
        window.history.replaceState(updatedLocation, '');
    }

    const handleNewChat = () => {
        isNewChat.current = true
        dispatch(clearChatHistory())
        setSelectedChat(null)
    }

    const handleHistory = (Id) => {
        dispatch(getPromptHistory(Id))
            .unwrap()
            .then(res => {
                isNewChat.current = false
                setSelectedChat(Id)
                scrollToBottom();
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

    const addFrruitPrompt = (title) => {
        dispatch(addChatPrompt({ prompt_text: title }))
            .unwrap()
            .then(res => {
                dispatch(getPromptList())
                setSelectedChat(res.prompt_id);
                isNewChat.current = false
                askFrruitGpt(res.prompt_id, title);
            })
            .catch(error => {
                console.log('error', error);
            })
    }

    const askFrruitGpt = async (promptId, title) => {
        if (!title && !question) {
            return
        }
        const market = localStorage.getItem('marketType')
        const searchText = question
        setQuestion('');
        const requestData = {
            message: title ? title : question,
            prompt_id: promptId ? Number(promptId) : Number(selectedChat),
            market
        }
        dispatch(setChatHistory([{
            person: "user",
            text: requestData?.message,
            type: "text"
        }]))

        dispatch(triggerFrruitGpt(requestData))
            .unwrap()
            .then(res => {
                if (res && res[0] && res[0]?.text !== undefined)
                    dispatch(triggerFrruitGptGraph(requestData))
                setQuestion('');
                scrollDown(250)
            })
            .catch(error => {
                setQuestion(searchText);
                toast.error(error?.message)
            })
    }

    const handleAskPress = () => {
        if (!question) {
            return;
        }
        if (isNewChat.current)
            addFrruitPrompt(question)
        else
            askFrruitGpt(null, null)
    }

    const handlePromptClick = (data) => {
        dispatch(clearChatHistory())
        addFrruitPrompt(data)
    }

    return (
        <>
            <div className='row justify-content-between m-0'>
                {/* <div className='col-lg-3 column-pad'>
                    <FrruitGPTLeftBox
                        handleNewChat={handleNewChat}
                        handleHistory={handleHistory}
                        selectedChat={selectedChat}
                    />
                </div> */}
                <div className='col-lg-12 column-pad position-relative'>
                <FrruitGPTLeftBox
                        handleNewChat={handleNewChat}
                        handleHistory={handleHistory}
                        selectedChat={selectedChat}
                    />
                    <ChatGpt
                        isNewChat={isNewChat.current}
                        containerRef={gptRef}
                    />
                    <PromptsLibrary
                        handlePromptClick={handlePromptClick}
                    />
                    <div className='d-flex align-items-center w-100'>
                    <BottomSearchBar
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

export default FrruitGPT
