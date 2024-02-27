import React, { useEffect, useState } from 'react'
import './PromptsLibrary.scss'
import RightWhiteArrow from '../../assets/images/chevron-right.png'
import LeftWhiteArrow from '../../assets/images/chevron-left.png'
import RightBlueArrow from '../../assets/images/right-arrow.png'
import { Nav, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getPromptsLibrary } from '../../screens/frruitGPT/slice'

function PromptsLibrary(props) {
    const {
        handlePromptClick = ()=>{}
    } = props
    const [show, setShow] = useState(false)
    const [type, setType] = useState('all')

    const dispatch = useDispatch()
    const { promptLibraryList } = useSelector(state => state.fruitGPTSlice);

    useEffect(() => {
        dispatch(getPromptsLibrary(`?type=`))
    }, [])

    const handleTab = (key) => {
        console.log('key', key)
        const queryParam = `?type=${key}`
        switch (key) {
            case 'all':
                dispatch(getPromptsLibrary(`?type=`))
                break;
            case 'popular':
                dispatch(getPromptsLibrary(queryParam))
                break;
            case 'suggested':
                dispatch(getPromptsLibrary(queryParam))
                break;
            default:
                break;
        }
    }
    
    return (
        <div className='promptButton'>
            {!show && <button onClick={() => setShow(!show)} className='blue-btn radius-button d-flex align-items-center justify-content-center' ><img src={RightWhiteArrow} style={{ width: 8, height: 13, objectFit: 'contain', marginRight: 5 }} /> PromptsLibrary</button>}


            {show && <div className='promptView' style={{animation: show ? 'slideInRight 0.3s ease-in-out' : 'none'}}>
                <button onClick={() => setShow(!show)} className='blue-btn radius-small-button d-flex align-items-center justify-content-center' style={{ height: 40 }} ><img src={LeftWhiteArrow} style={{ width: 8, height: 13, objectFit: 'contain' }} /></button>

                <div className='showPrompt' style={{ height: window.innerHeight - 105 }}>
                    <h4 className='title'>Prompts Library</h4>
                    <div >
                        <Tab.Container defaultActiveKey={type} onSelect={(e)=>handleTab(e)}>
                            <Nav className='customPrompttabs' variant="pills">
                                <Nav.Item>
                                    <Nav.Link eventKey="all">{`View All`}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="popular">{'Popular'}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="suggested">{'Suggested'}</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content className='mt-4'>
                                <Tab.Pane eventKey="all">
                                    {
                                        promptLibraryList?.prompts?.map((prompt) => (
                                            <div className='suggest-prompts' onClick={()=>{handlePromptClick(prompt?.prompt_text);setShow(!show)}}>
                                                <h1 className='text'>{prompt?.prompt_text}</h1>
                                                <img src={RightBlueArrow} style={{ width: 24, height: 24, objectFit: 'contain', marginLeft: 10 }} />
                                            </div>
                                        ))
                                    }
                                </Tab.Pane>
                                <Tab.Pane eventKey="popular">
                                    {
                                        promptLibraryList?.prompts?.map((prompt) => (
                                            <div className='suggest-prompts' onClick={()=>{handlePromptClick(prompt?.prompt_text);setShow(!show)}}>
                                                <h1 className='text'>{prompt?.prompt_text}</h1>
                                                <img src={RightBlueArrow} style={{ width: 24, height: 24, objectFit: 'contain', marginLeft: 10 }} />
                                            </div>
                                        ))
                                    }
                                </Tab.Pane>
                                <Tab.Pane eventKey="suggested">
                                    {
                                        promptLibraryList?.prompts?.map((prompt) => (
                                            <div className='suggest-prompts' onClick={()=>{handlePromptClick(prompt?.prompt_text);setShow(!show)}}>
                                                <h1 className='text'>{prompt?.prompt_text}</h1>
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