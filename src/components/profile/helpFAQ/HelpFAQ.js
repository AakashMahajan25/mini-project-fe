import React from 'react'
import './HelpFAQ.scss'
import Support from '../../../assets/images/support.png'
import MailIcon from '../../../assets/images/blue-mail-img.png'
import PhoneIcon from '../../../assets/images/blue-phone-img.png'
import SearchIcon from '../../../assets/images/search-icon.png';
import FAQImg from '../../../assets/images/faq-img.png';
import Accordion from 'react-bootstrap/Accordion';

function HelpFAQ({faqs}) {
    // const imageInnerHeight = window.innerWidth > 768 ?  window.innerHeight - 350 : window.innerHeight - 650;
    const imageInnerHeight = window.innerWidth > 820 ? window.innerHeight - 350 : window.innerWidth > 768 ? window.innerHeight - 700 : window.innerHeight - 650;
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
                                <div className='blue-box-text'>support@airrchip.com</div>
                            </div>
                        </div>
                        <div className='col-lg-6 col-sm-12 column-pad'>
                            <div className='contact-blue-box'>
                                <img className='me-2' src={PhoneIcon} width={24} style={{ objectFit: 'contain' }} />
                                <div className='blue-box-text'>+91 8369894335</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='gray-boder'></div>

                <div className='faq-section'>
                    <div className='row'>
                        <div className='col-lg-6 col-sm-12'>
                            <div className='faq-text mb-4'>Frequently Asked Question</div>
                            {/* <div className='searchbar-css'>
                                <div className="position-relative mt-3" style={{ marginBottom: 20 }}>
                                    <input type="text" style={{ backgroundColor: 'white' }} className="form-control form-control-search" placeholder='Search Preferences' />
                                    <div className="position-absolute" style={{ left: 15, top: '15%' }}>
                                        <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                                    </div>
                                </div>
                            </div> */}
                            <div>
                                <Accordion>
                                    {
                                        faqs.map((item, index) => {
                                            return <Accordion.Item eventKey={index.toString()}>
                                                <Accordion.Header>{item?.question}</Accordion.Header>
                                                <Accordion.Body>
                                                    {item?.answer}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        })
                                    }
                                </Accordion>
                            </div>
                        </div>
                        <div className='col-lg-6 col-sm-12'>
                            {/* <div className='d-flex align-items-center justify-content-center' style={{ height: imageInnerHeight }}> */}
                            <div className='d-flex align-items-center justify-content-center mt-4'>
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