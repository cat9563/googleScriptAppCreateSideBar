function getWorksheetNames(){
  //ss = spreadsheet
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheets = ss.getSheets()

  const sheetNames = sheets.map(sheet => {
    return [sheet.getSheetName()]
  })

  return sheetNames
}

function deleteWorksheets(sheetNamesToDeleteAsString){
  const sheetNamesToDelete = JSON.parse(sheetNamesToDeleteAsString)
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheets = ss.getSheets()
  //gets name of worksheet then it checks if it is in the array and if it is we will keep that worksheet in our list
  const sheetsToDelete = sheets.filter(sheet => sheetNamesToDelete.includes(sheet.getSheetName()))

  //loops through the var sheetsToDelete and deletes. 
  sheetsToDelete.forEach(sheet =>{
    ss.deleteSheet(sheet)
  })
  
}

function Format_Sheet() {
  var spreadsheet = SpreadsheetApp.getActive();
  var row = 1;
  var col = 1;
  var value = SpreadsheetApp.getActiveSheet().getRange(row, col).getValue();
  if(value !== "Email"){
  spreadsheet.getRange('A:B').activate();
  spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());
  spreadsheet.getRange('C:X').activate();
  spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());
  spreadsheet.getRange('A:A').activate();
  spreadsheet.getActiveSheet().insertColumnsBefore(spreadsheet.getActiveRange().getColumn(), 1);
  spreadsheet.getActiveRange().offset(0, 0, spreadsheet.getActiveRange().getNumRows(), 1).activate();
  spreadsheet.getRange('A1').activate();
  spreadsheet.getCurrentCell().setValue('Email');
  spreadsheet.getRange('C:C').activate();
  spreadsheet.getActiveSheet().moveColumns(spreadsheet.getRange('C:C'), 2);
  spreadsheet.getRange('A2').activate();
  spreadsheet.getCurrentCell().setFormula('=REGEXREPLACE(c2, "(\\+(.*?)\\@)","@")');
  spreadsheet.getActiveRange().autoFillToNeighbor(SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
  spreadsheet.getRange('C:C').activate();
  spreadsheet.getActiveSheet().hideColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());
  spreadsheet.getRange('B:B').activate();
  }
};

function formatWorkSheets(sheetNamesToFormatAsString){
  //const sheetNamesToFormat = ["Sheet1"]
  const sheetNamesToFormat = JSON.parse(sheetNamesToFormatAsString)
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheets = ss.getSheets()
  const sheetsToFormat = sheets.filter(sheet => sheetNamesToFormat.includes(sheet.getSheetName()))

  //loops through the sheetsToFormat and formats them
  sheetsToFormat.forEach(sheet => {
    sheet.activate()
    Format_Sheet()
  })
}

