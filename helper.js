

const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];


function getFormatedDate(date){

let current_datetime = date;
let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()
console.log(formatted_date)
return formatted_date;
}

module.exports = {
    getFormatedDate
}

