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

export const capitalizeFirstLetter = (inputString) =>{
    if (inputString?.length === 0) {
      return inputString; // Return the input string unchanged if it's empty
    }
  
    const firstLetter = inputString[0].toUpperCase();
    const restOfString = inputString.slice(1);
  
    return firstLetter + restOfString;
}

export const replaceNewlinesWithBr = (text) => {
    // Use a regular expression to replace newline characters with <br> tags
    return text.replace(/\n/g, '</br>');
}

export const replaceQuestionMarkWithMetrix = (text) => {
  // Use a regular expression to replace all occurrences of '?' with 'Metrics'
  return text.replace(/<td>([\?\-]?)<\/td>/g, '<td><b>Metrics</b></td>');
}

export const replaceSpaceWithUnderscore = (text) => {
    // Use a regular expression to replace newline characters with <br> tags
    return text.replace(/ /g, '_');
}


export const formatPrice = (price, country) => {
    if (country === 'IND') {
        return '₹ ' + price; // Rupee symbol for India
    } else if (country === 'US') {
        return '$ ' + price; // Dollar symbol for US
    } else {
      return price; // No specific formatting for other countries
    }
  }

  export function getCurrentTimeWithAMPM(time) {
    return moment(time).format('hh:mm A');
}