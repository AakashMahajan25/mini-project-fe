import React, { useEffect, useState } from 'react'
import './FrruitGPTLeftBox.scss';
import SearchIcon from '../../assets/images/search-icon.png';
import ChatIcon from '../../assets/images/new-chat-icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { getPromptList } from '../../screens/frruitGPT/slice';
import { trimText } from '../../utils/utils';

function FrruitGPTLeftBox() {
    const dispatch = useDispatch();
    const [searchParam, setSearchParam] = useState('');
    const [promptHistory, setPromptHistory] = useState([])
    const {  promptList } = useSelector(state => state.fruitGPTSlice);



    useEffect(() => {
        dispatch(getPromptList())
    }, [])

    console.log('promptList', promptList)

    // useEffect(() => {
    //     if (promptList?.length > 0) {
    //         const prompt = promptList?.slice().reverse().map(el => ({
    //             label: el?.prompt_text,
    //             rightIcon: 'image',
    //             desctextwidth: '53%',
    //             link: 'FruitGptHome',
    //             label2: moment(el?.createdAt).format('YYYY-MM-DD, hh:mm A'),
    //             promptId: el?.prompt_id
    //         }))
    //         setPromptHistory(prompt)
    //     }
    // }, [promptList])


    const TodaysTexts = [
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
    ];
    const oneMonthTexts = [
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
    ];
    return (
        <>
            <div className='Frruit-GPT-left-box'>
                <div className='box' style={{ height: window.innerHeight - 130 }}>
                    <div className="position-relative" style={{ marginBottom: 20 }}>
                        <input type="text" className="form-control form-control-search" placeholder='Search Here' />
                        <div className="position-absolute" style={{ left: 15, top: '15%' }}>
                            <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                        </div>
                    </div>
                    <div className="position-relative blue-box" style={{ marginBottom: 20, cursor: 'pointer' }}>
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
                        {promptList?.rows?.map((item, index) => (
                            <div key={index} className='blue-box'>
                                <div className='new-chat-text'>{trimText(item?.prompt_text,30)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FrruitGPTLeftBox