import React from 'react'
import '../makeSelection/MakeSelection.scss'
import { Nav, Tab, Tabs } from 'react-bootstrap'
import SelectMarket from '../../assets/images/selectMarket_img.png'

function MakeSelection() {
    return (
        <div className='selectmarket-css'>
            <div className='d-flex justify-content-center align-items-center' style={{ height: window.innerHeight - 100 }}>
                <div className='col-xl-7'>
                    <div className='selectMarket'>
                        <div className='col-xl-7'>
                            <p className='heading p-0'> Select Market</p>
                            <p className='mt-5 text-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                        </div>
                        <div className='showPrompt'>
                            <Tab.Container defaultActiveKey="India">
                                <Nav className='customPrompttabs' variant="pills">
                                    <Nav.Item>
                                        <Nav.Link eventKey="India">{`India`}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="USA">{'USA'}</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Tab.Container>
                        </div>
                        <div className='mt-5'>
                            <p className='disclaimer'>Disclaimer</p>
                            <p className='text-description' style={{ fontSize: 14 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to </p>
                        </div>
                        <div className='mt-4'>
                            <button className='blue-btn mt-5'>Agree and Proceed</button>
                        </div>
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