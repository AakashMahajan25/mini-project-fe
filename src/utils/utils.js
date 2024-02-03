import moment from 'moment';

export const trimText = (text, maxLength) => {
    if (text?.length <= maxLength) {
        return text;
    } else {
        return text?.substring(0, maxLength) + '...';
    }
}

export const formatTimeAgo = (dateString) => {
    const now = moment();
    const date = moment(dateString);

    // Check if the date is in the previous day
    if (now.diff(date, 'days') > 0) {
        return date.format('YYYY-MM-DD'); // Display actual date
    }

    // Return time difference in "hours ago" format
    const hoursAgo = now.diff(date, 'hours');
    return `${hoursAgo} ${hoursAgo === 1 ? 'Hr ago' : 'Hrs ago'}`;
}



