import React, { useEffect } from 'react';
import CustomTable from '../customTable/CustomTable';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getFinancialsResults } from '../../screens/dashboard/slice';
import { toast } from 'react-toastify';

function ResultsPage() {
    const { getResults } = useSelector(state => state.dashboardSlice);

    const formatLatestQuarter = () => {
        if (getResults.length > 0) {
            const latestQuarter = getResults[0].latest_quarter;
            const year = latestQuarter.slice(0, 4);
            const month = latestQuarter.slice(4, 6);
            return moment(`${year}-${month}-01`).format('MMMM YY');
        }
        return 'Latest Quarter';
    };

    const tableHeaders = ['', formatLatestQuarter(), 'YoY Change', 'QoQ Change'];

    const formatToTwoDecimalPlaces = (number) => {
        return Number(number).toFixed(2);
    };

    const userData = getResults.map(obj => {
        return {
            type: obj?.type,
            latest_value: `${formatToTwoDecimalPlaces(obj['latest_value'])}`,
            yoy: `${formatToTwoDecimalPlaces(obj['yoy'])}%`,
            qoq: `${formatToTwoDecimalPlaces(obj['qoq'])}%`,
        };
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

export default ResultsPage