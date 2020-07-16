const Promise = require('promise');
const eventDetails = require("./eventDetails.js");



async function SendMailByOption() {
    var tdate = new Date();
    tdate.setDate(tdate.getDate());

   
    var myArgs = process.argv.slice(2);

    switch (myArgs[0]) {
        case '1':
            console.log("getBirthdayDetailsByDate --> Today");
            await eventDetails.getDetailsByDate(tdate)
                .then(function (data) {
                    console.log(data);
                });
            break;
        case '2':
            tdate.setDate(tdate.getDate()+ 1);
            console.log("getBirthdayDetailsByDate---> Tomorrow : " +tdate);
            await eventDetails.getDetailsByDate(tdate,true)
                .then(function (data) {
                    console.log(data);
                });
            break;       
        default:
            console.log("not a valid option");

    }


    console.log(tdate);






}


SendMailByOption();