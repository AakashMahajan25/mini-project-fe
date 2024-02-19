import React from 'react';
import './index.scss'
import { BarLoader } from 'react-spinners';
import ProgressBar from 'react-bootstrap/ProgressBar';

function Loader() {
  const now = 60;
  return (
    <div className="loader-container">
      <div className="d-flex align-items-center justify-content-center h-100">
        {/* <div className="spinner-border" role="status" style={{color:'#4563E4'}}>
        </div> */}
        <div className='white-box'>
          <div className='wait-text'>Please Wait while we are</div>
          <div className='data-text mt-2'>Fetching the Data...</div>
          <BarLoader
            color={'#4563E4'}
            loading={true}
            cssOverride={{ width: '350px' }}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          {/* <ProgressBar style={{ width: 350, height: 5 }} now={now} animated visuallyHidden label={`${now}%`} /> */}
        </div>
      </div>
    </div>
  );
}

export default Loader;
