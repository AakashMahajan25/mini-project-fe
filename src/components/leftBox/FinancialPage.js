import React, { useState } from 'react';
import { Tab } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import ResultsPage from './ResultsPage';
import ShareholdingPage from './ShareholdingPage';
import PeersPage from './PeersPage';

function FinancialPage({getFinancialsPeers, financialPeer, financialsShareHoldings, getFinancialsShareHolding}) {

    const [activeTab, setActiveTab] = useState("Results");

    const handleTabChange = key => {
        setActiveTab(key);

        if(key === 'Peers'){
            getFinancialsPeers();
        }

        if(key === 'Shareholdings'){
            getFinancialsShareHolding();
        }
    };

    return (
        <div className='revenuepage main-Page-css'>
            <Tab.Container defaultActiveKey="Results" onSelect={handleTabChange}>
                <div className={window.innerWidth < 900 ? `` : 'd-flex justify-content-between align-items-center'}>
                    <div className='mt-4'>
                        <Nav variant="underline">
                            <Nav.Item>
                                <Nav.Link eventKey="Results" className={window.innerWidth < 700 ? `m-0` : ''}>Results</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Shareholdings" className={window.innerWidth < 700 ? `m-0` : ''}>Shareholdings</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Peers" className={window.innerWidth < 700 ? `m-0` : ''}>Peers</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
                <div>
                    <Tab.Content>
                        <Tab.Pane eventKey="Results">
                            <ResultsPage/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Shareholdings">
                            <ShareholdingPage financialsShareHoldings={financialsShareHoldings}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Peers">
                            <PeersPage financialPeer={financialPeer}/>
                        </Tab.Pane>
                    </Tab.Content>
                </div>
            </Tab.Container>
        </div>
    )
}

export default FinancialPage