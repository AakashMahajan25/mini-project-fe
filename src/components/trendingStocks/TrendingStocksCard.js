import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './TrendingStocksCard.scss';
// import UpArrow from '../../assets/images/up-arrow-outline.png';
// import DownArrow from '../../assets/images/down-arrow-outline.png';
import RightWhiteArrow from '../../assets/images/white-right.png';
import UpArrow from '../../assets/images/green_up-arrow.png'
import DownArrow from '../../assets/images/red_down-arrow.png'
import { formatPrice, trimText } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import TataLogo from '../../assets/images/Tata_Consultancy_Services_Logo.png'
import UpGreenArrow from '../../assets/images/up-arrow-outline.png'
import DiscoverCorrelationGraph from '../../components/graph/DiscoverCorrelationGraph'
import StockMiniLogo from '../../assets/images/frruit-mini-logo.png';
function TrendingStocksCard({ name, stock_ticker, stock_relevance, reason }) {
    const navigate = useNavigate();
    const isPositiveChange = stock_relevance && stock_relevance.startsWith('+');
    const country = localStorage.getItem('trendingCountry')
    const [showPopUp, setShowPopUp] = useState(false)
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
    const handleClosePopup = () => {
        setShowPopUp(false)
    }
    const getFrruitClick = () => {
        // Sync selectedCountry with trendingCountry for proper market targeting
        const currentTrendingCountry = localStorage.getItem('trendingCountry');
        if (currentTrendingCountry) {
            localStorage.setItem('selectedCountry', currentTrendingCountry);
        }

        navigate("/frruit-gpt", {
            state: { question: 'Why is ' + name + ' trending ?',fundamental:'news' },
        });
    }

    return (
        <div>
            <div className='trendingStockCard' style={{ marginRight: 10 }}>
                <div className='card' onClick={getFrruitClick}>
                    <div className='d-flex align-items-center justify-content-between' style={{ marginBottom: 6 }}>
                        <p className='text me-2'>{stock_ticker || 'N/A'}</p>
                        <img className='ms-2' style={{ cursor: 'pointer', width: 24 }} src={StockMiniLogo} alt="mini-logo" />
                    </div>
                    <p className='stockname'>{name || 'Unknown Stock'}</p>
                    {stock_relevance && (
                        <div className='d-flex align-items-center mt-2'>
                            <span className={`stock-relevance ${isPositiveChange ? 'positive' : 'negative'}`}>
                                {stock_relevance}
                            </span>
                        </div>
                    )}
                    <div>
                        <div className='row px-2'>
                            {/* <div className='col-lg-4 column-pad'>
                            <div className='mx-1'>
                                <button className='green-btn'>{'Buy'}</button>
                            </div>
                        </div>
                        <div className='col-lg-4 column-pad'>
                            <div className='mx-1'>
                                <button className='red-btn'>{'Sell'}</button>
                            </div>
                        </div> */}
                            {/* <div className='col-lg-4 column-pad'>
                            <div className='mx-1'>
                                <button className='blue-btn  d-flex align-items-center justify-content-center' onClick={getFrruitClick}>{'Get Frruit'}  <img src={RightWhiteArrow} style={{ width: 6, objectFit: 'contain', marginLeft: 5 }} /></button>
                            </div>
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={showPopUp}
                onHide={handleClosePopup}
                size='xl'
                centered
                className='left-box-modal'
                scrollable
            >
                <Modal.Header closeButton onClick={handleClosePopup}>

                </Modal.Header>
                <Modal.Body>
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
                    <div className={window.innerWidth < 500 ? 'mb-3' : 'd-flex align-items-center justify-content-start mb-3'}>
                        <div class="textPart d-flex me-3">
                            <div class="text-part1 d-flex">
                                <span style={{ color: "#4563E4", marginRight: 17 }} > FIGI</span> <p style={{ color: "#6F7387" }}> BBG000GQPB11</p>
                            </div>
                        </div>
                        <div class="textPart d-flex">
                            <div class="text-part2 d-flex">
                                <span className='mr-2' style={{ color: "#4563E4", marginRight: 17 }}>Classification</span>  <p style={{ color: "#6F7387" }}>Online Marketplace</p>
                            </div>
                        </div>
                    </div>

                    <div className='modal-pera'>Tata Consultancy Services Limited (TCS) is an India-based company engaged in providing information technology (IT) services, consulting, and business solutions. It operates through Banking; Financial Markets; Consumer Goods and Distribution; Communications, Media, and Information Services; Education; Energy, Resources, and Utilities; Healthcare; High Tech; Insurance; Life Sciences; Manufacturing; Public Services; Retail; Travel and Logistics. </div>
                    <div className='StockPriceNgraph'>

                        <div className='row'>
                            <div className='col-lg-6 column-pad'>
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
                            </div>

                            <div className='col-lg-6  column-pad'>
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
                            </div>

                        </div>
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
                        <div class='row' >
                            <div className='col-lg-4 col-sm-12 column-pad'>
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
                            <div className='col-lg-4 col-sm-12 column-pad'>
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
                            <div className='col-lg-4 col-sm-12 column-pad'>
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
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

        </div>
    );
}

TrendingStocksCard.propTypes = {
    name: PropTypes.string,
    stock_ticker: PropTypes.string,
    stock_relevance: PropTypes.string,
    reason: PropTypes.string,
    isActive: PropTypes.bool,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
};

export default TrendingStocksCard;
