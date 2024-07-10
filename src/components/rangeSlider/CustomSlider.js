import React, { useState } from 'react';
import '../rangeSlider/CustomSlider.scss';

const CustomSlider = () => {
    const [value, setValue] = useState(50); // Initial value of the slider

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className='slider-css'>
            <div className="slider-container">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={handleChange}
                    className="slider"
                />
                <div className="slider-handle"></div>
            </div>
        </div>
    );
};

export default CustomSlider;
