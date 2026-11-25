import React from 'react';
import { useLiveStatus } from '../../utils/liveSocket';
import './LiveBadge.scss';

/**
 * "Live" pill with a pulsing dot while the live socket is connected.
 * Falls back to "Auto-refresh" (grey, no pulse) when it isn't, since screens still poll.
 */
function LiveBadge({ pollNote = 'periodically', className = '' }) {
    const status = useLiveStatus();
    const live = status === 'connected';
    const connecting = status === 'connecting' || status === 'idle';

    const label = live ? 'Live' : connecting ? 'Connecting' : 'Auto-refresh';
    const title = live
        ? 'Connected. New data appears automatically.'
        : connecting
            ? 'Connecting to live updates…'
            : `Live connection unavailable. Checking for updates ${pollNote}.`;

    return (
        <span className={`live-badge ${live ? 'is-live' : 'is-offline'} ${className}`} title={title}>
            <span className='live-dot' aria-hidden='true' />
            {label}
        </span>
    );
}

export default LiveBadge;
