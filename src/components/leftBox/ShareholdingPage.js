import React from 'react'
import CustomTable from '../customTable/CustomTable';
import moment from 'moment';

function ShareholdingPage({financialsShareHoldings}) {

    const previousQuarterYear = financialsShareHoldings[0]?.Previous_Quarter_Year ? moment(financialsShareHoldings[0]?.Previous_Quarter_Year, "YYYYMM").format("MMM YY") : "";
    const latestQuarterYear = financialsShareHoldings[0]?.Latest_Quarter_Year ? moment(financialsShareHoldings[0]?.Latest_Quarter_Year, "YYYYMM").format("MMM YY") : "";

    const tableHeaders = ['Type', latestQuarterYear || '', previousQuarterYear || '', 'YoY Change', 'QoQ Change'];

    const formatToTwoDecimalPlaces = (number) => {
        return Number(number).toFixed(2);
    };

    const userData = financialsShareHoldings?.map(obj => {
        return {
            type: obj?.type,
            marchunits: `${formatToTwoDecimalPlaces(obj['Latest_Quarter_Value'])}%`,
            decemberunits:`${formatToTwoDecimalPlaces(obj['Previous_Quarter_Value'])}%`,
            yoychange: `${formatToTwoDecimalPlaces(obj['YoY_change'])}%`,
            qoqchange: `${formatToTwoDecimalPlaces(obj['QoQ_change'])}%`,
        }
    });

    return (
        <div className='mt-4'>
            <CustomTable
                data={userData}
                headers={tableHeaders}
            />
        </div>
    )
}

export default ShareholdingPage