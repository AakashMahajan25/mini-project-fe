import React from 'react'
import CustomTable from '../customTable/CustomTable';

function ShareholdingPage() {

    const tableHeaders = ['Type', 'Mar 24', 'Dec 23', 'YoY Change', 'QoQ Change'];

    const userData = [
        {
            type: 'Promoter',
            marchunits: '48.25%',
            decemberunits:'52.73%',
            yoychange: '16.01%',
            qoqchange: '-4.48%',
        },
        {
            type: 'Pledge',
            marchunits: '48.25%',
            decemberunits:'52.73%',
            yoychange: '16.01%',
            qoqchange: '-4.48%',
        },
        {
            type: 'FII',
            marchunits: '48.25%',
            decemberunits:'52.73%',
            yoychange: '16.01%',
            qoqchange: '-4.48%',
        },
        {
            type: 'DII',
            marchunits: '48.25%',
            decemberunits:'52.73%',
            yoychange: '16.01%',
            qoqchange: '-4.48%',
        },
        {
            type: 'Retail < 1L',
            marchunits: '48.25%',
            decemberunits:'52.73%',
            yoychange: '16.01%',
            qoqchange: '-4.48%',
        },
        {
            type: 'Others',
            marchunits: '48.25%',
            decemberunits:'52.73%',
            yoychange: '16.01%',
            qoqchange: '-4.48%',
        },
        
    ]


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