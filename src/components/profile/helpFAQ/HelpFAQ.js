import React from 'react'
import './HelpFAQ.scss'
import Support from '../../../assets/images/support.png'
import MailIcon from '../../../assets/images/blue-mail-img.png'
import PhoneIcon from '../../../assets/images/blue-phone-img.png'
import SearchIcon from '../../../assets/images/search-icon.png';
import FAQImg from '../../../assets/images/faq-img.png';
import Accordion from 'react-bootstrap/Accordion';

function HelpFAQ() {
    return (
        <>
            <section className='helpFAQcss'>
                <div className='needSupportDiv'>
                    <img className='me-2' src={Support} width={24} style={{ objectFit: 'contain' }} />
                    <div>
                        <div className='need-help-text'>Need Help?</div>
                        <div className='Getintouch-text'>Get in touch.</div>
                    </div>
                </div>
                <div className='contact-details'>
                    <div className='row'>
                        <div className='col-lg-6 col-sm-12 column-pad'>
                            <div className='contact-blue-box'>
                                <img className='me-2' src={MailIcon} width={24} style={{ objectFit: 'contain' }} />
                                <div className='blue-box-text'>airrchip@airrchip.com</div>
                            </div>
                        </div>
                        <div className='col-lg-6 col-sm-12 column-pad'>
                            <div className='contact-blue-box'>
                                <img className='me-2' src={PhoneIcon} width={24} style={{ objectFit: 'contain' }} />
                                <div className='blue-box-text'>+91 99999 99999</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='gray-boder'></div>

                <div className='faq-section'>
                    <div className='row'>
                        <div className='col-lg-6 col-sm-12'>
                            <div className='faq-text'>Frequently Asked Question</div>
                            <div className='searchbar-css'>
                                <div className="position-relative mt-3" style={{ marginBottom: 20 }}>
                                    <input type="text" style={{ backgroundColor: 'white' }} className="form-control form-control-search" placeholder='Search Preferences' />
                                    <div className="position-absolute" style={{ left: 15, top: '15%' }}>
                                        <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Does Frruit give Financial Advices?</Accordion.Header>
                                        <Accordion.Body>
                                            While Frruit serves as a robust investment research assistant, it's crucial to understand it doesn't offer financial advice. Instead, Frruit provides comprehensive market data, insights, and analysis, empowering you to draw your own conclusions about investments. While Frruit enhances your investment know-how, it's essential not to depend solely on it for making financial decisions.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Does Frruit give Financial Advices?</Accordion.Header>
                                        <Accordion.Body>
                                            While Frruit serves as a robust investment research assistant, it's crucial to understand it doesn't offer financial advice. Instead, Frruit provides comprehensive market data, insights, and analysis, empowering you to draw your own conclusions about investments. While Frruit enhances your investment know-how, it's essential not to depend solely on it for making financial decisions.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Does Frruit give Financial Advices?</Accordion.Header>
                                        <Accordion.Body>
                                            While Frruit serves as a robust investment research assistant, it's crucial to understand it doesn't offer financial advice. Instead, Frruit provides comprehensive market data, insights, and analysis, empowering you to draw your own conclusions about investments. While Frruit enhances your investment know-how, it's essential not to depend solely on it for making financial decisions.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Does Frruit give Financial Advices?</Accordion.Header>
                                        <Accordion.Body>
                                            While Frruit serves as a robust investment research assistant, it's crucial to understand it doesn't offer financial advice. Instead, Frruit provides comprehensive market data, insights, and analysis, empowering you to draw your own conclusions about investments. While Frruit enhances your investment know-how, it's essential not to depend solely on it for making financial decisions.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                        <div className='col-lg-6 col-sm-12'>
                            <div className='d-flex align-items-center justify-content-center' style={{ height: window.innerHeight - 350 }}>
                            <img src={FAQImg} width={300} style={{objectFit:'contain'}} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HelpFAQ