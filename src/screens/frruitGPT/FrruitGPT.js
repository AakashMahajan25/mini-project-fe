import React, { useEffect, useRef, useState } from 'react'
import TopBar from '../../components/topBar/TopBar'
import StockPriceScroll from '../../components/stockPriceScroll/StockPriceScroll'
import FrruitGPTLeftBox from '../../components/FrruitGPTLeftBox/FrruitGPTLeftBox'
import LeftBox from '../../components/leftBox/LeftBox'
import PromptsLibrary from '../../components/promptsLibrary/PromptsLibrary'
import BottomSearchBar from '../../components/frruitGpt/BottomSearchBar'
import ChatGpt from '../../components/frruitGpt/ChatGpt'
import { useLocation } from 'react-router-dom'
import { addChatPrompt, clearChatHistory, deletePrompt, getPromptHistory, getPromptList, getPromptSuggestion, setChatHistory, triggerFrruitGpt, triggerFrruitGptGraph } from './slice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getStockIndexes } from '../dashboard/slice'
import { clearContentChatHistory, setCancelTokens } from '../marketContentGPT/slice'
import Modal from 'react-bootstrap/Modal';
import CloseImg from '../../assets/images/close_icon.png';
import axios from 'axios';
import ReactGA from 'react-ga4';
import './FrruitGPT.scss';
import HistoryImg from '../../assets/images/history_icon.png';
import Offcanvas from 'react-bootstrap/Offcanvas';
import BackArrowIcon from '../../assets/images/back-btn-arrow.png'
import { createSocket } from '../../utils/socket'
import CloseImage from '../../assets/images/close_icon.png'
import SelectedFlagIcon from '../../assets/images/selected-flag.png'
import WhiteChevronImg from '../../assets/images/white-dropdown.png'

// Flag components
const FlagIcon = ({ countryCode, size = 20, className = '' }) => {
    const flagUrls = {
        'US': 'https://flagcdn.com/32x24/us.png',
        'IN': 'https://flagcdn.com/32x24/in.png',
        'GB': 'https://flagcdn.com/32x24/gb.png',
        'CA': 'https://flagcdn.com/32x24/ca.png',
        'AU': 'https://flagcdn.com/32x24/au.png',
        'DE': 'https://flagcdn.com/32x24/de.png',
        'FR': 'https://flagcdn.com/32x24/fr.png',
        'JP': 'https://flagcdn.com/32x24/jp.png',
        'CN': 'https://flagcdn.com/32x24/cn.png',
        'BR': 'https://flagcdn.com/32x24/br.png'
    };

    const flagUrl = flagUrls[countryCode];

    if (!flagUrl) {
        return <span style={{ fontSize: '16px' }}>🏳️</span>;
    }

    return (
        <img
            src={flagUrl}
            alt={`${countryCode} flag`}
            className={className}
            style={{
                width: size,
                height: size * 0.75,
                objectFit: 'contain',
                borderRadius: '2px',
                display: 'block'
            }}
        />
    );
};

