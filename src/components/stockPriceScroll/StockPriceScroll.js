import React from "react";
import Marquee from "react-marquee-slider";
import GreenArrow from '../../assets/images/green_up-arrow.png'
import RedArrow from '../../assets/images/red_down-arrow.png'
import './StockPriceScroll.scss'

export default function StockPriceScroll() {
    const words = [
        { text1: "NIFTY 22097.45", text2: "0.93%" },
        { text1: "NIFTY 22097.45", text2: "0.93%" },
        { text1: "NIFTY 22097.45", text2: "-0.93%" },
        { text1: "NIFTY 22097.45", text2: "0.93%" },
        { text1: "NIFTY 22097.45", text2: "-0.93%" },
        { text1: "NIFTY 22097.45", text2: "0.93%" },
        { text1: "NIFTY 22097.45", text2: "0.93%" },
        { text1: "NIFTY 22097.45", text2: "-0.93%" },
    ];

    return (
        <div className="mt-3 stockpricescroll">
            <div className="banner py-2" style={{ border: 'solid 1px #EDEDED' }}>
                <Marquee key={Math.random()} velocity={20} minScale={0.7} resetAfterTries={100}>
                    {words.map((word, index) => (
                        <div key={index} style={{ padding: "0 25px" }}>
                            <div className="d-flex align-items-center">
                                <div className="text1">{word.text1}</div>
                                <img className="mx-2" style={{ width: 24, objectFit: 'contain' }} src={word.text2 > '0' ? GreenArrow : RedArrow} />
                                <div className={`${word.text2 > '0' ? 'text2' : 'text2red'}`}>{word.text2}</div>
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
}
