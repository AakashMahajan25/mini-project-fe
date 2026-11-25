import React, { useState } from 'react'
import { FormControl, Select, MenuItem, Box, Typography } from '@mui/material'
import { CHAT_LANGUAGES, getChatLanguage, saveChatLanguage } from '../../utils/languages'

const GlobeIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    </svg>
)

// Answer-language picker. Persists the choice so every question (and the Portfolio page) uses it.
// variant="mobile" renders a native select, which opens the phone's own picker.
function LanguageSelect({ variant = 'desktop', disabled = false, onChange = () => { } }) {
    const [language, setLanguage] = useState(getChatLanguage)

    const handleChange = (code) => {
        setLanguage(code)
        saveChatLanguage(code)
        onChange(code)
    }

    if (variant === 'mobile') {
        return (
            <label className="flags-blue-button language-select-mobile" title="Answer language">
                <GlobeIcon size={14} />
                <select
                    value={language}
                    disabled={disabled}
                    onChange={(e) => handleChange(e.target.value)}
                    aria-label="Answer language"
                >
                    {CHAT_LANGUAGES.map(l => (
                        <option key={l.code} value={l.code}>{l.code === 'auto' ? 'Auto' : l.native}</option>
                    ))}
                </select>
            </label>
        )
    }

    return (
        <FormControl
            sx={{
                background: "#F1F4FD",
                borderRadius: "8px",
                border: "1px solid #E8ECFF",
                minWidth: "150px",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&:hover": { background: "#E8ECFF" }
            }}
        >
            <Select
                value={language}
                disabled={disabled}
                onChange={(e) => handleChange(e.target.value)}
                inputProps={{ 'aria-label': 'Answer language' }}
                sx={{
                    height: "36px",
                    px: 1.5,
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#4563E4",
                    "& .MuiSelect-select": { display: "flex", alignItems: "center", py: 0, pr: "24px !important" },
                    "& .MuiSelect-icon": { color: "#4563E4" }
                }}
                renderValue={(value) => {
                    const l = CHAT_LANGUAGES.find(x => x.code === value)
                    return (
                        <Box display="flex" alignItems="center" gap="6px" color="#4563E4">
                            <GlobeIcon />
                            <Typography sx={{ fontWeight: 500, fontSize: "14px", color: "#4563E4", whiteSpace: "nowrap" }}>
                                {value === 'auto' ? 'Auto language' : l?.native}
                            </Typography>
                        </Box>
                    )
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            borderRadius: "8px",
                            border: "1px solid #E8ECFF",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            maxHeight: 360,
                            mt: -1
                        }
                    },
                    anchorOrigin: { vertical: 'top', horizontal: 'left' },
                    transformOrigin: { vertical: 'bottom', horizontal: 'left' }
                }}
            >
                {CHAT_LANGUAGES.map(l => (
                    <MenuItem
                        key={l.code}
                        value={l.code}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            height: "40px",
                            fontSize: "14px",
                            color: "#171E42",
                            "&.Mui-selected": { backgroundColor: "#F1F4FD", color: "#4563E4" },
                            "&:hover": { backgroundColor: "#F1F4FD" }
                        }}
                    >
                        <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "inherit" }}>{l.native}</Typography>
                        {l.code !== 'auto' && l.native !== l.label && (
                            <Typography sx={{ fontSize: "12px", color: "#6F7387" }}>{l.label}</Typography>
                        )}
                        {l.code === 'auto' && (
                            <Typography sx={{ fontSize: "12px", color: "#6F7387" }}>Reply in the question's language</Typography>
                        )}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default LanguageSelect
