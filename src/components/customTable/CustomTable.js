import React, { useState } from 'react';
import './CustomTable.scss'
import DownloadIcon from '../../../src/assets/images/tableDownload.png'

function CustomTable({ data, headers, showActions, actionsHeaderText, onViewClick, expandedRow, showView, }) {

    return (
        <>
            <div className='custom-table-css'>
                <div style={{ overflowX: 'auto', padding: '0 0', width: window.innerWidth < 900 ? window.innerWidth - 30 : '' }}>
                    <table style={{ width:'max-content', borderCollapse: 'separate', borderSpacing: '0 25px' }} className='custom-table' cellSpacing="6" cellPadding="10">
                        <thead>
                            <tr className='table-head'>
                                {headers.map((header, index) => (
                                    <th className='table-header' key={index}>{header}</th>
                                ))}
                                {showActions &&
                                    <th className='table-header'>{actionsHeaderText || ''} </th>
                                }
                            </tr>
                        </thead>
                        <tbody className='table-body' >
                            {data.map((rowData, rowIndex) => (
                                <>
                                    <tr key={rowIndex} className='table-body-tr' style={{ position: 'relative' }}>
                                        {Object.entries(rowData).map(([key, value], colIndex) => {
                                            const classNames = {
                                                'Successful': 'table-green-class',
                                                'Pending': 'table-yellow-class',
                                                'Failed': 'table-red-class',
                                            };
                                            let className = '';
                                            if (headers[colIndex] === 'Status') {
                                                className = classNames[value];
                                            }
                                            if (headers[colIndex] === 'Order ID') {
                                                className = 'table-row-dark';
                                            }
                                            return (
                                                <td key={colIndex} className='table-row'>
                                                    <div className={className} style={{
                                                        display: expandedRow === rowIndex ? 'flex' : '',
                                                        alignItems: expandedRow === rowIndex ? 'start' : '',
                                                        height: window.innerWidth < 900 ? (expandedRow === rowIndex ? 250 : '') : (expandedRow === rowIndex ? 180 : '')
                                                    }}>
                                                        {value}
                                                    </div>
                                                </td>
                                            )
                                        })}
                                        {showActions && <td style={{ display: expandedRow === rowIndex ? 'flex' : '', alignItems: expandedRow === rowIndex ? 'start' : '', }}>
                                            <div className='d-flex align-items-center'>
                                                {showView && <button className='small-primary-btn me-3' onClick={() => onViewClick()}>Invoice<img src={DownloadIcon} width={20} style={{ objectFit: 'contain', marginLeft: 6 }} /></button>}
                                            </div>
                                        </td>
                                        }
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='paginationStyle'>
                    <div className='pageNostyle'>Page 1 of 10</div>
                    <div className='paginationBtnStyle'>
                        <div className='disableBtnStyle' style={{marginRight:16}}>Previous</div>
                        <div className='activeBtnStyle'>Next</div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default CustomTable;