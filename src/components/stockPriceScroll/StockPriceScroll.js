import React from "react";
import Marquee from "react-marquee-slider";
import GreenArrow from '../../assets/images/green_up-arrow.png'
import RedArrow from '../../assets/images/red_down-arrow.png'
import './StockPriceScroll.scss'
import { useSelector } from "react-redux";

export default function StockPriceScroll() {

    const { stockIndexes } = useSelector(state => state.dashboardSlice);

    return (
        <div className="mt-2 stockpricescroll">
            <div className="banner py-2 d-flex justify-content-evenly" style={{ border: 'solid 1px #EDEDED' }}>
                {/* <Marquee key={Math.random()} velocity={50} minScale={0.7} resetAfterTries={100}> */}
                {stockIndexes?.slice(0, 4)?.map((stock, index) => (
                    <div key={index} style={{ padding: "0 25px" }}>
                        <div className="d-flex align-items-center">
                            <div className="text1">{`${stock?.Index?.slice(0,20)} $${stock?.Value}`}</div>
                            <img className="mx-2" style={{ width: 24, objectFit: 'contain' }} src={parseFloat(stock?.Change) > 0 ? GreenArrow : RedArrow} />
                            <div className={`${parseFloat(stock.Change) > 0 ? 'text2' : 'text2red'}`}>{stock.Change}</div>
                        </div>
                    </div>
                ))}
                {/* </Marquee> */}
            </div>
        </div>
    );
}
