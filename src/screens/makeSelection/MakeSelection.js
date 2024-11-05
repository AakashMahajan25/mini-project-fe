import React, { useState } from 'react'
import '../makeSelection/MakeSelection.scss'
import { Nav, Tab, Tabs } from 'react-bootstrap'
import SelectMarket from '../../assets/images/selectMarket_img.png'
import SideImg from '../../assets/images/login-side-img.png'
import LoginImg3 from '../../assets/images/market_selection.png'
import FrruitLogo from '../../assets/images/frruit-logo.png'
import GreenRightIcon from '../../assets/images/right-green-circle-icon.png'
import PurpleTick from '../../assets/images/purple-tick.png';
import RedTick from '../../assets/images/red-tick.png';
import PinkTick from '../../assets/images/pink-tick.png';
import BrownTick from '../../assets/images/brown-tick.png';
import GreenTick from '../../assets/images/green-tick.png';
import GreenTick2 from '../../assets/images/green-tick2.png';
import IndigoTick from '../../assets/images/indigo-tick.png';
import OrangeTick from '../../assets/images/orange-tick.png';
import OrangeTick2 from '../../assets/images/orange-tick2.png';
import DarkblueTick from '../../assets/images/darkblue-tick.png';
import LightblueTick from '../../assets/images/lightblue-tick.png';
import { useNavigate } from 'react-router-dom'
import ReactGA from 'react-ga4';

function MakeSelection() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('IND')

    const verifyProceed = () => {
        localStorage.setItem('marketType', selected)
        ReactGA.event({
            category: 'User',
            action: 'market_selection',
            label: 'User Market Selected'
        });
        navigate("/dashboard")
    }

    const items = [
        { text: 'Curated Investors Stories', icon: PurpleTick },
        { text: 'Event driven market intelligence (Coming soon)', icon: LightblueTick },
        { text: 'Summarise news and get TLDRs', icon: DarkblueTick },
        { text: 'Analysts Podcasts (Coming soon)', icon: OrangeTick },
        { text: 'Financial Statements', icon: RedTick },
        { text: 'Discover video insights', icon: PinkTick },
        { text: 'Corporate Actions', icon: IndigoTick },
        { text: 'Search for social media opinions', icon: OrangeTick2 },
        { text: 'Fundamental Data', icon: BrownTick },
        { text: 'Extract insights from Docs', icon: GreenTick2 },
        { text: 'Agency Ratings', icon: GreenTick }
    ];

    return (
        <div className='selectmarket-css'>
            <div className='d-flex justify-content-center align-items-start'>
                <div className='col-xl-7'>
                    <div className='selectMarket'>
                        {/* <div className='col-xl-7'>
                            <p className='heading p-0'>Select Market</p>
                            <p className='text-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                        </div> */}
                        {/* <div className='showPrompt' style={{width: 'fit-content'}}>
                            <Tab.Container defaultActiveKey={selected} onSelect={(e) => setSelected(e)}>
                                <Nav className='customPrompttabs' variant="pills"> */}
                                    {/* <Nav.Item >
                                        <Nav.Link eventKey="US" disabled >{'USA'}</Nav.Link>
                                    </Nav.Item> */}
                                    {/* <Nav.Item>
                                        <Nav.Link eventKey="IND">{`India`}</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Tab.Container> */}
                        {/* </div> */}
                        <div className='small-blue-text'>Free Access</div>
                        <div className='dark-blue-header-text'>Congratulations! </div>
                        <div className='dark-blue-header-text'>You’ve been granted <span className='blue-header-text'>Free Access! </span></div>


                        <div className='gradient-box'>
                            <div className='dark-blue'>What’s in it for <span className='primary-blue'> you?</span></div>
                            {/* <div className='gradient-box2'>
                                <div className='row d-flex align-items-center'>
                                    <div className='col-xl-5'>
                                        <div className='small-blue-text' style={{ fontSize: 28 }}>25 Credits</div>
                                    </div>
                                    <div className='col-xl-7'>
                                        <div className='small-blue-text' style={{ fontSize: 16, fontWeight: 500 }}>1 Credit = 1000 Tokens</div>
                                    </div>
                                </div>
                            </div> */}
                            <div className='mt-3'>
                                {items.map((item, index) => {
                                    if (index % 2 === 0) {
                                        return (
                                            <div className='row align-items-center mt-1' key={index}>
                                                {/* On small screens (< 500px), each will take full width (col-12), otherwise use col-7 and col-5 */}
                                                <div className='col-12 col-md-6 d-flex align-items-center'>
                                                    <img src={item.icon} className='tick-icon' alt={`${item.text}-icon`} />
                                                    <div className='tick-text'>{item.text}</div>
                                                </div>
                                                {items[index + 1] && (
                                                    <div className='col-12 col-md-6 d-flex align-items-center mt-2 mt-md-0'>
                                                        <img src={items[index + 1].icon} className='tick-icon' alt={`${items[index + 1].text}-icon`} />
                                                        <div className='tick-text'>{items[index + 1].text}</div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>
                            <div className='mt-5'>
                                <div className='disclaimer-text'>Disclaimer</div>
                                
                                <div className='desc-text mt-1'>Frruit is an AI powered capital markets search engine built using powerful generative AI large language models. Frruit may occasionally produce inaccurate or inappropriate information. Please be aware that any content generated by Frruit should not be considered as investment advice, or a recommendation to buy or sell securities, and it should not be the sole basis for any investment decisions. Frruit output is provided 'as is,' and Airrchip makes no guarantees regarding its accuracy, completeness, quality, timeliness, or any other attributes. We strongly advise independently verifying the accuracy of Frruit output for your specific needs.</div>
                            </div>
                            <button className='blue-btn px-5 mt-3' onClick={verifyProceed}>Continue</button>
                        </div>
                        {/* <div className='beta-text'>In the beta version of our platform, we are thrilled to offer an exclusive focus on the
                            <br /><span className='nifty-text'>Nifty 50 and Sensex 30 stocks.</span></div> */}
                        {/* <div className='white-box-make-selection'>
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
                        </div> */}
                    </div>
                </div>
                <div className='col-xl-5 makeselection-right-side'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div>
                            {/* <div className='d-flex justify-content-center'>
                                <img src={FrruitLogo} width={196} className='mb-5' />
                            </div> */}
                            <img src={LoginImg3} style={{ objectFit: 'contain', width: '100%', height: window.innerHeight / 1.5, marginTop: 100 }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MakeSelection