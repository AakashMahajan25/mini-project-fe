import React from 'react'
import './LeftBox.scss'
import SearchIcon from '../../assets/images/search-icon.png'
import Nav from 'react-bootstrap/Nav';
import Slider from "react-slick";

function LeftBox() {
 
    return (
        <>
            <div className='left-box'>
                <div className='box'>
                    <div className="position-relative" style={{ marginBottom: 20 }}>
                        <input type="text" className="form-control form-control-search" placeholder='Search Here'></input>
                        <div className="position-absolute" style={{ left: 15, top: '15%' }}>
                            <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} />
                        </div>
                    </div>
                    <div className='watchlistText' style={{ marginBottom: 20 }}>Watchlist</div>
                  
                        <div className='scroll-tabs-btn'>
                      
                            <Nav variant="pills" defaultActiveKey="/home">
                           
                                <Nav.Item>
                                    <Nav.Link className='me-2' eventKey="link-1">Watchlist 1</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className='me-2' eventKey="link-2">Watchlist 2</Nav.Link>
                                </Nav.Item>
                               
                                <Nav.Item>
                                    <Nav.Link className='me-2' eventKey="link-3">Watchlist 2</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className='me-2' eventKey="link-4">Watchlist 2</Nav.Link>
                                </Nav.Item>
                               
                            </Nav>
                           
                        </div>
                        
                </div>
            </div>
        </>
    )
}

export default LeftBox