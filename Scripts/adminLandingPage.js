var compSelected;

function CS_loadSelectedAdminCompsA()
{

  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    CSloadSelectedCompshttp_A=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    CSloadSelectedCompshttp_A=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  CSloadSelectedCompshttp_A.onreadystatechange=function()
  {
    if (CSloadSelectedCompshttp_A.readyState == 4 && CSloadSelectedCompshttp_A.status == 200)
    {
        
        document.getElementById('displayloadAdminCompInfo_A').innerHTML = CSloadSelectedCompshttp_A.responseText;
        compSelected = "";
    }
  }
  
  CSloadSelectedCompshttp_A.open("GET","adminLoadCompInfo_A.php",true)
  CSloadSelectedCompshttp_A.send();
}
function CS_loadSelectedAdminCompsB()
{

  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    CSloadSelectedCompshttp_B=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    CSloadSelectedCompshttp_B=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  CSloadSelectedCompshttp_B.onreadystatechange=function()
  {
    if (CSloadSelectedCompshttp_B.readyState == 4 && CSloadSelectedCompshttp_B.status == 200)
    {
        
        document.getElementById('displayloadAdminCompInfo_B').innerHTML = CSloadSelectedCompshttp_B.responseText;
        compSelected = "";
    }
  }
  
  CSloadSelectedCompshttp_B.open("GET","adminLoadCompInfo_B.php",true)
  CSloadSelectedCompshttp_B.send();
}
//Pre-Conditions:
//Post-Conditions:
function CS_loadAdminComps()
{

  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    CSloadCompshttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    CSloadCompshttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  CSloadCompshttp.onreadystatechange=function()
  {
    if (CSloadCompshttp.readyState == 4 && CSloadCompshttp.status == 200)
    {
        
        document.getElementById('CompetitionSelection').innerHTML = CSloadCompshttp.responseText;
        compSelected = "";
    }
  }
  
  CSloadCompshttp.open("GET","adminLoadAvailComps.php",true)
  CSloadCompshttp.send();
}

//Pre-Conditions:
//Post-Conditions:
function CS_joinComp(){
    if(compSelected == ""){
        alert("Please select a competition");
    }
    else{
        if (window.XMLHttpRequest){CSSelectloadCompshttp=new XMLHttpRequest();}
        else{CSSelectloadCompshttp=new ActiveXObject("Microsoft.XMLHTTP");}
        CSSelectloadCompshttp.onreadystatechange=function(){
            if (CSSelectloadCompshttp.readyState == 4 && CSSelectloadCompshttp.status == 200){
                document.getElementById('CScontrol').innerHTML = CSSelectloadCompshttp.responseText;
                compSelected = "";
            }
        }
        CSSelectloadCompshttp.open("GET","adminLoadAvailCompSelect.php?compID="+compSelected,true);
        CSSelectloadCompshttp.send();  
        alert("You now control this compeitiion");
        
    }
}

//Pre-Conditions:
//Post-Conditions:
function CS_createSTeam(tName)
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
function CS_mSetCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

//Pre-Conditions:
//Post-Conditions:
function CS_getCompInfo()
{
   if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    CSloadCompshttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    CSloadCompshttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  CSloadCompshttp.onreadystatechange=function()
  {
    if (CSloadCompshttp.readyState == 4 && CSloadCompshttp.status == 200)
    {
        document.getElementById('CScontrol').innerHTML ="";
        document.getElementById('displayAdminCompInfo').innerHTML = CSloadCompshttp.responseText;
        
    }
  }
  
  CSloadCompshttp.open("GET","adminLoadAvailCompsPreview.php?compID="+compSelected,true)
  CSloadCompshttp.send();
  
}

//Pre-Conditions:
//Post-Conditions:
function CS_showCompAInfo(str)
{
  compSelected = str;
  CS_getCompInfo();
}

//Pre-Conditions:
//Post-Conditions:
function CS_search()
{
}


