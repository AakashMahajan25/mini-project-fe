import React, { useState } from 'react'
import './PromptsLibrary.scss'
import RightWhiteArrow from '../../assets/images/chevron-right.png'
import LeftWhiteArrow from '../../assets/images/chevron-left.png'
import RightBlueArrow from '../../assets/images/right-arrow.png'
import { Nav, Tab, Tabs } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function PromptsLibrary(props) {
    const {
        handlePromptClick = ()=>{}
    } = props
    const [show, setShow] = useState(false)

    const { chatSuggestions } = useSelector(state => state.fruitGPTSlice);
    
    return (
        <div className='promptButton'>
            {!show && <button onClick={() => setShow(!show)} className='blue-btn radius-button d-flex align-items-center justify-content-center' ><img src={RightWhiteArrow} style={{ width: 8, height: 13, objectFit: 'contain', marginRight: 5 }} /> PromptsLibrary</button>}


            {show && <div className='promptView' style={{animation: show ? 'slideInRight 0.3s ease-in-out' : 'none'}}>
                <button onClick={() => setShow(!show)} className='blue-btn radius-small-button d-flex align-items-center justify-content-center' style={{ height: 40 }} ><img src={LeftWhiteArrow} style={{ width: 8, height: 13, objectFit: 'contain' }} /></button>

                <div className='showPrompt' style={{ height: window.innerHeight - 130 }}>
                    <h4 className='title'>Prompts Library</h4>
                    <div >
                        <Tab.Container defaultActiveKey="first">
                            <Nav className='customPrompttabs' variant="pills">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">{`View All`}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">{'Popular'}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">{'Suggested'}</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content className='mt-4'>
                                <Tab.Pane eventKey="first">
                                    {
                                        chatSuggestions?.map((prompt) => (
                                            <div className='suggest-prompts' onClick={()=>handlePromptClick(prompt?.description)}>
                                                <h1 className='text'>{prompt?.description}</h1>
                                                <img src={RightBlueArrow} style={{ width: 24, height: 24, objectFit: 'contain', marginLeft: 10 }} />
                                            </div>
                                        ))
                                    }
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    {
                                        chatSuggestions.map((prompt) => (
                                            <div className='suggest-prompts' onClick={()=>handlePromptClick(prompt?.description)}>
                                                <h1 className='text'>{prompt?.description}</h1>
                                                <img src={RightBlueArrow} style={{ width: 24, height: 24, objectFit: 'contain', marginLeft: 10 }} />
                                            </div>
                                        ))
                                    }
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    {
                                        chatSuggestions.map((prompt) => (
                                            <div className='suggest-prompts' onClick={()=>handlePromptClick(prompt?.description)}>
                                                <h1 className='text'>{prompt?.description}</h1>
                                                <img src={RightBlueArrow} style={{ width: 24, height: 24, objectFit: 'contain', marginLeft: 10 }} />
                                            </div>
                                        ))
                                    }
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>

                </div>

            </div>}
        </div>
    )
}

export default PromptsLibrary