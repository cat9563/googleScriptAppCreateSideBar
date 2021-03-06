function loadSidebar() {
  //hs = html service ho == html output
  const hs = HtmlService.createTemplateFromFile("sidebar")
  const ho = hs.evaluate()

  //display user interface in a sidebar using html output
  const ui = SpreadsheetApp.getUi()
  ui.showSidebar(ho)
}

// create a menu option to load sidebar

function createMenu() {
  const ui = SpreadsheetApp.getUi()
  const menu = ui.createMenu("Utilities")
  menu.addItem("Format Worksheets", "loadSidebar")
  menu.addToUi()
}

function onOpen(){
  createMenu()
}


