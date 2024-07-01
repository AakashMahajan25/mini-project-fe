import React, { useState } from "react";
import Slider from "react-slick";
import "./customSlider.scss";
import { useNavigate } from "react-router-dom";
import { imagesDesktopEnglish, imagesMobileEnglish } from "./WalkThroughImages";

// const languages = [
//   {
//     code: 'en',
//     name: 'English',
//     country_code: 'gb',
//   },
//   {
//     code: 'ar',
//     name: 'العربية',
//     dir: 'rtl',
//     country_code: 'sa',
//   },
// ];


export default function WalkThrough() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0);
    //   console.log('currentLanguageCode==========', currentLanguageCode);


    const handleNavigate = () => {
        navigate('/companyverification');
    };

    function NextBtn(props) {
        const { className, onClick, currentSlide, totalSlides } = props;
        const isLastSlide = currentSlide === totalSlides - 1;
        return (
                <div className={className} onClick={isLastSlide ? handleNavigate : onClick}>
                    <img src={(isLastSlide) ? require(`../../assets/images/SliderDoneButton.png`) :
                        (isLastSlide) ? require(`../../assets/images/SliderDoneButton.png`) :
                            require(`../../assets/images/NextButton.png`)} alt="Next" />
                </div>
        );
    }

    function PreviousBtn(props) {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                <img src={currentSlide === 0 ? require(`../../assets/images/disableSliderButton.png`) : require(`../../assets/images/sliderPreWalk.png`)} alt="Previous" />
            </div>
        );
    }
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        swipe: false,
        draggable: false
    };

    //   const handleFilterClick = (index, code) => {
    //     setSelectedIndex(index);
    //     i18next.changeLanguage(code);
    //   };

    const images = (window.innerWidth < 500) ? imagesMobileEnglish : imagesDesktopEnglish;


    const totalSlides = images.length;
    const height = window.innerWidth < 500 ? window.innerHeight - 150 : window.innerHeight - 100;

    return (
        <div style={{ backgroundColor: '#E5EAFF',height:'100vh' }}>
            <div className="walk-through">
                <div className='export-dropdown mt-3'>
                    <div className='col-lg-12 col-md-12' style={{
                        border: 1,
                        borderColor: "#00D094",
                        borderStyle: "solid", borderRadius: 20, width: 'fit-content'
                    }}>
                    </div>
                </div>
                <div onClick={handleNavigate} className="skip-styles">Skip</div>
                <Slider
                    {...settings}
                    prevArrow={<PreviousBtn />}
                    nextArrow={<NextBtn currentSlide={currentSlide} totalSlides={totalSlides} />}>
                    {
                        images.map((item) => (
                            <div className="walkthrough-styles-image" >
                                <img src={item.image} className="walkthrough-image" style={{ height: height }} />
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    );
}