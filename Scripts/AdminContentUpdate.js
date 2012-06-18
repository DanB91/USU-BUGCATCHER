//Variable to store the interval information for updating the information in the competition's "Progress & Statistics" table
var progUpdate;

//Changes the HTML Class of the navigation items based on whether they are selected or not
function setNavClass(selectedTab)
{
  document.getElementById("navComp").setAttribute("class","navNormal");
  document.getElementById("navComp").setAttribute("className","navNormal");
  document.getElementById("navManage").setAttribute("class","navNormal");
  document.getElementById("navManage").setAttribute("className","navNormal");
  document.getElementById("navProgress").setAttribute("class","navNormal");
  document.getElementById("navProgress").setAttribute("className","navNormal");
  document.getElementById("navHints").setAttribute("class","navNormal");
  document.getElementById("navHints").setAttribute("className","navNormal");
  document.getElementById(selectedTab).setAttribute("class","navAlt");
  document.getElementById(selectedTab).setAttribute("className","navAlt");
}

//This loads the JavaScript variable containing the HTML for the "Competition Setup" page for Admin.html
//It also sets the "Competition Setup" menu tab to show as selected and unclickable
function setCompetition()
{
  insertHTML(0);
}

//This loads the JavaScript variable containing the HTML for the "Team Management" page for Admin.html
//It also sets the "Team Management" menu tab to show as selected and unclickable
function setManage()
{
  insertHTML(1);
}

//This loads the JavaScript variable containing the HTML for the "Progress/Statistics" page for Admin.html
//It also sets the "Progress/Statistics" menu tab to show as selected and unclickable
function setProgress()
{
  insertHTML(2);
}

//This loads the JavaScript variable containing the HTML for the "Hints" page for Admin.html
//It also sets the "Hints" menu tab to show as selected and unclickable
function setHints()
{
  insertHTML(3); 
}
function selectCompetition()
{
  insertHTML(4); 
}
//This gets the HTML code that needs to inserted via element.innerHTML
function insertHTML(tabValue)
{
  var filePath = "";
  switch(tabValue)
  {
    case 0:
      filePath = "CompetitionSetup.html";
      break;
    case 1:
      filePath = "TeamManagement.html";
      break;
    case 2:
      filePath = "ProgressStatistics.html";
      break;
    case 3:
      filePath = "Hints.html";
      break;
    case 4:
      filePath = "selectComp.php";
      break;
    default:
  }/*
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    InsertHTMLhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    InsertHTMLhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  InsertHTMLhttp.onreadystatechange=function()
  {
    if (InsertHTMLhttp.readyState == 4 && InsertHTMLhttp.status == 200)
    {*/
$.ajax({type: "GET", url:"InsertHTML.php", data: "filePath="+filePath, success:function(result){
      $('#Content').html(result);
      switch(tabValue)
      {
        case 0:
          //setNavClass("navComp");
          popProbSelectBox();
          clearInterval(progUpdate);
          addedProbs = [];
          break;
        case 1:
          //setNavClass("navManage");
          loadManage();
          clearInterval(progUpdate);
          break;
        case 2:
          progUpdate = setInterval(showTableProg, 1000);
          //setNavClass("navProgress"); 
          break;
        case 3:
          loadProblemNames();
          //setNavClass("navHints");
          clearInterval(progUpdate); 
          break;
        default:
          return;
      }
}});
      /*
    }
  }
  
  InsertHTMLhttp.open("GET","InsertHTML.php?filePath="+filePath,true);
  InsertHTMLhttp.send();*/
}

