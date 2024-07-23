import React from 'react'
import CustomTable from '../customTable/CustomTable';

function ShareholdingPage({financialsShareHoldings}) {

    const tableHeaders = ['Type', 'Mar 24', 'Dec 23', 'YoY Change', 'QoQ Change'];

    const formatToTwoDecimalPlaces = (number) => {
        return Number(number).toFixed(2);
    };

    const userData = financialsShareHoldings.map(obj => {
        return {
            type: obj?.type,
            marchunits: `${formatToTwoDecimalPlaces(obj['202403'])}%`,
            decemberunits:`${formatToTwoDecimalPlaces(obj['202406'])}%`,
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