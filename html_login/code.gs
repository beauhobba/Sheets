function MD5 (input) {
  var rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, input);
  var txtHash = '';
  for (i = 0; i < rawHash.length; i++) {
    var hashVal = rawHash[i];
    if (hashVal < 0) {
      hashVal += 256;
    }
    if (hashVal.toString(16).length == 1) {
      txtHash += '0';
    }
    txtHash += hashVal.toString(16);
  }
  return txtHash;
};



function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Logins");
  var length = ss.getLastRow();
  var width = ss.getLastColumn(); 


  if(e.parameter.password && e.parameter.username){

      var hash = MD5(e.parameter.password);

      var hashes = ss.getRange(1, 1, length).getValues();
      var data = [];

      for(let i = 1; i < length; i++){
        if(hash == hashes[i]){
          data = (ss.getRange(i+1, 2, 1, width).getValues())[0]; 
          username = data[0];
          currency = data[1];
          if(username == e.parameter.username){
            var html = HtmlService.createTemplateFromFile('index');
            html.dataFromServerTemplate = { name: username, money: currency };
            return html.evaluate()
          }else{
            return ContentService.createTextOutput(JSON.stringify({"data": "Incorrect Username"}))

          }

        }

      }
      return ContentService.createTextOutput(JSON.stringify({"data": "Incorrect Password"}))
  }
  return ContentService.createTextOutput(JSON.stringify({"data": "Incorrect. Please supply username and password"}))
}

     