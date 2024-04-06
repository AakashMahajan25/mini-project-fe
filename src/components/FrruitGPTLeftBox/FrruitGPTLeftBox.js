import React, { useEffect, useState } from 'react'
import './FrruitGPTLeftBox.scss';
import SearchIcon from '../../assets/images/search-icon.png';
import ChatIcon from '../../assets/images/new-chat-icon.png';
import DeleteRedIcon from '../../assets/images/delete-red-icon.png';
import DeleteGrayIcon from '../../assets/images/delete-gray-icon.png';
import DeleteWhiteIcon from '../../assets/images/delete-white-icon.png';
import RightWhiteArrow from '../../assets/images/chevron-right.png'
import LeftWhiteArrow from '../../assets/images/chevron-left.png'
import RightBlueArrow from '../../assets/images/right-arrow.png'
import { useDispatch, useSelector } from 'react-redux';
import { getPromptList, searchPrompt } from '../../screens/frruitGPT/slice';
import { trimText } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import CloseImg from '../../assets/images/close_icon.png';
import ReactGA from 'react-ga4';

function FrruitGPTLeftBox(props) {
    const [hoveredItem, setHoveredItem] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        handleNewChat = () => { },
        handleHistory = () => { },
        handleShow2 = () => { },
        selectedChat
    } = props;
    const [searchParam, setSearchParam] = useState('');
    const { promptList } = useSelector(state => state.fruitGPTSlice);

    useEffect(() => {
        dispatch(getPromptList()).then((res) => {
            ReactGA.event({
                category: 'Frruitgpt',
                action: 'history_of_gptquestions',
                label: 'History of GPT questions'
            });
        }).catch(err=>{

        });
    }, [])

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchParam) {
                dispatch(searchPrompt(searchParam)).then((res) => {
                    ReactGA.event({
                        category: 'Frruitgpt',
                        action: 'search_history_question',
                        label: 'Search click for history questions'
                    });
                }).catch(err=>{
        
                });
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
    const leftPartHeight = window.innerWidth > 768 ? window.innerHeight - 105 : window.innerHeight - 57;

    return (
        <>
            <div className='Frruit-GPT-left-box'>
                <div className='box' style={{ height: leftPartHeight }}>
                    <div className="position-relative" style={{ marginBottom: 20 }}>
                        <input type="text" style={{ marginBottom: 20 }} className="form-control form-control-search" placeholder='Search Here' value={searchParam} onChange={(e) => setSearchParam(e.target.value)} />
                        <div className="position-absolute" style={{ left: 15, top: '6%' }}>
                            <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                        </div>
                        <div className="position-relative blue-box" style={{ marginBottom: 20, cursor: 'pointer' }} onClick={() => handleNewChat()}>
                            <div className='new-chat-text'>New Chat</div>
                            <div className="position-absolute" style={{ right: 14, top: '19%' }}>
                                <img src={ChatIcon} style={{ width: 24, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                            </div>
                        </div>
                    </div>
                    <div className='history-text'>History</div>
                    {/* <div className='time-text'>Today</div>
                    <div>
                        {TodaysTexts.map((text, index) => (
                            <div key={index} className='blue-box'>
                                <div className='new-chat-text'>{text}</div>
                            </div>
                        ))}
                    </div> */}
                    <div>
                        {promptList?.map((item, index) => (
                            <>
                                <div className='time-text' style={{ fontWeight: '500' }}>{
                                    moment(item?.date).isSame(moment(), 'day')
                                        ? "Today"
                                        : moment(item?.date).format('DD MMM YYYY')
                                }</div>
                                {item?.data?.map((item, index, array) => (
                                    <Nav.Link key={index} className={selectedChat === item.prompt_id ? 'blue-box-active' : 'blue-box'} onClick={() => historyClick(item?.prompt_id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: index === array.length - 1 ? 20 : 10 }}>
                                        <Nav.Link className=''>{trimText(item?.prompt_text, 40)}</Nav.Link>
                                        <img
                                            className='imagehover'
                                            src={hoveredItem === item.prompt_id ? DeleteRedIcon : selectedChat === item.prompt_id ? DeleteWhiteIcon : DeleteGrayIcon}
                                            width={20}
                                            style={{ objectFit: 'contain' }}
                                            onMouseEnter={() => setHoveredItem(item.prompt_id)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                            onClick={(event) => handleShow2(event, item?.prompt_id)}
                                        />
                                    </Nav.Link>
                                ))}
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FrruitGPTLeftBox