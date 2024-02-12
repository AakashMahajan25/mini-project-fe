import React, { useEffect, useState } from 'react'
import './FrruitGPTLeftBox.scss';
import SearchIcon from '../../assets/images/search-icon.png';
import ChatIcon from '../../assets/images/new-chat-icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { getPromptList, searchPrompt } from '../../screens/frruitGPT/slice';
import { trimText } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function FrruitGPTLeftBox(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        handleNewChat = () => { },
        handleHistory = () => { },
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

    return (
        <>
            <div className='Frruit-GPT-left-box'>
                <div className='box' style={{ height: window.innerHeight - 130 }}>
                    <div className="position-relative" style={{ marginBottom: 20 }}>
                        <input type="text" className="form-control form-control-search" placeholder='Search Here' value={searchParam} onChange={(e) => setSearchParam(e.target.value)} />
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
                    <div className='history-text'>History</div>
                    {/* <div className='time-text'>Today</div>
                    <div>
                        {TodaysTexts.map((text, index) => (
                            <div key={index} className='blue-box'>
                                <div className='new-chat-text'>{text}</div>
                            </div>
                        ))}
                    </div> */}
                    {/* <div className='time-text'>1 Month</div> */}
                    <div>
                        {promptList?.slice().reverse().map((item, index) => (
                            <Nav.Link key={index} className='' onClick={() => historyClick(item?.prompt_id)}>
                                <Nav.Link className='blue-box'>{trimText(item?.prompt_text, 40)}</Nav.Link>
                            </Nav.Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FrruitGPTLeftBox