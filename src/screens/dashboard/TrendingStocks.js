import React, { useState, useEffect } from 'react'
import './TrendingStocks.scss'
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import TrendingStocksCard from '../../components/trendingStocks/TrendingStocksCard';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { getTrendingStocks } from './slice';

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

function TrendingStocks({ handleBackButtonClick, trendingStocks: initialTrendingStocks }) {
    const dispatch = useDispatch();
    const [localTrendingStocks, setLocalTrendingStocks] = useState(initialTrendingStocks || []);
    const [isLoadingStocks, setIsLoadingStocks] = useState(false);
    const trendingStocks = localTrendingStocks; // For backward compatibility

    const countries = [
        { code: 'IN', name: 'India Markets' },
        { code: 'US', name: 'US Markets' },
    ];

    const [selectedCountry, setSelectedCountry] = useState(() => {
        // Initialize from localStorage or default to India Markets
        const savedCountryCode = localStorage.getItem("trendingCountry");

        if (savedCountryCode) {
            const savedCountryObj = countries.find(
                (country) => country.code === savedCountryCode
            );
            if (savedCountryObj) {
                return savedCountryObj.name;
            } else {
                // Invalid code in localStorage, reset to default
                localStorage.setItem("trendingCountry", "IN");
                return "India Markets";
            }
        }
        // No saved value, don't set localStorage yet - let it be set when needed
        return "India Markets";
    });

    // Function to fetch trending stocks
    const fetchTrendingStocks = async (marketCode = null) => {
        setIsLoadingStocks(true);
        try {
            let currentMarketCode = marketCode;

            // If no marketCode provided, get from localStorage
            if (!currentMarketCode) {
                currentMarketCode = localStorage.getItem("trendingCountry") || 'IN';
                // Ensure localStorage has the value
                if (!localStorage.getItem("trendingCountry")) {
                    localStorage.setItem("trendingCountry", currentMarketCode);
                }
            }

            // Call the API - market will be handled internally by the function
            const result = await dispatch(getTrendingStocks()).unwrap();
            setLocalTrendingStocks(result || []);
        } catch (error) {
            console.error('Error fetching trending stocks:', error);
            setLocalTrendingStocks([]);
        } finally {
            setIsLoadingStocks(false);
        }
    };

    const handleCountrySelect = (event) => {
        const countryName = event.target.value;

        // Prevent selection if already selected
        if (selectedCountry === countryName) {
            return;
        }

        setSelectedCountry(countryName);

        // Find the country code and store it in localStorage
        const selectedCountryObj = countries.find(
            (country) => country.name === countryName
        );

        if (selectedCountryObj) {
            localStorage.setItem("trendingCountry", selectedCountryObj.code);
            // Fetch new trending stocks when country changes
            fetchTrendingStocks(selectedCountryObj.code);
        } else {
            console.log("ERROR: Country object not found!");
        }
    };

    // Effect to set initial trending stocks
    useEffect(() => {
        if (initialTrendingStocks && initialTrendingStocks.length > 0) {
            setLocalTrendingStocks(initialTrendingStocks);
        }
    }, [initialTrendingStocks]);

    // Effect to fetch trending stocks on initial load if none provided
    useEffect(() => {
        if (!initialTrendingStocks || initialTrendingStocks.length === 0) {
            let currentCountryCode = localStorage.getItem("trendingCountry");

            // If no localStorage value exists, set it to default
            if (!currentCountryCode) {
                currentCountryCode = 'IN';
                localStorage.setItem("trendingCountry", currentCountryCode);
            }

            fetchTrendingStocks(currentCountryCode);
        }
    }, []);
    return (
        <>
            <div className='trending-stocks-css'>
                <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: 20 }}>
                    <div className='d-flex justify-content-start align-items-center'>
                        <button onClick={handleBackButtonClick} className='light-blue-btn me-2'>
                            <img src={BackBtnArrow} style={{ width: 7, height: 13, objectFit: 'contain', marginRight: 5, marginTop: -2 }} />
                            Back
                        </button>
                    </div>
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
                                labelId="trending-country-label"
                                value={selectedCountry}
                                onChange={handleCountrySelect}
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
                                        {selectedCountry === country.name && (
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
                <div className='heading-text'>Trending Stocks</div>
                <div className='desc-text mt-1'>Explore trending stocks curated by AI</div>
                
                {isLoadingStocks ? (
                    <div className='d-flex justify-content-center align-items-center mt-5'>
                        <div className='spinner-border text-primary' role='status'>
                            <span className='visually-hidden'>Loading...</span>
                        </div>
                        <span className='ms-2'>Loading trending stocks...</span>
                    </div>
                ) : trendingStocks?.length > 0 ? (
                    <div className='box-content position-relative mt-3'>
                        <div className='row'>
                            {trendingStocks.map((stockData, index) => (
                                <div key={index} className='col-lg-3 col-md-4 col-sm-6 col-12 mb-3 px-2'>
                                    <TrendingStocksCard {...stockData} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='d-flex justify-content-center align-items-center mt-5'>
                        <div className='text-muted'>No trending stocks available</div>
                    </div>
                )}
            </div>
        </>
    )
}

export default TrendingStocks
