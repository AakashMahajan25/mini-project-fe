import React, { useState } from 'react';
import { Tab } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import ResultsPage from './ResultsPage';
import ShareholdingPage from './ShareholdingPage';
import NewsPage from './NewsPage';
import CorporateActions from './CorporateActions';

function EventsPage() {

    const [activeTab, setActiveTab] = useState("Results");

    const handleTabChange = key => {
        setActiveTab(key);
    };

    return (
        <div className='eventspage main-Page-css'>
            <Tab.Container defaultActiveKey="Results" onSelect={handleTabChange}>
                <div className={window.innerWidth < 900 ? `` : 'd-flex justify-content-between align-items-center'}>
                    <div className='mt-4'>
                        <Nav variant="underline">
                            <Nav.Item>
                                <Nav.Link eventKey="News" className={window.innerWidth < 700 ? `m-0` : ''}>News</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Corporate Actions" className={window.innerWidth < 700 ? `m-0` : ''}>Corporate Actions</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
                <div>
                    <Tab.Content>
                        <Tab.Pane eventKey="News">
                            <NewsPage/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Corporate Actions">
                            <CorporateActions/>
                        </Tab.Pane>
                    </Tab.Content>
                </div>
            </Tab.Container>
        </div>
    )
}

export default EventsPage