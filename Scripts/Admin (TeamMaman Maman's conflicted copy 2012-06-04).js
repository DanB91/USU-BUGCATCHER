/*
Table of Contents
	1.Global Variables    ---------- GV1000
		1.1 teamN			  	---------- GV1001
		1.2 MAX_STUDENT_ON_TEAM ---------- GV1002
		1.3 currentStudent      ---------- GV1003
		1.4 hintsEnabled        ---------- GV1004
		1.5 currProblemSelected ---------- GV1005
		1.6 lastHintSelected    ---------- GV1006
	2.Competition Setup   ---------- CS1000
		2.1 startCompetition    ---------- CS1001
		2.2 setupCompetition    ---------- CS1002
		2.3 popProbSelectBox	---------- CS1003
		2.4 addProb				---------- CS1004
		2.5 removeProb			---------- CS1005
		2.6 updateAvailBox		---------- CS1006
		2.7 updateAddedBox		---------- CS1007
		2.8 showProbPreview		---------- CS1008
		2.9 moveProbUp			---------- CS1009
		2.10 moveProbDown		---------- CS1010
                2.11 createCompetition          ---------- CS1011
	3.Team Management     ---------- TM1000
		3.1 setEditable          ---------- TM1001
		3.2 loadTeamNameList     ---------- TM1002
		3.3 loadManage           ---------- TM1003
		3.4 addTeam              ---------- TM1004
		3.5 removeTeam           ---------- TM1005
		3.6 showStudents         ---------- TM1006
		3.7 loadStudentInfo      ---------- TM1007
		3.8 loadStudName         ---------- TM1008
		3.9 refreshTeamInfo      ---------- TM1009
		3.10 currentSelection    ---------- TM1010
		3.11 getUserName         ---------- TM1011
		3.12 getSchool           ---------- TM1012
		3.13 getState            ---------- TM1013
		3.14 addRemoveStudent    ---------- TM1014
	4.Progress/Statistics ---------- PS1000
		4.1 showTableProg        ---------- PS1001
	5.Hints               ---------- H1000
		5.1 setHintState         ---------- H1001
		5.2 sendHintsCust        ---------- H1002
		5.3 showPre				 ---------- H1003
		5.4	showPreHintText		 ---------- H1004
		5.5	sendHintPreDef		 ---------- H1005
		5.6	loadProblemNames     ---------- H1006
	6.User Status Check   ---------- USC1000
		6.1	AdminLoadCheck 	     ---------- USC1001
		6.2	getMasterTime	     ---------- USC1002

*/



//###################################################################################################//
//                                         Global Variables GV1000                                   //
//###################################################################################################//

var teamN = ''; 			 //Find Code ---------- GV1001

//Team Management Gloabal Variables
var MAX_STUDENT_ON_TEAM = 3; //Find Code ---------- GV1002
var currentStudent = '';	 //Find Code ---------- GV1003

//Hints Global Variables
var hintsEnabled;			 //Find Code ---------- GV1004
var currProblemSelected = '';//Find Code ---------- GV1005
var lastHintSelected = '';	 //Find Code ---------- GV1006

var availableProbs;
var addedProbs = [];

var compSetTimeS;
var compSetTimeM
var compSetTime;

//###################################################################################################//
//                                         Competition Setup CS1000                                  //
//###################################################################################################//

//This function is called when setupCompetition is called which is located in this file
//Precondition: Competition must exist
//Postcondition: Starts the competition
function startCompetition() //Find Code ---------- CS1001
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
        //Need to write a new countdown function
        document.getElementById('header-controls').innerHTML = '<img src="Images/pause.gif" height="50" width="50" onclick=pauseTimer(); />';
        startTimer();
    }
  }
  //Don't start competition until the countdown timer reaches zero.
  while (
  xmlstartCompetitionhttp.open("GET","AdminCompContent/StartCompetition.php",true));
  xmlstartCompetitionhttp.send();

}


function refreshProbList()
{
    
      var content = '<select name="ProblemsList" id="ProblemsListGet" class="Cselect" size="8" onchange="showProbPreview(ProblemsListGet.value)">';
      
      for(var i = 0; i < availableProbs.length; i++)
      {
        //if(availableProbs[i] != "." && availableProbs[i] != ".." && availableProbs[i] != "index.html")
               content += "<option onDblClick='addProb(this.value)'>" + availableProbs[i] + "</option>";   
      }
      content += '</select>';
    
     document.getElementById('ProblemsList').innerHTML = content;
     
       content = '<select name="SelectedProblems" id="SelectedProblemsGet" class="Cselect"  size="5" onchange="showProbPreview(SelectedProblemsGet.value)">';
      
      for(i = 0; i < addedProbs.length; i++)
      {
             content += "<option onDblClick='removeProb(this.value)'>" + addedProbs[i] + "</option>";   
      }
      content += '</select>';
    
     document.getElementById('SelectedProblems').innerHTML = content;
}


//This function is referenced in AdminContentUpdate.js
//Precondition: Page is accessed
//Postcondition: Sets up files and does initial loading of problems available
function popProbSelectBox()//Find Code ---------- CS1003
{

  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlpopulateProbSelectBox=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlpopulateProbSelectBox=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xmlpopulateProbSelectBox.onreadystatechange=function()
  {
    if (xmlpopulateProbSelectBox.readyState == 4 && xmlpopulateProbSelectBox.status == 200)
    {
      availableProbs = eval(xmlpopulateProbSelectBox.responseText);
      var index = availableProbs.indexOf(".");
          availableProbs.splice(index, 1);
          index = availableProbs.indexOf("..");
          availableProbs.splice(index, 1);
          index = availableProbs.indexOf("index.html");
          availableProbs.splice(index, 1);
       
       document.getElementById('rBut').disabled = true;
       document.getElementById('CMoveUp').disabled = true;
       document.getElementById('CMoveDown').disabled = true;
       refreshProbList();   
    }
  }
  xmlpopulateProbSelectBox.open("GET","AdminCompContent/loadProblems.php",true);
  xmlpopulateProbSelectBox.send();
}

//This function is referenced in page.html
//Precondition: Problems are available to add
//Postcondition: Adds the problem to the added box(selected problems) and removes it from the available box(available problems)
function addProb(problem)//Find Code ---------- CS1004
{
  if(addedProbs.length == 5)
  {
      document.getElementById('CSetupError').innerHTML = "You cannot have more than 5 problems in a competition.";
      return;
  }
  
  if(problem == '')
  {
      return;
  }
  
  var index = availableProbs.indexOf(problem);
  availableProbs.splice(index, 1);
  addedProbs.push(problem);
  refreshProbList();
  
  if(addedProbs.length > 0)
       document.getElementById('rBut').disabled = false;
  
  if(addedProbs.length > 1)
  {
      document.getElementById('CMoveUp').disabled = false;
      document.getElementById('CMoveDown').disabled = false;
  }
  
  if(availableProbs.length == 0)
       document.getElementById('aBut').disabled = true;

}

//This function is referenced in page.html
//Precondition: Problems are available to remove
//Postcondition: Removes the problem to the added box(Selected problems) and adds to the available box(available problems)
function removeProb(problem)//Find Code ---------- CS1005
{
  var index = addedProbs.indexOf(problem);
  addedProbs.splice(index, 1);
  availableProbs.push(problem);
  refreshProbList();
  
  if(addedProbs.length == 0)
       document.getElementById('rBut').disabled = true;
   
  if(addedProbs.length < 2)
  {
      document.getElementById('CMoveUp').disabled = true;
      document.getElementById('CMoveDown').disabled = true;
  }
  
  if(availableProbs.length > 0)
       document.getElementById('aBut').disabled = false;
   
}


//This function is referenced in load updateAddedBox.php
//Precondition: A problem must be available in the added box(selected problems) and problem content file must exist i.e. problemName.txt
//Postcondition:Shows a preview of the problem currently selected
function showProbPreview(problem)//Find Code ---------- CS1008
{
  if(problem == '')
	return;
	
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlshowPreview=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlshowPreview=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xmlshowPreview.onreadystatechange=function()
  {
    if (xmlshowPreview.readyState == 4 && xmlshowPreview.status == 200)
    {
		document.getElementById('CTextArea').value=xmlshowPreview.responseText;
		
    }
  }
  xmlshowPreview.open("GET","AdminCompContent/showPreview.php?problem=" + problem,true);
  xmlshowPreview.send();
	
}

function moveProbUp(problem)//Find Code ---------- CS1009
{
   var index = addedProbs.indexOf(problem);
   if(index == 0)
       return;
   addedProbs[index] = addedProbs[index - 1];
   addedProbs[index - 1] = problem;
   refreshProbList();   
}

function moveProbDown(problem)//Find Code ---------- CS1010
{
   var index = addedProbs.indexOf(problem);
   if(index == addedProbs.length - 1)
       return;
   addedProbs[index] = addedProbs[index + 1];
   addedProbs[index + 1] = problem;
   refreshProbList();
}

function createCompetition()//Find Code ---------- CS1011
{

  //STOPPED = true;
  
  var setupXML;
  var CodeCov = document.forms.CompForm.AllowCoverage;
  var inclCD = document.forms.CompForm.IncludeCountdown;
  var Time = document.getElementById("CompTime");
  var CountdownVal;
  
//  if(inclCD[0].checked == true)
//      CountdownVal = 1;
//  else
//      CountdownVal = 0; 
      
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
                       
        
        //compSetHints = Hints.options[Hints.selectedIndex].text;
        //Hints.value = 1;
		compSetTimeM = Time.value;
                compSetTime = Time.value;
        if (CountdownVal)
        	compSetTimeS = 10;
        else 
        	compSetTimeS = 0;
        Time.value = '';
        //setCompCookies();
        createTimer();
        document.getElementById('adminCompID').innerHTML = "<p>" + "Competition ID: " +setupXML.responseText + "</p>";
      //}

    }
    
  }
  
   
  if(CodeCov[0].checked == true)
      CodeCovVal = 1;
  else
      CodeCovVal = 0;

  if(inclCD[0].checked == true)
      CountdownVal = 1;
  else
      CountdownVal = 0;
  
  var TimeVal = Time.value;
  var length = addedProbs.length;
  
  
  if(length <= 0)
  {
    document.getElementById('CSetupError').innerHTML = "You must select at least one problem before you can setup a competition.";
    return;
  }
       
  if(isNaN(TimeVal))
  {
    document.getElementById('CSetupError').innerHTML = "You must enter a valid number for time(mins) before you can setup a competition.";
    return;    
  }
  
  if(TimeVal <= 0)
  {
     document.getElementById('CSetupError').innerHTML = "You must enter a valid number for time(mins) before you can setup a competition.";
     return;
  }
 
  if(TimeVal > 1000)
  {
    document.getElementById('CSetupError').innerHTML = "The competition time must be less than 1000 minutes.";
    return;
  }
  
  
  
  var contents = "CompTime=" + TimeVal + "&numProbs=" + length + "&problems[]=" + addedProbs + "&codeCov=" + CodeCovVal + "&newTeamIDm='" + document.getElementById("CompNameID").value + "'&inclCD=" + CountdownVal;
  
//  for(var i = 0; i < length; i++)
//  {
//      temp = addedProbs[i];
//      contents += "&Prob" + (i + 1) + "=" + temp;
//  }
 
 
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
    PAUSE = false;   
    pauseTimer();
    document.getElementById('header-timer').innerHTML=TimeVal +":00";
  setupXML.open("GET","setupImpl.php?"+contents,true);
  setupXML.send();

}



//###################################################################################################//
//                                          Team Management TM1000                                   //
//###################################################################################################//

//This function is called when a student is removed from a team
//Precondition: studPos, Stud1, Stud2, ..., is a valid student position
//Postcondition: Username, school, and state are set to N/A,
//the student name is set to it's default, and the add button is enabled.
function setEditable(studPos)//Find Code ---------- TM1001
{

	var studentPosNum = studPos.charAt(studPos.length - 1);
    
	document.getElementById("Stud"+studentPosNum).value = "------Select a Name------";
	document.getElementById("Stud"+studentPosNum).disabled = false;
	document.getElementById("remove"+studentPosNum).disabled = true;
	document.getElementById("add"+studentPosNum).disabled = false;
	document.getElementById("Username_S"+studentPosNum).value = "N/A";
	document.getElementById("School_S"+studentPosNum).value = "N/A";
	document.getElementById("State_S"+studentPosNum).value = "N/A";
	
}

//Precondition: Compeition must exist
//Postcondition: Produces a list of team names based on the current competition
//which can found under select a team in Team Management.
function loadTeamNameList()//Find Code ---------- TM1002
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlloadTeamNameListhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlloadTeamNameListhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlloadTeamNameListhttp.onreadystatechange=function()
  {
    if (xmlloadTeamNameListhttp.readyState==4 && xmlloadTeamNameListhttp.status==200)
    {

        document.getElementById("MTeamList").innerHTML=xmlloadTeamNameListhttp.responseText;
    }
  }
  xmlloadTeamNameListhttp.open("GET","ManageContent/loadTeamNames.php",true);
  xmlloadTeamNameListhttp.send();
}

//This function is referenced in AdminContentUpdate.js
//Precondition: None
//Postcondition: Sets up the Team Management page
function loadManage()//Find Code ---------- TM1003
{
  document.getElementById("remove1").disabled=true;
  document.getElementById("remove2").disabled=true;
  document.getElementById("remove3").disabled=true;
  loadTeamNameList();
}

//This function is referenced in Content_Manage.js
//Precondition: Compeition must exist and team name must be unique
//Postcondition: Creates a team based on the name entered
function addTeam()//Find Code ---------- TM1004
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

//This function is currently not being used
//Precondition: Team exists
//Postcondition: Students on the team are removed and the team
//is removed from the current compeition.
function removeTeam()//Find Code ---------- TM1005
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
			loadTeamNameList();
		}
		
	}
		removeTeamhttp.open("GET","ManageContent/removeTeam.php?"+"&team=" + teamN,true);
		removeTeamhttp.send();
}

//This function is called when there is no student in a position on a team
//Precondition: Student posisition number must be valid 1,2,3,...
//Postcondition: Loads all the students that are in the database and are currently not on a team.
function showStudents(studentPosNum)//Find Code ---------- TM1006
{

  var showStudentsXML = new Array();//Since this function is called multiple times in a row we must create a different XMLHttpRequest we call the function so we don't overwrite the previous calls.

  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    showStudentsXML[studentPosNum]=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    showStudentsXML[studentPosNum]=new ActiveXObject("Microsoft.XMLHTTP");
  }
  showStudentsXML[studentPosNum].onreadystatechange=function()
  {
    if (showStudentsXML[studentPosNum].readyState==4 && showStudentsXML[studentPosNum].status==200)
    {
      document.getElementById("Member"+studentPosNum).innerHTML=showStudentsXML[studentPosNum].responseText;
      document.getElementById("Stud"+studentPosNum).disabled = false;
      document.getElementById("remove"+studentPosNum).disabled = true;
      document.getElementById("add"+studentPosNum).disabled = false;
	  document.getElementById("Username_S"+studentPosNum).value = "N/A";
	  document.getElementById("School_S"+studentPosNum).value = "N/A";
	  document.getElementById("State_S"+studentPosNum).value = "N/A";
    }
  }
  var getVars = "q="+teamN+"&selectName=Stud"+studentPosNum;
  showStudentsXML[studentPosNum].open("GET","ManageContent/loadStudentNames.php?"+getVars,true);
  showStudentsXML[studentPosNum].send();

}

//This function is called when a team name is clicked.
//This function is referenced in loadTeamNames.php and createTeam.php
//Precondition: The team name of the selection must be passed
//Postcondition: The student's name, username, school, and state are returned and placed in the appropriate element on the team management page
function loadStudentInfo(element)//Find Code ---------- TM1007
{

  teamN = element.value;
  
  if (teamN=="")//If no team is currently selected
  {
    document.getElementById("MTeamTitle").innerHTML="<p>Please select a team name.</p>";
    return;
  }
  else
  {
    document.getElementById("MTeamTitle").innerHTML="Team "+teamN;//Places the team name below the Team Information heading in Team Management
  }
	
  var studPos;
  var studentPosNum = 1;
  
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
		    if(studentPosNum <= MAX_STUDENT_ON_TEAM)
			{
			  
					if(loadStudentsXML.responseText == '')
					{
						switch(studentPosNum)
						{
							case 1:
								showStudents(studentPosNum);
							break;
							case 2:
								showStudents(studentPosNum);
							break;
							case 3:
								showStudents(studentPosNum);
							break;
						}

					}
					else
					{
						//alert(studentPosNum + " " + loadStudentsXML.responseText);
					
						
						loadStudName(loadStudentsXML.responseText, studPos);
						getUserName(loadStudentsXML.responseText, studentPosNum);
						getSchool(loadStudentsXML.responseText, studentPosNum);
						getState(loadStudentsXML.responseText, studentPosNum);
						document.getElementById("remove"+studentPosNum).disabled = false;
						document.getElementById("add"+studentPosNum).disabled = true;
					}
					
				studentPosNum++;
				studPos = "Stud" + studentPosNum;
				var getVars = "q="+teamN+"&studName="+studPos;
				loadStudentsXML.open("GET","ManageContent/getFullStudentName.php?"+getVars,true);
				loadStudentsXML.send();
			}
			
			
		}
	  }
	  
	  studPos = "Stud" + studentPosNum;
	  var getVars = "q="+teamN+"&studName="+studPos;
	  loadStudentsXML.open("GET","ManageContent/getFullStudentName.php?"+getVars,true);
	  loadStudentsXML.send();
}

//This function is called when a team is selected
//and has students on the team.
//Precondition: Student position, Stud1, Stud2, ..., must be valid and a team must be selected
//Postcondition: Student name is placed in an option which is then disabled
//for viewing purposes.
function loadStudName(studentName, studPos)//Find Code ---------- TM1008
{

	switch(studPos)
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
			alert("Error from loadStudName in admin.js");
			
	}

  if (teamN=="")
  {
	//document.getElementById("txtHint").innerHTML="";
	return;
  } 
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
	loadStudNameXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
	loadStudNameXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  loadStudNameXML.onreadystatechange=function()
  {
	if (loadStudNameXML.readyState==4 && loadStudNameXML.status==200)
	{
			document.getElementById(member).innerHTML=loadStudNameXML.responseText;
			document.getElementById(studPos).disabled = true;
	}
  }
  var getVars = "q="+studentName+"&studName="+studPos;
  loadStudNameXML.open("GET","ManageContent/studentNameLoad.php?"+getVars,true);
  loadStudNameXML.send();

}

//This function is called when a student is either added or removed from a team.
//Precondition: Student position must be provided such as Stud1, Stud2, etc
//Postcondition: Refreshes the other students provided that there are no students in the team slots
function refreshTeamInfo(element)//Find Code ---------- TM1009
{
  if (teamN=="")
  {
    document.getElementById("MTeamTitle").innerHTML="<p>Please select a team name.</p>";
    return;
  }
  else
  {
    document.getElementById("MTeamTitle").innerHTML="Team "+teamN;
  } 
      
	if(document.getElementById("Stud1").disabled == false)
	{
	  showStudents(1);
	}
	if (document.getElementById("Stud2").disabled == false)
	{
	  showStudents(2);
	}
	if (document.getElementById("Stud3").disabled == false)
	{
	  showStudents(3);
	}
}
//This function is referenced in loadStudentNames.php and studentNameLoad.php
//Precondition: The student's name must be passed as well as the currentStudPosition such as stud1, stud2, etc.
//Postcondition: Calls the appropriate functions to display the student's username, school, and state.
function currentSelection(element, currentStudPos)//Find Code ---------- TM1010
{
  currentStudent = element.value;
  studentPos = currentStudPos.charAt(currentStudPos.length - 1);

  getUserName(currentStudent, studentPos);
  getSchool(currentStudent, studentPos);
  getState(currentStudent, studentPos);
}

//This function is called when a team has a student in a given position.
//Precondition: Student name in the form lastName, firstName must be provided as well as the students position number such as 1, 2, 3...
//Postcondition: Places the student's username in the correct field on the Team Management page
function getUserName(student, studentPosNum)//Find Code ---------- TM1011
{
	var userN;
	var getUserNameXML = new Array();//Since this function is called multiple times in a row we must create a different XMLHttpRequest we call the function so we don't overwrite the previous calls.
	
	if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
      getUserNameXML[studentPosNum]=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
      getUserNameXML[studentPosNum]=new ActiveXObject("Microsoft.XMLHTTP");
    }
    getUserNameXML[studentPosNum].onreadystatechange=function()
    {
      if (getUserNameXML[studentPosNum].readyState==4 && getUserNameXML[studentPosNum].status==200)
      {
			document.getElementById("Username_S"+studentPosNum).value=getUserNameXML[studentPosNum].responseText;

      }
    }
	
	getUserNameXML[studentPosNum].open("GET","ManageContent/getStudentUserName.php?currStudent="+student,true);
    getUserNameXML[studentPosNum].send();
}

//This function is called when a team has a student in a given position.
//Precondition: Student name in the form lastName, firstName must be provided as well as the students position number such as 1, 2, 3...
//Postcondition: Places the student's school in the correct field on the Team Management page
function getSchool(student, studentPosNum)//Find Code ---------- TM1012
{

	var getSchoolXML = new Array();//Since this function is called multiple times in a row we must create a different XMLHttpRequest we call the function so we don't overwrite the previous calls.
	
	if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
      getSchoolXML[studentPosNum]=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
      getSchoolXML[studentPosNum]=new ActiveXObject("Microsoft.XMLHTTP");
    }
    getSchoolXML[studentPosNum].onreadystatechange=function()
    {
      if (getSchoolXML[studentPosNum].readyState==4 && getSchoolXML[studentPosNum].status==200)
      {
			document.getElementById("School_S"+studentPosNum).value=getSchoolXML[studentPosNum].responseText;
      }
    }
    getSchoolXML[studentPosNum].open("GET","ManageContent/getStudentSchool.php?currStudent="+student,true);
    getSchoolXML[studentPosNum].send();
}

//This function is called when a team has a student in a given position.
//Precondition: Student name in the form lastName, firstName must be provided as well as the students position number such as 1, 2, 3...
//Postcondition: Places the student's state in the correct field on the Team Management page
function getState(student, studentPosNum)//Find Code ---------- TM1013
{

	var getStateXML = new Array();//Since this function is called multiple times in a row we must create a different XMLHttpRequest we call the function so we don't overwrite the previous calls.

	if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
      getStateXML[studentPosNum]=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
      getStateXML[studentPosNum]=new ActiveXObject("Microsoft.XMLHTTP");
    }
    getStateXML[studentPosNum].onreadystatechange=function()
    {
      if (getStateXML[studentPosNum].readyState==4 && getStateXML[studentPosNum].status==200)
      {		
			document.getElementById("State_S"+studentPosNum).value=getStateXML[studentPosNum].responseText;
      }
    }
    getStateXML[studentPosNum].open("GET","ManageContent/getStudentState.php?currStudent="+student,true);
    getStateXML[studentPosNum].send();
}

//This function is referenced in Content_Manage.js
//Precondition: Valid username and student position must be provided.
//Postcondition: Student is either added or removed from a team.
function addRemoveStudent(userN, studPos)//Find Code ---------- TM1014
{

  var selectElement = document.getElementById(studPos);
  var selectUser = document.getElementById(userN).value;
  var selectStud = studPos;
  var removeSelected;
  var addSelected;
  var studentPosNum;
  var xmladdRemoveStudenthttp = new Array();//Since this function is called multiple times in a row we must create a different XMLHttpRequest we call the function so we don't overwrite the previous calls.
  
  if(selectStud == "Stud1")
  {
		removeSelected = "remove1";
		addSelected = "add1";
		studentPosNum = 1;
  }
  else if(selectStud == "Stud2")
  {
		removeSelected = "remove2";
		addSelected = "add2";
		studentPosNum = 2;
  }
  else
  {
		removeSelected = "remove3";
		addSelected = "add3";
		studentPosNum = 3;
  }

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
		  xmladdRemoveStudenthttp[studentPosNum]=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		  xmladdRemoveStudenthttp[studentPosNum]=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmladdRemoveStudenthttp[studentPosNum].onreadystatechange=function()
		{
		  if (xmladdRemoveStudenthttp[studentPosNum].readyState==4 && xmladdRemoveStudenthttp[studentPosNum].status==200)
		  {
		    //refreshTeamInfo(selectElement);
		    document.getElementById(selectStud).disabled=true;
			document.getElementById(addSelected).disabled=true;
			document.getElementById(removeSelected).disabled=false;
			refreshTeamInfo(selectElement);
		
		  }
		}
		
		xmladdRemoveStudenthttp[studentPosNum].open("GET","ManageContent/placeStudentOnTeam.php?userN="+selectUser + "&team=" + teamN + "&studNum="+selectStud,true);
		xmladdRemoveStudenthttp[studentPosNum].send();
		currentStudent='------Select a Name------';
		
	  }
  }
  else 
  {
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmladdRemoveStudenthttp[studentPosNum]=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		  xmladdRemoveStudenthttp[studentPosNum]=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmladdRemoveStudenthttp[studentPosNum].onreadystatechange=function()
		{
		  if (xmladdRemoveStudenthttp[studentPosNum].readyState==4 && xmladdRemoveStudenthttp[studentPosNum].status==200)
		  {
		    //alert(xmladdRemoveStudenthttp[studentPosNum].responseText);
			
			setEditable(selectStud);
			refreshTeamInfo(selectElement);
		  }
		}
		xmladdRemoveStudenthttp[studentPosNum].open("GET","ManageContent/removeStudentFromTeam.php?userN="+selectUser + "&team=" + teamN + "&studNum="+selectStud,true);
		xmladdRemoveStudenthttp[studentPosNum].send();
		currentStudent='------Select a Name------';
	
  }
	
}


//###################################################################################################//
//                                        Progress/Statistics PS1000                                 //
//###################################################################################################//

//This function is referenced in AdminContentUpdate.js
//Precondition: Compeition must exist
//Postcondition: Load's the Progress and Statistics table
function showTableProg()//Find Code ---------- PS1001
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
//                                               Hints H1000                                         //
//###################################################################################################//

//This function is called when a competition is created
//Precondition: Competition file must exist
//Postcondition: Sets hintsEnabled to the correct value
function setHintState()//Find Code ---------- H1001
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

//This function is referenced in Content_Hints.js
//Precondition: Hints string must be passed and competition must be valid
//Postcondition: Sends the custom hint to the compeition content file located in competitions folder
function sendHintsCust(str)//Find Code ---------- H1002
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
	  
	  xmlhttp.open("GET","HintsContent/sendCustom.php?customHint="+str,true);
	  xmlhttp.send();
	}
	else
		document.getElementById("CustomHint").value="Hints have been disabled. Please create a competition with hints enabled";
}

function showPre(str)//Find Code ---------- H1003
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
      alert(showPreXML.responseText);
    }
  }

  showPreXML.open("GET","HintsContent/showPreDefHints.php?hintPreDef="+str,true);
  showPreXML.send();
  
}

function showPreHintText(str)//Find Code ---------- H1004
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

	  showPreTextXML.open("GET","HintsContent/showPreDefHintText.php?problemSelected="+currProblemSelected + "& =" + str,true);
	  showPreTextXML.send();

}


function sendHintPreDef()//Find Code ---------- H1005
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

function loadProblemNames()//Find Code ---------- H1006
{
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
		loadProblemNamesXML=new XMLHttpRequest();
	  }
	  else
	  {// code for IE6, IE5
		loadProblemNamesXML=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  loadProblemNamesXML.onreadystatechange=function()
	  {
		if (loadProblemNamesXML.readyState==4 && loadProblemNamesXML.status==200)
		{
		  document.getElementById("probNamesHints").innerHTML=loadProblemNamesXML.responseText;
		}
	  }

	  loadProblemNamesXML.open("GET","HintsContent/getProbNames.php",true);
	  loadProblemNamesXML.send();
}

//###################################################################################################//
//                                          User Status Check USC1000                                //
//###################################################################################################//
//Checks all student users' current active status
function AdminLoadCheck()//Find Code ---------- USC1001
{
	//The code for loading competition information will go here.
}

//Gets the master time from the server when the admin logs in, if it exists
//Since the master timer is synced with the administrators timer
function getMasterTime()//Find Code ---------- USC1002
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
