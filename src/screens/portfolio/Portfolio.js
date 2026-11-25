import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import moment from 'moment'
import { toast } from 'react-toastify'
import ReactGA from 'react-ga4'
import { addHolding, deleteHolding, fetchPortfolio, searchSymbols, updateHolding } from './slice'
import LanguageSelect from '../../components/frruitGpt/LanguageSelect'
import CloseImg from '../../assets/images/close_icon.png'
import './Portfolio.scss'

const MARKETS = {
    IN: { label: 'India', exchange: 'NSE', currency: 'INR', flag: 'https://flagcdn.com/32x24/in.png' },
    US: { label: 'US', exchange: 'NYSE / NASDAQ', currency: 'USD', flag: 'https://flagcdn.com/32x24/us.png' },
}

const SUGGESTED_QUESTIONS = [
    'How is my portfolio performing overall?',
    'Which holdings are dragging my returns down?',
    'How concentrated is my portfolio by stock and sector?',
    'Is there recent news that affects my holdings?',
    'Which of my stocks have earnings coming up?',
    'How exposed am I to the US dollar?',
]

const AUTO_REFRESH_MS = 5 * 60 * 1000

// ─── Formatting ───────────────────────────────────────────────────────────────
const formatMoney = (value, currency, { signed = false } = {}) => {
    if (value == null || !Number.isFinite(value)) return '—'
    const formatted = new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'en-IN', {
        style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(Math.abs(value))
    const sign = value < 0 ? '−' : signed && value > 0 ? '+' : ''
    return `${sign}${formatted}`
}

const formatPct = (value) => {
    if (value == null || !Number.isFinite(value)) return '—'
    const sign = value > 0 ? '+' : value < 0 ? '−' : ''
    return `${sign}${Math.abs(value).toFixed(2)}%`
}

const formatQty = (q) => Number(q).toLocaleString('en-IN', { maximumFractionDigits: 4 })

const tone = (v) => (v > 0 ? 'gain' : v < 0 ? 'loss' : 'flat')

// ─── Icons ────────────────────────────────────────────────────────────────────
const RefreshIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" />
    </svg>
)
const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
)
const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z" /><path d="M13.5 6.5l4 4" />
    </svg>
)
const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
    </svg>
)
const SendIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
)

// ─── Pieces ───────────────────────────────────────────────────────────────────
function SummaryTiles({ summary, currency, note }) {
    if (!summary) return null
    return (
        <div className='summary-tiles'>
            <div className='summary-tile'>
                <div className='tile-label'>Current value</div>
                <div className='tile-value'>{formatMoney(summary.value, currency)}</div>
                {note && <div className='tile-sub'>{note}</div>}
            </div>
            <div className='summary-tile'>
                <div className='tile-label'>Invested</div>
                <div className='tile-value'>{formatMoney(summary.invested, currency)}</div>
                <div className='tile-sub'>{summary.count} holding{summary.count === 1 ? '' : 's'}</div>
            </div>
            <div className='summary-tile'>
                <div className='tile-label'>Total P&amp;L</div>
                <div className={`tile-value ${tone(summary.pnl)}`}>{formatMoney(summary.pnl, currency, { signed: true })}</div>
                <div className={`tile-sub ${tone(summary.pnl)}`}>{formatPct(summary.pnlPct)}</div>
            </div>
            <div className='summary-tile'>
                <div className='tile-label'>Today</div>
                <div className={`tile-value ${tone(summary.dayChange)}`}>{formatMoney(summary.dayChange, currency, { signed: true })}</div>
                <div className={`tile-sub ${tone(summary.dayChange)}`}>{formatPct(summary.dayChangePct)}</div>
            </div>
        </div>
    )
}

