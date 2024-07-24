import React, { useState } from 'react'
import DiscoverCorrelationGraph from '../graph/DiscoverCorrelationGraph'
import Slider from 'react-slick'
import CustomSlider from '../rangeSlider/CustomSlider';

function OverviewPage({companyOverview}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const memo = companyOverview?.companyDetail?.MEMO ?? '';
    const previewLength = 300;

    const formatToTwoDecimalPlaces = (number) => {
        return Number(number).toFixed(2);
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };


    const dataForMapping = [
        { text1: 'Px/Chg 1D (USD)', text2: '1379.76/-5.41%', text3: '0.00' },
        { text1: '52 Wk H (01/21/21)', text2: '2020', text3: '0.00' },
        { text1: '52 Wk L (03/18/20)', text2: '49.9M/47.6M', text3: '0.00' },
        { text1: 'YTD Change/%', text2: '422.22', text3: '0.00' },
        { text1: 'mkt Cap (USD)', text2: '-195.46/-17.64%', text3: '0.00' },
        { text1: 'Shrs out/float', text2: '68,808.3M', text3: '0.00' },
    ];
    const dataForMapping2 = [
        { text1: 'Date', text2: '05/05/21', text3: '0.00' },
        { text1: 'P/E', text2: 'N.A.', text3: '0.00' },
        { text1: 'estimate P/E', text2: '711.58', text3: '0.00' },
        { text1: 'T12M EPS (USD)', text2: '-0.07', text3: '0.00' },
        { text1: 'Est EPS', text2: '1.94', text3: '0.00' },
        { text1: 'Est PEG', text2: '5.14', text3: '0.00' },

    ];
    const dataForMapping3 = [
        { text1: 'Ind Gross Yield', text2: '.', text3: '0.00' },
        { text1: 'Cash Dividened Discontinued', text2: 'N.A.', text3: '0.00' },
    ];
    const dataForMapping4 = [
        { text1: 'www.xyz.com', text2: '.', text3: '' },
        { text1: 'Buenos Aires, AR', text2: '', text3: '' },
        { text1: 'Empls', text2: '5,201 12/31/21', text3: '' },
    ];
    const dataForMapping5 = [
        { text1: 'Jay Bhatt', text2: 'CEO/Founder', text3: '' },
        { text1: 'Yaksh Rathod', text2: 'CFO', text3: '' },
        { text1: 'Hitesh Sutar', text2: 'Exec VP', text3: '' },
    ];
    const dataForMapping6 = [
        { text1: '12M Tot Ret', text2: '119.75%', text3: '' },
        { text1: 'Beta vs SPX', text2: '1.20', text3: '' },
        { text1: 'Hitesh Sutar', text2: 'Exec VP', text3: '' },
    ];

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8.5,
        swipeToSlide: true,
        arrows: false,
    };

    const fundamental = [
        {
            title: 'PE',
            value: formatToTwoDecimalPlaces(companyOverview?.fundamental?.PE) ?? ''
        },
        {
            title: 'Sector P/E',
            value: formatToTwoDecimalPlaces(companyOverview?.fundamental?.Industry_PE) ?? ''
        },
        {
            title: 'PB Ratio',
            value: formatToTwoDecimalPlaces(companyOverview?.fundamental?.PBV) ?? ''
        },
        {
            title: 'Dividend Yield',
            value: formatToTwoDecimalPlaces(companyOverview?.fundamental?.DIVYIELD) ?? ''
        },
        {
            title: 'ROE',
            value: formatToTwoDecimalPlaces(companyOverview?.fundamental?.ROE) ?? ''
        },

    ]

    return (
        <>
            <div className='modal-pera'>
                {isExpanded ? memo : `${memo.substring(0, previewLength)}${memo.length > previewLength ? '...  ' : ' '}`}
                {memo.length > previewLength && (
                    <a href="javascript:void(0)" onClick={handleToggle}>
                        {isExpanded ? ' Show Less' : 'Show More'}
                    </a>
                )}
            </div>
            <div className='StockPriceNgraph'>
                <div className='fundamental-container justify-content-start'>
                    <h2 className='fundamental-maintitle'>Fundamentals</h2>
                    {/* <Slider {...settings}> */}
                    <div className='d-flex flex-wrap'>
                        {fundamental.map((fundamental) => (
                            <>
                                <div className='fundamental'>
                                    <h4 className='fundamental-title'>{fundamental?.title}</h4>
                                    <h4 className='fundamental-value'>{fundamental?.value}</h4>
                                </div>
                            </>

                        ))}
                        {/* <div className='rangebox d-flex'>
                            <div className='box1'>
                                <p className='fundamental-title'>Low</p>
                                <p className='fundamental-value'>3,250</p>
                            </div>
                            <div>
                                <p className='range-text'>52W Range</p>
                                <CustomSlider />
                            </div>
                            <div className='box2'>
                                <p className='fundamental-title'>Low</p>
                                <p className='fundamental-value'>3,250</p>
                            </div>
                        </div> */}
                    </div>

                    {/* </Slider> */}
                </div>
                {/* <div class='d-flex' >
                    <div className='col-lg-4  column-pad'>
                        <div className='blackBorderBox'>
                            <div className='justify-content-between'>
                                <div className=''>
                                    <p style={{ fontSize: 15, fontWeight: "bold" }}>Estimates | EE</p>
                                    {dataForMapping2.map((item, index) => (
                                        <div key={index} className='d-flex justify-content-between '>
                                            <div className='blue-priceText' style={{ margin: 3 }}>{item.text1}</div>
                                            <div className='blue-priceText' style={{ color: "#6F7387" }}>{item.text2}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4  column-pad'>
                        <div className='blackBorderBox'>
                            <div className='justify-content-between'>
                                <div className=''>
                                    <p style={{ fontSize: 15, fontWeight: "bold" }}>Dividened | DVD</p>

                                    {dataForMapping3.map((item, index) => (
                                        <div key={index} className='d-flex justify-content-between '>
                                            <div className='blue-priceText' style={{ margin: 3 }}>{item.text1}</div>
                                            <div className='blue-priceText' style={{ color: "#6F7387" }}>{item.text2}</div>
                                        </div>
                                    ))}
                                    <p style={{ fontSize: 15, fontWeight: "bold" }}>Corporate Info</p>
                                    {dataForMapping4.map((item, index) => (
                                        <div key={index} className='d-flex justify-content-between '>
                                            <div className='blue-priceText' style={{ margin: 3 }}>{item.text1}</div>
                                            <div className='blue-priceText' style={{ color: "#6F7387" }}>{item.text2}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4  column-pad'>
                        <div className='blackBorderBox'>
                            <div className='justify-content-between'>
                                <div className=''>
                                    <p style={{ fontSize: 15, fontWeight: "bold" }}>Management | MGMT</p>
                                    {dataForMapping5.map((item, index) => (
                                        <div key={index} className='d-flex justify-content-between '>
                                            <div className='blue-priceText'>{item.text1}</div>
                                            <div className='blue-priceText' style={{ color: "#6F7387" }}>{item.text2}</div>
                                        </div>
                                    ))}
                                    <hr />
                                    {dataForMapping6.map((item, index) => (
                                        <div key={index} className='d-flex justify-content-between '>
                                            <div className='blue-priceText'>{item.text1}</div>
                                            <div className='blue-priceText' style={{ color: "#6F7387" }}>{item.text2}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className='row'>
                    {/* <div className='col-lg-6 column-pad'>
                        <div className='blackBorderBox'>
                            <h4 className='title'>Price Chart</h4>
                            <div id='chartSmall'>
                                <DiscoverCorrelationGraph

                                    index={2}
                                    graphData={{
                                        labels: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20'],
                                        data: [800, 650, 300, 550, 852, 157, 900, 350, 1000, 432]
                                    }}
                                />
                            </div>
                        </div>
                    </div> */}

                    {/* <div className='col-lg-6  column-pad'>
                        <div className='blackBorderBox' style={{ height: 309 }}>
                            <div className='justify-content-between'>
                                <div className=''>
                                    {dataForMapping.map((item, index) => (
                                        <div key={index} className='d-flex justify-content-between '>
                                            <div className='blue-priceText' style={{ margin: 3 }}>{item.text1}</div>
                                            <div className='blue-priceText' style={{ color: "#6F7387" }}>{item.text2}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </>

    )
}

export default OverviewPage