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

//This loads the JavaScript variable containing the HTML for the "Welcome" page for Admin.html
function setAdminDefault()
{
  document.getElementById('Content').innerHTML=string_AdminDefault;
}

//This loads the JavaScript variable containing the HTML for the "Competition Setup" page for Admin.html
//It also sets the "Competition Setup" menu tab to show as selected and unclickable
function setCompetition()
{
  document.getElementById('Content').innerHTML=string_Setup;
  setNavClass("navComp");
  popProbSelectBox();
  clearInterval(progUpdate);
}

//This loads the JavaScript variable containing the HTML for the "Team Management" page for Admin.html
//It also sets the "Team Management" menu tab to show as selected and unclickable
function setManage()
{
  document.getElementById('Content').innerHTML=string_Manage;
  loadManage();
  setNavClass("navManage");
  clearInterval(progUpdate);
}

//This loads the JavaScript variable containing the HTML for the "Progress/Statistics" page for Admin.html
//It also sets the "Progress/Statistics" menu tab to show as selected and unclickable
function setProgress()
{
  document.getElementById('Content').innerHTML=string_ProgStat;
  progUpdate = setInterval(showTableProg, 1000);
  setNavClass("navProgress"); 
}

//This loads the JavaScript variable containing the HTML for the "Hints" page for Admin.html
//It also sets the "Hints" menu tab to show as selected and unclickable
function setHints()
{
  document.getElementById('Content').innerHTML=string_Hints;
  loadProblemNames();
  setNavClass("navHints");
  clearInterval(progUpdate);
  
}

