import React, { useEffect } from 'react';
import './RightDrawer.scss';
import CloseImg from '../../assets/images/close_icon.png';

function RightDrawer({ isOpen, onClose, title, children, width = '500px' }) {
    
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            <div 
                className="drawer-overlay" 
                onClick={onClose}
            />
            <div 
                className={`right-drawer ${isOpen ? 'open' : ''}`}
                style={{ width }}
            >
                <div className="drawer-header">
                    <div className="drawer-title">{title}</div>
                    <div 
                        className="drawer-close-btn" 
                        onClick={onClose}
                    >
                        <img src={CloseImg} alt="Close" width={24} height={24} />
                    </div>
                </div>
                <div className="drawer-content">
                    {children}
                </div>
            </div>
        </>
    );
}

export default RightDrawer;
