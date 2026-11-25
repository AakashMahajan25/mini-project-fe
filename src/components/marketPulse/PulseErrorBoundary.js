import React from 'react';

// Keeps an unexpected render error in the market pulse from blanking the rest of the dashboard
class PulseErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { failed: false };
    }

    static getDerivedStateFromError() {
        return { failed: true };
    }

    componentDidCatch(error, info) {
        console.error('Market pulse failed to render:', error, info?.componentStack);
    }

    render() {
        if (!this.state.failed) return this.props.children;
        if (this.props.silent) return null;
        return (
            <div className='mp-card mp-error' role='alert'>
                <p>Market pulse couldn't be shown right now.</p>
                <button type='button' className='mp-outline-btn' onClick={() => this.setState({ failed: false })}>
                    Try again
                </button>
            </div>
        );
    }
}

export default PulseErrorBoundary;
