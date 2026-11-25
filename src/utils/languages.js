// Answer languages for Frruit Search. "auto" answers in the language the question was asked in.
// Codes must match SUPPORTED_LANGUAGES in frruit-be/language.js.
export const CHAT_LANGUAGES = [
    { code: 'auto', label: 'Auto-detect', native: 'Auto' },
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
    { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
    { code: 'ur', label: 'Urdu', native: 'اردو' },
    { code: 'es', label: 'Spanish', native: 'Español' },
    { code: 'fr', label: 'French', native: 'Français' },
    { code: 'de', label: 'German', native: 'Deutsch' },
    { code: 'ar', label: 'Arabic', native: 'العربية' },
    { code: 'zh', label: 'Chinese', native: '中文' },
    { code: 'ja', label: 'Japanese', native: '日本語' },
]

const STORAGE_KEY = 'chatLanguage'
const RTL_LANGUAGES = ['ur', 'ar', 'fa', 'he']

export const getChatLanguage = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        return CHAT_LANGUAGES.some(l => l.code === saved) ? saved : 'auto'
    } catch {
        return 'auto'
    }
}

export const saveChatLanguage = (code) => {
    try {
        localStorage.setItem(STORAGE_KEY, code)
    } catch {
        // Storage unavailable (private mode): the choice lasts for this page only
    }
}

export const languageName = (code) => {
    const known = CHAT_LANGUAGES.find(l => l.code === code)?.label
    if (known) return known
    try {
        // Auto-detect can return languages outside the picker list
        return new Intl.DisplayNames(['en'], { type: 'language' }).of(code) || code
    } catch {
        return code
    }
}

export const isRtl = (code) => RTL_LANGUAGES.includes(code)
