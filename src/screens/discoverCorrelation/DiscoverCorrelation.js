import React, { useEffect, useState } from 'react';
import TabsMui from '@mui/material/Tabs';
import TabMui from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TopBar from '../../components/topBar/TopBar'
import StockPriceScroll from '../../components/stockPriceScroll/StockPriceScroll'
import LeftBox from '../../components/leftBox/LeftBox'
import './DiscoverCorrelation.scss';
import EventExplorerCard from '../../components/eventExplorerCard/EventExplorerCard';
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import BuySellStockCard from '../../components/buySellStockCard/BuySellStockCard';
import { Nav, Tab, Tabs } from 'react-bootstrap'
import DiscoverCorrelationGraph from '../../components/graph/DiscoverCorrelationGraph';
import { useDispatch, useSelector } from 'react-redux';
import { getTrendingEvents } from './slice';
import BarChart from '../../components/barChart/BarChart';
import { getStockIndexes } from '../dashboard/slice';
import { Graph } from "react-d3-graph";

function DiscoverCorrelation() {
    const [showEventDetails, setShowEventDetails] = useState(false);
    const [eventDetails, setEventDetails] = useState(false);
    const dispatch = useDispatch()
    const { trendingEvents } = useSelector(state => state.discoverCorrelationSlice);

    const handleCardClick = (data) => {
        setShowEventDetails(true);
        setEventDetails(data);
    };
    const handleBackButtonClick = () => {
        setShowEventDetails(false);
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
    const stockData = [
        {
            companyName: 'TCS',
            ltpValue: 3903,
            percentageChange: 0.5,
            changeInLastMonth: +41.86
        },
        {
            companyName: 'Infosys',
            ltpValue: 1850,
            percentageChange: -0.8,
            changeInLastMonth: -12.5
        },
        {
            companyName: 'Infosys',
            ltpValue: 1850,
            percentageChange: -0.8,
            changeInLastMonth: -12.5
        },
    ];
    const [value, setValue] = useState(0);
    const [tickers, setTickers] = useState();
    const [avgReturns, setAvgReturns] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const graphData = () => {
        const ticker = [];
        const avgReturn = [];
        const reversedTickers = eventDetails?.response?.result_tickers?.slice().reverse(); // Reverse the tickers first
        reversedTickers.forEach(item => {
            ticker.push(item.ticker);
            avgReturn.push(item.avg_return.replace('%', ''));
        });
        setTickers(ticker);
        setAvgReturns(avgReturn);
    };

    useEffect(() => {
        dispatch(getTrendingEvents());
        dispatch(getStockIndexes())
    }, []);

    useEffect(() => {
        if (eventDetails) {
            graphData();
        }
    }, [eventDetails])
    const colors = ['#00E7F2', '#FDD8FF', '#D2F9BD', "#FFBCAB", "#D7B69F"]

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }
    const data = {
        nodes: [
            { id: 1, name: 'Airrchip', color: '#4563E4', },
            { id: 2, name: 'zaheer', color: getRandomColor(), },
            { id: 3, name: 'govind', color: getRandomColor(), },
            { id: 4, name: 'amit', color: getRandomColor(), },
            { id: 5, name: 'shasikant', color: getRandomColor(), },
            { id: 6, name: 'shubam', color: getRandomColor(), },
            { id: 7, name: 'hitesh', color: getRandomColor(), },
            { id: 8, name: 'yaksh', color: getRandomColor(), },
        ],
        links: [
            { source: 1, target: 2,label : "employee" },
            { source: 1, target: 3,label : "employee"  },
            { source: 1, target: 4,label : "employee"  },
            { source: 1, target: 5,label : "employee"  },
            { source: 1, target: 6,label : "employee"  },
            { source: 1, target: 7,label : "employee"  },
            { source: 1, target: 8,label : "employee"  },
        ],
    };

      const myConfig = {
        nodeHighlightBehavior: true,
        linkHighlightBehavior: true,
        height:400,
        node: {
          size: 500,
          highlightStrokeColor: "#4563E4",
          renderLabel:true,
          labelProperty:'name',
          fontSize:14,
          highlightFontSize:14,
        },
        link: {
          highlightColor: "#4563E4",
          strokeLinecap:'round',
          renderLabel:true,
          fontSize:12,
          highlightFontSize:12,
        },
      };
      
    //   const onClickNode = function(nodeId) {
    //     window.alert(`Clicked node ${nodeId}`);
    //   };
      
    //   const onClickLink = function(source, target) {
    //     window.alert(`Clicked link between ${source} and ${target}`);
    //   };

    return (
        <>
            <div className='row justify-content-between m-0'>
                <div className='col-lg-3 column-pad'>
                    <LeftBox />
                </div>
                <div className='col-lg-9 column-pad Discover-Correlation-css'>
                    <div className='Discover-Correlation-container' style={{ height: window.innerHeight - 130, overflowY: 'scroll', paddingTop: 20 }}>
                        {!showEventDetails && (
                            <>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='title' style={{ marginBottom: 20 }}>Event Explorer</div>
                                    <div className='viewAllTeaxt' style={{ marginBottom: 20 }}>View All</div>
                                </div>
                                {/* <Box marginBottom={'20px'} sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
                                    <TabsMui
                                        value={value}
                                        onChange={handleChange}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        aria-label="scrollable auto tabs example"
                                    >
                                        {tabData.map((tab, index) => (
                                            <TabMui key={index} label={tab.label} className='tab-css' />
                                        ))}
                                    </TabsMui>
                                </Box> */}
                                <div className='row'>
                                    {trendingEvents.map((eventData, index) => (
                                        <div key={index} className='col-lg-4 column-pad'>
                                            <EventExplorerCard
                                                question={eventData?.question}
                                                category={eventData?.response?.category}
                                                onCardClick={() => handleCardClick(eventData)}
                                                buttonTextColor={index % 2 === 0 ? '#40BC98' : '#D63230'}
                                                buttonBackgroundColor={index % 2 === 0 ? 'rgba(64, 188, 152, 0.1)' : 'rgba(214, 50, 48, 0.1)'}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        {showEventDetails &&
                            <>
                                <div className='d-flex justify-content-start align-items-center' style={{ marginBottom: 20 }}>
                                    <button onClick={handleBackButtonClick} className='light-blue-btn me-2'><img src={BackBtnArrow} style={{ width: 7, height: 13, objectFit: 'contain', marginRight: 5, marginTop: -2 }} />Back</button>
                                    <div className='title'>Event Explorer</div>
                                </div>
                                <div className='box'>
                                    <div className='title' style={{ marginBottom: 10 }}>{eventDetails?.question}</div>
                                    <div className='light-blue-btn' style={{ marginBottom: 10 }}>{eventDetails?.response?.category}</div>
                                    <div >
                                        <Tab.Container defaultActiveKey="first">
                                            <Nav className='customDiscoverCorrelationtabs' variant="pills">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="first">Returns</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="second">Connections</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                            <Tab.Content className='mt-3'>
                                                <Tab.Pane eventKey="first">
                                                    <div className='title-2' style={{ marginBottom: 10 }}>Stocks that get affected the most  (in %)</div>
                                                    <div className='row'>
                                                        <div className='col-lg-3' style={{ height: window.innerHeight - 320, overflowY: 'scroll', }}>
                                                            <div>
                                                                {eventDetails?.response?.result_tickers?.slice().reverse().map((stock, index) => (
                                                                    <BuySellStockCard
                                                                        key={index}
                                                                        companyName={stock.ticker}
                                                                        ltpValue={stock.ltpValue}
                                                                        percentageChange={stock.avg_return}
                                                                        changeInLastMonth={stock.changeInLastMonth}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9 column-pad' style={{ marginTop: -50 }}>
                                                            <BarChart
                                                                graphData={{
                                                                    labels: tickers,
                                                                    data: avgReturns
                                                                }}
                                                                index={3}
                                                                yAxisLabel={`Money`}
                                                                xAxisLabel={`Date`}
                                                                showXAxis={false}
                                                            />
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="second">
                                                    <div className='title-2' style={{ marginBottom: 10 }}>Stocks that get affected the most  (in %)</div>
                                                    <div className='row'>
                                                        <div className='col-lg-5' style={{ height: window.innerHeight - 410, overflowY: 'scroll' }}>
                                                            {eventDetails?.response?.similar_dates?.slice().reverse().map((label, index) => (
                                                                <div key={index} className='blue-box-label'>{label?.description}</div>
                                                            ))}
                                                        </div>
                                                        <div className='col-lg-7' style={{overflow: 'hidden',marginTop:-50}}>
                                                        {/* <Graph
                                                            id="graph-id" // id is mandatory
                                                            data={data}
                                                            config={myConfig}
                                                            // onClickNode={onClickNode}
                                                            // onClickLink={onClickLink}
                                                        /> */}
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Tab.Container>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default DiscoverCorrelation
