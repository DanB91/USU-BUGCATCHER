var compSelected;

function loadComps()
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlloadCompshttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlloadCompshttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xmlloadCompshttp.onreadystatechange=function()
  {
    if (xmlloadCompshttp.readyState == 4 && xmlloadCompshttp.status == 200)
    {
        document.getElementById('temp').innerHTML = xmlloadCompshttp.responseText;
        compSelected = "";
    }
  }
  
  xmlloadCompshttp.open("GET","loadAvailComps.php",true)
  xmlloadCompshttp.send();
}

function joinComp()
{
    //alert(compSelected);
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmljoinComphttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmljoinComphttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xmljoinComphttp.onreadystatechange=function()
  {
    if (xmljoinComphttp.readyState == 4 && xmljoinComphttp.status == 200)
    {
        var t = xmljoinComphttp.responseText.trim();
        //alert(t);
        if(t == '1')
        {
            var studTName = prompt("This competition has started please enter your team name.");
            while(studTName.search('"') < 0 && studTName.search("'") < 0 && studTName.search(' ') < 0)
            {
              studTName = prompt("Invalid input. Enter a different team name.");
            }
              if(studTName != null)
                  createSTeam(studTName);
        }
        else{
            window.location = "Student.html";
		}
    }
  }
  xmljoinComphttp.open("GET","joinComp.php?compS="+compSelected,true);
  xmljoinComphttp.send();
}

function createSTeam(tName)
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlcreateSTeamhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlcreateSTeamhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xmlcreateSTeamhttp.onreadystatechange=function()
  {
    if (xmlcreateSTeamhttp.readyState == 4 && xmlcreateSTeamhttp.status == 200)
    {
        var t = xmlcreateSTeamhttp.responseText.trim();
        //alert(t);
        if(t == '1')
        {
            //alert("2compID: "+compSelected);
            window.location = "Student.html";
        }
        else
        {
            alert("Team already exists");
        }
    }
  }
  mSetCookie('tName',tName,365);
  xmlcreateSTeamhttp.open("GET","createSTeam.php?compS=" + compSelected + "&tName=" + tName,true);
  xmlcreateSTeamhttp.send();
}
function mSetCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}
function showCompInfo(str)
{
   document.getElementById('displayInfo').value = "Comp id: " + str;
   compSelected = str;
}

function search()
{
    
}


