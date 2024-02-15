import React, { useState } from 'react'
import '../makeSelection/MakeSelection.scss'
import { Nav, Tab, Tabs } from 'react-bootstrap'
import SelectMarket from '../../assets/images/selectMarket_img.png'
import GreenRightIcon from '../../assets/images/right-green-circle-icon.png'
import { useNavigate } from 'react-router-dom'

function MakeSelection() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('US')

    const verifyProceed = () => {
        localStorage.setItem('marketType', selected)
        navigate("/dashboard")
    }

    return (
        <div className='selectmarket-css'>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='col-xl-7'>
                    <div className='selectMarket'>
                        <div className='col-xl-7'>
                            <p className='heading p-0'>Select Market</p>
                            <p className='text-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                        </div>
                        <div className='showPrompt'>
                            <Tab.Container defaultActiveKey={selected} onSelect={(e) => setSelected(e)}>
                                <Nav className='customPrompttabs' variant="pills">
                                    <Nav.Item>
                                        <Nav.Link eventKey="US">{'USA'}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="IND">{`India`}</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Tab.Container>
                        </div>
                        <div className='beta-text'>In the beta version of our platform, we are thrilled to offer an exclusive focus on the
                            <br /><span className='nifty-text'>Nifty 50 and Sensex 30 stocks.</span></div>
                        <div className='white-box-make-selection'>
                            <div className='earlyAccessText'>Early Access</div>
                            <div className='peraText'>Lorem Ipsum is simply dummy text of the printing</div>
                            <div className='blueBG'>
                                <div className='CreditText25'>25 Credits</div>
                                <div className='tokens-text'>1 Credit = 1000 Tokens</div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-7 col-md-12'>
                                    <div className='d-flex align-items-center mb-1'>
                                        <img className='me-1' src={GreenRightIcon} width={11} style={{ objectFit: 'contain' }} />
                                        <div className='points-text'>News headlines & Investors Stories</div>
                                    </div>
                                    <div className='d-flex align-items-center mb-1'>
                                        <img className='me-1' src={GreenRightIcon} width={11} style={{ objectFit: 'contain' }} />
                                        <div className='points-text'>Summarise news and get TLDRs</div>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <img className='me-1' src={GreenRightIcon} width={11} style={{ objectFit: 'contain' }} />
                                        <div className='points-text'>Analysts and Agency Ratings</div>
                                    </div>
                                </div>
                                <div className='col-lg-5 col-md-12'>
                                    <div className='d-flex align-items-center mb-1'>
                                        <img className='me-1' src={GreenRightIcon} width={11} style={{ objectFit: 'contain' }} />
                                        <div className='points-text'>Corporate Actions</div>
                                    </div>
                                    <div className='d-flex align-items-center mb-1'>
                                        <img className='me-1' src={GreenRightIcon} width={11} style={{ objectFit: 'contain' }} />
                                        <div className='points-text'>Fundamental Data</div>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <img className='me-1' src={GreenRightIcon} width={11} style={{ objectFit: 'contain' }} />
                                        <div className='points-text'>Earings calender</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className='disclaimer'>Disclaimer</p>
                            <p className='disclaimer-para' style={{ fontSize: 14 }}>Frruit is an AI research assistant tool powered by GPT-3.5 & BERT, a powerful generative language model from OpenAI & Google. Frruit may occasionally produce inaccurate or inappropriate information. Please be aware that any content generated by Frruit should not be considered as investment advice, or a recommendation to buy or sell securities, and it should not be the sole basis for any investment decisions. Frruit output is provided 'as is,' and Airrchip makes no guarantees regarding its accuracy, completeness, quality, timeliness, or any other attributes. We strongly advise independently verifying the accuracy of Frruit output for your specific needs.</p>
                        </div>
                        <button className='blue-btn' onClick={verifyProceed}>Continue</button>
                    </div>
                </div>
                <div className='col-xl-5'>
                    <div className='d-flex justify-content-center align-items-center imagecontainer'>
                        <img src={SelectMarket} style={{ objectFit: 'contain', width: '100%', height: window.innerHeight / 2.0 }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MakeSelection