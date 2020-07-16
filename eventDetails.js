const spreadSheet = require("./spreadsheet.js");
const fileDetails = require('./file_id_secret.json');
const Promise = require('promise');
const mail = require("./sendMail.js");
const helper = require("./helper.js");

DetailsData = [];
todayDetails = [];
birthdayDetails = [];
weddingDetails = [];

async function getDetailsByDate(date, isTomorrow = false) {

  spreadSheet.accessSpreadsheetGetData(fileDetails.birthdayFileId)
    .then(function (data) {
      DetailsData = data;

      console.log(`step 1 : Get sheet data !!!`);
      return DetailsData;
    })
    .then(function (data) {
      console.log(`step 2 : getValidBirthdayDetails -- Executing !!!`);
      return getValidBirthdayDetails(data, date);
    })
    .then(spreadSheet.accessSpreadsheetGetData(fileDetails.weddingFileId)
      .then(function (data) {
        console.log(`step 2 : getValidWeddingDetails -- Executing !!!`);
        return getValidWeddingDetails(data, date);
      }))
    .then(function () {
      console.log(`step 3 : Data Filtering Started !!!`);
      console.log(`No of Valid Records found birthdays: ${birthdayDetails.length} and weddings : ${weddingDetails.length}`);
      if (!isTomorrow) {
        return GetTodayMailTemplate(date);
      }
      else {
        return GetTomorrowMailTemplate(date);
      }

    })
    .then(function (data) {
      console.log(`step 4 : Send Mail !!!`);
      mail.SendMail(data.subject, data.text);

      console.log(`step 4 : Send Mail Send successsfully !!!`);
    });

  return 'Mail has been send!!!';
};


async function getValidBirthdayDetails(data, date) {

  todayDetails = []; // intializing
  var tDate = date;
  var todayDay = tDate.getDate();
  var todayMonth = tDate.getMonth() + 1; //because months are from 0-11
  console.log(`Total No Of records : ${data.length}`)
  if (data.length > 0) {

    console.log(`getValidDetails-- Data processing -- Started -- Date ${todayDay} / ${todayMonth}`);
    data.forEach(x => {
      var parts = new Date(x.DOB)

      // console.log(`Today Day: ${todayDay} month : ${todayMonth}`);
      // console.log(`Part 0 Day: ${parts[0]} month : ${parts[1]}`);
      if (parts.getDate() == todayDay && (parts.getMonth() + 1) == todayMonth) {
        console.log(`Google sheet Date ---> ${parts}`)
        birthdayDetails.push(x);
      }
    });
    console.log(`getTodaysDetails-- Data processing -- Ended`);
  }
  else {
    console.log(`No data found`);
  }


  return birthdayDetails;
}
async function getValidWeddingDetails(data, date) {

  weddingDetails = []; // intializing
  var tDate = date;
  var todayDay = tDate.getDate();
  var todayMonth = tDate.getMonth() + 1; //because months are from 0-11
  console.log(`Total No Of records : ${data.length}`)
  if (data.length > 0) {

    console.log(`getValidDetails-- Data processing -- Started -- Date ${todayDay} / ${todayMonth}`);
    data.forEach(x => {
      var parts = new Date(x.DOB)

      // console.log(`Today Day: ${todayDay} month : ${todayMonth}`);
      // console.log(`Part 0 Day: ${parts[0]} month : ${parts[1]}`);
      if (parts.getDate() == todayDay && (parts.getMonth() + 1) == todayMonth) {
        console.log(`Google sheet Date ---> ${parts}`)
        weddingDetails.push(x);
      }
    });
    console.log(`getTodaysDetails-- Data processing -- Ended`);
  }
  else {
    console.log(`No data found`);
  }


  return weddingDetails;
}


