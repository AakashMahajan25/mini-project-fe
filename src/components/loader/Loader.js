import React from 'react';
import './index.scss'

function Loader() {
  return (
    <div className="loader-container">
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="spinner-border" role="status" style={{color:'#4563E4'}}>
        </div>
      </div>
    </div>
  );
}

export default Loader;
