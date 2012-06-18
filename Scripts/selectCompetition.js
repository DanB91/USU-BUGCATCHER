var compSelected;


//Pre-Conditions:
//Post-Conditions:
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
  
  xmlloadCompshttp.open("GET","adminLoadAvailComps.php",true)
  xmlloadCompshttp.send();
}

//Pre-Conditions:
//Post-Conditions:
function joinComp()
{
    //
    //
    //
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
       // alert(t);
        if(t == '1')
        {
            var studTName = prompt("This competition has started please enter your team name.");
            while(studTName.search('"') >= 0 || studTName.search("'") >= 0)
            {
              studTName = prompt("Team name contained invalid characters. Please enter a different team name.");
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

//Pre-Conditions:
//Post-Conditions:
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

//Pre-Conditions:
//Post-Conditions:
function mSetCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

//Pre-Conditions:
//Post-Conditions:
function getCompInfo()
{
  var loopCount = 1;
  var displayOutput = "";
            
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    getCompInfoXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    getCompInfoXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  getCompInfoXML.open("GET","StudentContent/studentCompInfo.php?compID="+compSelected+"&fileLine="+3,true)
  getCompInfoXML.send();
  
  getCompInfoXML.onreadystatechange=function()
  {
    if (getCompInfoXML.readyState == 4 && getCompInfoXML.status == 200)
    {
        switch(loopCount)
        {
          case 1:
            var mins = getCompInfoXML.responseText;
            displayOutput += "Competition ID: " + compSelected;
            displayOutput += "\n\nCompetition Length: " + mins + " mins\n";
            loopCount++;
            getCompInfoXML.open("GET","StudentContent/studentCompInfo.php?compID="+compSelected+"&fileLine="+0,true)
            getCompInfoXML.send();
            break;
          case 2:
            var probs = getCompInfoXML.responseText;
            displayOutput += "\nNumber of Problems: " + probs + "\n";
            loopCount++;
            getCompInfoXML.open("GET","StudentContent/studentCompInfo.php?compID="+compSelected+"&fileLine="+2,true)
            getCompInfoXML.send();
            break;
          case 3:
            var coverage = getCompInfoXML.responseText;
            if (coverage == 0)
            {
              coverage="No";
            }
            else
            {
              coverage="Yes";
            }
            displayOutput += "\nCode Coverage Allowed: " + coverage;
            document.getElementById('displayInfo').value = displayOutput;
            break;
          default:
            break;
        }
    }
  }
}

//Pre-Conditions:
//Post-Conditions:
function showCompInfo(str)
{
  compSelected = str;
  getCompInfo();
}

//Pre-Conditions:
//Post-Conditions:
function search()
{
}


