 const { GoogleSpreadsheet } = require('google-spreadsheet');
 const { promisify } = require('util');

 const creds = require('./client_secret.json');


 async function accessSpreadsheetGetData(fileId){    
     try {
         console.log('Stepped into access spreadsheet function with ID :'+fileId);
       
        //const doc2wedding = new GoogleSpreadsheet('');

        const doc= new GoogleSpreadsheet(fileId);

         await doc.useServiceAccountAuth(creds);


            
        //await promisify(doc.useServiceAccountAuth)(creds);
       
        const info = await doc.loadInfo();
       const sheet=  doc.sheetsByIndex[0]

       
        console.log('Sheet title: '+ sheet.title);
        console.log('Row counts: '+ sheet.rowCount);
      
        const rows = await sheet.getRows();     

        
        return rows;


     } catch (error) {
         console.log(error);
     }
 }


module.exports= {
    accessSpreadsheetGetData
}

//accessSpreadsheetGetData();

 