async function GetTodayMailTemplate(tdate) {
  console.log(`GetMailTemplate --> Started for ${tdate}`)

  var message = [];

  var _htmlBody = "<body>";
  var subjectLine = "";
  var today = tdate;

  _htmlBody += '<div>';

  _htmlBody += "<br><br>";
  _htmlBody += "<div>-----------Whatsapp text-----------------</div>";
  _htmlBody += "<div><b>Today's Birthdays </b></div>";

  var displayNum = 0;
  birthdayDetails.forEach(x => {
    displayNum = displayNum + 1;
    _htmlBody += "<div>" + displayNum + ". " + x.Name + ", " + x.Unit + "</div>";
  })
  if (birthdayDetails.length <= 0) {
    _htmlBody += "<div>No Birthday's found by the <b>SYSTEM</b></div>";
    _htmlBody += "<br><br><br><br><br>";
  }

  _htmlBody += "<br><br>";
  _htmlBody += "<div>-----------Whatsapp text-----------------</div>";
  _htmlBody += "<div><b>Today's Anniversary </b></div>";
  displayNum = 0;
  weddingDetails.forEach(x => {
    displayNum = displayNum + 1;
    _htmlBody += "<div>" + displayNum + ". " + x.Name + ", " + x.Unit + "</div>";
  })
  if (weddingDetails.length <= 0) {
    _htmlBody += "<div>No Anniversaries found by the <b>SYSTEM</b></div>";
    _htmlBody += "<br><br><br><br><br>";
  }

  subjectLine += helper.getFormatedDate(today) + " Today's  Wishes!!!"

  _htmlBody += "<br>";
  _htmlBody += "<div>Thanks and Regards</div>";
  _htmlBody += "<div style ='font-size:large;'><b>Jensen Vembil</b></div>";
  _htmlBody += "<div><i>*Note this is an auto-generated mail</i></div>";
  _htmlBody += "</body>";

  console.log(_htmlBody);

  message = { "text": _htmlBody, "subject": subjectLine };

  console.log(`GetMailTemplate --> Ended`)
  return message;

}



async function GetTomorrowMailTemplate(tdate) {
  console.log(`GetMailTemplate --> Started for ${tdate}`)

  var message = [];
  var _htmlBody = "<body>";
  var subjectLine = "";
  var today = tdate;


  _htmlBody += '<div>';

  _htmlBody += "<br><br>";
  _htmlBody += "<div>-----------Whatsapp text-----------------</div>";
  _htmlBody += "<div><b>Tomorrow's Birthdays </b></div>";

  var displayNum = 0;
  birthdayDetails.forEach(x => {
    displayNum = displayNum + 1;
    _htmlBody += "<div>" + displayNum + ". " + x.Name + ", " + x.Unit + "</div>";
  });
  if (birthdayDetails.length <= 0) {
    _htmlBody += "<div>No Birthday's found by the <b>SYSTEM</b></div>";
    _htmlBody += "<br><br><br><br><br>";
  }

  _htmlBody += "<br><br>";
  _htmlBody += "<div>-----------Whatsapp text-----------------</div>";
  _htmlBody += "<div><b>Tomorrow's Anniversaries </b></div>";
  weddingDetails.forEach(x => {
    displayNum = displayNum + 1;
    _htmlBody += "<div>" + displayNum + ". " + x.Name + ", " + x.Unit + "</div>";
  });
  if (weddingDetails.length <= 0) {
    _htmlBody += "<div>No Anniversaries found by the <b>SYSTEM</b></div>";
    _htmlBody += "<br><br><br><br><br>";
  }

  displayNum = 0;
  weddingDetails.forEach(x => {
    displayNum = displayNum + 1;
    _htmlBody += "<div>" + displayNum + ". " + x.Name + ", " + x.Unit + "</div>";
  });


  subjectLine += helper.getFormatedDate(today) + " Tomorrow's  Wishes!!!"


  _htmlBody += "<br>";
  _htmlBody += "<div>Thanks and Regards</div>";
  _htmlBody += "<div style ='font-size:large;'><b>Jensen Vembil</b></div>";
  _htmlBody += "<div><i>*Note this is an auto-generated mail</i></div>";
  _htmlBody += "</body>";

  console.log(_htmlBody);

  message = { "text": _htmlBody, "subject": subjectLine };

  console.log(`GetMailTemplate --> Ended`)
  return message;

}





module.exports = {
  getDetailsByDate
}


//getDetailsByDate(new Date());

