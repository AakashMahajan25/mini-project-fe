import React from 'react'
import CustomTable from '../../customTable/CustomTable'

function PaymentHistory() {

    const tableHeaders = ['Order ID', 'Reference ID', 'Payment Date', 'Plan', 'Amount', 'Status'];

    const userData = [
        {
            orderId: 'Invoice #010 - April 2023.pdf',
            referenceID: 'REF#39872565',
            paymentDate: 'April 1, 2024',
            plan: 'Beta (monthly)',
            amount: '$14',
            status: 'Successful'
        },
        {
            orderId: 'Invoice #010 - April 2023.pdf',
            referenceID: 'REF#39872565',
            paymentDate: 'April 1, 2024',
            plan: 'Beta (monthly)',
            amount: '$14',
            status: 'Failed'
        },
        {
            orderId: 'Invoice #010 - April 2023.pdf',
            referenceID: 'REF#39872565',
            paymentDate: 'April 1, 2024',
            plan: 'Beta (monthly)',
            amount: '$14',
            status: 'Pending'
        },
        {
            orderId: 'Invoice #010 - April 2023.pdf',
            referenceID: 'REF#39872565',
            paymentDate: 'April 1, 2024',
            plan: 'Beta (monthly)',
            amount: '$14',
            status: 'Successful'
        },
        {
            orderId: 'Invoice #010 - April 2023.pdf',
            referenceID: 'REF#39872565',
            paymentDate: 'April 1, 2024',
            plan: 'Beta (monthly)',
            amount: '$14',
            status: 'Successful'
        },
        {
            orderId: 'Invoice #010 - April 2023.pdf',
            referenceID: 'REF#39872565',
            paymentDate: 'April 1, 2024',
            plan: 'Beta (monthly)',
            amount: '$14',
            status: 'Successful'
        },
    ]

    const handleViewClick = () => {

        // let path = `/userlist`;
        // navigate(path);
    }
    return (
        <>
            <div style={{ marginBottom: 20 }} className='user-text'>Payment History</div>
            <CustomTable
                data={userData}
                headers={tableHeaders}
                actionsHeaderText=''
                showSearchBarButtons
                showActions
                showView
                onViewClick={handleViewClick}
            />
        </>
    )
}

export default PaymentHistory