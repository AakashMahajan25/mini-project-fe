import React, { useEffect, useState } from 'react'
import './PromptsLibrary.scss'
import RightWhiteArrow from '../../assets/images/chevron-right.png'
import LeftWhiteArrow from '../../assets/images/chevron-left.png'
import RightBlueArrow from '../../assets/images/right-arrow.png'
import { Nav, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getPromptsLibrary } from '../../screens/frruitGPT/slice'
import ReactGA from 'react-ga4';

function PromptsLibrary(props) {
    const {
        handlePromptClick = ()=>{},
        show,
        setShow
    } = props
    const [type, setType] = useState('all');

    const dispatch = useDispatch();
    const { chatSuggestions, promptLibraryList } = useSelector(state => state.fruitGPTSlice);
    const { mostOnFrruitGpt } = useSelector(state => state.dashboardSlice);

    useEffect(() => {
        dispatch(getPromptsLibrary(`?type=`))
    }, [])

    const handleTab = (key) => {
        setType(key);
        // const queryParam = `?type=${key}`
        // switch (key) {
        //     case 'all':
        //         dispatch(getPromptsLibrary(`?type=`))
        //         break;
        //     case 'popular':
        //         dispatch(getPromptsLibrary(queryParam))
        //         break;
        //     case 'suggested':
        //         dispatch(getPromptsLibrary(queryParam)).then((res) => {
        //             ReactGA.event({
        //                 category: 'Frruitgpt',
        //                 action: 'frruitgpt_suggested_prompts',
        //                 label: 'suggested prompts'
        //             });
        //         }).catch(err=>{
                    
        //         });
        //         break;
        //     default:
        //         break;
        // }
    };

    const getSortedData = () => {
        const combinedData = [
            ...(mostOnFrruitGpt?.rows?.map(item => ({ prompt_text: item.question })) || []),
            ...(chatSuggestions || [])
        ];
        return combinedData
    };
    return (
        <div className='promptButton'>
            {!show && <button onClick={() => setShow(!show)} className='blue-btn radius-button d-flex align-items-center justify-content-center hide-in-mobile'>
                <img src={RightWhiteArrow} className='prompt-button-img' />Prompts Library
            </button>}
            {show && <div className='promptView' style={{animation: show ? 'slideInRight 0.3s ease-in-out' : 'none'}}>
                <button onClick={() => setShow(!show)} className='blue-btn radius-small-button d-flex align-items-center justify-content-center' style={{ height: 40 }} ><img src={LeftWhiteArrow} style={{ width: 8, height: 13, objectFit: 'contain' }} /></button>
                    
                    <div className='showPrompt' style={ window.innerWidth > 500 ? { height: window.innerHeight - 68 } : { height: window.innerHeight - 91}}>
                    <h4 className='title'>Prompts Library</h4>
                    <div >
                        <Tab.Container activeKey={type} onSelect={handleTab }>
                            <Nav className='customPrompttabs' variant="pills">
                                <Nav.Item>
                                    <Nav.Link eventKey="all">View All</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="popular">Popular</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="suggested">Suggested</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content className='mt-4'>
                                <Tab.Pane eventKey="all">
                                    {getSortedData().map((prompt, index) => (
                                        <div key={index} className='suggest-prompts' onClick={() => { handlePromptClick(prompt?.prompt_text);setShow(!show)}}>
                                            <h1 className='text'>{prompt?.prompt_text}</h1>
                                            <img src={RightBlueArrow} style={{ width: 24, height: 24, objectFit: 'contain', marginLeft: 10 }} />
                                        </div>
                                    ))
                                    }
                                </Tab.Pane>
                                <Tab.Pane eventKey="popular">
                                    {mostOnFrruitGpt?.rows?.map((prompt, index) => (
                                        <div key={index} className='suggest-prompts' onClick={()=>{handlePromptClick(prompt?.question);setShow(!show)}}>
                                            <h1 className='text'>{prompt.question}</h1>
                                            <img src={RightBlueArrow} style={{ width: 24, height: 24, objectFit: 'contain', marginLeft: 10 }} />
                                        </div>
                                    ))}
                                </Tab.Pane>
                                <Tab.Pane eventKey="suggested">
                                    {chatSuggestions?.map((prompt, index) => (
                                        <div key={index} className='suggest-prompts' onClick={()=>{handlePromptClick(prompt?.prompt_text);setShow(!show)}}>
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