function FrruitGPT() {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const location = useLocation();
    const isNewChat = useRef(true)
    const gptRef = useRef(null)
    const [question, setQuestion] = useState('')
    const [selectedChat, setSelectedChat] = useState(null)
    const [show2, setShow2] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [flag, setFlag] = useState('news')
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [buttonStart, setButtonStart] = useState(true);

    const { chatHistory } = useSelector(state => state.fruitGPTSlice);
    const { cancelTokens } = useSelector(state => state.contentGPTSlice);
    const [showHistory, setShowHistory] = useState(false);
    const [showPromptsLibrary, setShowPromptsLibrary] = useState(false);
    const [show, setShow] = useState(false)
    const handleHistoryClose = () => setShowHistory(false);
    const handleHistoryShow = () => setShowHistory(true);
    const [fundamental, setFundamental] = useState('');
    const [streamData, setStreamData] = useState('')
    const [streamLinks, setStreamLinks] = useState([])
    const [streamInitiated, setStreamInitiated] = useState(false)
    const [streamFlag, setStreamFlag] = useState(null)

    // Country selector states
    const countries = [
        { code: 'IN', name: 'India Markets' },
        { code: 'US', name: 'US Markets' },
    ];

    const [selectedCountry, setSelectedCountry] = useState(() => {
        // Initialize from localStorage or default to India
        const savedCountryCode = localStorage.getItem("selectedCountry");

        if (savedCountryCode) {
            const savedCountryObj = countries.find(
                (country) => country.code === savedCountryCode
            );
            if (savedCountryObj) {
                return savedCountryObj.name;
            } else {
                // Invalid code in localStorage, reset to default
                localStorage.setItem("selectedCountry", "IN");
                return "India Markets";
            }
        }
        // No saved value, set default
        localStorage.setItem("selectedCountry", "IN");
        return "India Markets";
    });

    const [showCountryModal, setShowCountryModal] = useState(false);

    useEffect(() => {
        dispatch(getPromptSuggestion())
        dispatch(getPromptList())
        dispatch(clearChatHistory())
        // dispatch(getStockIndexes())
        dispatch(clearContentChatHistory())
        setIsFirstRender(false)
    }, [])

    useEffect(() => {
        if (state?.question && state.question !== '') {
            setFlag(state?.fundamental)
            dispatch(clearChatHistory())
            addFrruitPrompt(state?.question, state?.fundamental)
            clearState()
            setIsFirstRender(false)
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
        if (cancelTokens)
            cancelTokens.cancel("cancelled")
        isNewChat.current = true
        dispatch(clearChatHistory())
        setShowHistory(false)
        setSelectedChat(null)
        setQuestion('')
        setFlag('news')
        clearStreamData();
    }

    const handleHistory = (Id) => {
        clearStreamData();
        if (cancelTokens)
            cancelTokens.cancel("cancelled")
        dispatch(getPromptHistory(Id))
            .unwrap()
            .then(res => {
                isNewChat.current = false
                setSelectedChat(Id)
                scrollToBottom();
                setShowHistory(false)
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

    const addFrruitPrompt = (title, customFlag='') => {
        setButtonStart(false)
        dispatch(addChatPrompt({ prompt_text: title }))
            .unwrap()
            .then(res => {
                dispatch(getPromptList())
                setSelectedChat(res.prompt_id);
                if(customFlag)
                    askFrruitGpt(res.prompt_id, title, customFlag);
                else
                    askFrruitGpt(res.prompt_id, title);

            })
            .catch(error => {
                setButtonStart(true)
                console.log('error', error);
            })
    }

    const askFrruitGpt = async (promptId, title, customFlag='') => {
        const actualFlag = customFlag ? customFlag : flag
        if (streamData) {
            dispatch(setChatHistory([{
                person: "bot",
                text: streamData,
                type: "text",
                link: streamLinks,
                focus_type: streamFlag
            }]))
            clearStreamData();
        }
        if(actualFlag !== 'screener')
            setStreamInitiated(true)
        setButtonStart(false)
        if (!title && !question) {
            return
        }

        ReactGA.event({
            category: 'Frruitgpt',
            action: 'newchat_gpt_question',
            label: 'New chat for GPT question'
        });
        const market = localStorage.getItem('selectedCountry')
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

        const token = axios.CancelToken.source()
        dispatch(setCancelTokens(token))

        // if ((isFirstRender || isNewChat.current) ? (state?.fundamental && state?.fundamental === true) ? false : flag === "news" : flag === "news")
        if ((flag)) {
            requestData["flag"] = actualFlag
            setStreamFlag(actualFlag)
        }

        isNewChat.current = false

        if (requestData?.flag === 'screener') {
            dispatch(triggerFrruitGpt({ requestData, cancelToken: token }))
                .unwrap()
                .then(res => {
                    if (res && res[0] && res[0]?.text !== undefined) {
                        const token = axios.CancelToken.source()
                        dispatch(setCancelTokens(token))
                        dispatch(triggerFrruitGptGraph({ requestData, cancelToken: token }))
                    }
                    setQuestion('');
                    scrollDown(250)
                    setButtonStart(true)
                    setFundamental('')
                })
                .catch(error => {
                    setButtonStart(true)
                    setQuestion(searchText);
                    setFundamental('')
                    if (error?.code != "ERR_CANCELED")
                        toast.error(error?.message)
                })
        } else {
            const apitoken = localStorage.getItem('token');
            const selectedCountry = localStorage.getItem('selectedCountry');
            const countryCode = selectedCountry || 'IN'; // selectedCountry already contains the country code

            // Create a new socket instance with the correct market parameter
            const currentSocket = createSocket(countryCode);

            currentSocket.auth = {
                token: apitoken,
                market: countryCode
            };

            currentSocket.connect();

            // Include country in the request data
            const requestDataWithCountry = {
                ...requestData,
                market: countryCode
            };

            currentSocket.emit('chatStream', requestDataWithCountry);
            currentSocket.on("response", (data) => {
                setStreamData(prev => prev + data.data)
                scrollToBottom()
            });

            currentSocket.on("end", (endData) => {
                stopStream(currentSocket);
                if (endData && endData?.data?.length > 0)
                    setStreamLinks(endData?.data)
            });

            currentSocket.on("error", (error) => {
                clearStreamData(currentSocket);
                setStreamInitiated(false)
                setButtonStart(true)
                setQuestion(searchText);
                toast.error(error?.message || "Something went wrong, Please try again.");
            });
        }
    }

    const clearStreamData = (socketInstance = null) => {
        setStreamData('')
        setStreamLinks([])
        setStreamFlag(null)
        stopStream(socketInstance);
    }

    const stopStream = (socketInstance = null) => {
        const targetSocket = socketInstance || createSocket();
        targetSocket.off("response");
        targetSocket.off("end");
        targetSocket.off("error");
        targetSocket.disconnect();
        setStreamInitiated(false)
        setButtonStart(true)
    }

    const handleAskPress = () => {
        if (!question) {
            return;
        }
        if(question?.trim()?.length < 12 && flag !== 'news'){
            toast.error("Please rephrase the question to a minimum of 12 characters.");
            return;
        }
        if (isNewChat.current)
            addFrruitPrompt(question)
        else
            askFrruitGpt(null, null)
    }

    const handlePromptClick = (data) => {
        ReactGA.event({
            category: 'Frruitgpt',
            action: 'prompt_library_click',
            label: 'Prompt Library Click'
        });

        dispatch(clearChatHistory())
        addFrruitPrompt(data)
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
        if (deleteId === selectedChat) {
            if (cancelTokens)
                cancelTokens.cancel("cancelled")
        }
        await dispatch(deletePrompt(deleteId))
        await dispatch(getPromptList())
        if (deleteId === selectedChat) {
            isNewChat.current = true
            dispatch(clearChatHistory())
        }
    }

    // Country selector handlers
    const handleCountryShow = () => setShowCountryModal(true);
    const handleCountryClose = () => setShowCountryModal(false);

    const handleCountrySelectMobile = (countryName) => {
        // Prevent selection if already selected
        if (selectedCountry === countryName) {
            return;
        }

        setSelectedCountry(countryName);

        // Find the country code and store it in localStorage
        const selectedCountryObj = countries.find(
            (country) => country.name === countryName
        );

        if (selectedCountryObj) {
            localStorage.setItem("selectedCountry", selectedCountryObj.code);
        } else {
            console.log("ERROR: Country object not found!");
        }
    };
    const leftBoxComponent = (
        <FrruitGPTLeftBox
            handleNewChat={handleNewChat}
            handleHistory={handleHistory}
            selectedChat={selectedChat}
            handleShow2={handleShow2}
        />
    );

    return (
        <>
            <div className='frruitGPTPageCss'>
                {/* <div className=''> */}
                {/* <div className='col-lg-3 column-pad'>
                    <FrruitGPTLeftBox
                        handleNewChat={handleNewChat}
                        handleHistory={handleHistory}
                        selectedChat={selectedChat}
                    />
                </div> */}
                <div className='row justify-content-between m-0 column-pad position-relative'>
                    <div className='col-xl-3 col-md-3 col-sm-3 column-pad frruitGPTLeftBoxHideClass'>
                        {leftBoxComponent}
                    </div>
                    <div className='col-xl-9 col-md-9 col-sm-9 column-pad'>
                        <div className='hide-on-large-screens'>
                            <div>Frruit GPT</div>
                            {/* <div>
                                <button className='prompts-btn me-3' onClick={() => setShowPromptsLibrary(!showPromptsLibrary)}>
                                    {/* <img src={BackArrowIcon}/> 
                                    Prompts Library
                                </button>
                                <img src={HistoryImg} onClick={handleHistoryShow} className='history-icon-css' />
                            </div> */}
                        </div>
                        <ChatGpt
                            newChat={isNewChat.current}
                            containerRef={gptRef}
                            streamData={streamData}
                            streamInitiated={streamInitiated}
                            streamLinks={streamLinks}
                        />
                        {/* <PromptsLibrary
                            handlePromptClick={handlePromptClick}
                            show={showPromptsLibrary}
                            setShow={setShowPromptsLibrary}
                            setFlag={setFlag}
                        /> */}
                        <BottomSearchBar
                            setQuestion={setQuestion}
                            question={question}
                            handleAskPress={handleAskPress}
                            flag={flag}
                            setFlag={setFlag}
                            buttonStart={buttonStart}
                            isNewChat={isNewChat.current}
                        />
                    </div>
                </div>
                {/* </div> */}

                <Modal show={show2}
                    onHide={handleClose2}
                    size='md'
                    centered
                    className='marketGpt-left-box-modal'

                >
                    <Modal.Header>
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <div className='header-text'>Confirm Deletion</div>
                            <div onClick={() => handleClose2()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                                <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='body-text-css'>Are you sure you want to delete this ? This action cannot be undone.</div>
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
            </div>
        </>
    )
}

export default FrruitGPT
