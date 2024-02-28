import React from 'react'
import './HelpFAQ.scss'
import Support from '../../../assets/images/support.png'
import MailIcon from '../../../assets/images/blue-mail-img.png'
import PhoneIcon from '../../../assets/images/blue-phone-img.png'
import SearchIcon from '../../../assets/images/search-icon.png';

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
                    <div className='faq-text'>Frequently Asked Question</div>
                    {/* <div className="position-relative" style={{ marginBottom: 10}}>
                        <input type="text" className="form-control form-control-search" placeholder='Search Here' />
                        <div className="position-absolute" style={{ left: 31, top: '15%' }}>
                            <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                        </div>
                    </div> */}
                    <div className="position-relative mt-3" style={{ marginBottom: 20 }}>
                    <input type="text" style={{ backgroundColor: 'white' }} className="form-control form-control-search" placeholder='Search Preferences' />
                    <div className="position-absolute" style={{ left: 15, top: '15%' }}>
                        <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                    </div>
                </div>
                </div>
            </section>
        </>
    )
}

export default HelpFAQ