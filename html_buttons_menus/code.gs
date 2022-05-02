// Shows a UI box on main settings screen
function showUiBox(){
  SpreadsheetApp.getUi().createMenu("Fruit Settings")
  .addItem("Add Fruit", "addFruit")
  .addToUi();
}

// Function to open the html modal
function addFruit(){
  var ui = SpreadsheetApp.getUi();
  var html = HtmlService.createTemplateFromFile("fruitHTML").evaluate();
  var title = "Adding Fruit Menu";

  ui.showModalDialog(html, title);
}

// Adds the fruit and colour to the spreadsheet
function new_fruit_and_colour(fruit, colour){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lr = sheet.getLastRow()+1;

  sheet.getRange(lr, 1).setValue(fruit);
  sheet.getRange(lr, 2).setValue(colour);
}