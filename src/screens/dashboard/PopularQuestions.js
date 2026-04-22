import React, { useState, useEffect } from 'react'
import './PopularQuestions.scss'
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import RightArrow from '../../assets/images/right-arrow.png';
import ReactGA from 'react-ga4';
import { useNavigate } from 'react-router-dom';
import RightBlueArrow from '../../assets/images/blue-right-arrow.png';
import RightWhiteArrow from '../../assets/images/right-arrow.png';
import RightDrawer from '../../components/rightDrawer/RightDrawer';
import { getTrendingDashboardData } from './slice';

// Mui Dropdown
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography
} from "@mui/material";

// Flag components
const FlagIcon = ({ countryCode, size = 20, className = '' }) => {
    const flagUrls = {
        'US': 'https://flagcdn.com/32x24/us.png',
        'IN': 'https://flagcdn.com/32x24/in.png',
        'GB': 'https://flagcdn.com/32x24/gb.png',
        'CA': 'https://flagcdn.com/32x24/ca.png',
        'AU': 'https://flagcdn.com/32x24/au.png',
        'DE': 'https://flagcdn.com/32x24/de.png',
        'FR': 'https://flagcdn.com/32x24/fr.png',
        'JP': 'https://flagcdn.com/32x24/jp.png',
        'CN': 'https://flagcdn.com/32x24/cn.png',
        'BR': 'https://flagcdn.com/32x24/br.png'
    };

    const flagUrl = flagUrls[countryCode];

    if (!flagUrl) {
        return <span style={{ fontSize: '16px' }}>🏳️</span>;
    }

    return (
        <img
            src={flagUrl}
            alt={`${countryCode} flag`}
            className={className}
            style={{
                width: size,
                height: size * 0.75,
                objectFit: 'contain',
                borderRadius: '2px',
                display: 'block'
            }}
        />
    );
};

