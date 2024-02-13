import React, { useEffect, useState } from "react";
import Marquee from "react-marquee-slider";
import GreenArrow from '../../assets/images/green_up-arrow.png'
import RedArrow from '../../assets/images/red_down-arrow.png'
import './StockPriceScroll.scss'
import { useSelector } from "react-redux";

export default function StockPriceScroll() {
    const [indexesData, setIndexesData] = useState([])
    const { stockIndexes } = useSelector(state => state.dashboardSlice);

    useEffect(() => {
        if (stockIndexes?.length > 0) {
            const targetIndexNames = [ "S&P 500", "Dow Jones Industrial Average", "Nasdaq Composite" ];
            const filteredData = stockIndexes.filter(item => targetIndexNames.some(target => item.Index.includes(target)));
            // const filteredObject = {};
            // filteredData.forEach(item => {
            //     const key = item.Index === "S&P 500" ? "sp" : item.Index === "Dow Jones Industrial Average" ? "djia" : "";

            //     if (key) {
            //         filteredObject[key] = {
            //             "Value": item.Value,
            //             "Change": item.Change,
            //             "Change Percentage": item["Change Percentage"]
            //         };
            //     }
            // });
            setIndexesData(filteredData)
        }
    }, [stockIndexes])

    return (
        <div className="mt-2 stockpricescroll">
            <div className="banner py-2 d-flex justify-content-between" style={{ border: 'solid 1px #EDEDED' }}>
                {/* <Marquee key={Math.random()} velocity={50} minScale={0.7} resetAfterTries={100}> */}
                {indexesData?.map((stock, index) => (
                    <div key={index} style={{ padding: "0 25px" }}>
                        <div className="d-flex align-items-center">
                            <div className="text1">{`${stock?.Index} $${stock?.Value}`}</div>
                            <img className="mx-2" style={{ width: 24, objectFit: 'contain' }} src={parseFloat(stock?.Change) >= 0 ? GreenArrow : RedArrow} />
                            <div className={`${parseFloat(stock.Change) >= 0 ? 'text2' : 'text2red'}`}>{stock.Change}</div>
                        </div>
                    </div>
                ))}
                {/* </Marquee> */}
            </div>
        </div>
    );
}
