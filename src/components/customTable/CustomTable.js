import React, { useState } from 'react';
import './CustomTable.scss'
import DownloadIcon from '../../../src/assets/images/tableDownload.png'
import StarImage from "../../assets/images/StarIcon.png";

function CustomTable({ data, headers, showActions, actionsHeaderText, onViewClick, expandedRow, showView, }) {

    const getQoqChangeClass = (value) => {
        // Example condition to set color based on value
        const numericalValue = parseFloat(value);
        return numericalValue < 0 ? 'text-danger' : 'text-success';
    };

    return (
        <>
            <div className='custom-table-css'>
                <div style={{ overflowX: 'auto', padding: '0 0', width: window.innerWidth < 900 ? window.innerWidth - 30 : '' }}>
                    <table style={{ borderCollapse: 'separate', borderSpacing: '0 25px' }} className='custom-table' cellSpacing="6" cellPadding="10">
                        <thead>
                            <tr className='table-head'>
                                {headers.map((header, index) => (
                                    <th className='table-header' key={index} style={{
                                        color: ['Company', 'Ticker', 'Industry', 'Market Cap', 'EPS(₹)'].includes(header) ? 'grey' : 'inherit',
                                        fontWeight: ['Company', 'Ticker', 'Industry', 'Market Cap', 'EPS(₹)'].includes(header) ? 400 : 'inherit'
                                    }}>
                                        {header}
                                    </th>
                                ))}
                                {showActions &&
                                    <th className='table-header'>{actionsHeaderText || ''} </th>
                                }
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {data.map((rowData, rowIndex) => (
                                <React.Fragment key={rowIndex}>
                                    <tr className='table-body-tr' style={{ position: 'relative' }}>
                                        {Object.entries(rowData).map(([key, value], colIndex) => {
                                            const statusClasses = {
                                                'paid': 'table-green-class',
                                                'pending': 'table-yellow-class',
                                                'failed': 'table-red-class',
                                            };

                                            const textClass = ['Ticker', 'Industry', 'Market Cap', 'EPS(₹)'].includes(headers[colIndex]) ? 'text-black' : 'text-grey';
                                            let className = '';

                                            if (headers[colIndex] === 'Status') {
                                                className = `${statusClasses[value]} ${textClass}`;
                                            } else if (headers[colIndex] === 'Order ID') {
                                                className = 'table-row-dark';
                                            } else if (headers[colIndex] === 'YoY Change') {
                                                className = 'text-success';
                                            } else if (headers[colIndex] === 'QoQ Change') {
                                                className = getQoqChangeClass(value);
                                            } else {
                                                className = textClass;
                                            }

                                            return (
                                                <td key={colIndex} className='table-row'>
                                                    <div className={className} style={{
                                                        display: expandedRow === rowIndex ? 'flex' : '',
                                                        alignItems: expandedRow === rowIndex ? 'start' : '',
                                                        height: window.innerWidth < 900 ? (expandedRow === rowIndex ? 250 : '') : (expandedRow === rowIndex ? 180 : '')
                                                    }}>
                                                        {headers[colIndex] === 'M.CAP (Cr.)' ? (
                                                            <div className='d-flex'>
                                                                <img src={StarImage} className='star-image' alt='star' /> {/* Replace with your star icon component or image */}
                                                                M.CAP (Cr.): {value}
                                                            </div>
                                                        ) : (
                                                            <span>
                                                                {value}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                        {showActions && (
                                            <td style={{ display: expandedRow === rowIndex ? 'flex' : '', alignItems: expandedRow === rowIndex ? 'start' : '' }}>
                                                <div className='d-flex align-items-center'>
                                                    {showView && <button className='small-primary-btn me-3' onClick={onViewClick}>Invoice<img src={DownloadIcon} width={20} style={{ objectFit: 'contain', marginLeft: 6 }} alt='download icon' /></button>}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>


                    </table>
                </div>
            </div >
        </>
    )
}

export default CustomTable;