// Utility function to format time difference
const formatTimeDifference = (lastUpdatedUtc) => {
    if (!lastUpdatedUtc) return 'Unknown';

    try {
        const now = new Date();
        const updated = new Date(lastUpdatedUtc);
        const diffInSeconds = Math.floor((now - updated) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

        return updated.toLocaleDateString();
    } catch (error) {
        return 'Unknown';
    }
};

function PopularQuestions({
    handleBackButtonClick,
    mostOnFrruitGpt,
    chatSuggestions,
    handleViewAllClick,
    marketSummaryData,
    marketSummaryLoading,
    marketSummaryError,
    dispatch
}) {
    const navigate = useNavigate();
    const [showMostOnFrruitDrawer, setShowMostOnFrruitDrawer] = useState(false);
    const [showSourcesDrawer, setShowSourcesDrawer] = useState(false);

    // Handle sector card click
    const handleSectorClick = (url) => {
        if (url) {
            window.open(url, '_blank');
        }
    };

    // Handle standout stock card click
    const handleStockClick = (url) => {
        if (url) {
            window.open(url, '_blank');
        }
    };

    const countries = [
        { code: 'IN', name: 'India Markets' },
        { code: 'US', name: 'US Markets' },
    ];

    const [selectedSummaryCountry, setSelectedSummaryCountry] = useState(() => {
        // Initialize from localStorage or default to India
        const savedCountryCode = localStorage.getItem("summaryMarket");

        if (savedCountryCode) {
            const savedCountryObj = countries.find(
                (country) => country.code === savedCountryCode
            );
            if (savedCountryObj) {
                return savedCountryObj.name;
            } else {
                // Invalid code in localStorage, reset to default
                localStorage.setItem("summaryMarket", "IN");
                return "India Markets";
            }
        }
        // No saved value, set default
        localStorage.setItem("summaryMarket", "IN");
        return "India Markets";
    });
    
    const routePromptFrruitGPT = (question, flag) => {
        // Add validation to prevent empty or null questions
        if (!question || question.trim() === '') {
            return;
        }
        
        ReactGA.event({
            category: 'Dashboard',
            action: 'mostonfrruit_prompt_click',
            label: 'MostonFrruit Prompt Click'
        });
        navigate("/frruit-gpt", {
            state: { question: question.trim(), fundamental: flag },
        });
    };

    const handleSummaryCountrySelect = (event) => {
        const countryName = event.target.value;

        // Prevent selection if already selected
        if (selectedSummaryCountry === countryName) {
            return;
        }

        setSelectedSummaryCountry(countryName);

        // Find the country code and store it in localStorage
        const selectedCountryObj = countries.find(
            (country) => country.name === countryName
        );

        if (selectedCountryObj) {
            localStorage.setItem("summaryMarket", selectedCountryObj.code);
        }
    };

    // Ensure selectedSummaryCountry is properly initialized from localStorage on mount
    useEffect(() => {
        const savedCountryCode = localStorage.getItem('summaryMarket');
        if (savedCountryCode) {
            const savedCountryObj = countries.find(country => country.code === savedCountryCode);
            if (savedCountryObj && savedCountryObj.name !== selectedSummaryCountry) {
                setSelectedSummaryCountry(savedCountryObj.name);
            }
        }
    }, []);

    // Refetch market summary data when country selection changes
    useEffect(() => {
        if (dispatch && selectedSummaryCountry) {
            const selectedCountryObj = countries.find(country => country.name === selectedSummaryCountry);
            if (selectedCountryObj) {
                dispatch(getTrendingDashboardData(selectedCountryObj.code)).unwrap()
                    .catch((err) => {
                        // Error handling can be added here if needed
                    });
            }
        }
    }, [selectedSummaryCountry, dispatch]);

    const handleShowMostOnFrruit = () => {
        setShowMostOnFrruitDrawer(true);
    };

    const handleCloseMostOnFrruit = () => {
        setShowMostOnFrruitDrawer(false);
    };

    const handleCloseSourcesDrawer = () => {
        setShowSourcesDrawer(false);
    };

    // Helper function to extract domain from URL for better display
    const getDomainFromUrl = (url) => {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.replace('www.', '');
        } catch (error) {
            return url;
        }
    };


    return (
        <>
            <div className='hide-on-large-screens-dashboard'>
                <div className='dashboardTextForMobile'>Home</div>
            </div>
            
            <div className='popular-questions-css'>
                <div className='top-navigation-row'>
                    <div className='back-button-section'>
                        <button onClick={handleBackButtonClick} className='light-blue-btn me-2'>
                            <img src={BackBtnArrow} style={{ width: 7, height: 13, objectFit: 'contain', marginRight: 5, marginTop: -2 }} />
                            Back
                        </button>
                    </div>
                    <div className='market-toggle-section'>
                        <div className='market-label'>Choose your market:</div>
                        <div className='country-dropdown-container'>
                            <FormControl
                             sx={{
                                 background: "#F1F4FD",
                                 borderRadius: "8px",
                                 border: "1px solid #E8ECFF",
                                 minWidth: "160px",
                                 width: "180px",
                                 "& .MuiOutlinedInput-notchedOutline": {
                                     border: "none"
                                 },
                                 "&:hover": {
                                     background: "#E8ECFF"
                                 }
                             }}
                         >
                             <Select
                                 value={selectedSummaryCountry}
                                 onChange={handleSummaryCountrySelect}
                                 displayEmpty
                                 sx={{
                                     height: "36px",
                                     px: 1.5,
                                     fontSize: "14px",
                                     fontWeight: "500",
                                     color: "#4563E4",
                                     display: "flex",
                                     alignItems: "center",
                                     "& .MuiSelect-select": {
                                         display: "flex",
                                         alignItems: "center",
                                         py: 0,
                                         pr: "24px !important"
                                     },
                                     "& .MuiSelect-icon": {
                                         color: "#4563E4"
                                     }
                                 }}
                                 renderValue={(value) => {
                                     if (!value) return "Select a country";
                                     const country = countries.find((c) => c.name === value);
                                     return (
                                         <Box display="flex" alignItems="center">
                                             <Box
                                                 sx={{
                                                     width: "16px",
                                                     height: "12px",
                                                     display: "flex",
                                                     alignItems: "center",
                                                     justifyContent: "center",
                                                     marginRight: "6px",
                                                     borderRadius: "2px",
                                                     overflow: "hidden"
                                                 }}
                                             >
                                                 <FlagIcon countryCode={country?.code} size={16} />
                                             </Box>
                                             <Typography
                                                 sx={{
                                                     fontWeight: 500,
                                                     fontSize: "14px",
                                                     color: "#4563E4",
                                                     whiteSpace: "nowrap",
                                                     overflow: "hidden",
                                                     textOverflow: "ellipsis"
                                                 }}
                                             >
                                                 {country?.name}
                                             </Typography>
                                         </Box>
                                     );
                                 }}
                                 MenuProps={{
                                     PaperProps: {
                                         sx: {
                                             borderRadius: "8px",
                                             border: "1px solid #E8ECFF",
                                             backgroundColor: "white",
                                             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                             mt: -1
                                         }
                                     },
                                     anchorOrigin: {
                                         vertical: 'top',
                                         horizontal: 'left',
                                     },
                                     transformOrigin: {
                                         vertical: 'bottom',
                                         horizontal: 'left',
                                     }
                                 }}
                             >
                                 {countries.map((country) => (
                                     <MenuItem
                                         key={country.code}
                                         value={country.name}
                                         sx={{
                                             display: "flex",
                                             alignItems: "center",
                                             height: "40px",
                                             padding: "8px 12px",
                                             fontSize: "14px",
                                             fontWeight: "500",
                                             color: "#4563E4",
                                             backgroundColor: "transparent",
                                             "&.Mui-selected": {
                                                 backgroundColor: "#F1F4FD",
                                                 color: "#4563E4"
                                             },
                                             "&:hover": {
                                                 backgroundColor: "#F1F4FD"
                                             }
                                         }}
                                     >
                                         <Box marginRight="8px">
                                             <FlagIcon countryCode={country.code} size={16} />
                                         </Box>
                                         <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#4563E4" }}>
                                             {country.name}
                                         </Typography>
                                         {selectedSummaryCountry === country.name && (
                                             <Box
                                                 sx={{
                                                     width: "6px",
                                                     height: "6px",
                                                     backgroundColor: "#4563E4",
                                                     borderRadius: "50%",
                                                     marginLeft: "auto"
                                                 }}
                                             />
                                         )}
                                     </MenuItem>
                                 ))}
                             </Select>
                             </FormControl>
                </div>
                     </div>
                 </div>
                
                {marketSummaryLoading && (
                    <div className='d-flex justify-content-center align-items-center mt-5'>
                        <div className='spinner-border text-primary' role='status'>
                            <span className='visually-hidden'>Loading...</span>
                        </div>
                        <span className='ms-2'>Loading market summary...</span>
                    </div>
                )}

                {marketSummaryError && (
                    <div className='alert alert-danger mt-3' role='alert'>
                        Error loading market summary: {marketSummaryError}
                    </div>
                )}

                {!marketSummaryLoading && !marketSummaryError && !marketSummaryData?.data?.data?.[0]?.data && (
                    <div className='d-flex justify-content-center align-items-center mt-5'>
                        <div className='text-muted'>No market data available</div>
                    </div>
                )}
                
                {marketSummaryData?.data?.data?.[0]?.data && (
                    <div className='two-section-layout'>
                        {/* Left Section - All content except Latest News */}
                        <div className='left-section'>
                            {/* Scrollable Content Container */}
                            <div className='left-scrollable-content'>
                                <div className='title-section'>
                                    <div className='title-left'>
                                        <div className='heading-text'>Market Summary</div>
                                        <div className='desc-text mt-1'>Get comprehensive market insights</div>
                                    </div>
                                    <div className='title-right'>
                                        <button
                                            className='sources-btn'
                                            onClick={() => setShowSourcesDrawer(true)}
                                        >
                                            Sources
                                        </button>
                                    </div>
                                </div>
                              {/* Market Drivers Section */}
                        {marketSummaryData.data.data[0].data.market_drivers?.summary && (
                                <div className='box-content position-relative content-spacing'>
                                    <div className='d-flex justify-content-between align-items-center mb-3'>
                                        <div className='title'>Market Drivers</div>
                                        <div className='market-drivers-time'>
                                            Updated {formatTimeDifference(marketSummaryData.data.data[0].data.last_updated_utc)}
                                        </div>
                                    </div>
                                <div className='market-drivers-text'>
                                    {marketSummaryData.data.data[0].data.market_drivers.summary}
                                </div>
                            </div>
                        )}

                            {/* Market Summary Section */}
                            <div className='box-content position-relative content-spacing'>
                            <div className='row'>
                                {marketSummaryData.data.data[0].data.market_summary?.summary_points?.slice(0, 6).map((point, index) => (
                                    <div key={index} className='col-lg-6 col-md-6 col-sm-12 mb-3'>
                                        <div className='market-summary-card h-100'>
                                            <div className='market-summary-title'>{point.title}</div>
                                            <div className='market-summary-text'>{point.summary}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Standout Stocks Section */}
                        {(marketSummaryData.data.data[0].data.standouts_analysis?.gainers?.length > 0 ||
                          marketSummaryData.data.data[0].data.standouts_analysis?.losers?.length > 0) && (
                                <div className='box-content position-relative content-spacing'>
                                    <div className='heading-text'>Standout Stocks</div>
                                <div className='row'>
                                    {marketSummaryData.data.data[0].data.standouts_analysis?.gainers?.length > 0 && (
                                        <div className='col-lg-6 col-md-6 col-sm-12 mb-3'>
                                            <div className='standout-section'>
                                                <div className='standout-section-title'>Top Gainers</div>
                                                {marketSummaryData.data.data[0].data.standouts_analysis.gainers.map((stock, index) => (
                                                    <div key={index} className='standout-stock-card mb-2' style={{cursor: 'pointer'}} onClick={() => handleStockClick(stock.url)}>
                                                            <div className='d-flex justify-content-start align-items-start'>
                                                            <div className='stock-info'>
                                                                <div className='stock-name'>{stock.stock}</div>
                                                                <div className='stock-reason'>{stock.reason}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {marketSummaryData.data.data[0].data.standouts_analysis?.losers?.length > 0 && (
                                        <div className='col-lg-6 col-md-6 col-sm-12 mb-3'>
                                            <div className='standout-section'>
                                                <div className='standout-section-title'>Top Losers</div>
                                                {marketSummaryData.data.data[0].data.standouts_analysis.losers.map((stock, index) => (
                                                    <div key={index} className='standout-stock-card mb-2' style={{cursor: 'pointer'}} onClick={() => handleStockClick(stock.url)}>
                                                            <div className='d-flex justify-content-start align-items-start'>
                                                            <div className='stock-info'>
                                                                <div className='stock-name'>{stock.stock}</div>
                                                                <div className='stock-reason'>{stock.reason}</div>
                                                            </div>
                                                        </div>
                                            </div>
                                        ))}
                                    </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                            {/* Sector Analysis Section */}
                        {marketSummaryData?.data?.data?.[0]?.data && (
                                <div className='box-content position-relative content-spacing'>
                                    <div className='heading-text'>Sector Analysis</div>
                                <div className='row'>
                                    {/* Top Performing Sectors */}
                                    {marketSummaryData.data.data[0].data.sector_analysis?.top_performing_sectors?.length > 0 && (
                                            <div className='col-lg-6 col-md-12 mb-3'>
                                            <div className='sector-section'>
                                                <div className='sector-section-title'>Top Performers</div>
                                                {marketSummaryData.data.data[0].data.sector_analysis.top_performing_sectors.map((sector, index) => (
                                                    <div key={index} className='sector-card mb-2' style={{cursor: 'pointer'}} onClick={() => handleSectorClick(sector.url)}>
                                                            <div className='d-flex justify-content-start align-items-start'>
                                                            <div className='sector-info'>
                                                                <div className='sector-name'>{sector.sector}</div>
                                                                <div className='sector-explanation'>{sector.reason}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Underperforming Sectors */}
                                        {(marketSummaryData.data.data[0].data.sector_analysis?.underperforming_sectors?.length > 0 ||
                                          marketSummaryData.data.data[0].data.sector_analysis?.top_underperforming_sectors?.length > 0) && (
                                            <div className='col-lg-6 col-md-12 mb-3'>
                                            <div className='sector-section'>
                                                <div className='sector-section-title'>Underperformers</div>
                                                    {(marketSummaryData.data.data[0].data.sector_analysis.underperforming_sectors ||
                                                      marketSummaryData.data.data[0].data.sector_analysis.top_underperforming_sectors).map((sector, index) => (
                                                    <div key={index} className='sector-card mb-2' style={{cursor: 'pointer'}} onClick={() => handleSectorClick(sector.url)}>
                                                            <div className='d-flex justify-content-start align-items-start'>
                                                            <div className='sector-info'>
                                                                <div className='sector-name'>{sector.sector}</div>
                                                                <div className='sector-explanation'>{sector.reason}</div>
                                                            </div>
                                                        </div>
                        </div>
                                                ))}
                        </div>
                                        </div>
                                    )}

                                    {/* Display sector data in side-by-side tables */}
                                    {marketSummaryData.data.data[0].data.sector_analysis && (
                                        <div className='col-12'>
                                            <div className='row'>
                                                {/* Top Performers Table */}
                                                {marketSummaryData.data.data[0].data.sector_analysis.top_performers && marketSummaryData.data.data[0].data.sector_analysis.top_performers.length > 0 && (
                                                        <div className='col-12 mb-4'>
                                                        <div className='simple-sector-table'>
                                                            <div className='table-title'>Top Performing Sectors</div>
                                                            <table className='sector-table'>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Sector</th>
                                                                        <th>Analysis</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {marketSummaryData.data.data[0].data.sector_analysis.top_performers.map((sector, index) => (
                                                                        <tr key={index} className='positive-row' style={{cursor: 'pointer'}} onClick={() => handleSectorClick(sector.url)}>
                                                                            <td className='sector-name'>{sector.sector}</td>
                                                                            <td className='sector-explanation'>{sector.reason}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                )}


                                            </div>
                                        </div>
                                    )}

                                    {/* Show message if no sector analysis data at all */}
                                    {!marketSummaryData.data.data[0].data.sector_analysis && (
                                        <div className='col-12'>
                                            <div className='d-flex justify-content-center align-items-center' style={{ padding: '40px 20px' }}>
                                                <div style={{ textAlign: 'center', color: '#6F7387' }}>
                                                    <div style={{ fontSize: '48px', marginBottom: '16px', opacity: '0.5' }}>📊</div>
                                                    <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                                                        Sector Analysis Not Available
                                                    </div>
                                                    <div style={{ fontSize: '12px' }}>
                                                        Sector performance data will be displayed here when available.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                            </div>
                        </div>

                        {/* Right Section - Latest News Only */}
                        <div className='right-section'>
                        {marketSummaryData.data.data[0].data.latest_news?.articles?.length > 0 && (
                                <>
                                    <div className='heading-text sticky-header'>Latest News</div>
                                    <div className='news-container'>
                                        {marketSummaryData.data.data[0].data.latest_news.articles.map((article, index) => (
                                    <div 
                                        key={index} 
                                                className={`news-card clickable-news-card ${index === marketSummaryData.data.data[0].data.latest_news.articles.length - 1 ? 'mb-5' : 'mb-3'}`}
                                        onClick={() => article.url && window.open(article.url, '_blank', 'noopener,noreferrer')}
                                        style={{ cursor: article.url ? 'pointer' : 'default' }}
                                    >
                                        <div className='news-title'>{article.title}</div>
                                        <div className='news-snippet'>{article.snippet}</div>
                                        <div className='news-age'>{article.age}</div>
                                </div>
                            ))}
                        </div>
                                </>
                        )}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Right Drawer for Most on Frruit */}
            <RightDrawer
                isOpen={showMostOnFrruitDrawer}
                onClose={handleCloseMostOnFrruit}
                title="Most on Frruit"
                width="500px"
            >
                <div className='viewModal'>
                    <div>
                        {mostOnFrruitGpt?.rows?.filter(text => text?.question && text.question.trim() !== '').map((text, index) => (
                            <div onClick={() => { routePromptFrruitGPT(text?.question, 'news_bing'); handleCloseMostOnFrruit(); }} key={index} className='d-flex justify-content-between align-items-center blue-box mb-2' style={{ cursor: 'pointer' }}>
                                <p className='text'>{text?.question?.replace(/\b\w/g, char => char.toUpperCase())}</p>
                                <img src={RightBlueArrow} className='me-1 ms-2' width={10} style={{ objectFit: 'contain' }} />
                            </div>
                        ))}
                    </div>
                </div>
            </RightDrawer>

            {/* Right Drawer for Sources */}
            <RightDrawer
                isOpen={showSourcesDrawer}
                onClose={handleCloseSourcesDrawer}
                title="Sources"
                width="500px"
            >
                <div className="right-drawer-content">
                    {marketSummaryData?.data?.data?.[0]?.data?.market_summary?.sources?.length > 0 ? (
                        marketSummaryData.data.data[0].data.market_summary.sources.map((sourceUrl, index) => (
                            <div 
                                key={index} 
                                className="drawer-item mb-3 p-3 clickable-source-item"
                                style={{ 
                                    border: '1px solid #E8ECFF',
                                    borderRadius: '8px',
                                    backgroundColor: '#FFFFFF',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onClick={() => window.open(sourceUrl, '_blank', 'noopener,noreferrer')}
                            >
                                <div className="source-title" style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#171E42',
                                    marginBottom: '8px',
                                    lineHeight: '1.4'
                                }}>
                                    {getDomainFromUrl(sourceUrl)}
                                </div>
                                <a 
                                    href={sourceUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{
                                        fontSize: '12px',
                                        color: '#4563E4',
                                        textDecoration: 'none',
                                        wordBreak: 'break-all',
                                        display: 'block',
                                        lineHeight: '1.4'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.textDecoration = 'underline';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.textDecoration = 'none';
                                    }}
                                >
                                    {sourceUrl}
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className="no-sources-message" style={{
                            textAlign: 'center',
                            padding: '40px 20px',
                            color: '#6F7387',
                            fontSize: '14px'
                        }}>
                            <div style={{
                                fontSize: '48px',
                                marginBottom: '16px',
                                opacity: '0.5'
                            }}>
                                📄
                            </div>
                            <div style={{ fontWeight: '500', marginBottom: '8px' }}>
                                No Sources Available
                            </div>
                            <div style={{ fontSize: '12px' }}>
                                Sources will be displayed here when available from the API response.
                            </div>
                    </div>
                    )}
                </div>
            </RightDrawer>

        </>
    )
}

export default PopularQuestions