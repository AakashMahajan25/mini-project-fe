import React, { useEffect, useState, useRef } from 'react'
import './BottomSearchBar.scss'
import AttachIcon from '../../assets/images/fluent_attach-20-regular.png'
import LinkIcon from '../../assets/images/link_icon.png'
import SendIcon from '../../assets/images/send_icon.png'
import ArrowIcon from '../../assets/images/arrow-img.png'
import RightArrow from '../../assets/images/right_arrow.png'
import { searchSuggestedPrompt } from '../../screens/frruitGPT/slice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RightFocusArrow from '../../assets/images/arrow-img.png'
import StraightArrowIcon from '../../assets/images/straight-arrow.png'
import ArrowDownIcon from '../../assets/images/accordiun-down-arrow.png'
import RightIcon from '../../assets/images/charm_tick.png'
import { Modal } from 'react-bootstrap';
import ActivateWebSearch from '../activateWebSearch/ActivateWebSearch'
import WhiteChevronImg from '../../assets/images/white-dropdown.png'
import CloseImage from '../../assets/images/close_icon.png'
import SelectedFlagIcon from '../../assets/images/selected-flag.png'
import SendIconMobile from '../../assets/images/send_icon_mobile.png'

import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography
} from "@mui/material";

function BottomSearchBar(props) {

    const [showFundamentals, setShowFundamentals] = useState(false);
    const [showNews, setShowNews] = useState(true);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showWebSearch, setShowWebSearch] = useState(false);
    const [selectedFund, setSelectedFund] = useState('Company Data');
    const [showDropdown, setShowDropdown] = useState(false);
    const [error, setError] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { suggestedQuestionsList, isLoading, frruitLoader } = useSelector(state => state.fruitGPTSlice);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [show, setShow] = useState(false);

    const countries = [
        { code: 'IN', name: 'India Markets' },
        { code: 'US', name: 'US Markets' },
    ];

    // Flag components
    const FlagIcon = ({ countryCode, size = 20, className = '' }) => {
        const flagUrls = {
            'US': 'https://flagcdn.com/32x24/us.png',
            'IN': 'https://flagcdn.com/32x24/in.png',
           
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



    const [selectedCountry, setSelectedCountry] = useState(() => {
        // Initialize from localStorage or default to India
        const savedCountryCode = localStorage.getItem("selectedCountry");

        if (savedCountryCode) {
            const savedCountryObj = countries.find(
                (country) => country.code === savedCountryCode
            );
            if (savedCountryObj) {
                return savedCountryObj.name;
            } else {
                // Invalid code in localStorage, reset to default
                localStorage.setItem("selectedCountry", "IN");
                return "India";
            }
        }
        // No saved value, set default
        localStorage.setItem("selectedCountry", "IN");
        return "India";
    });


    const handleCountrySelect = (event) => {
        const countryName = event.target.value; // ✅ FIX: get value from event


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

            localStorage.setItem("selectedCountry", selectedCountryObj.code);
        } else {
            console.log("ERROR: Country object not found!");
        }
    };


    const handleCloseSearchModal = () => {
        setShowSearchModal(false);
        setShowWebSearch(false);
        setFlag('news')
    }

    const handleFlagShow = () => {
        setShow(true)
    };

    const handleFlagClose = () => {
        setShow(false)
    };

    const handleCountryModalShow = () => {
        setShowWebSearch(true)
    };

    const handleCountryModalClose = () => {
        setShowWebSearch(false)
    };

    const flagList = [
        { name: 'All', flag: 'news', description: 'Search news, summarize & get TLDRs across premium data sources' },
        // { name: 'News + Web', flag: 'news_bing', description: 'Search across the entire internet' },
        // { name: 'Fundamentals', flag: 'fund', description: 'Compare company fundamentals data, financials, stock screener, and corporate actions' },
        // { name: 'Screener', flag: 'screener', description: 'Screen markets in real time based on your queries' },
        // { name: 'Videos', flag: 'youtube', description: 'Discover insights from videos without watching' },
        { name: 'Social Opinions', flag: 'reddit', description: 'Search discussions and opinions on social media' }
    ];

    const {
        setQuestion = () => { },
        question = '',
        handleAskPress = () => { },
        flag = '',
        buttonStart = true,
        setFlag = () => { },
        isNewChat = false
    } = props

    useEffect(() => {
        const searchQuestion = setTimeout(() => {
            if (question.length > 0 && flag === 'news') {
                dispatch(searchSuggestedPrompt(question))
            }
        }, 0);
        return () => clearTimeout(searchQuestion)
    }, [question])

    useEffect(() => {
        if (showWebSearch) {
            setFlag('news_bing')
        } else {
            setFlag('news')
        }
    }, [showWebSearch])

    useEffect(() => {
        if (isNewChat)
            setShowWebSearch(false);

    }, [isNewChat])

    useEffect(() => {
        if (flag === 'news_bing' && !showWebSearch) {
            setShowWebSearch(true);
        } else if (flag === 'screener') {
            setSelectedFund('Stock Screener')
        }
    }, [flag])

    // const handleChange = (e) => {
    //     setQuestion(e.target.value)
    // }

    const handleChange = (e) => {
        setQuestion(e.target.value);
        setError(false);  // Clear error when user starts typing
    }

    // const handleKeyPress = (e) => {
    //     if (buttonStart && e.key === 'Enter') {
    //         handleAskPress();
    //     }
    // };
    const handleKeyPress = (e) => {
        if (buttonStart && e.key === 'Enter') {
            if (question.length === 0) {
                setError(true);  // Set error if input is empty
            } else {
                handleAskPress();
            }
        }
    };

    const newsClick = () => {
        setShowFundamentals(false);
        setShowNews(true);
    }
    const fundamentalClick = () => {
        setShowFundamentals(true);
        setShowNews(false);
    }

    const handleCheckboxChange = () => {
        setShowSuggestions(!showSuggestions);
    };

    const handleWebSearchChange = () => {
        const webSearch = localStorage.getItem('webSearch')
        setShowWebSearch(!showWebSearch);
        if (!webSearch) {
            setShowSearchModal(!showSearchModal);
        }
    };
    const handleClose = () => setShowWebSearch(false);

    const routeChangeFrruitGPT = (question) => {
        navigate("/frruit-gpt", {
            state: { question, fundamental: 'news' },
        });
    };

    const handleFundClick = () => {
        setShowDropdown(prevShowDropdown => !prevShowDropdown);
    };

    const handleWebSearchProceed = () => {
        setShowSearchModal(!showSearchModal);
        localStorage.setItem('webSearch', true)
    }
    const handleOptionClick = (value) => {
        setSelectedFund(value);
        setShowDropdown(false);
        if (value === 'Stock Screener') {
            setFlag('screener')
        } else {
            setFlag('fund')
        }
    };
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const placeholderText = (flag === 'news' || flag === 'news_bing') ? 'Search news, summarize & get TLDRs' : (flag === 'fund' || flag === 'screener') ? 'Compare company fundamentals data, financials, stock screener and corporate actions' : flag === 'youtube' ? 'Discover insights from videos without watching' : 'Search discussions and opinions on social media'
    return (
        <>
            {showSearchModal &&
                <ActivateWebSearch show2={showSearchModal} handleClose2={handleCloseSearchModal} handleClose1={handleWebSearchProceed} />
            }
            <div className='BottomSearchBar'>
                {/* <div className='attachment'>
                <p className='attach-text'>Attach</p>
                <img src={AttachIcon} className='img-styles' />
            </div>
            <div className='linkUrl'>
                <p className='linkUrl-text'>Link URL</p>
                <img src={LinkIcon} className='img-styles' />
            </div> */}

                <div className='customTab-frruit-gpt hide-in-mobile'>
                    <div className='d-flex align-items-center mobile-scroll-Css'>
                        <div className='d-flex align-items-center me-3'>
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
                                                                    labelId="country-label"
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
                            <img src={StraightArrowIcon} style={{ width: 20, objectFit: 'contain', marginLeft: 16}} />
                        </div>
                        <div className={(flag === 'news' || flag === 'news_bing') ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: (flag === 'news' || flag === 'news_bing') ? '#F1F4FD' : '', color: (frruitLoader && !(flag === 'news' || flag === 'news_bing')) ? '#B4B3B9' : '#4563E4', cursor: 'pointer' }}
                            onClick={frruitLoader ? undefined : () => showWebSearch ? setFlag('news_bing') : setFlag('news')}
                        > All </div>
                        {/* <div className={(flag === 'fund' || flag === 'screener') ? `tab-name-css tab-box-css` : `tab-name-css`} style={{ backgroundColor: (flag === 'fund' || flag === 'screener') ? '#F1F4FD' : '', color: (frruitLoader && !(flag === 'fund' || flag === 'screener'))  ? '#B4B3B9' : '#4563E4', cursor: 'pointer' }}
                            onClick={frruitLoader ? undefined : () => selectedFund === 'Company Data' ? setFlag('fund') : setFlag('screener')}
                        > Fundamentals </div> */}
                        {/* <div className={flag === 'youtube' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag === 'youtube' ? '#F1F4FD' : '', color: frruitLoader && flag != 'youtube' ? '#B4B3B9' : '#4563E4', cursor: 'pointer' }}
                            onClick={frruitLoader ? undefined : () => setFlag('youtube')}
                        > Videos </div> */}
                        <div className={flag === 'reddit' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag === 'reddit' ? '#F1F4FD' : '', color: frruitLoader && flag != 'reddit' ? '#B4B3B9' : '#4563E4', cursor: 'pointer' }}
                            onClick={frruitLoader ? undefined : () => setFlag('reddit')}
                        >Social Opinions </div>
                        {/* <div className={flag === 'news' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag === 'news' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                onClick={() => setFlag('news')}
                            > News </div>
                            <div className={flag == 'fundamentals' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag == 'fundamentals' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                onClick={() => setFlag('fundamentals')}
                            > Fundamentals </div>
                            <div className={flag == 'similarDays' ? `tab-name-css tab-box-css` : `tab-name-css`} style={{ backgroundColor: flag == 'similarDays' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                onClick={() => setFlag('similarDays')}
                            >Similar Days </div> */}

                       
                    </div>
                </div>


                <div className='d-flex justify-content-between align-items-end'>
                    <div class="form-group hide-in-mobile">
                        <div style={{ position: 'relative' }}>
                            {/* Web Search toggle hidden - removed for now */}
                            {/* {(flag === 'news' || flag === 'news_bing') &&
                                <div className="form-check form-switch checkbox-position hide-in-mobile">
                                    <input
                                        style={{ cursor: 'pointer' }}
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={handleWebSearchChange}
                                        checked={showWebSearch}
                                    /> <span className={showWebSearch ? 'web-search-active' : 'web-search-default'}>Web Search</span>
                                </div>
                            } */}
                            {(flag === 'fund' || flag === 'screener') &&
                                <div className="fundDropDownPosition hide-in-mobile" onClick={handleFundClick}>
                                    <div className='searchInputDropdowntext'>{selectedFund}<img src={ArrowDownIcon} style={{ width: 24, height: 24, objectFit: 'contain', marginLeft: 5 }} className={showDropdown ? 'rotate-icon rotated' : 'rotate-icon'} /></div>
                                </div>
                            }
                            <input
                                className={`${(flag === 'news' || flag === 'news_bing') && question.length > 0 && suggestedQuestionsList.length > 0 ? 'form-control-suggestion' : (flag === 'news' || flag === 'news_bing') ? 'form-control-newsTab' : (flag === 'fund' || flag === 'screener') ? (showDropdown ? 'form-control-funds-only' : 'form-control-fund') : 'form-control'}`}
                                value={question}
                                disabled={!buttonStart}
                                onChange={handleChange}
                                placeholder={placeholderText}
                                onKeyDown={handleKeyPress}
                            />
                        </div>
                    </div>
                    <div class="form-group hide-in-desktop">
                        <div className="form-group hide-in-desktop">
                            <div className="responsive-search-box">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className='header-text-focus'>Select focus</div>
                                    <div className="d-flex" style={{ gap: '8px' }}>
                                        <div className="flags-blue-button" onClick={handleCountryModalShow}>
                                            <div className="flag-white-text d-flex align-items-center">
                                                <div style={{
                                                    width: '16px',
                                                    height: '12px',
                                                    marginRight: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: '2px',
                                                    overflow: 'hidden'
                                                }}>
                                                    <FlagIcon countryCode={countries.find(c => c.name === selectedCountry)?.code} size={16} />
                                                </div>
                                                {countries.find(c => c.name === selectedCountry)?.code}
                                            </div>
                                            <img src={WhiteChevronImg} className="white-chevron" />
                                        </div>
                                        <div className="flags-blue-button" onClick={handleFlagShow}>
                                            <div className="flag-white-text">
                                                {
                                                    flag === 'news' ? 'All' :
                                                        flag === 'fund' ? 'Fundamentals' :
                                                            flag === 'youtube' ? 'Videos' :
                                                                flag === 'reddit' ? 'Social Opinions' :
                                                                    flag === 'news_bing' ? 'News + Web' :
                                                                        flag === 'screener' ? 'Screener' :
                                                                            'Choose your focus'
                                                }
                                            </div>
                                            <img src={WhiteChevronImg} className="white-chevron" />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ position: 'relative' }} className='mt-3 d-flex justify-content-start'>
                                    <input
                                        className="responsive-input-field w-100"
                                        value={question}
                                        disabled={!buttonStart}
                                        onChange={handleChange}
                                        placeholder={placeholderText}
                                        onKeyDown={handleKeyPress}
                                    />
                                    <div className='sendIcon ms-3' onClick={() => {
                                        if (question.length === 0) {
                                            setError(true);  // Set error if input is empty
                                        } else {
                                            handleAskPress();
                                        }
                                    }} style={{ cursor: buttonStart && 'pointer', opacity: buttonStart ? 1 : 0.5, }}>
                                        <img src={SendIconMobile} className='sendIcon-styles' />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <div className='sendIcon ms-3' onClick={handleAskPress} style={{ cursor: buttonStart && 'pointer', opacity: buttonStart ? 1 : 0.5, }}>
                        <img src={SendIcon} className='sendIcon-styles' />
                    </div> */}
                    <div className='sendIcon ms-3 hide-in-mobile' onClick={() => {
                        if (question.length === 0) {
                            setError(true);  // Set error if input is empty
                        } else {
                            handleAskPress();
                        }
                    }} style={{ cursor: buttonStart && 'pointer', opacity: buttonStart ? 1 : 0.5, }}>
                        <img src={SendIcon} className='sendIcon-styles' />
                    </div>

                </div>
                {error && <div className='error-message'>Please enter a search query.</div>}  {/* Add this line */}
                {/* <div className='show-suggestions'>
                    <div className='d-flex align-items-center suggestions-text'>
                        <input
                            type='checkbox'
                            className='show-suggestions-checkbox'
                            checked={showSuggestions}
                            onChange={handleCheckboxChange}
                        /> Show Suggestions
                    </div>
                </div>
                {showSuggestions && */}
                {(flag === 'news' && question.length > 0 && suggestedQuestionsList.length > 0) &&
                    <div className='suggestions-box'>
                        {
                            suggestedQuestionsList?.slice(0, 4).map((question, index) =>
                                <div className='text-box' onClick={() => routeChangeFrruitGPT(question?.question)}>
                                    <div className='suggestions-text'>{question?.question}</div>
                                    <img src={ArrowIcon} style={{ width: 20, objectFit: 'contain', marginLeft: 16 }} />
                                </div>
                            )
                        }
                    </div>
                }
                {showDropdown && (
                    <div className='dropdownMenuForFunds' ref={dropdownRef}>
                        <div className='text-box'>
                            <div className='searchInputDropdowntext mb-2' onClick={() => handleOptionClick('Company Data')}>
                                Company Data
                                {selectedFund === 'Company Data' && <img src={RightIcon} style={{ width: 20, height: 20, objectFit: 'contain', marginLeft: 5 }} />}
                            </div>
                            <div className='searchInputDropdowntext' onClick={() => handleOptionClick('Stock Screener')}>
                                Stock Screener
                                {selectedFund === 'Stock Screener' && <img src={RightIcon} style={{ width: 20, height: 20, objectFit: 'contain', marginLeft: 5 }} />}
                            </div>
                        </div>
                    </div>
                )}
                {/* Web Search toggle hidden - removed for now */}
                {/* {(flag === 'news' || flag === 'news_bing') &&
                    <div className="form-check form-switch checkbox-position hide-in-desktop hide-in-mobile">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={handleWebSearchChange}
                            checked={showWebSearch}
                        /> <span className={showWebSearch ? 'web-search-active' : 'web-search-default'}>Web Search</span>
                    </div>
                } */}
                {(flag === 'fund' || flag === 'screener') &&
                    <div className="fundDropDownPosition hide-in-desktop hide-in-mobile" onClick={handleFundClick}>
                        <div className='searchInputDropdowntext'>{selectedFund}<img src={ArrowDownIcon} style={{ width: 24, height: 24, objectFit: 'contain', marginLeft: 5 }} className={showDropdown ? 'rotate-icon rotated' : 'rotate-icon'} /></div>
                    </div>
                }
            </div>
            {/* <Modal show={showWebSearch} onHide={handleClose} size='sm' centered scrollable>
                <Modal.Header>
                    <Modal.Title>Web Search</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p></p>
                </Modal.Body>
            </Modal> */}
            <Modal
                show={show}
                onHide={handleFlagClose}
                size="lg"
                className="custom-bottom-modal"
            >
                <Modal.Header className='pb-0'>
                    <div className="modal-header-text">Select focus</div>
                    <img src={CloseImage} style={{ width: 24 }} onClick={handleFlagClose} />
                </Modal.Header>
                <Modal.Body className='pt-0'>
                    {flagList.map((item, index) => (
                        <div
                            key={index}
                            className={`${flag === item.flag ? 'active-flag-box' : 'inactive-flag-box'} mt-3`}
                            onClick={() => { setFlag(item.flag); handleFlagClose() }}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: flag === item.flag ? '#F1F4FD' : '',
                                color: flag === item.flag ? '#4563E4' : '#B4B3B9'
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="flag-name">{item.name}</div>
                                {flag === item.flag && <img src={SelectedFlagIcon} style={{ width: 20 }} />}
                            </div>
                            <div className="flag-desc mt-2">{item.description}</div>
                        </div>
                    ))}
                </Modal.Body>
            </Modal>
            {/* Focus Selection Modal */}
            <Modal
                show={show}
                onHide={handleFlagClose}
                size="lg"
                className="custom-bottom-modal"
            >
                <Modal.Header className='pb-0'>
                    <div className="modal-header-text">Select focus</div>
                    <img src={CloseImage} style={{ width: 24 }} onClick={handleFlagClose} />
                </Modal.Header>
                <Modal.Body className='pt-0'>
                    {flagList.map((item, index) => (
                        <div
                            key={index}
                            className={`${flag === item.flag ? 'active-flag-box' : 'inactive-flag-box'} mt-3`}
                            onClick={() => { setFlag(item.flag); handleFlagClose() }}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: flag === item.flag ? '#F1F4FD' : '',
                                color: flag === item.flag ? '#4563E4' : '#B4B3B9'
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="flag-name">{item.name}</div>
                                {flag === item.flag && <img src={SelectedFlagIcon} style={{ width: 20 }} />}
                            </div>
                            <div className="flag-desc mt-2">{item.description}</div>
                        </div>
                    ))}
                </Modal.Body>
            </Modal>
            {/* Country Selection Modal */}
            <Modal
                show={showWebSearch}
                onHide={handleCountryModalClose}
                size="lg"
                className="custom-bottom-modal"
            >
                <Modal.Header className='pb-0'>
                    <div className="modal-header-text">Select market</div>
                    <img src={CloseImage} style={{ width: 24 }} onClick={handleCountryModalClose} />
                </Modal.Header>
                <Modal.Body className='pt-0'>
                    {countries.map((country, index) => (
                        <div
                            key={index}
                            className={`${selectedCountry === country.name ? 'active-flag-box' : 'inactive-flag-box'} mt-3`}
                            onClick={() => { handleCountrySelect({ target: { value: country.name } }); handleCountryModalClose() }}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: selectedCountry === country.name ? '#F1F4FD' : '',
                                color: selectedCountry === country.name ? '#4563E4' : '#B4B3B9'
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div style={{
                                        width: '20px',
                                        height: '15px',
                                        marginRight: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '2px',
                                        overflow: 'hidden'
                                    }}>
                                        <FlagIcon countryCode={country.code} size={20} />
                                    </div>
                                    <div className="flag-name">{country.name}</div>
                                </div>
                                {selectedCountry === country.name && <img src={SelectedFlagIcon} style={{ width: 20 }} />}
                            </div>
                        </div>
                    ))}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BottomSearchBar