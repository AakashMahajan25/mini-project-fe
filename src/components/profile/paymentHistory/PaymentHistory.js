import React, { useEffect, useState } from 'react'
import CustomTable from '../../customTable/CustomTable'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { getUserOrderHistory } from '../../../screens/profile/usersSlice';
import Loader from '../../loader/Loader';

function PaymentHistory() {
    const dispatch = useDispatch();
    const tableHeaders = ['Order ID', 'Transaction Reference ID', 'Payment Date', 'Plan', 'Amount', 'Status'];
    const [userData, setUserData] = useState([])

    const { orderHistory, isLoading } = useSelector(state => state.userSlice)

    // const userData = [
    //     {
    //         orderId: 'Invoice #010 - April 2023.pdf',
    //         referenceID: 'REF#39872565',
    //         paymentDate: 'April 1, 2024',
    //         plan: 'Beta (monthly)',
    //         amount: '$14',
    //         status: 'Successful'
    //     },
    //     {
    //         orderId: 'Invoice #010 - April 2023.pdf',
    //         referenceID: 'REF#39872565',
    //         paymentDate: 'April 1, 2024',
    //         plan: 'Beta (monthly)',
    //         amount: '$14',
    //         status: 'Failed'
    //     },
    //     {
    //         orderId: 'Invoice #010 - April 2023.pdf',
    //         referenceID: 'REF#39872565',
    //         paymentDate: 'April 1, 2024',
    //         plan: 'Beta (monthly)',
    //         amount: '$14',
    //         status: 'Pending'
    //     },
    //     {
    //         orderId: 'Invoice #010 - April 2023.pdf',
    //         referenceID: 'REF#39872565',
    //         paymentDate: 'April 1, 2024',
    //         plan: 'Beta (monthly)',
    //         amount: '$14',
    //         status: 'Successful'
    //     },
    //     {
    //         orderId: 'Invoice #010 - April 2023.pdf',
    //         referenceID: 'REF#39872565',
    //         paymentDate: 'April 1, 2024',
    //         plan: 'Beta (monthly)',
    //         amount: '$14',
    //         status: 'Successful'
    //     },
    //     {
    //         orderId: 'Invoice #010 - April 2023.pdf',
    //         referenceID: 'REF#39872565',
    //         paymentDate: 'April 1, 2024',
    //         plan: 'Beta (monthly)',
    //         amount: '$14',
    //         status: 'Successful'
    //     },
    // ]

    useEffect(() => {
        if (orderHistory?.rows?.length > 0) {
            const data = [];
            orderHistory?.rows?.map(order => {
                data.push({
                    orderId: `#${order?.order_id}`,
                    referenceID: order?.payment_status === 'pending' ? order?.razorpay_order_id : order?.razorpay_payment_id,
                    paymentDate: moment(order?.createdAt).format('MMMM D, YYYY'),
                    plan: order?.plan_name,
                    amount: order?.plan_price ? '₹' + order?.plan_price : null,
                    status: order?.payment_status
                })
            })
            setUserData(data)
        }
    }, [orderHistory])

    const onNextClick = () => {
        if (orderHistory?.currentPage === orderHistory?.totalPages)
            return;
        dispatch(getUserOrderHistory(`?page=${orderHistory?.currentPage + 1}`))
    }

    const onPreviousClick = () => {
        if (orderHistory?.currentPage === 1)
            return;
        dispatch(getUserOrderHistory(`?page=${orderHistory?.currentPage - 1}`))
    }

    const handleViewClick = () => {

        // let path = `/userlist`;
        // navigate(path);
    }
    return (
        <>
            {/* {
                isLoading &&
                <Loader />
            } */}
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
            {
                orderHistory?.totalPages > 1 &&
                <div className='paginationStyle'>
                    <div className='pageNostyle'>Page {orderHistory?.currentPage
                    } of {orderHistory?.totalPages}</div>
                    <div className='paginationBtnStyle'>
                        <div className={orderHistory?.currentPage === 1 ? 'disableBtnStyle' : 'activeBtnStyle'} onClick={onPreviousClick} style={{ marginRight: 16 }}>Previous</div>
                        <div className={orderHistory?.currentPage === orderHistory?.totalPages ? 'disableBtnStyle' : 'activeBtnStyle'} onClick={onNextClick}>Next</div>
                    </div>
                </div>
            }
        </>
    )
}

export default PaymentHistory