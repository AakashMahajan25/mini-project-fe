import React, { useEffect, useState } from 'react'
import './MarketContentGptLeftBox.scss';
import SearchIcon from '../../assets/images/search-icon.png';
import ChatIcon from '../../assets/images/new-chat-icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { searchPrompt } from '../../screens/frruitGPT/slice';
import moment from 'moment';
import { trimText } from '../../utils/utils';
import { Nav, Tab, Tabs } from 'react-bootstrap'
import { getContentPromptList } from '../../screens/marketContentGPT/slice';

function MarketContentGptLeftBox(props) {
    const [show, setShow] = useState(false)
    const [showDocumentContent, setShowDocumentContent] = useState(true);
    const [showLinkHistoryContent, setShowLinkHistoryContent] = useState(false);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState('link')

    const {
        handleNewChat = () => { },
        handleHistory = () => { },
        selectedChat
    } = props;
    const [searchParam, setSearchParam] = useState('');


    const { contentPromptList } = useSelector(state => state.contentGPTSlice);


    const handleTab = (key) => {
        switch (key) {
            case 'link':
                dispatch(getContentPromptList(key))
                setShowDocumentContent(true);
                setShowLinkHistoryContent(false);
                setSelected(key)
                break;
            case 'attachment':
                dispatch(getContentPromptList(key))
                setShowDocumentContent(false);
                setShowLinkHistoryContent(true);
                setSelected(key)
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchParam) {
                dispatch(searchPrompt(searchParam));
            } else if (searchParam?.length === 0) {
                dispatch(getContentPromptList(selected))
            }
        }, 500);
        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchParam]);

    const historyClick = (content_prompt_id) => {
        handleHistory(content_prompt_id,selected)
    }

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
                    {/* <div className='history-text'>Document / Link History</div> */}
                    <div className=''>
                        <div className='custom-tab-css'>
                            <div className='d-flex align-items-center'>
                                <div
                                    className={`tab-css me-2`}
                                    style={{ backgroundColor: showDocumentContent ? '#4563E4' : '#E5EAFF', color: showDocumentContent ? '#fff' : '#4563E4' }}
                                    onClick={() => handleTab('link')}
                                >
                                    Link 
                                    
                                </div>
                                <div
                                    className={`tab-css`}
                                    style={{ backgroundColor: showLinkHistoryContent ? '#4563E4' : '#E5EAFF', color: showLinkHistoryContent ? '#fff' : '#4563E4' }}
                                    onClick={() => handleTab('attachment')}
                                >
                                   Document 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {showDocumentContent && (
                            <div>
                                {contentPromptList?.map((item, index) => (
                                        <>
                                            <div className='time-text' style={{ fontWeight: '500' }}>{
                                                moment(item?.date).isSame(moment(), 'day')
                                                    ? "Today"
                                                    : moment(item?.date).format('DD MMM YYYY')
                                            }</div>
                                            {item?.data?.slice().reverse().map((item, index, array) => (
                                                <Nav.Link key={index} className={selectedChat === item.content_prompt_id ? 'blue-box-active' : 'blue-box'} onClick={() => { historyClick(item?.content_prompt_id); setShow(!show) }} style={{ marginBottom: index === array.length - 1 ? 20 : 10 }}>
                                                    <Nav.Link className=''>{trimText(item?.content_prompt_text, 40)}</Nav.Link>
                                                </Nav.Link>
                                            ))}
                                        </>
                                    ))}
                            </div>
                        )}
                        {showLinkHistoryContent && (
                            <div>
                                {contentPromptList?.map((item, index) => (
                                        <>
                                            <div className='time-text' style={{ fontWeight: '500' }}>{
                                                moment(item?.date).isSame(moment(), 'day')
                                                    ? "Today"
                                                    : moment(item?.date).format('DD MMM YYYY')
                                            }</div>
                                            {item?.data?.slice().reverse().map((item, index, array) => (
                                                <Nav.Link key={index} className={selectedChat === item.content_prompt_id ? 'blue-box-active' : 'blue-box'} onClick={() => { historyClick(item?.content_prompt_id); setShow(!show) }} style={{ marginBottom: index === array.length - 1 ? 20 : 10 }}>
                                                    <Nav.Link className=''>{trimText(item?.content_prompt_text, 40)}</Nav.Link>
                                                </Nav.Link>
                                            ))}
                                        </>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarketContentGptLeftBox
