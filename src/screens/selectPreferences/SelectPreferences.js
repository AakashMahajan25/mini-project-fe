import React from 'react'
import '../selectPreferences/SelectPreferences.scss'
import SelectMarket from '../../assets/images/selectMarket_img.png'
import SearchIcon from '../../assets/images/search-icon.png';
import { Nav, Tab } from 'react-bootstrap';

function SelectPreferences() {
    return (
        <div className='select-preferences-css'>
            <div className='d-flex justify-content-center align-items-center' style={{ height: window.innerHeight - 100 }}>
                <div className='col-xl-7'>
                    <div className='select-preferences'>
                        <div>
                            <p className='heading'>We would like to know you!</p>
                            <p className='mt-4 text-description'>To ensure the optimization and tailored experience,
                                we kindly request your preferences.</p>
                        </div>
                        <div className="position-relative mt-3" style={{ marginBottom: 20 }}>
                            <input type="text" style={{ backgroundColor: 'white' }} className="form-control form-control-search" placeholder='Search Preferences' />
                            <div className="position-absolute" style={{ left: 15, top: '15%' }}>
                                <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                            </div>
                        </div>
                        <p className='mt-3 text-description' style={{ fontSize: 14, fontWeight: 600 }}>Add Preferences</p>
                        <div >
                            <Tab.Container defaultActiveKey="">
                                <Nav variant="pills">
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Block chain">Block chain</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="earnings">earnings</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="IPO">IPO</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Finance">Finance</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="earnings2">earnings</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Nav variant="pills">
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Merger and Aquisition">Merger and Aquisition</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Financial markets">Financial markets</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Economy- Fiscal policy">Economy- Fiscal policy</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Finance2">Finance</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="earnings3">earnings</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Nav variant="pills">
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Real Estate">Real Estate</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Construction">Construction</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Infra">Infra</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Retail">Retail</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Wholesale">Wholesale</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Nav variant="pills">
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Meme stocks">Meme stocks</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="crypto">crypto</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Technology">Technology</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Fintech">Fintech</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Sustainable">Sustainable</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Nav variant="pills">
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Tech Giants">Tech Giants</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Startups">Startups</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Hospitality">Hospitality</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Retail2">Retail</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='unSelected' eventKey="Wholesale2">Wholesale</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Tab.Container>
                        </div>
                        <div className=''>
                            <button className='blue-btn mt-4 px-5'>Done</button>
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

export default SelectPreferences