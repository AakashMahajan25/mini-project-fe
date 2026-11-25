// One shared socket.io connection to the backend's "/live" namespace for the whole app.
// It is opened lazily by the first subscriber and closed shortly after the last one leaves.
// Server events: "news:new" { added, byMarket: { IN, US }, at }, "market:movers" { market, updated_at },
// "market:summary" { market }.
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const LIVE_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/live`;

// Grace period before closing an unused socket, so a route change doesn't drop and reopen it
const IDLE_DISCONNECT_MS = 2000;
// socket.io gives up when the server refuses the handshake (bad or expired token); retry on our own
const REFUSED_RETRY_MS = 30000;

// Fired locally (not by the server) when the connection comes back after a drop,
// so screens can catch up on events they may have missed while offline
export const LIVE_RECONNECTED = 'live:reconnected';

let socket = null;
let status = 'idle'; // 'idle' | 'connecting' | 'connected' | 'disconnected'
let hasConnected = false;
let idleTimer = null;
let retryTimer = null;
const handlers = new Map(); // event -> Set<handler>
const statusListeners = new Set();

function setStatus(next) {
    if (status === next) return;
    status = next;
    statusListeners.forEach(listener => listener(next));
}

function dispatchEvent(event, payload) {
    const set = handlers.get(event);
    if (!set) return;
    [...set].forEach(handler => {
        try {
            handler(payload);
        } catch (err) {
            console.error(`Live "${event}" handler failed:`, err);
        }
    });
}

function subscriberCount() {
    let count = 0;
    handlers.forEach(set => { count += set.size; });
    return count;
}

function scheduleRetry(instance) {
    clearTimeout(retryTimer);
    retryTimer = setTimeout(() => {
        if (socket === instance && subscriberCount() > 0 && localStorage.getItem('token')) instance.connect();
    }, REFUSED_RETRY_MS);
}

function ensureSocket() {
    clearTimeout(idleTimer);
    if (socket) return socket;

    const instance = io(LIVE_URL, {
        // A function is re-read on every (re)connect, so a renewed login token is picked up
        auth: (cb) => cb({ token: localStorage.getItem('token') }),
        reconnection: true,
        reconnectionDelay: 2000,
        reconnectionDelayMax: 30000,
    });
    socket = instance;
    setStatus('connecting');

    instance.on('connect', () => {
        if (socket !== instance) return;
        clearTimeout(retryTimer);
        const isReconnect = hasConnected;
        hasConnected = true;
        setStatus('connected');
        if (isReconnect) dispatchEvent(LIVE_RECONNECTED);
    });
    instance.on('disconnect', (reason) => {
        if (socket !== instance) return;
        // instance.active: socket.io will reconnect by itself (network drop, server restart)
        setStatus(instance.active ? 'connecting' : 'disconnected');
        if (!instance.active && reason === 'io server disconnect') scheduleRetry(instance);
    });
    instance.on('connect_error', () => {
        if (socket !== instance) return;
        setStatus('disconnected');
        if (!instance.active) scheduleRetry(instance);
    });
    instance.onAny((event, payload) => dispatchEvent(event, payload));
    // The chat socket (utils/socket.js) shares this origin's Manager and creates it with autoConnect: false,
    // which this socket inherits, so open it explicitly
    instance.connect();

    return instance;
}

function teardown() {
    clearTimeout(retryTimer);
    const instance = socket;
    socket = null;
    hasConnected = false;
    if (instance) {
        instance.offAny();
        instance.removeAllListeners();
        instance.disconnect();
    }
    setStatus('idle');
}

/**
 * Listen for a live event. Returns an unsubscribe function.
 * The socket connects on the first subscription and disconnects when nobody is listening.
 */
export function subscribe(event, handler) {
    if (!event || typeof handler !== 'function') return () => {};

    // Wrap so the same function can be subscribed twice and removed independently
    const entry = (payload) => handler(payload);
    if (!handlers.has(event)) handlers.set(event, new Set());
    handlers.get(event).add(entry);
    ensureSocket();

    let subscribed = true;
    return () => {
        if (!subscribed) return;
        subscribed = false;
        const set = handlers.get(event);
        if (set) {
            set.delete(entry);
            if (set.size === 0) handlers.delete(event);
        }
        if (subscriberCount() === 0) {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                if (subscriberCount() === 0) teardown();
            }, IDLE_DISCONNECT_MS);
        }
    };
}

export function getLiveStatus() {
    return status;
}

/** Listen for connection status changes. Does not open the socket by itself. */
export function onLiveStatus(listener) {
    statusListeners.add(listener);
    return () => { statusListeners.delete(listener); };
}

/**
 * React hook: run `handler(payload)` for every `event` while the component is mounted.
 * The latest handler is always used, so it can read fresh props/state without resubscribing.
 */
export function useLiveEvent(event, handler, enabled = true) {
    const handlerRef = useRef(handler);
    useEffect(() => {
        handlerRef.current = handler;
    });
    useEffect(() => {
        if (!enabled || !event) return undefined;
        return subscribe(event, (payload) => {
            if (handlerRef.current) handlerRef.current(payload);
        });
    }, [event, enabled]);
}

/** React hook: current connection status ('idle' | 'connecting' | 'connected' | 'disconnected'). */
export function useLiveStatus() {
    const [value, setValue] = useState(status);
    useEffect(() => {
        setValue(status);
        return onLiveStatus(setValue);
    }, []);
    return value;
}
