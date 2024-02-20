import React, { useEffect, useState } from 'react'
import './MarketContentGptLeftBox.scss';
import SearchIcon from '../../assets/images/search-icon.png';
import ChatIcon from '../../assets/images/new-chat-icon.png';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { getPromptList, searchPrompt } from '../../screens/frruitGPT/slice';
import moment from 'moment';
import { trimText } from '../../utils/utils';

function MarketContentGptLeftBox(props) {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch();
    const {
        handleNewChat = () => { },
        handleHistory = () => { },
        selectedChat
    } = props;
    const [searchParam, setSearchParam] = useState('');


    const { promptList } = useSelector(state => state.fruitGPTSlice);

    useEffect(() => {
        dispatch(getPromptList())
    }, [])

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchParam) {
                dispatch(searchPrompt(searchParam));
            } else if (searchParam?.length === 0) {
                dispatch(getPromptList())
            }
        }, 500);
        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchParam]);

    const historyClick = (prompt_id) => {
        handleHistory(prompt_id)
    }

    const linkTexts = [
        "https://www.youtube.com/",
        "https://www.example.com/",
        "https://www.openai.com/",
        "https://www.youtube.com/",
        "https://www.example.com/",
        "https://www.openai.com/",
        "https://www.youtube.com/",
        "https://www.example.com/",
        "https://www.openai.com/",
        "https://www.youtube.com/",
        "https://www.example.com/",
        "https://www.openai.com/",
        "https://www.youtube.com/",
        "https://www.example.com/",
        "https://www.openai.com/",
        "https://www.youtube.com/",
        "https://www.example.com/",
        "https://www.openai.com/",
    ];
    return (
        <>
            <div className='marketContentGptLeftBox-css'>
                <div className='box' style={{ height: window.innerHeight - 105 }}>
                    <div className="position-relative" style={{ marginBottom: 20 }}>
                        <input type="text" className="form-control form-control-search" placeholder='Search Here' />
                        <div className="position-absolute" style={{ left: 15, top: '15%' }}>
                            <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                        </div>
                    </div>
                    <div className="position-relative blue-box" style={{ marginBottom: 20, cursor: 'pointer' }} onClick={handleNewChat}>
                        <div className='new-chat-text'>New Chat</div>
                        <div className="position-absolute" style={{ right: 14, top: '19%' }}>
                            <img src={ChatIcon} style={{ width: 24, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                        </div>
                    </div>
                    <div className='history-text'>Document / Link History</div>
                    <div>
                    <div>
                        {promptList?.map((item, index) => (
                            <>
                                <div className='time-text' style={{ fontWeight: '500' }}>{
                                    moment(item?.date).isSame(moment(), 'day')
                                        ? "Today"
                                        : moment(item?.date).format('DD MMM YYYY')
                                }</div>
                                {item?.data?.slice().reverse().map((item, index, array) => (
                                    <Nav.Link key={index} className={selectedChat === item.prompt_id ? 'blue-box-active' : 'blue-box'} onClick={() => { historyClick(item?.prompt_id); setShow(!show) }} style={{ marginBottom: index === array.length - 1 ? 20 : 10 }}>
                                        <Nav.Link className=''>{trimText(item?.prompt_text, 40)}</Nav.Link>
                                    </Nav.Link>
                                ))}
                            </>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarketContentGptLeftBox
