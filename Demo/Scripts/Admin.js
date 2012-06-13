//###################################################################################################//
//                                         Global Variables                                          //
//###################################################################################################//

var MAX_STUDENT_ON_TEAM = 3;

//###################################################################################################//
//                                         Competition Setup                                         //
//###################################################################################################//


function startCompetition()
{

  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlstartCompetitionhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlstartCompetitionhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xmlstartCompetitionhttp.onreadystatechange=function()
  {
    if (xmlstartCompetitionhttp.readyState == 4 && xmlstartCompetitionhttp.status == 200)
    {
      //alert(xmlstartCompetitionhttp.responseText);
      countdown();
    }
  }
  
  xmlstartCompetitionhttp.open("GET","AdminCompContent/StartCompetition.php",true);
  xmlstartCompetitionhttp.send();

}

function loadCurrentComp()
{
	document.getElementById("LanguageSet").value = compSetLanguage;
  document.getElementById("ModeSet").value = compSetMode;
  document.getElementById("NumOfProblemsSet").value = compSetProblems;
  document.getElementById("AllowHintsSet").value = compSetHints;
  document.getElementById("CompTimeSet").value = compSetTime;
  document.getElementById("CompIDSet").value = compSetID;
}

function createCompetition()
{
  var setupXML;
  
	var Language = document.getElementById("Language");
  var Mode = document.getElementById("Mode");
  var NumProbs = document.getElementById("NumOfProblems");
  var Hints = document.getElementById("AllowHints");
  var Time = document.getElementById("CompTime");
  
  if (window.XMLHttpRequest)
  {
    setupXML = new XMLHttpRequest();
  }
  else
  {
    setupXML = new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  setupXML.onreadystatechange=function()
  {
    if (setupXML.readyState == 4 && setupXML.status == 200)
    {
      //if (setupXML.responseText.length == 8)
      //{
        compSetID = setupXML.responseText;
        document.getElementById("CompIDSet").value = setupXML.responseText;
        compSetLanguage = Language.options[Language.selectedIndex].text;
				document.getElementById("LanguageSet").value = Language.options[Language.selectedIndex].text;
				Language.value = 0;
				compSetMode = Mode.options[Mode.selectedIndex].text;
        document.getElementById("ModeSet").value = Mode.options[Mode.selectedIndex].text;
        Mode.value = 0;
        compSetProblems = NumProbs.value;
        document.getElementById("NumOfProblemsSet").value = NumProbs.value;
        NumProbs.value = 1;
        compSetHints = Hints.options[Hints.selectedIndex].text;
        document.getElementById("AllowHintsSet").value = Hints.options[Hints.selectedIndex].text;
        Hints.value = 1;
        compSetTime = Time.value;
        document.getElementById("CompTimeSet").value = Time.value;
        Time.value = '';
        //setCompCookies();
        setHintState();
        createTimer();
      //}
    }
  }
	var LangVal = Language.value;
  var ModeVal = Mode.value;
  var NumProbsVal = NumProbs.value;
  var HintsVal = Hints.value;
  var TimeVal = Time.value;
  
  var contents = "Language=" + LangVal + "&Mode=" + ModeVal + "&NumOfProblems=" + NumProbsVal + "&AllowHints=" + HintsVal + "&CompTime=" + TimeVal;
  
  /*var IETimeStamp = new Date().getTime();
  
  if (navigator.appName == "Microsoft Internet Explorer")
  {
    setupXML.open("GET","setupImpl.php?"+contents+"&"+IETimeStamp,true);
    setupXML.send();
  }
  else
  {
    setupXML.open("GET","setupImpl.php?"+contents+"&"+IETimeStamp,true);
    setupXML.send();
  }*/
  setupXML.open("GET","setupImpl.php?"+contents,true);
  setupXML.send();
}

function setCompCookies()
{
  if (window.XMLHttpRequest)
  {
    setCompCookiesXML = new XMLHttpRequest();
  }
  else
  {
    setCompCookiesXML = new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  setCompCookiesXML.onreadystatechange=function()
  {
    if (setCompCookiesXML.readyState == 4 && setCompCookiesXML.status == 200)
    {
    }
  }
  var ModeValue = Mode.value;
  var NumProbsValue = NumProbs.value;
  var HintsValue = Hints.value;
  var TimeValue = Time.value;
  
  var contents = "Mode=" + ModeValue + "&NumOfProblems=" + NumProbsValue + "&AllowHints=" + HintsValue + "&CompTime=" + TimeValue;
  
  setCompCookiesXML.open("GET","setCompCookies.php?"+contents,true);
  setCompCookiesXML.send();
}

//###################################################################################################//
//                                          Team Management                                          //
//###################################################################################################//
var currentStudent = '';
var teamN = '';

function setEditable(studNum)
{
	if(studNum == "Stud1")
	{
		document.getElementById("Stud1").value = "------Select a Name------";
		document.getElementById("Stud1").disabled = false;
        document.getElementById("remove1").disabled = true;
        document.getElementById("add1").disabled = false;
		document.getElementById("Username_S1").value = "N/A";
		document.getElementById("School_S1").value = "N/A";
		document.getElementById("State_S1").value = "N/A";
	}
	else if(studNum == "Stud2")
	{
		document.getElementById("Stud2").value = "------Select a Name------";
		document.getElementById("Stud2").disabled = false;
        document.getElementById("remove2").disabled = true;
        document.getElementById("add2").disabled = false;
		document.getElementById("Username_S2").value = "N/A";
		document.getElementById("School_S2").value = "N/A";
		document.getElementById("State_S2").value = "N/A";
	}
	else
	{
		document.getElementById("Stud3").value = "------Select a Name------";
		document.getElementById("Stud3").disabled = false;
        document.getElementById("remove3").disabled = true;
        document.getElementById("add3").disabled = false;
		document.getElementById("Username_S3").value = "N/A";
		document.getElementById("School_S3").value = "N/A";
		document.getElementById("State_S3").value = "N/A";
	}
}

function loadList()
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlLoadListhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlLoadListhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlLoadListhttp.onreadystatechange=function()
  {
    if (xmlLoadListhttp.readyState==4 && xmlLoadListhttp.status==200)
    {

        document.getElementById("MTeamList").innerHTML=xmlLoadListhttp.responseText;
    }
  }
  xmlLoadListhttp.open("GET","ManageContent/loadTeamNames.php",true);
  xmlLoadListhttp.send();
}

function loadManage()
{
  document.getElementById("remove1").disabled=true;
  document.getElementById("remove2").disabled=true;
  document.getElementById("remove3").disabled=true;
  loadList();
}

function addTeam()
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    addTeamXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    addTeamXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  addTeamXML.onreadystatechange=function()
  {
    if (addTeamXML.readyState == 4 && addTeamXML.status == 200)
    {
      document.getElementById("MTeamList").innerHTML=addTeamXML.responseText;
      document.getElementById("MTeamName").value='';
    }
  }
  
  var MTeamName = "MTeamName=" + document.getElementById("MTeamName").value;
  addTeamXML.open("GET","ManageContent/createTeam.php?"+MTeamName,true);
  addTeamXML.send();
}

function removeTeam()
{	
	if (teamN=="")
	{
		document.getElementById("MTeamTitle").inner.HTML="<p>Please select a team name.</p>";
		return;
	}
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		removeTeamXML=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		removeTeamXML=new ActiveXObject("Microsoft.XMLHTTP");
	}
	removeTeamXML.onreadystatechange=function()
	{
		if (removeTeamXML.readyState==4 && removeTeamXML.status==200)
		{
			loadList();
		}
		
	}
		removeTeamhttp.open("GET","ManageContent/removeTeam.php?"+"&team=" + teamN,true);
		removeTeamhttp.send();
}

/*

function showStudent(studNum, studentPos)
{
	alert(studNum + " " + studentPos);
	
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    showStudentXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    showStudentXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  showStudentXML.onreadystatechange=function()
  {
    if (showStudentXML.readyState==4 && showStudentXML.status==200)
    {

		document.getElementById("Member"+studentPos).innerHTML=showStudentXML.responseText;
		document.getElementById("Stud"+studentPos).disabled = false;
		document.getElementById("remove"+studentPos).disabled = true;
		document.getElementById("add"+studentPos).disabled = false;
		document.getElementById("Username_S"+studentPos).value = "N/A";
		document.getElementById("School_S"+studentPos).value = "N/A";
		document.getElementById("State_S"+studentPos).value = "N/A";
    }
  }
  
  var getVars = "q="+teamN+"&selectName="+studNum;
  showStudentXML.open("GET","ManageContent/loadStudentNames.php?"+getVars,true);
  showStudentXML.send();
}
*/

function showS1()
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    showS1XML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    showS1XML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  showS1XML.onreadystatechange=function()
  {
    if (showS1XML.readyState==4 && showS1XML.status==200)
    {
      document.getElementById("Member1").innerHTML=showS1XML.responseText;
      document.getElementById("Stud1").disabled = false;
      document.getElementById("remove1").disabled = true;
      document.getElementById("add1").disabled = false;
	  document.getElementById("Username_S1").value = "N/A";
	  document.getElementById("School_S1").value = "N/A";
	  document.getElementById("State_S1").value = "N/A";
    }
  }
  var getVars = "q="+teamN+"&selectName=Stud1";
  showS1XML.open("GET","ManageContent/loadStudentNames.php?"+getVars,true);
  showS1XML.send();
}

function showS2()
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    showS2XML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    showS2XML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  showS2XML.onreadystatechange=function()
  {
    if (showS2XML.readyState==4 && showS2XML.status==200)
    {
      document.getElementById("Member2").innerHTML=showS2XML.responseText;
      document.getElementById("Stud2").disabled = false;
      document.getElementById("remove2").disabled = true;
      document.getElementById("add2").disabled = false;
	  document.getElementById("Username_S2").value = "N/A";
	  document.getElementById("School_S2").value = "N/A";
	  document.getElementById("State_S2").value = "N/A";
    }
  }
  var getVars = "q="+teamN+"&selectName=Stud2";
  showS2XML.open("GET","ManageContent/loadStudentNames.php?"+getVars,true);
  showS2XML.send();
}

function showS3()
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    showS3XML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    showS3XML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  showS3XML.onreadystatechange=function()
  {
    if (showS3XML.readyState==4 && showS3XML.status==200)
    {
      document.getElementById("Member3").innerHTML=showS3XML.responseText;
      document.getElementById("Stud3").disabled = false;
      document.getElementById("remove3").disabled = true;
      document.getElementById("add3").disabled = false;
	  document.getElementById("Username_S3").value = "N/A";
	  document.getElementById("School_S3").value = "N/A";
	  document.getElementById("State_S3").value = "N/A";
    }
  }
  var getVars = "q="+teamN+"&selectName=Stud3";
  showS3XML.open("GET","ManageContent/loadStudentNames.php?"+getVars,true);
  showS3XML.send();
}

function loadNamesOfStudents(element)
{
  teamN = element.value;
  
  if (teamN=="")
  {
    //document.getElementById("txtHint").innerHTML="";
	//Note that TeamNameTitle was recently changed to MTeamTitle if this change causes any issues please revert.
    document.getElementById("MTeamTitle").innerHTML="<p>Please select a team name.</p>";
    return;
  }
  else
  {
    document.getElementById("MTeamTitle").innerHTML="Team "+teamN;
  }

	loadStudents();
}

function loadStudents()
{
  var studNum;
  var count = 1;
  var studentPos;
  
  if (teamN=="")
  {
	//document.getElementById("txtHint").innerHTML="";
	return;
  } 
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
	loadStudentsXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
	loadStudentsXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
	  loadStudentsXML.onreadystatechange=function()
	  {
		if (loadStudentsXML.readyState==4 && loadStudentsXML.status==200)
		{
		    if(count < 4)
			{
			  
					if(loadStudentsXML.responseText == '')
					{
						//showStudent(studNum, studentPos);
						switch(count)
						{
							case 1:
								showS1();
							break;
							case 2:
								showS2();
							break;
							case 3:
								showS3();
							break;
						}
						
						
						
					}
					else
					{
						
						getUserName(loadStudentsXML.responseText, studentPos);
						getSchool(loadStudentsXML.responseText, studentPos);
						getState(loadStudentsXML.responseText, studentPos);
						loadStudentFromTeam(loadStudentsXML.responseText, studNum);
						document.getElementById("remove"+studentPos).disabled = false;
						document.getElementById("add"+studentPos).disabled = true;
					}
					
			}
			count++;
			studNum = "Stud" + count;
			studentPos = studNum.charAt(studNum.length - 1);
			var getVars = "q="+teamN+"&studName="+studNum;
			loadStudentsXML.open("GET","ManageContent/getFullStudentName.php?"+getVars,true);
			loadStudentsXML.send();
			
		}
	  }
	  
	  studNum = "Stud" + count;
	  studentPos = studNum.charAt(studNum.length - 1);
	  var getVars = "q="+teamN+"&studName="+studNum;
	  loadStudentsXML.open("GET","ManageContent/getFullStudentName.php?"+getVars,true);
	  loadStudentsXML.send();
}

function loadStudentFromTeam(studentName, studNum)
{

	switch(studNum)
	{
		case 'Stud1':
			member = 'Member1';
			break;
		case 'Stud2':
			member = 'Member2';
			break;
		case 'Stud3':
			member = 'Member3';
			break;
		default:
			alert("Error from loadStudentFromTeam in admin.js");
			
	}

  if (teamN=="")
  {
	//document.getElementById("txtHint").innerHTML="";
	return;
  } 
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
	loadStudent1FromTeamXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
	loadStudent1FromTeamXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  loadStudent1FromTeamXML.onreadystatechange=function()
  {
	if (loadStudent1FromTeamXML.readyState==4 && loadStudent1FromTeamXML.status==200)
	{
			document.getElementById(member).innerHTML=loadStudent1FromTeamXML.responseText;
			document.getElementById(studNum).disabled = true;
	}
  }
  var getVars = "q="+studentName+"&studName="+studNum;
  loadStudent1FromTeamXML.open("GET","ManageContent/studentNameLoad.php?"+getVars,true);
  loadStudent1FromTeamXML.send();

}

function Refresh()
{
  showS1();
  showS2();
  showS3();
}

function refreshTeamInfo(element)
{
  if (teamN=="")
  {
    //document.getElementById("txtHint").innerHTML="";
    document.getElementById("MTeamTitle").innerHTML="<p>Please select a team name.</p>";
    return;
  }
  else
  {
    document.getElementById("MTeamTitle").innerHTML="Team "+teamN;
  } 
    
      if (element.id == "Stud1")
      {
        //document.Member1.innerHTML=xmlRefreshhttp.responseText;
        document.getElementById("Stud1").disabled=true;
        document.getElementById("add1").disabled=true;
        document.getElementById("remove1").disabled=false;
        if (document.getElementById("Stud2").disabled == false)
        {
          refreshStud2();
		  document.getElementById("Username_S2").value = "N/A";
		  document.getElementById("School_S2").value = "N/A";
		  document.getElementById("State_S2").value = "N/A";
        }
        if (document.getElementById("Stud3").disabled == false)
        {
          refreshStud3();
		  document.getElementById("Username_S3").value = "N/A";
		  document.getElementById("School_S3").value = "N/A";
		  document.getElementById("State_S3").value = "N/A";
        }
      }
      else if (element.id == "Stud2")
      {
        //document.Member2.innerHTML=xmlRefreshhttp.responseText;
        document.getElementById("Stud2").disabled=true;
        document.getElementById("add2").disabled=true;
        document.getElementById("remove2").disabled=false;
        if (document.getElementById("Stud1").disabled == false)
        {
          refreshStud1();
		  document.getElementById("Username_S1").value = "N/A";
		  document.getElementById("School_S1").value = "N/A";
		  document.getElementById("State_S1").value = "N/A";
        }
        if (document.getElementById("Stud3").disabled == false)
        {
          refreshStud3();
		  document.getElementById("Username_S3").value = "N/A";
		  document.getElementById("School_S3").value = "N/A";
		  document.getElementById("State_S3").value = "N/A";
        }
      }
      else if (element.id == "Stud3")
      {
        //document.Member3.innerHTML=xmlRefreshhttp.responseText;
        document.getElementById("Stud3").disabled=true;
        document.getElementById("add3").disabled=true;
        document.getElementById("remove3").disabled=false;
        if (document.getElementById("Stud1").disabled == false)
        {
          refreshStud1();
		  document.getElementById("Username_S1").value = "N/A";
		  document.getElementById("School_S1").value = "N/A";
		  document.getElementById("State_S1").value = "N/A";
        }
        if (document.getElementById("Stud2").disabled == false)
        {
          refreshStud2();
		  document.getElementById("Username_S2").value = "N/A";
		  document.getElementById("School_S2").value = "N/A";
		  document.getElementById("State_S2").value = "N/A";
        }
      }

}

function refreshStud1()
{
	if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
      refreshStud1NameXML=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
      refreshStud1NameXML=new ActiveXObject("Microsoft.XMLHTTP");
    }
    refreshStud1NameXML.onreadystatechange=function()
    {
      if (refreshStud1NameXML.readyState==4 && refreshStud1NameXML.status==200)
      {
			document.getElementById("Member1").innerHTML=refreshStud1NameXML.responseText;
      }
    }
    var getVars = "q="+teamN+"&selectName=Stud1";
	refreshStud1NameXML.open("GET","ManageContent/loadStudentNames.php?" +getVars,true);
	refreshStud1NameXML.send();
}

function refreshStud2()
{
	if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
      refreshStud2NameXML=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
      refreshStud2NameXML=new ActiveXObject("Microsoft.XMLHTTP");
    }
    refreshStud2NameXML.onreadystatechange=function()
    {
      if (refreshStud2NameXML.readyState==4 && refreshStud2NameXML.status==200)
      {
			document.getElementById("Member2").innerHTML=refreshStud2NameXML.responseText;
      }
    }
    var getVars = "q="+teamN+"&selectName=Stud2";
	refreshStud2NameXML.open("GET","ManageContent/loadStudentNames.php?" +getVars,true);
	refreshStud2NameXML.send();
}

function refreshStud3()
{
	if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
      refreshStud3NameXML=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
      refreshStud3NameXML=new ActiveXObject("Microsoft.XMLHTTP");
    }
    refreshStud3NameXML.onreadystatechange=function()
    {
      if (refreshStud3NameXML.readyState==4 && refreshStud3NameXML.status==200)
      {
			document.getElementById("Member3").innerHTML=refreshStud3NameXML.responseText;
      }
    }
    var getVars = "q="+teamN+"&selectName=Stud3";
	refreshStud3NameXML.open("GET","ManageContent/loadStudentNames.php?" +getVars,true);
	refreshStud3NameXML.send();
}

function currentSelection(element, currentStud)
{
  currentStudent = element.value;
  studentPos = currentStud.charAt(currentStud.length - 1);

  getUserName(currentStudent, studentPos);
  getSchool(currentStudent, studentPos);
  getState(currentStudent, studentPos);
}

function getUserName(student, studentPos)
{

	if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
      getUserNameXML=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
      getUserNameXML=new ActiveXObject("Microsoft.XMLHTTP");
    }
    getUserNameXML.onreadystatechange=function()
    {
      if (getUserNameXML.readyState==4 && getUserNameXML.status==200)
      {
			document.getElementById("Username_S"+studentPos).value=getUserNameXML.responseText;
	
      }
    }
    getUserNameXML.open("GET","ManageContent/getStudentUserName.php?currStudent="+student,true);
    getUserNameXML.send();
}

function getSchool(student, studentPos)
{
	if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
      getSchoolXML=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
      getSchoolXML=new ActiveXObject("Microsoft.XMLHTTP");
    }
    getSchoolXML.onreadystatechange=function()
    {
      if (getSchoolXML.readyState==4 && getSchoolXML.status==200)
      {
			document.getElementById("School_S"+studentPos).value=getSchoolXML.responseText;
      }
    }
    getSchoolXML.open("GET","ManageContent/getStudentSchool.php?currStudent="+student,true);
    getSchoolXML.send();
}

function getState(student, studentPos)
{
if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
      getStateXML=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
      getStateXML=new ActiveXObject("Microsoft.XMLHTTP");
    }
    getStateXML.onreadystatechange=function()
    {
      if (getStateXML.readyState==4 && getStateXML.status==200)
      {		
			document.getElementById("State_S"+studentPos).value=getStateXML.responseText;
      }
    }
    getStateXML.open("GET","ManageContent/getStudentState.php?currStudent="+student,true);
    getStateXML.send();
}

function modifyStudent(userN, user)
{

  var selectElement = document.getElementById(user);
  var selectUser = document.getElementById(userN).value;
  var selectStud = user;
  var removeSelected;

  if(selectStud == "Stud1")
		removeSelected = "remove1";
  else if(selectStud == "Stud2")
		removeSelected = "remove2";
  else
		removeSelected = "remove3";

  if(document.getElementById(removeSelected).disabled)
  {
	  if(currentStudent == "------Select a Name------" || currentStudent == '')
	  {
		alert("That is not a valid selection");
	  }
	  else
	  {
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlModifyStudenthttp=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		  xmlModifyStudenthttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlModifyStudenthttp.onreadystatechange=function()
		{
		  if (xmlModifyStudenthttp.readyState==4 && xmlModifyStudenthttp.status==200)
		  {
			//alert(xmlModifyStudenthttp.responseText);
			refreshTeamInfo(selectElement);
		  }
		}
		
		xmlModifyStudenthttp.open("GET","ManageContent/placeStudentOnTeam.php?userN="+selectUser + "&team=" + teamN + "&studNum="+selectStud,true);
		xmlModifyStudenthttp.send();
		currentStudent='------Select a Name------';
		
	  }
  }
  else
  {
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlModifyStudenthttp=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		  xmlModifyStudenthttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlModifyStudenthttp.onreadystatechange=function()
		{
		  if (xmlModifyStudenthttp.readyState==4 && xmlModifyStudenthttp.status==200)
		  {
			refreshTeamInfo(selectElement);
			setEditable(selectStud);
		  }
		}

		xmlModifyStudenthttp.open("GET","ManageContent/removeStudentFromTeam.php?userN="+selectUser + "&team=" + teamN + "&studNum="+selectStud,true);
		xmlModifyStudenthttp.send();
		currentStudent='------Select a Name------';
	
  }
	
}

//###################################################################################################//
//                                        Progress/Statistics                                        //
//###################################################################################################//
function showTableProg()
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      document.getElementById("PTeamTables").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","ProgressContent/progressImpl.php",true);
  xmlhttp.send();
}

//###################################################################################################//
//                                               Hints                                               //
//###################################################################################################//

var hintsEnabled;

function setHintState()
{
	//alert("recieving now");
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    setHintStateXml=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    setHintStateXml=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  setHintStateXml.onreadystatechange=function()
  {
    if (setHintStateXml.readyState==4 && setHintStateXml.status==200)
    {
       if(setHintStateXml.responseText != "SET")
	   {
			hintsEnabled = false;
			// alert("Hints: " + setHintStateXml.responseText);
			// document.getElementById("SendPreDef").disabled = true;
			// document.getElementById("SendCustom").disabled = true;
			// document.getElementById("CustomHint").disabled = true;
			// document.getElementById("HHintNum").disabled = true;
			// document.getElementById("hintCountClear").disabled = true;
	   }
	   else
		hintsEnabled = true;
    }
  }
  setHintStateXml.open("GET","HintsContent/hintsState.php",true);
  setHintStateXml.send();
}

function showTableHints()
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      document.getElementById("tableHints").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","HintsContent/hintsImpl.php",true);
  xmlhttp.send();
}

function sendHintsCust(str)
{
  if(hintsEnabled)
  {
	  if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	  }
	  else
	  {// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  xmlhttp.onreadystatechange=function()
	  {
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
		  document.getElementById("CustomHint").value='';
		}
	  }
	  
	  //var Hints = document.getElementById("customHint").value;

	  xmlhttp.open("GET","HintsContent/sendCustom.php?customHint="+str,true);
	  xmlhttp.send();
	}
	else
		document.getElementById("CustomHint").value="Hints have been disabled. Please create a competition with hints enabled";
}


var currProblemSelected = '';

function showPre(str)
{
	
  currProblemSelected = str;
	

  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    showPreXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    showPreXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  showPreXML.onreadystatechange=function()
  {
    if (showPreXML.readyState==4 && showPreXML.status==200)
    {
      document.getElementById("HintNum").innerHTML=showPreXML.responseText;
    }
  }

  showPreXML.open("GET","HintsContent/showPreDefHints.php?hintPreDef="+str,true);
  showPreXML.send();
  
}

var lastHintSelected = '';

function showPreHintText(str)
{

	  lastHintSelected = str;
	  if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
		showPreTextXML=new XMLHttpRequest();
	  }
	  else
	  {// code for IE6, IE5
		showPreTextXML=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  showPreTextXML.onreadystatechange=function()
	  {
		if (showPreTextXML.readyState==4 && showPreTextXML.status==200)
		{

				document.getElementById("HintText").innerHTML=showPreTextXML.responseText;
		   
		}
	  }

	  showPreTextXML.open("GET","HintsContent/showPreDefHintText.php?problemSelected="+currProblemSelected + "&hintSlected=" + str,true);
	  showPreTextXML.send();

}


function sendHintPreDef()
{

	if(hintsEnabled)
	{
	  if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlsendHintPreDefhttp=new XMLHttpRequest();
	  }
	  else
	  {// code for IE6, IE5
		xmlsendHintPreDefhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }

	   xmlsendHintPreDefhttp.onreadystatechange=function()
	  {
		if (xmlsendHintPreDefhttp.readyState==4 && xmlsendHintPreDefhttp.status==200)
		{
		  document.getElementById("HintText").innerHTML=xmlsendHintPreDefhttp.responseText;
		  //document.getElementById("HintText").innerHTML=xmlsendHintPreDefhttp.responseText;
		   
		}
	  }
	  
	  xmlsendHintPreDefhttp.open("GET","HintsContent/sendPre.php?problemSelected="+currProblemSelected + "&hintSlected=" + lastHintSelected,true);
	  xmlsendHintPreDefhttp.send();
	 
	}
	else
		document.getElementById("HintText").innerHTML="<p>Hints have been disabled. Please create a competition with hints enabled</p>";
}

//###################################################################################################//
//                                               Other Scripts                                              //
//###################################################################################################//

function setupCompetition()
{
	startCompetition();
	startTimer();
}

//User Status Check
///////////////////////////////////////////////////////////////////////////////////////
function AdminLoadCheck()
{
	//checkActiveCompetition()
	getActiveCompetition();
	setInterval(checkUserStatus,1000);
}

function checkUserStatus()
{
	//alert("It's working");
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		checkUsersXML=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		checkUsersXML=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	
	
	checkUsersXML.onreadystatechange=function()
	{
		if (checkUsersXML.readyState==4 && checkUsersXML.status==200)
		{
		}
	}
	checkUsersXML.open("GET","UserCheck.php",true);
	checkUsersXML.send();
}

function getActiveCompetition()
{
	var var_count = 1;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		activeCompXML=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		activeCompXML=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	
	activeCompXML.onreadystatechange=function()
	{
		if (activeCompXML.readyState==4 && activeCompXML.status==200)
		{
			switch(var_count)
			{
        case 1:
					compSetID = activeCompXML.responseText;
					if (compSetID.length == 8)
					{
            getMasterTime();
          }
          else
          {
            compSetID = '';
            var_count = 7;
          }
					break;
				case 2:
					compSetMode = activeCompXML.responseText;
					break;
				case 3:
					compSetProblems = activeCompXML.responseText;
					break;
				case 4:
					compSetHints = activeCompXML.responseText;
					break;
				case 5:
					compSetTime = activeCompXML.responseText;
					break;
				case 6:
					compSetLanguage = activeCompXML.responseText;
					break;
			}
			var_count++;
			if (var_count < 7)
			{
        activeCompXML.open("GET","getCompInfo.php?varNum="+var_count,true);
        activeCompXML.send();
      }
		}
	}
	activeCompXML.open("GET","getCompInfo.php?varNum="+var_count,true);
	activeCompXML.send();
}

function getMasterTime()
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		getTimerXML=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		getTimerXML=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	getTimerXML.onreadystatechange=function()
	{
		if (getTimerXML.readyState==4 && getTimerXML.status==200)
		{
			var time = getTimerXML.responseText;
			  if (time.length > 3)
			  {
				  s = time.substring(time.length-2,time.length);
				  m = time.substring(0,time.length-2);
				  document.getElementById("header-timer").innerHTML=m+":"+s;
			  }
			  else
			  {
				  //A competition has not been created.
			  }
		}
	}
	getTimerXML.open("GET","AdminCompContent/getMasterTime.php?compID="+compSetID,true);
	getTimerXML.send();
}