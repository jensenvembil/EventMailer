
const creds = require('./gmail_secret.json');
const send  = require('gmail-send')(creds);


async function SendMail(subject,message){

    send({
        html: message,  
        subject: subject
      }, (error, result, fullResult) => {
        if (error) console.error(error);
        console.log(result);
      })

      console.log("Mail Send!!!");
}

module.exports = {
    SendMail
}


