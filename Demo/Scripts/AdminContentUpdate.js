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
  /*
  if (selectedTab == "Comp")
  {
    document.getElementById("navComp").className=navAlt;
  }
  else if (selectedTab == "Manage")
  {
    document.getElementById("navManage").className=navAlt;
  }
  else if (selectedTab == "Progress")
  {
    document.getElementById("navProgress").className=navAlt;
  }
  else if (selectedTab == "Hints")
  {
    document.getElementById("navHints").className=navAlt;
  }*/
}

var progUpdate;

function setAdminDefault()
{
  document.getElementById('Content').innerHTML=string_AdminDefault;
}

function setCompetition()
{
  document.getElementById('Content').innerHTML=string_Setup;
  loadCurrentComp();
  setNavClass("navComp");
  clearInterval(progUpdate);
}

function setManage()
{
  document.getElementById('Content').innerHTML=string_Manage;
  loadManage();
  setNavClass("navManage");
  clearInterval(progUpdate);
}

function setProgress()
{
  document.getElementById('Content').innerHTML=string_ProgStat;
  progUpdate = setInterval(showTableProg, 1000);
  setNavClass("navProgress");
  
}

function setHints()
{
  document.getElementById('Content').innerHTML=string_Hints;
  setNavClass("navHints");
  clearInterval(progUpdate);
}