// Ranked horizontal bars, one hue: share of portfolio value per sector
function SectorAllocation({ sectors, currency }) {
    if (!sectors.length) return null
    return (
        <section className='portfolio-card'>
            <h2 className='card-title'>Sector allocation</h2>
            <div className='card-subtitle'>Share of current value</div>
            <ul className='meter-list'>
                {sectors.map(s => (
                    <li key={s.sector} className='meter-row' tabIndex={0}>
                        <span className='meter-name'>{s.sector}</span>
                        <span className='meter-track'>
                            <span className='meter-fill' style={{ width: `${Math.min(100, s.weight)}%` }} />
                        </span>
                        <span className='meter-figure'>{s.weight.toFixed(1)}%</span>
                        <span className='meter-tooltip' role='tooltip'>
                            {formatMoney(s.value, currency)} · {s.count} holding{s.count === 1 ? '' : 's'}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

function AskCard({ onAsk }) {
    const [question, setQuestion] = useState('')
    const submit = (e) => {
        e.preventDefault()
        if (question.trim()) onAsk(question.trim())
    }
    return (
        <section className='portfolio-card ask-card'>
            <div className='ask-header'>
                <div>
                    <h2 className='card-title'>Ask about your portfolio</h2>
                    <div className='card-subtitle'>Answers use your live holdings and recent news, in any language</div>
                </div>
            </div>
            <form className='ask-input' onSubmit={submit}>
                <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder='Ask in any language…'
                    aria-label='Ask about your portfolio'
                />
                <button type='submit' disabled={!question.trim()} aria-label='Ask'><SendIcon /></button>
            </form>
            <div className='ask-language'>
                <span>Answer in</span>
                <LanguageSelect />
            </div>
            <div className='suggested-questions'>
                {SUGGESTED_QUESTIONS.map(q => (
                    <button key={q} type='button' className='question-chip' onClick={() => onAsk(q)}>{q}</button>
                ))}
            </div>
        </section>
    )
}

const EMPTY_FORM = { market: 'IN', query: '', symbol: '', name: '', quantity: '', avg_price: '', sector: '', notes: '' }

function HoldingModal({ show, editing, sectorOptions, onClose, onSaved }) {
    const dispatch = useDispatch()
    const [form, setForm] = useState(EMPTY_FORM)
    const [suggestions, setSuggestions] = useState([])
    const [searching, setSearching] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const searchSeq = useRef(0)

    useEffect(() => {
        if (!show) return
        setError('')
        setSuggestions([])
        setForm(editing ? {
            market: editing.market,
            query: editing.symbol,
            symbol: editing.symbol,
            name: editing.name,
            quantity: String(editing.quantity),
            avg_price: String(editing.avg_price),
            sector: editing.sector === 'Unclassified' ? '' : editing.sector,
            notes: editing.notes || '',
        } : EMPTY_FORM)
    }, [show, editing])

    // Debounced symbol search while adding
    useEffect(() => {
        if (editing || !show) return
        const q = form.query.trim()
        if (q.length < 2 || q.toUpperCase() === form.symbol) {
            setSuggestions([])
            return
        }
        const seq = ++searchSeq.current
        const timer = setTimeout(async () => {
            setSearching(true)
            try {
                const results = await searchSymbols(q, form.market)
                if (seq === searchSeq.current) setSuggestions(results)
            } catch {
                if (seq === searchSeq.current) setSuggestions([])
            } finally {
                if (seq === searchSeq.current) setSearching(false)
            }
        }, 300)
        return () => clearTimeout(timer)
    }, [form.query, form.market, form.symbol, editing, show])

    const set = (key, value) => setForm(f => ({ ...f, [key]: value }))

    const pickSuggestion = (s) => {
        setForm(f => ({ ...f, query: s.symbol, symbol: s.symbol, name: s.name }))
        setSuggestions([])
    }

    const submit = async (e) => {
        e.preventDefault()
        const symbol = (form.symbol || form.query).trim().toUpperCase()
        const quantity = Number(form.quantity)
        const avgPrice = Number(form.avg_price)
        if (!symbol) return setError('Enter or pick a stock symbol')
        if (!(quantity > 0)) return setError('Quantity must be more than 0')
        if (!(avgPrice > 0)) return setError('Average buy price must be more than 0')

        setSaving(true)
        setError('')
        try {
            const body = { quantity, avg_price: avgPrice, sector: form.sector || undefined, notes: form.notes }
            const res = editing
                ? await dispatch(updateHolding({ id: editing.holding_id, ...body })).unwrap()
                : await dispatch(addHolding({ market: form.market, symbol, ...body })).unwrap()
            ReactGA.event({ category: 'Portfolio', action: editing ? 'portfolio_edit_holding' : 'portfolio_add_holding', label: form.market })
            toast.success(res?.message || 'Saved')
            onSaved()
        } catch (err) {
            setError(err?.message || 'Could not save this holding')
        } finally {
            setSaving(false)
        }
    }

    const currency = MARKETS[form.market].currency

    return (
        <Modal show={show} onHide={onClose} centered className='portfolio-modal'>
            <form onSubmit={submit}>
                <Modal.Header>
                    <div className='modal-title-text'>{editing ? `Edit ${editing.symbol}` : 'Add a holding'}</div>
                    <button type='button' className='icon-btn' onClick={onClose} aria-label='Close'>
                        <img src={CloseImg} width={28} alt='' />
                    </button>
                </Modal.Header>
                <Modal.Body>
                    {!editing && (
                        <div className='field'>
                            <span className='field-label'>Market</span>
                            <div className='market-toggle' role='tablist' aria-label='Market'>
                                {Object.entries(MARKETS).map(([code, m]) => (
                                    <button
                                        key={code}
                                        type='button'
                                        role='tab'
                                        aria-selected={form.market === code}
                                        className={form.market === code ? 'active' : ''}
                                        onClick={() => setForm(f => ({ ...f, market: code, query: '', symbol: '', name: '' }))}
                                    >
                                        <img src={m.flag} alt='' />{m.label} <span className='exchange'>{m.exchange}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className='field symbol-field'>
                        <label className='field-label' htmlFor='holding-symbol'>Stock</label>
                        <input
                            id='holding-symbol'
                            value={form.query}
                            disabled={!!editing}
                            autoComplete='off'
                            placeholder={form.market === 'IN' ? 'Search name or NSE symbol, e.g. Reliance' : 'Search name or ticker, e.g. Apple'}
                            onChange={(e) => setForm(f => ({ ...f, query: e.target.value, symbol: '', name: '' }))}
                        />
                        {form.name && <div className='field-hint'>{form.name}</div>}
                        {searching && <div className='field-hint'>Searching…</div>}
                        {suggestions.length > 0 && (
                            <ul className='symbol-suggestions' role='listbox'>
                                {suggestions.map(s => (
                                    <li key={s.symbol}>
                                        <button type='button' onClick={() => pickSuggestion(s)}>
                                            <span className='suggestion-symbol'>{s.symbol}</span>
                                            <span className='suggestion-name'>{s.name}</span>
                                            {s.type && s.type !== 'STOCK' && <span className='suggestion-type'>{s.type}</span>}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className='field-row'>
                        <div className='field'>
                            <label className='field-label' htmlFor='holding-qty'>Quantity</label>
                            <input id='holding-qty' type='number' inputMode='decimal' min='0' step='any' value={form.quantity} onChange={(e) => set('quantity', e.target.value)} placeholder='e.g. 10' />
                        </div>
                        <div className='field'>
                            <label className='field-label' htmlFor='holding-price'>Average buy price ({currency})</label>
                            <input id='holding-price' type='number' inputMode='decimal' min='0' step='any' value={form.avg_price} onChange={(e) => set('avg_price', e.target.value)} placeholder='e.g. 1250' />
                        </div>
                    </div>
                    {!editing && <div className='field-hint'>Adding a stock you already hold merges both lots at their weighted average cost.</div>}

                    <div className='field'>
                        <label className='field-label' htmlFor='holding-sector'>Sector</label>
                        <select id='holding-sector' value={form.sector} onChange={(e) => set('sector', e.target.value)}>
                            <option value=''>{editing ? 'Keep current' : 'Detect automatically'}</option>
                            {sectorOptions.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div className='field'>
                        <label className='field-label' htmlFor='holding-notes'>Notes <span className='optional'>(optional)</span></label>
                        <textarea id='holding-notes' rows={2} maxLength={500} value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder='Why you bought it, your time horizon… the assistant reads these' />
                    </div>

                    {error && <div className='form-error' role='alert'>{error}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <button type='button' className='light-blue-btn2 px-4' onClick={onClose}>Cancel</button>
                    <button type='submit' className='blue-btn px-4' disabled={saving}>{saving ? 'Saving…' : editing ? 'Save changes' : 'Add holding'}</button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
function Portfolio() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { snapshot, isLoading, error } = useSelector(state => state.portfolioSlice)
    const [view, setView] = useState('ALL')
    const [modal, setModal] = useState({ show: false, editing: null })
    const [toDelete, setToDelete] = useState(null)

    const load = () => dispatch(fetchPortfolio())

    useEffect(() => {
        load()
        const timer = setInterval(load, AUTO_REFRESH_MS)
        return () => clearInterval(timer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const holdings = useMemo(() => snapshot?.holdings || [], [snapshot])
    const marketsHeld = Object.keys(snapshot?.markets || {})
    const bothMarkets = marketsHeld.length > 1
    // One market held → show it in its own currency; both → All (INR) unless the FX rate is missing
    const activeView = bothMarkets ? (view === 'ALL' && !snapshot?.combined ? 'IN' : view) : (marketsHeld[0] || 'ALL')
    const viewCurrency = activeView === 'US' ? 'USD' : 'INR'
    const usdInr = snapshot?.fx?.USDINR

    const visible = useMemo(() => {
        const list = activeView === 'ALL' ? holdings : holdings.filter(h => h.market === activeView)
        const inViewCurrency = (h) => (activeView === 'ALL' && h.market === 'US' ? h.value * usdInr : h.value)
        return [...list].sort((a, b) => inViewCurrency(b) - inViewCurrency(a))
    }, [holdings, activeView, usdInr])

    const summary = activeView === 'ALL' ? snapshot?.combined : snapshot?.markets?.[activeView]

    const sectors = useMemo(() => {
        const toView = (h) => (activeView === 'ALL' && h.market === 'US' ? h.value * usdInr : h.value)
        const total = visible.reduce((s, h) => s + toView(h), 0)
        const map = new Map()
        visible.forEach(h => {
            const entry = map.get(h.sector) || { sector: h.sector, value: 0, count: 0 }
            entry.value += toView(h)
            entry.count += 1
            map.set(h.sector, entry)
        })
        return [...map.values()]
            .map(s => ({ ...s, weight: total ? (s.value / total) * 100 : 0 }))
            .sort((a, b) => b.value - a.value)
    }, [visible, activeView, usdInr])

    const askQuestion = (question) => {
        ReactGA.event({ category: 'Portfolio', action: 'portfolio_ask', label: 'Ask about portfolio' })
        navigate('/frruit-gpt', { state: { question, fundamental: 'portfolio' } })
    }

    const confirmDelete = async () => {
        const h = toDelete
        setToDelete(null)
        try {
            const res = await dispatch(deleteHolding(h.holding_id)).unwrap()
            toast.success(res?.message || `${h.symbol} removed`)
            load()
        } catch (err) {
            toast.error(err?.message || 'Could not remove this holding')
        }
    }

    const onSaved = () => {
        setModal({ show: false, editing: null })
        load()
    }

    const firstLoad = isLoading && !snapshot
    const isEmpty = snapshot && holdings.length === 0
    const fxNote = activeView === 'ALL' && bothMarkets && usdInr ? `US holdings at ₹${usdInr.toFixed(2)} per $` : null

    return (
        <div className='portfolio-page'>
            <div className='portfolio-header'>
                <div>
                    <h1 className='portfolio-title'>My Portfolio</h1>
                    <div className='portfolio-subtitle'>
                        Live prices from NSE, NYSE and NASDAQ
                        {snapshot?.updatedAt && <> · Updated {moment(snapshot.updatedAt).fromNow()}</>}
                        <button className='refresh-btn' onClick={load} title='Refresh prices' aria-label='Refresh prices' disabled={isLoading}><RefreshIcon /></button>
                    </div>
                </div>
                <div className='header-actions'>
                    {bothMarkets && (
                        <div className='market-toggle' role='tablist' aria-label='Portfolio view'>
                            {['ALL', 'IN', 'US'].map(code => (
                                <button
                                    key={code}
                                    role='tab'
                                    aria-selected={activeView === code}
                                    className={activeView === code ? 'active' : ''}
                                    disabled={code === 'ALL' && !snapshot?.combined}
                                    onClick={() => setView(code)}
                                >
                                    {code !== 'ALL' && <img src={MARKETS[code].flag} alt='' />}
                                    {code === 'ALL' ? 'All' : MARKETS[code].label}
                                </button>
                            ))}
                        </div>
                    )}
                    {!isEmpty && (
                        <button className='blue-btn add-btn' onClick={() => setModal({ show: true, editing: null })}>
                            <PlusIcon /> Add holding
                        </button>
                    )}
                </div>
            </div>

            {snapshot?.quoteError && (
                <div className='portfolio-banner' role='status'>Live prices are unavailable right now, so holdings are shown at cost. Try refreshing in a minute.</div>
            )}
            {error && !snapshot && (
                <div className='portfolio-banner' role='alert'>Couldn't load your portfolio. <button onClick={load}>Try again</button></div>
            )}

            {firstLoad && (
                <div className='summary-tiles'>
                    {[0, 1, 2, 3].map(i => <div key={i} className='summary-tile skeleton' />)}
                </div>
            )}

            {isEmpty && (
                <div className='portfolio-layout'>
                    <section className='portfolio-card empty-state'>
                        <h2>Add your holdings to get started</h2>
                        <p>
                            Enter each stock you own with its quantity and average buy price. Frruit values them at live prices,
                            tracks your P&amp;L and lets you ask questions about your portfolio in your own language.
                        </p>
                        <button className='blue-btn add-btn' onClick={() => setModal({ show: true, editing: null })}>
                            <PlusIcon /> Add your first holding
                        </button>
                        <div className='empty-markets'>Supports NSE stocks and US stocks and ETFs on NYSE and NASDAQ.</div>
                    </section>
                </div>
            )}

            {snapshot && !isEmpty && (
                <>
                    <SummaryTiles summary={summary} currency={viewCurrency} note={fxNote} />

                    <div className='portfolio-layout'>
                        <section className='portfolio-card holdings-card'>
                            <h2 className='card-title'>Holdings</h2>
                            <div className='table-scroll'>
                                <table className='holdings-table'>
                                    <thead>
                                        <tr>
                                            <th>Stock</th>
                                            <th className='num'>Qty</th>
                                            <th className='num'>Avg cost</th>
                                            <th className='num'>Last price</th>
                                            <th className='num'>Value</th>
                                            <th className='num'>P&amp;L</th>
                                            <th className='num'>Weight</th>
                                            <th><span className='visually-hidden'>Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visible.map(h => (
                                            <tr key={h.holding_id}>
                                                <td className='stock-td'>
                                                    <div className='stock-cell'>
                                                        <span className='stock-symbol'>
                                                            {h.symbol}
                                                            {activeView === 'ALL' && <span className='market-tag'>{h.market}</span>}
                                                        </span>
                                                        <span className='stock-name' title={h.name}>{h.name}</span>
                                                        <span className='stock-sector'>{h.sector}</span>
                                                    </div>
                                                </td>
                                                <td className='num' data-label='Qty'>{formatQty(h.quantity)}</td>
                                                <td className='num' data-label='Avg cost'>{formatMoney(h.avg_price, h.currency)}</td>
                                                <td className='num' data-label='Last price'>
                                                    {h.priceAvailable ? (
                                                        <>
                                                            <div>{formatMoney(h.price, h.currency)}</div>
                                                            <div className={`cell-sub ${tone(h.changePct)}`}>{formatPct(h.changePct)}</div>
                                                        </>
                                                    ) : <span title='Live price unavailable; valued at cost'>—</span>}
                                                </td>
                                                <td className='num' data-label='Value'>{formatMoney(h.value, h.currency)}</td>
                                                <td className='num' data-label='P&L'>
                                                    <div className={tone(h.pnl)}>{formatMoney(h.pnl, h.currency, { signed: true })}</div>
                                                    <div className={`cell-sub ${tone(h.pnl)}`}>{formatPct(h.pnlPct)}</div>
                                                </td>
                                                <td className='num' data-label='Weight'>{((activeView === 'ALL' ? h.weightTotal : h.weight) ?? 0).toFixed(1)}%</td>
                                                <td className='actions'>
                                                    <button className='icon-btn' onClick={() => setModal({ show: true, editing: h })} title={`Edit ${h.symbol}`} aria-label={`Edit ${h.symbol}`}><EditIcon /></button>
                                                    <button className='icon-btn danger' onClick={() => setToDelete(h)} title={`Remove ${h.symbol}`} aria-label={`Remove ${h.symbol}`}><TrashIcon /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <div className='side-column'>
                            <AskCard onAsk={askQuestion} />
                            <SectorAllocation sectors={sectors} currency={viewCurrency} />
                        </div>
                    </div>
                    <div className='portfolio-disclaimer'>Prices may be delayed. Analysis on this page is informational and is not investment advice.</div>
                </>
            )}

            <HoldingModal
                show={modal.show}
                editing={modal.editing}
                sectorOptions={snapshot?.sectorOptions || []}
                onClose={() => setModal({ show: false, editing: null })}
                onSaved={onSaved}
            />

            <Modal show={!!toDelete} onHide={() => setToDelete(null)} size='md' centered className='marketGpt-left-box-modal'>
                <Modal.Header>
                    <div className='d-flex justify-content-between align-items-center mb-2 w-100'>
                        <div className='header-text'>Remove {toDelete?.symbol}?</div>
                        <div onClick={() => setToDelete(null)} style={{ cursor: 'pointer' }}>
                            <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} alt='Close' />
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-text-css'>This removes {toDelete?.symbol} ({formatQty(toDelete?.quantity || 0)} shares) from your portfolio. This can't be undone.</div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex justify-content-center align-items-center'>
                        <button onClick={() => setToDelete(null)} className='light-blue-btn2 mx-2 px-5'>Cancel</button>
                        <button onClick={confirmDelete} className='blue-btn mx-2 px-5'>Remove</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Portfolio
