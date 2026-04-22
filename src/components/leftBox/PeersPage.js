import React from 'react'
import CustomTable from '../customTable/CustomTable';
import StarIcon from '../../assets/images/StarIcon.png';

function PeersPage({financialPeer}) {

    const tableHeaders = ['Name', 'M.CAP (Cr.)', 'PE',  'D/E']; //'ROE (%)	',

    const userData = [
        {
            name: 'HDFCBANK',
            marketcap: '12,80,865',
            pe_ratio: '19.99',
            return_on_investment: '17.24',
            de_ratio: '0.89',
        },
        {
            name: 'HDFCBANK',
            marketcap: '12,80,865',
            pe_ratio: '19.99',
            return_on_investment: '17.24',
            de_ratio: '0.89',
        },
        {
            name: 'HDFCBANK',
            marketcap: '12,80,865',
            pe_ratio: '19.99',
            return_on_investment: '17.24',
            de_ratio: '0.89',
        },
        {
            name: 'HDFCBANK',
            marketcap: '12,80,865',
            pe_ratio: '19.99',
            return_on_investment: '17.24',
            de_ratio: '0.89',
        },

    ]

    return (
        <div className='mt-4'>
            <CustomTable
                data={financialPeer.map((obj) => {
                    return {
                        name: obj?.companyname,
                        marketcap: obj?.MCAP,
                        pe_ratio: obj?.PE,
                        // return_on_investment: '17.24',
                        de_ratio: obj?.DIVYIELD,
                    }
                })}
                headers={tableHeaders}
            />
        </div>
    )
}

export default PeersPage