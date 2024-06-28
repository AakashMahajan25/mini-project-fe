import React, { useState } from 'react'
import './ChatGpt.scss'
import ProfileIcon from '../../assets/images/profile_image.png'
import ArrowGrey from '../../assets/images/arrow-right-grey.png'
import DefaultImg from '../../assets/images/market-content-default-img.png'
import LogoCircle from '../../assets/images/frruit-logo-circle.png'
import CompanyLogo from '../../assets/images/ETlogo.png'
import TopRIghtArrow from '../../assets/images/topRightArrow.png'
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import TataLogo from '../../assets/images/Tata_Consultancy_Services_Logo.png'
import UpGreenArrow from '../../assets/images/up-arrow-outline.png'
import DownRedArrow from '../../assets/images/down-arrow-outline.png'
import Slider from 'react-slick'
import TrendingStocksCard from '../trendingStocks/TrendingStocksCard'
import DiscoverCorrelationGraph from '../graph/DiscoverCorrelationGraph'
import BarChart from '../barChart/BarChart'
import { useSelector } from 'react-redux'
import { formatTimeAgo, getCurrentTimeWithAMPM, replaceNewlinesWithBr, trimText } from '../../utils/utils'
import { useLoading, Audio, SpinningCircles, Circles, ThreeDots } from '@agney/react-loading';
import { useLocation } from 'react-router'
import UploadDocImg from '../../assets/images/doc-img.png'
import { useNavigate } from 'react-router-dom';
import quesIcon from '../../assets/images/i-icon.png';
// import PieChart from '../pieChart/PieChart'
import NewsTime from '../../assets/images/time-clock.png';
import NetworkGraph from '../networkGraph/NetworkGraph'
import { Tooltip } from 'react-tooltip'
import FullScreenIcon from '../../assets/images/ic_baseline_fullscreen.png'
import { Modal } from 'react-bootstrap'
import LineGraph from '../graph/LineGraph'
import Markdown from 'react-markdown'

