import React from 'react'
import './BottomSearchBar.scss'
import AttachIcon from '../../assets/images/fluent_attach-20-regular.png'
import LinkIcon from '../../assets/images/link_icon.png'
import SendIcon from '../../assets/images/send_icon.png'

function BottomSearchBar(props) {
    const {
        setQuestion=()=>{},
        question='',
        handleAskPress=()=>{}
    } = props

    const handleChange = (e) => {
        setQuestion(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAskPress();
        }
    };

    return (
        <div className='BottomSearchBar'>
            {/* <div className='attachment'>
                <p className='attach-text'>Attach</p>
                <img src={AttachIcon} className='img-styles' />
            </div>
            <div className='linkUrl'>
                <p className='linkUrl-text'>Link URL</p>
                <img src={LinkIcon} className='img-styles' />
            </div> */}
            <div class="form-group">
                <input
                    class="form-control"
                    value={question}
                    onChange={handleChange}
                    placeholder="Type your message here"
                    onKeyDown={handleKeyPress}
                />
            </div>
            <div className='sendIcon' onClick={handleAskPress}>
                <img src={SendIcon} className='sendIcon-styles' />
            </div>
        </div>
    )
}

export default BottomSearchBar