import React, { useRef, useState } from 'react'
import TopBar from '../../components/topBar/TopBar'
import StockPriceScroll from '../../components/stockPriceScroll/StockPriceScroll'
import LeftBox from '../../components/leftBox/LeftBox'
import './DiscoverCorrelation.scss';
import { Nav } from 'react-bootstrap';
import EventExplorerCard from '../../components/eventExplorerCard/EventExplorerCard';

function DiscoverCorrelation() {
    const itemsRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setStartX(e.pageX - itemsRef.current.offsetLeft);
        setScrollLeft(itemsRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsMouseDown(false);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleMouseMove = (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - itemsRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        itemsRef.current.scrollLeft = scrollLeft - walk;
        requestAnimationFrame(() => handleMouseMove(e));
    };

    const tabData = [
        { label: 'Regulatory Event' },
        { label: 'Corporate Action Events' },
        { label: 'Capital Market Events' },
        { label: 'Regulatory Event2' },
        { label: 'Corporate Action Events2' },
        { label: 'Capital Market Events2' },
        { label: 'Regulatory Event3' },
        { label: 'Corporate Action Events3' },
        { label: 'Capital Market Events3' },
        { label: 'Regulatory Event4' },
        { label: 'Corporate Action Events4' },
        { label: 'Capital Market Events4' },
    ];
    const eventDataList = [
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#ECEFFC',
            buttonTextColor: '#4563E3'
        },
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#D632301A',
            buttonTextColor: '#D63230'
        },
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#40BC981A',
            buttonTextColor: '#40BC98'
        },
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#ECEFFC',
            buttonTextColor: '#4563E3'
        },
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#ECEFFC',
            buttonTextColor: '#4563E3'
        },
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#D632301A',
            buttonTextColor: '#D63230'
        },
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#D632301A',
            buttonTextColor: '#D63230'
        },
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#40BC981A',
            buttonTextColor: '#40BC98'
        },
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#40BC981A',
            buttonTextColor: '#40BC98'
        },


    ];
    return (
        <>
            <div className='row justify-content-between m-0'>
                <div className='col-lg-3'>
                    <LeftBox />
                </div>
                <div className='col-lg-9 Discover-Correlation-css'>
                    <div className='Discover-Correlation-container mt-4'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='title' style={{ marginBottom: 20 }}>Event Explorer</div>
                            <div className='viewAllTeaxt' style={{ marginBottom: 20 }}>View All</div>
                        </div>
                        <div
                            className='scroll-tabs-btn'
                            style={{ marginBottom: 20 }}
                            ref={itemsRef}
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                        >
                            <Nav variant="pills" defaultActiveKey={tabData[0].label}>
                                {tabData.map((tab, index) => (
                                    <Nav.Item key={`${tab.label}-${index}`}>
                                        <Nav.Link className='me-3' eventKey={tab.label}>{tab.label}</Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </div>
                        <div className='row'>
                            {eventDataList.map((eventData, index) => (
                                <div key={index} className='col-lg-4'>
                                    <EventExplorerCard {...eventData} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DiscoverCorrelation