function ChatGpt(props) {
    const { chatSuggestions } = useSelector(state => state.fruitGPTSlice);
    const location = useLocation()
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [modalGraphData, setModalGraphData] = useState('');
    const [sourceData, setSourceData] = useState([]);
    const path = location.pathname === '/market-content-gpt'
    const handleShow2 = () => {
        setShow2(true);
    }
    const handleClose2 = () => {
        setShow2(false)
    };
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <ThreeDots width="50" color="blue" />,
    });
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8.5,
        swipeToSlide: true,
        arrows: false,
    };

    var stocksettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3.2,
        swipeToSlide: true,
        arrows: false
    };

    var graphSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1.5,
        swipeToSlide: true,
        arrows: false,
    };

    const fundamental = [
        {
            title: 'Market Cap',
            value: '1295'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
    ]
    const trendingStocksData = [
        {
            stockName: 'TCS',
            ltpLabel: 'LTP',
            ltpValue: '3903',
            percentageChange: '0.5%',
            buyButtonText: 'Buy',
            sellButtonText: 'Sell',
            fruitButtonText: 'Get Frruit',
        },
        {
            stockName: 'TCS',
            ltpLabel: 'LTP',
            ltpValue: '3903',
            percentageChange: '-0.5%',
            buyButtonText: 'Buy',
            sellButtonText: 'Sell',
            fruitButtonText: 'Get Frruit',
        },
        {
            stockName: 'TCS',
            ltpLabel: 'LTP',
            ltpValue: '3903',
            percentageChange: '0.5%',
            buyButtonText: 'Buy',
            sellButtonText: 'Sell',
            fruitButtonText: 'Get Frruit',
        },
        {
            stockName: 'TCS',
            ltpLabel: 'LTP',
            ltpValue: '3903',
            percentageChange: '-0.5%',
            buyButtonText: 'Buy',
            sellButtonText: 'Sell',
            fruitButtonText: 'Get Frruit',
        },
        {
            stockName: 'TCS',
            ltpLabel: 'LTP',
            ltpValue: '3903',
            percentageChange: '0.5%',
            buyButtonText: 'Buy',
            sellButtonText: 'Sell',
            fruitButtonText: 'Get Frruit',
        },
    ];
    const cardsData = [
        { logoSrc: CompanyLogo, companyName: 'Economic Times', cardTitle: 'Tata Price up by 5%', cardPara: 'Tata Consultancy Services Limited (TCS) is an India-based company engaged in providing information technology (IT) services, consulting, and business solutio' },
        { logoSrc: CompanyLogo, companyName: 'Economic Times', cardTitle: 'Tata Price up by 5%', cardPara: 'Tata Consultancy Services Limited (TCS) is an India-based company engaged in providing information technology (IT) services, consulting, and business solutio' },
        { logoSrc: CompanyLogo, companyName: 'Economic Times', cardTitle: 'Tata Price up by 5%', cardPara: 'Tata Consultancy Services Limited (TCS) is an India-based company engaged in providing information technology (IT) services, consulting, and business solutio' },
        { logoSrc: CompanyLogo, companyName: 'Economic Times', cardTitle: 'Tata Price up by 5%', cardPara: 'Tata Consultancy Services Limited (TCS) is an India-based company engaged in providing information technology (IT) services, consulting, and business solutio' },
        { logoSrc: CompanyLogo, companyName: 'Economic Times', cardTitle: 'Tata Price up by 5%', cardPara: 'Tata Consultancy Services Limited (TCS) is an India-based company engaged in providing information technology (IT) services, consulting, and business solutio' },
        { logoSrc: CompanyLogo, companyName: 'Economic Times', cardTitle: 'Tata Price up by 5%', cardPara: 'Tata Consultancy Services Limited (TCS) is an India-based company engaged in providing information technology (IT) services, consulting, and business solutio' },
        { logoSrc: CompanyLogo, companyName: 'Economic Times', cardTitle: 'Tata Price up by 5%', cardPara: 'Tata Consultancy Services Limited (TCS) is an India-based company engaged in providing information technology (IT) services, consulting, and business solutio' },
    ];
    const { containerRef, docStatus = false, docName = '', newChat, selectedType } = props;

    const { chatHistory, frruitLoader } = useSelector(state => state.fruitGPTSlice);
    const { contentChatHistory, contentGPTLoader, contentGraphLoader } = useSelector(state => state.contentGPTSlice);


    const newsItem = {
        image: "https://www.benzinga.com/next-assets/images/schema-image-default.png",
        newsLink: "https://www.globenewswire.com/news-release/2024/03/18/2847476/0/en/INVL-Technology-completed-assessment-of-M-A-intermediaries-and-chose-a-service-provider.html",
        timeStamp: "20240318T074500",
        title: "INVL Technology completed assessment of M&A intermediaries and chose a service provider"
    }

    const colors = ['#FF7F50', "#40E0D0", '#DA70D6', '#87CEEB', "#32CD32", '#DAA520', "#E6E6FA", '#DC143C', '#6495ED', "#7FFF00", '#7FFFD4', "#FA8072", '#FF1493', '#00FFFF', "#EE82EE",]

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    function toCamelCase(str) {
        str = str?.replace(/_/g, ' '); // Replace underscores with spaces
        return str?.toLowerCase()?.replace(/(^|\s)\S/g, function (match) {
            return match?.toUpperCase();
        });
    }


    const data = {
        nodes: removeDuplicatesFromArray(modalGraphData?.Nodes?.map((el, i) => ({ ...el, color: getRandomColor() }))),
        edges: modalGraphData?.Edges?.map((el, i) => ({ ...el, label: toCamelCase(el?.label) }))
    };


    function removeDuplicatesFromArray(arr) {
        const uniqueObjects = {};
        const resultArray = [];

        arr?.forEach(item => {
            if (!uniqueObjects[item?.id]) {
                uniqueObjects[item?.id] = true;
                resultArray.push(item);
            }
        });

        return resultArray;
    }

    const renderLinkGraph = (chartData) => {
        const nodes = removeDuplicatesFromArray(chartData?.Nodes?.map((el, i) => ({ ...el, color: getRandomColor() })))
        const edges = chartData?.Edges?.map((el, i) => ({ ...el, label: toCamelCase(el?.label) }))
        return (
            <NetworkGraph height={'350px'} nodes={nodes}
                edges={edges}
            />
        )
    };


    // const GraphData =  [
    //     {
    //         'metric_name': 'ROCE',
    //         'chart_type': 'bar',
    //         'xlabel': 'years',
    //         'ylabel': 'ROCE',
    //         'data': [
    //             {
    //                 'company_name': 'ASIAN PAINTS',
    //                 'x-axis': ['2023', '2022', '2021', '2020'],
    //                 'y-axis': ['35.93', '36.07', '31.42', '35.2']
    //             },
    //             {
    //                 'company_name': 'COAL INDIA',
    //                 'x-axis': ['2023', '2022', '2021', '2020'],
    //                 'y-axis': ['51.62', '35.13', '56.47', '67.45']
    //             }]
    //     },
    //     {
    //         'metric_name': 'ROE',
    //         'chart_type': 'bar',
    //         'xlabel': 'years',
    //         'ylabel': 'ROE',
    //         'data': [{
    //             'company_name': 'ASIAN PAINTS',
    //             'x-axis': ['2023', '2022', '2021', '2020'],
    //             'y-axis': ['24.65', '29.01', '28.33', '28.34']
    //         },
    //         {
    //             'company_name': 'COAL INDIA',
    //             'x-axis': ['2023', '2022', '2021', '2020'],
    //             'y-axis': ['73.23', '45.52', '67.66', '89.54']
    //         }]
    //     }
    // ]

    const renderGraph = (chartData) => {
        if (chartData?.length > 0) {
            // If there's only one object in chartData, render one graph
            if (chartData.length === 1) {
                const dataObject = chartData[0];
                const labels = dataObject.data[0]['x-axis'];
                const data = dataObject.data.map(point => point['y-axis']?.map(parseFloat));
                return (
                    <div className='graphSlider'>
                        <div className='chartGraph' style={{ backgroundColor: '#F1F4FD' }}>
                            <h4 className='title'>{dataObject.metric_name}</h4>
                            {
                                dataObject?.chart_type === 'bar' ?
                                    <BarChart
                                        index={1 + Math.random()}
                                        graphData={{
                                            labels: [...labels],
                                            data: data
                                        }}
                                        xAxisLabel={dataObject.xlabel}
                                        yAxisLabel={dataObject.ylabel}
                                        legendLabels={dataObject.data.map(point => point['company_name'])}
                                    />
                                    :
                                    <LineGraph
                                        index={1 + Math.random()}
                                        graphData={{
                                            labels: [...labels],
                                            data: data
                                        }}
                                        xAxisLabel={dataObject.xlabel}
                                        yAxisLabel={dataObject.ylabel}
                                        legendLabels={dataObject.data.map(point => point['company_name'])}
                                    />
                            }
                        </div>
                    </div>
                );
            } else { // If there are two objects in GraphData, render two graphs
                return (
                    <div className='graphSlider'>
                        {
                            chartData?.length > 2 &&
                            <h6 style={{ color: 'rgb(69, 99, 228)', fontSize: 14, textAlign: 'right' }}>Slide to Know More</h6>
                        }
                        <Slider {...graphSettings}>
                            {chartData.map((dataObject, index) => (
                                <div className='chartGraph' key={index} style={{ backgroundColor: '#F1F4FD', width: 600 }}>
                                    <h4 className='title'>{dataObject.metric_name}</h4>
                                    {dataObject?.chart_type === 'bar' ?

                                        <BarChart
                                            index={index + 1}
                                            graphData={{
                                                labels: [...dataObject.data[0]['x-axis']],
                                                data: dataObject.data.map(point => point['y-axis'].map(parseFloat))
                                            }}
                                            xAxisLabel={dataObject.xlabel}
                                            yAxisLabel={dataObject.ylabel}
                                            legendLabels={dataObject.data.map(point => point.company_name)}
                                        />
                                        :
                                        <LineGraph
                                            index={index}
                                            graphData={{
                                                labels: [...dataObject.data[0]['x-axis']],
                                                data: dataObject.data.map(point => point['y-axis'].map(parseFloat))
                                            }}
                                            xAxisLabel={dataObject.xlabel}
                                            yAxisLabel={dataObject.ylabel}
                                            legendLabels={dataObject.data.map(point => point.company_name)}
                                        />
                                    }
                                </div>
                            ))}
                        </Slider>
                    </div>
                );
            }
        } else {
            return null;
        }
    };

    const navigate = useNavigate();
    const routeChangeFrruitGPT = (question) => {
        navigate("/frruit-gpt", {
            state: { question, fundamental: true },
        });
    };
    const handleShow = (data) => {
        setModalGraphData(data)
        setShow(true);
    }

    return (
        <>
            <div className='ChatGpt' style={{
                height: path ? (window.innerWidth < 786 ? window.innerHeight - 182 : window.innerHeight - 200) : (window.innerWidth < 786 ? window.innerHeight - 232 : window.innerHeight - 205),
                paddingBottom: chatHistory.length === 0 && !path ? 0 : 50,
                marginTop: window.innerWidth < 500 ? 60 : (path ? (contentChatHistory.length === 0 ? 10 : 10) : 0),
                // marginTop: path ? (contentChatHistory.length === 0 ? 10 : 10) : 0,
                // marginBottom: window.innerWidth < 786 ? 80 : 20,
                marginBottom: path ? (window.innerWidth < 786 ? 80 : 20) : (window.innerWidth < 786 ? 80 : 20)
            }} ref={containerRef}>
                {
                    (newChat && !path) && <div className='default-screens-content' style={{ height: window.innerHeight - 310 }}>
                        <div className='text-center'>
                            <img src={LogoCircle} width={57} style={{ objectFit: 'contain' }} />
                            <div className='help-text'>How can I help you today ?</div>
                            <div className='row'>
                                {chatSuggestions?.slice(0, window.innerWidth < 600 ? 2 : 4).map((item, index) => (
                                    <div key={index} className='col-lg-6 col-md-12 column-pad' style={{ cursor: 'pointer' }} onClick={() => routeChangeFrruitGPT(item?.prompt_text)}>
                                        <div className='prompts-text-bg'>
                                            <div className=' d-flex justify-content-between align-items-center w-100' >
                                                <p className='prompts-text'>{item?.prompt_text}</p>
                                                <img style={{ width: 24, objectFit: 'contain' }} className={`my-anchor-element-${index}`} src={quesIcon} />
                                            </div>
                                        </div>
                                        <Tooltip anchorSelect={`.my-anchor-element-${index}`} place="top" className="bg-primary">
                                            {item?.prompt_description ? item?.prompt_description : item?.prompt_text}
                                        </Tooltip>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                }
                {
                    (newChat && path) && <div className='default-screens-content' style={{ height: window.innerHeight - 310 }}>
                        <div className='text-center'>
                            <img src={DefaultImg} className='default-screens-content-img-css' />
                            <div className='help-text'>How can I help you today ?</div>
                            <div className='default-para-text'>Supercharge your investment decisions : Attach documents or YouTube links on capital markets for GPT-driven insights!</div>
                        </div>
                    </div>

                }
                {
                    chatHistory?.map((chat, index) =>
                        chat?.person === 'user' ?
                            <div className='rightChat'>
                                {/* <img src={ProfileIcon} className='profile-styles' /> */}
                                <div className='d-flex align-items-center my-2 floatRight'>
                                    <img src={ArrowGrey} className='arrow' />
                                    <p className='you-text'>You</p>
                                </div>
                                <div className='chat-text-container'>
                                    <h3 className='chat-text'>{chat?.text}</h3>
                                    <h3 className='chat-text' style={{color:"#a4a5a7",fontWeight:'400'}}>{getCurrentTimeWithAMPM(chat?.createdAt)}</h3>
                                </div>
                            </div>
                            :
                            <div className='leftChat'>
                                {
                                    chatHistory[index - 1]?.person !== "bot" &&
                                    <>
                                        <img src={LogoCircle} className='profile-styles' />
                                        <div className='d-flex align-items-center my-2 floatLeft'>
                                            <img src={ArrowGrey} className='arrow' />
                                            <p className='you-text'>Frruit GPT</p>
                                            <h3 className='you-text' style={{ color: "#a4a5a7", fontWeight: '400', marginBottom: 0, marginLeft: 5 }}>{getCurrentTimeWithAMPM(chat?.createdAt)}</h3>
                                        </div>
                                    </>
                                }
                                {
                                    chat.type === 'text' ?
                                        <>
                                            <div className='chat-text-container'>
                                                <Markdown>{chat?.text || ''}</Markdown>
                                                {/* <h3 className='chat-text' dangerouslySetInnerHTML={{ __html: replaceNewlinesWithBr(chat?.text || '') }}></h3> */}
                                            </div>
                                        </>
                                        : renderGraph(chat?.text)
                                }
                                {
                                    (chat.link && chat.link.length > 0) &&
                                    <>
                                        <div className='companyCardSTyleCss'>
                                            <div className='cardContainer'>
                                                {chat.link.slice(0, 3).map((link, index) => (
                                                    <a href={link} target='_blank' key={index} className='sourceCardCss'>
                                                        <div className='Dflex-css'>
                                                            <div className='d-flex align-items-center'>
                                                                <img src={link?.logoSrc} className='smallCircleLogoCss me-2' alt='Company Logo' />
                                                                <div className='companyNameCss'>{link?.companyName}</div>
                                                            </div>
                                                            <img src={TopRIghtArrow} className='smallCircleLogoCss' alt='Arrow Icon' />
                                                        </div>
                                                    </a>
                                                ))}
                                                <div className='sourceCardCss' style={{ width: 'max-content' }} onClick={() => { handleShow2(); setSourceData(chat.link) }}>
                                                    <div className='Dflex-css'>
                                                        <div className='d-flex align-items-center'>
                                                            <div className='companyNameCss me-2'>View All</div>
                                                        </div>
                                                        <img src={TopRIghtArrow} className='smallCircleLogoCss' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                                {/* {
                                    <div key={index} className='newsBox' style={{ marginBottom: 20, cursor: 'pointer',border:'1px solid #4563E4',width:'fit-content',padding:"10px 16px",borderRadius:16,backgroundColor:'#F1F4FD' }}>
                                        <div className='d-flex justify-content-start'>
                                            <div style={{width:200}}>
                                                <p className='newsTitle mt-1' style={{ fontSize: 12 }}>{newsItem?.title}</p>
                                                <div className='d-flex justify-content-start align-items-center'>
                                                    <img height={16} style={{ width: 16, objectFit: 'cover', marginRight: '5px' }} src={NewsTime} />
                                                    <p className='newsPara' style={{ fontSize: 12 }}>{formatTimeAgo(newsItem?.timeStamp)}</p>
                                                </div>
                                                <button className='light-blue-btn mt-2'>View More</button>
                                            </div>
                                        </div>
                                    </div>
                                } */}
                                {/* <img src={LogoCircle} className='profile-styles' /> */}

                                {/* {
                    <div className='stock-list'>
                        <div className='d-flex align-items-center'>
                            <div className='image-stock'>
                                <img src={TataLogo} />
                            </div>
                            <div className='stock-text'>
                                <h3 className='stock-title'>TCS</h3>
                                <div className='d-flex align-items-center mt-1'>
                                    <h5 className='stock-subTitle'>LTP</h5>
                                    <h5 className='stock-price-green'>3903</h5>
                                    <h5 className='stock-price-green'>0.5%</h5>
                                    <img src={UpGreenArrow} className='arrow' />
                                </div>
                            </div>
                        </div>
                        <div className='button-stock-list'>
                            <button className='btn-green-buy'>Buy</button>
                            <button className='btn-red-sell'>Sell</button>
                        </div>
                    </div>




                      <div className='chartGraph'>
                            <h4 className='title'>{chartData[keys[0]].metric_name}</h4>
                            <BarChart
                                index={2}
                                graphData={{
                                    labels: [...labels].reverse(),
                                    data: [...data].reverse()
                                }}
                            />
                        </div>
                        <div className='chartGraph'>
                            <h4 className='title'>{chartData[keys[0]].metric_name}</h4>
                            <PieChart
                                index={3}
                                graphData={{
                                    labels: [...labels].reverse(),
                                    data: [...data].reverse()
                                }}
                            />
                        </div>
                } */}



                                {/* {
                                <div className='graphSlider'>
                                    <Slider {...graphSettings}>
                                        <div className='chartGraph'>
                                            <h4 className='title'>Price Chart</h4>
                                            <DiscoverCorrelationGraph
                                                index={1}
                                                graphData={{
                                                    labels: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20'],
                                                    data: [800, 650, 300, 550, 852, 157, 900, 350, 1000, 432]
                                                }}
                                            />
                                        </div>
                                        <div className='chartGraph'>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <h4 className='title'>Financials</h4>
                                                <div className='d-flex align-items-center'>
                                                    <div className='blue-btn me-3' style={{ padding: '8px 33px', cursor: 'pointer' }}>Revenue</div>
                                                    <div className='light-blue-btn me-3' style={{ padding: '8px 33px', cursor: 'pointer' }}>Profit</div>
                                                    <div className='light-blue-btn' style={{ padding: '8px 33px', cursor: 'pointer' }}>Net Worth</div>
                                                </div>
                                            </div>
                                            <BarChart
                                                index={2}
                                                graphData={{
                                                    labels: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20'],
                                                    data: [800, 650, 300, 550, 852, 157, 900, 350, 1000, 432]
                                                }}
                                            />
                                        </div>
                                    </Slider>
                                </div>

                            } */}

                                {/* <div className='fundamental-container'>
                    <h2 className='fundamental-maintitle'>Fundamentals</h2>
                    <Slider {...settings}>
                        {fundamental.map((fundamental) => (
                            <>
                                <div className='fundamental'>
                                    <h4 className='fundamental-title'>{fundamental?.title}</h4>
                                    <h4 className='fundamental-value'>{fundamental?.value}</h4>
                                </div>
                            </>

                        ))}
                    </Slider>
                </div> */}

                                {/* <div className='fundamental-container'>
                    <h2 className='fundamental-maintitle'>Similar Stocks</h2>
                    <Slider {...stocksettings}>
                        {trendingStocksData.map((stockData, index) => (
                            <TrendingStocksCard {...stockData} />
                        ))}
                    </Slider>
                </div> */}


                            </div>
                    )}
                {/* <div className='sourceCardCss'>
                    <div className='Dflex-css'>
                        <div className='d-flex align-items-center'>
                            <img src={CompanyLogo} className='smallCircleLogoCss me-2' />
                            <div className='companyNameCss'>Economic Times </div>
                        </div>
                        <img src={TopRIghtArrow} className='smallCircleLogoCss' />
                    </div>
                </div> */}
                {/* <div className='companyCardSTyleCss'>
                    <div className='cardContainer'>
                        {cardsData.slice(0, 3).map((card, index) => (
                            <div key={index} className='sourceCardCss'>
                                <div className='Dflex-css'>
                                    <div className='d-flex align-items-center'>
                                        <img src={card.logoSrc} className='smallCircleLogoCss me-2' alt='Company Logo' />
                                        <div className='companyNameCss'>{card.companyName}</div>
                                    </div>
                                    <img src={TopRIghtArrow} className='smallCircleLogoCss' alt='Arrow Icon' />
                                </div>
                            </div>
                        ))}
                        <div className='sourceCardCss' style={{ width: 'max-content' }} onClick={handleShow2}>
                            <div className='Dflex-css'>
                                <div className='d-flex align-items-center'>
                                    <div className='companyNameCss me-2'>View All</div>
                                </div>
                                <img src={TopRIghtArrow} className='smallCircleLogoCss' />
                            </div>
                        </div>
                    </div>
                </div> */}
                {(docName && docStatus && selectedType === 'attachment') && <div className='rightChat'>
                    {/* <img src={ProfileIcon} className='profile-styles' /> */}
                    <div className='d-flex align-items-center my-2 floatRight'>
                        <img src={ArrowGrey} className='arrow' />
                        <p className='you-text'>You</p>
                    </div>
                    <div className='chat-text-container'>
                        <div className='d-flex'>
                            <div className='attached-doc-white-box'>
                                <img src={UploadDocImg} className='attached-image' />
                                <div className='pdf-name me-2'>{docName}</div>
                            </div>
                        </div>
                    </div>
                </div>}
                {
                    contentChatHistory?.map((chat, index) =>
                        chat?.person === 'user' ?

                            <div className='rightChat' style={{ marginTop: 0 }}>
                                {/* <img src={ProfileIcon} className='profile-styles' /> */}
                                <div className='d-flex align-items-center my-2 floatRight'>
                                    <img src={ArrowGrey} className='arrow' />
                                    <p className='you-text'>You</p>
                                </div>
                                <div className='chat-text-container'>
                                    <h3 className='chat-text'>{chat?.text}</h3>
                                </div>
                            </div>


                            :
                            <div className='leftChat'>
                                {
                                    contentChatHistory[index - 1]?.person !== "bot" &&
                                    <>
                                        <img src={LogoCircle} className='profile-styles' />
                                        <div className='d-flex align-items-center my-2 floatLeft'>
                                            <img src={ArrowGrey} className='arrow' />
                                            <p className='you-text'>Market Content GPT</p>
                                        </div>
                                    </>
                                }
                                {
                                    chat.type === 'link' ?
                                        <>
                                            {chat.render_type === 'graph' ?
                                                <div style={{ position: 'relative', border: '1px solid #4563E4', borderRadius: 8, padding: 10 }}>
                                                    <div onClick={() => handleShow(chat?.text?.Graph)} style={{ position: 'absolute', right: 20, top: 0, display: 'flex', alignItems: 'center', cursor: 'pointer', backgroundColor: "white", padding: 5, zIndex: 100 }}>
                                                        <div style={{ color: '#4563E4' }}>Full Screen</div>
                                                        <img src={FullScreenIcon} width={24} top={24} />
                                                    </div>
                                                    {renderLinkGraph(chat?.text?.Graph)}
                                                </div>
                                                :
                                                <div className='chat-text-container'>
                                                    <h3 className='chat-text' style={{ fontWeight: '700' }}>Key Points:-</h3>
                                                    <h3 className='chat-text mt-1' dangerouslySetInnerHTML={{ __html: replaceNewlinesWithBr(chat?.text?.Key_points || '') }}></h3>
                                                    <h3 className='chat-text mt-2' style={{ fontWeight: '700' }}>Summary:-</h3>
                                                    <h3 className='chat-text mt-1' dangerouslySetInnerHTML={{ __html: replaceNewlinesWithBr(chat?.text?.summary || '') }}></h3>
                                                    <h3 className='chat-text mt-2' style={{ fontWeight: '700' }}>Sentiment:-</h3>
                                                    <h3 className='chat-text mt-1' dangerouslySetInnerHTML={{ __html: replaceNewlinesWithBr(chat?.text?.sentiment || '') }}></h3>
                                                </div>
                                            }
                                        </>
                                        :
                                        <>
                                            {chat.render_type === 'graph' ?
                                                <div style={{ position: 'relative', border: '1px solid #4563E4', borderRadius: 8, padding: 10 }}>
                                                    <div onClick={() => handleShow(chat?.text?.Graph)} style={{ position: 'absolute', right: 20, top: 0, display: 'flex', alignItems: 'center', cursor: 'pointer', backgroundColor: "white", padding: 5, zIndex: 100 }}>
                                                        <div style={{ color: '#4563E4' }}>Full Screen</div>
                                                        <img src={FullScreenIcon} width={24} top={24} />
                                                    </div>
                                                    {renderLinkGraph(chat?.text?.Graph)}
                                                </div>
                                                :
                                                <div className='chat-text-container'>
                                                    <h3 className='chat-text mt-1' dangerouslySetInnerHTML={{ __html: replaceNewlinesWithBr(chat?.text || '') }}></h3>
                                                </div>
                                            }

                                        </>

                                }


                            </div>
                    )}
                <div className='d-flex align-items-center'>
                    {
                        (frruitLoader || contentGPTLoader) &&
                        <section {...containerProps} style={{ marginLeft: 20 }}>
                            {indicatorEl} {/* renders only while loading */}
                        </section>
                    }
                    {
                        contentGraphLoader &&
                        <div className='chat-text-container' style={{ marginLeft: 20, marginTop: 10, color: '#4563E4' }}>
                            <h6 className='chat-text mt-1'>Creating network graph may take few mins</h6>
                        </div>
                    }
                </div>
            </div>
            <Modal show={show} fullscreen={true} onHide={() => setShow(false)} style={{ backgroundColor: '#fefefe' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Relation Graph</Modal.Title>
                </Modal.Header>
                <NetworkGraph height={window.innerHeight - 50} nodes={data.nodes}
                    edges={data.edges}
                />
            </Modal>
            <Modal show={show2}
                onHide={handleClose2}
                size='lg'
                scrollable
                className='latest-news-modal'
                style={{ animation: show2 ? 'slideInRight 0.3s ease-in-out' : 'none' }}
            >
                <Modal.Header className='pb-0'>
                    <div className='d-flex justify-content-start align-items-center' style={{ marginBottom: 5 }}>
                        <button onClick={() => handleClose2()} className='light-blue-btn'>
                            <img src={BackBtnArrow} style={{ width: 7, height: 13, objectFit: 'contain', marginRight: 5, marginTop: -2 }} />
                            Back
                        </button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='title-text mb-3'>Sources</div>
                    <div className='companyCardSTyleCss'>
                        <div className='cardContainer'>
                            {sourceData?.map((card, index) => (
                                <>
                                    <div key={index}  className='sourceCardCss'>
                                        <div className='Dflex-css'>
                                            <div className='d-flex align-items-center'>
                                                <img src={card.logoSrc} className='smallCircleLogoCss me-2' alt='Company Logo' />
                                                <div className='companyNameCss'>{card.companyName}</div>
                                            </div>
                                            <img src={TopRIghtArrow} className='smallCircleLogoCss' alt='Arrow Icon' />
                                        </div>
                                        <div className='title-text' style={{ fontSize: 16, marginTop: 10 }}>{card.cardTitle}</div>
                                        <div className='description-text' style={{ fontSize: 12, marginTop: 10 }}>{card.cardPara}</div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ChatGpt