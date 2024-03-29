import React, { useEffect, useState } from 'react'
import './MarketContentGptLeftBox.scss';
import SearchIcon from '../../assets/images/search-icon.png';
import ChatIcon from '../../assets/images/new-chat-icon.png';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { trimText } from '../../utils/utils';
import { Nav, Tab, Tabs } from 'react-bootstrap'
import { deleteContentPrompt, getContentPromptList, searchContentPrompt } from '../../screens/marketContentGPT/slice';
import DeleteRedIcon from '../../assets/images/delete-red-icon.png';
import DeleteGrayIcon from '../../assets/images/delete-gray-icon.png';
import DeleteWhiteIcon from '../../assets/images/delete-white-icon.png';
import Modal from 'react-bootstrap/Modal';
import CloseImg from '../../assets/images/close_icon.png';

function MarketContentGptLeftBox(props) {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [showDocumentContent, setShowDocumentContent] = useState(true);
    const [showLinkHistoryContent, setShowLinkHistoryContent] = useState(false);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState('link')

    const {
        handleNewChat = () => { },
        handleHistory = () => { },
        setShowQuestion = () => { },
        handleShow2 = () => { },
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
                setShowQuestion(false);
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
                const data = {
                    type: selected,
                    search: searchParam
                }
                dispatch(searchContentPrompt(data));
            } else if (searchParam?.length === 0) {
                dispatch(getContentPromptList(selected))
            }
        }, 500);
        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchParam, selected]);

    const historyClick = (content_prompt_id, name) => {
        handleHistory(content_prompt_id, selected, name)
    }

    const leftPartHeight = window.innerWidth > 768 ? window.innerHeight - 105 : window.innerHeight - 57;

    return (
        <>
            <div className='marketContentGptLeftBox-css'>
                <div className='box' style={{ height: leftPartHeight }}>
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
                        <div className="position-relative" style={{ marginBottom: 20 }}>
                            <input type="text" className="form-control form-control-search" placeholder='Search Here' value={searchParam} onChange={(e) => setSearchParam(e.target.value)} />
                            <div className="position-absolute" style={{ left: 15, top: '15%' }}>
                                <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
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
                                        {item?.data?.map((item, index, array) => (
                                            <Nav.Link key={index} className={selectedChat === item.content_prompt_id ? 'blue-box-active' : 'blue-box'} onClick={() => historyClick(item?.content_prompt_id)} style={{ marginBottom: index === array.length - 1 ? 20 : 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Nav.Link className=''>{trimText(item?.link_title, 35)}</Nav.Link>
                                                <img
                                                    src={hoveredItem === item.content_prompt_id ? DeleteRedIcon : selectedChat === item.content_prompt_id ? DeleteWhiteIcon : DeleteGrayIcon}
                                                    width={20}
                                                    style={{ objectFit: 'contain' }}
                                                    onMouseEnter={() => setHoveredItem(item.content_prompt_id)}
                                                    onMouseLeave={() => setHoveredItem(null)}
                                                    onClick={(event) => handleShow2(event, item?.content_prompt_id)}
                                                />
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
                                        {item?.data?.map((item, index, array) => (
                                            <Nav.Link key={index} className={selectedChat === item.content_prompt_id ? 'blue-box-active' : 'blue-box'} onClick={() => historyClick(item?.content_prompt_id, item?.contentS3Path)} style={{ marginBottom: index === array.length - 1 ? 20 : 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Nav.Link className=''>{trimText(item?.contentS3Path, 40)}</Nav.Link>
                                                <img
                                                    src={hoveredItem === item.content_prompt_id ? DeleteRedIcon : selectedChat === item.content_prompt_id ? DeleteWhiteIcon : DeleteGrayIcon}
                                                    width={20}
                                                    style={{ objectFit: 'contain' }}
                                                    onMouseEnter={() => setHoveredItem(item.content_prompt_id)}
                                                    onMouseLeave={() => setHoveredItem(null)}
                                                    onClick={(event) => handleShow2(event, item?.content_prompt_id)}
                                                />
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
