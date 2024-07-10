import React from 'react'
import CustomTable from '../customTable/CustomTable';

function ResultsPage() {

    const tableHeaders = ['', 'Mar 24(Cr.)', 'YoY Change', 'QoQ Change'];

    const userData = [
        {
            type: 'Sales',
            croreunits: '1,24,222',
            yoychange: '117%',
            qoqchange: '8.81%',
        },
        {
            type: 'Operating Profit',
            croreunits: '31,571',
            yoychange: '58.16%',
            qoqchange: '22.15%',
        },
        {
            type: 'Net Profit',
            croreunits: '17,622',
            yoychange: '39.92%',
            qoqchange: '2.11%',
        },
    ];

    const pieData = {
        labels: ['Consultancy services', 'Equipment and software licences'],
        data: [98, 2],
    };

    const customColors = ['#4CAF50', '#FFC107', '#2196F3'];
    
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