//Variable to store the interval information for updating the information in the competition's "Progress & Statistics" table
var progUpdate;

//
function setSetup()
{
  insertHTML(0);
}

//
function setSelection()
{
  insertHTML(1);
}

//
function setManage()
{
  insertHTML(2);
}

//
function setProgress()
{
  insertHTML(3);
}

//
function setHints()
{
  insertHTML(4);
}

//
function setUpload()
{
	insertHTML(5);
}

//
function setTesting()
{
  insertHTML(6);
}
function viewCurrentComp()
{
  insertHTML(7);
}
//This gets the HTML code that needs to inserted via element.innerHTML
function insertHTML(tabValue)
{
    document.getElementById("navTabs-Competition").setAttribute("class","navTabs-subMenu-hidden");
    document.getElementById("navTabs-Competition").setAttribute("className","navTabs-subMenu-hidden");
    document.getElementById("navTabs-Problems").setAttribute("class","navTabs-subMenu-hidden");
    document.getElementById("navTabs-Problems").setAttribute("className","navTabs-subMenu-hidden");

  var filePath = "";
  switch(tabValue)
  {
    case 0:
      filePath = "CompetitionSetup.html";
      break;
		case 1:
			filePath = "selectComp.html";
			break;
    case 2:
      filePath = "TeamManagement.html";
      break;
    case 3:
      filePath = "ProgressStatistics.html";
      break;
    case 4:
      filePath = "Hints.html";
      break;
    case 5:
            filePath = "ProblemUpload.html";
            break;
    case 6:
      filePath = "CustomProblemTesting.html";
      break;
    case 7:
      filePath = "currentCompInformation.html";
      break;
    default:
  }
  
$.ajax({type: "GET", url:"InsertHTML.php", data: "filePath="+filePath, success:function(result){
      $('#Content').html(result);
      switch(tabValue)
      {
        case 0:
          popProbSelectBox();
          clearInterval(progUpdate);
					clearInterval(t3);
          addedProbs = [];
          break;
        case 1:
                        CS_loadAdminComps();
          clearInterval(progUpdate);
					clearInterval(t3);
          break;
        case 2:
          loadManage();
          clearInterval(progUpdate);
          break;
        case 3:
          progUpdate = setInterval(showTableProg, 1000);
            clearInterval(t3);
          break;
        case 4:
          loadProblemNames();
          clearInterval(progUpdate);
					clearInterval(t3);
          break;
        case 5:
		hideOnLoad();
                clearInterval(progUpdate);
                clearInterval(t3);
                break;
        case 6:
                clearInterval(progUpdate);
                getCustomProblems();
                t3 = setInterval(receive,1000);
                break;
        case 7:
            CS_loadSelectedAdminCompsA();
            CS_loadSelectedAdminCompsB();
            clearInterval(progUpdate);
					clearInterval(t3);
          break;
        default:
          return;
      }
        document.getElementById("navTabs-Competition").setAttribute("class","navTabs-subMenu-visible");
        document.getElementById("navTabs-Competition").setAttribute("className","navTabs-subMenu-visible");
        document.getElementById("navTabs-Problems").setAttribute("class","navTabs-subMenu-visible");
        document.getElementById("navTabs-Problems").setAttribute("className","navTabs-subMenu-visible");
}});
}

