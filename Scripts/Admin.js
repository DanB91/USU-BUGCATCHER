
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
        document.getElementById('header-controls').innerHTML = '<img title="Pause Competition" src="Images/pause.gif" height="79" width="107" onclick=pauseTimer(); />';
        //alert(xmlstartCompetitionhttp.responseText);
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
    
    var content = '<select name="ProblemsList" id="ProblemsListGet" class="Cselect" size="8" onchange="showProbPreview(this)">';
    var difficulty;
    var pSBD = new Array(); //problems sorted by difficulty
    for(var i = 0; i < availableProbs.length; i++)
    {
        $.ajax({
            url:"AdminCompContent/getDifficulty.php", 
            data: {problem: availableProbs[i]},
            async: false, 
            success:function(result){    
                
                difficulty = parseInt(result);
                if(pSBD[difficulty] == undefined)
                {
                    pSBD[difficulty] = new Array();
                }
                pSBD[difficulty].push(availableProbs[i]);
            }
        });			
    }
    var diffStr = '';
    for(var difficulty = 0; difficulty < pSBD.length; difficulty++)
    {
        if(pSBD[difficulty] == undefined)
            continue;
      
      	for(var prob = 0; prob < pSBD[difficulty].length; prob++)
      	{
      		switch(difficulty)
      		{
      			case 0:
      				diffStr = ' - Very Easy';
      				break;
      			case 1:
					diffStr = ' - Easy';
					break;
      			case 2:
      				diffStr = ' - Medium';
					break;
      			case 3:
					diffStr = ' - Hard';
      				break;
      			case 4:
      				diffStr = ' - Very Hard';
      				break;
     				
      		}
      		content += "<option onDblClick='addProb(this.value)' class='difficulty"+difficulty+"' value='" + pSBD[difficulty][prob] + "'>" + pSBD[difficulty][prob] + diffStr +"</option>"; 
      	}
      }
      
      content += '</select>';
    
     document.getElementById('ProblemsList').innerHTML = content;
     
     content = '<select name="SelectedProblems" id="SelectedProblemsGet" class="Cselect"  size="5" onchange="showProbPreview(this)">';
      
    for(i = 0; i < addedProbs.length; i++)
    {
        $.ajax({
            url:"AdminCompContent/getDifficulty.php", 
            async: false, 
            data: {problem: addedProbs[i]},
            success:function(result){     
              
                difficulty = parseInt(result); 
                  
                var diffStr = '';
                switch (difficulty)
                {
                    case 0:
                        diffStr = ' - Very Easy';
                        break;
                    case 1:
                        diffStr = ' - Easy';
                        break;
                    case 2:
                        diffStr = ' - Medium';
                        break;
                    case 3:
                        diffStr = ' - Hard';
                        break;
                    case 4:
                        diffStr = ' - Very Hard';
                        break;    					
                }
                content += "<option onDblClick='removeProb(this.value)' value='"+ addedProbs[i] + "' class='difficulty"+difficulty+"'>" + addedProbs[i] + diffStr + "</option>";  

            }
        });


    }
    content += '</select>';
    
    $('#SelectedProblems').html(content);
}


//This function is referenced in AdminContentUpdate.js
//Precondition: Page is accessed
//Postcondition: Sets up files and does initial loading of problems available
function popProbSelectBox()//Find Code ---------- CS1003
{
    
    $.ajax({type: "GET", url: "AdminCompContent/loadProblems.php", success:function(result){


            availableProbs = eval(result);
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

    }});

}

//This function is referenced in page.html
//Precondition: Problems are available to add
//Postcondition: Adds the problem to the added box(selected problems) and removes it from the available box(available problems)
function addProb(problem)//Find Code ---------- CS1004
{
  //if(addedProbs.length == 5)
  //{
      //document.getElementById('CSetupError').innerHTML = "You cannot have more than 5 problems in a competition.";
      //return;
  //}
  //alert("Called");
  
  if(problem == '')
  {
      return;
  }
  
  /*if (contains(addedProbs, problem))
  {
  	return;
  }*/
  
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

	refreshProbList()
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
       
   refreshProbList()
}


//This function is referenced in load updateAddedBox.php
//Precondition: A problem must be available in the added box(selected problems) and problem content file must exist i.e. problemName.txt
//Postcondition:Shows a preview of the problem currently selected
function showProbPreview(prob)//Find Code ---------- CS1008
{
  var problem = prob.options[prob.selectedIndex].value;
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
  
  showBugList(problem);
}

function showBugList(prob)
{
  if (prob == '')
	  return;
	  
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlshowBugList=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlshowBugList=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xmlshowBugList.onreadystatechange=function()
  {
    if (xmlshowBugList.readyState == 4 && xmlshowBugList.status == 200)
    {
		document.getElementById('CBugArea').value=xmlshowBugList.responseText;
		
    }
  }
  xmlshowBugList.open("GET","AdminCompContent/showBugList.php?problem=" + prob,true);
  xmlshowBugList.send();		  

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
// This is Javascript, not PHP!

function js_array_to_php_array(a)
{
    var a_php = "";
    var total = 0;
    for (var key in a)
    {
        ++ total;
        a_php = a_php + "s:" +
                String(key).length + ":\"" + String(key) + "\";s:" +
                String(a[key]).length + ":\"" + String(a[key]) + "\";";
    }
    a_php = "a:" + total + ":{" + a_php + "}";
    return a_php;
}

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}
function createCompetition()//Find Code ---------- CS1011
{

  //STOPPED = true;
  

  var CodeCov = document.forms.CompForm.AllowCoverage;
  var hidden = document.forms.CompForm.HideComp;
  var Time = document.getElementById("CompTime");
  var compName = $("#CompName").val();
  var compDesc = $("#CompDesc").val();
  var passwd = $("#PassWord").val();
  var CountdownVal;
  var CodeCovVal;
  var HideCompVal;
  
      
  if(hidden[0].checked == true)
      HideCompVal = 1;
  else
      HideCompVal = 0;
      
  if(CodeCov[0].checked == true)
      CodeCovVal = 1;
  else
      CodeCovVal = 0;

  
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
  
  if(compName == "")
  {
      $("#CSetupError").html("Competition must be given a name");
      return;    
  }

  var contents = "CompTime=" + TimeVal + "&numProbs=" + length + "&problems[]=" + addedProbs + "&codeCov=" + CodeCovVal + "&hidden=" + HideCompVal + "&compN=" + compName + "&desc=" + compDesc + "&passwd=" + passwd;
  

  $.ajax({type: "GET",  url:"setupImpl.php", data: contents, success:function(result){
        
        //alert(result);
        if(result == "")
        {
            compSetTimeM = TimeVal;

            
            compSetTime = TimeVal;
            if (CountdownVal == 1)
                    compSetTimeS = 10;
            else 
                    compSetTimeS = 0;
            Time.value = '';
            //setCompCookies();
            createTimer();
            stopTimer();
            $("#adminCompID").html("<p>" + "Competition ID: " + result + "</p>");
            $("#header-timer").html(TimeVal +":00");
        }
        else
        {
             $("#CSetupError").html("Competition name already exists.");
        }

        
    }});


    

}



//###################################################################################################//
//                                          Team Management TM1000                                   //
//###################################################################################################//

//Precondition: Compeition must exist
//Postcondition: Produces a list of team names based on the current competition
//which can found under select a team in Team Management.
function loadTeamNameList()//Find Code ---------- TM1002
{
   
    $.ajax({url: "ManageContent/loadTeamNames.php", success:function(result){
            
            $("#MTeamList").html(result);
    }});  
}

//This function is referenced in AdminContentUpdate.js
//Precondition: None
//Postcondition: Sets up the Team Management page
function loadManage()//Find Code ---------- TM1003
{
  document.getElementById("remove1").disabled=true;
  document.getElementById("remove2").disabled=true;
  document.getElementById("remove3").disabled=true;
  document.getElementById("add1").disabled=true;
  document.getElementById("add2").disabled=true;
  document.getElementById("add3").disabled=true;
  loadTeamNameList();
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

    $.ajax({url: "ManageContent/removeTeam.php", data: "team=" + teamN, success:function(){
            loadTeamNameList();
    }});
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

        var getVars = "q="+teamN;
        
        $.ajax({url: "ManageContent/getStudentInfo.php", data: getVars, success:function(result){

                if(result.length != 0)
                {
                        var t = JSON.parse(result);
                        var temp = t.length / 4;
                        var i;
                        for(i = 0; i < temp; i++)
                        {                              
                              document.getElementById('Name_S' + (i + 1)).value=t[i * 4];
                              document.getElementById('Username_S' + (i  + 1)).value=t[i * 4 + 1];
                              document.getElementById('School_S' + (i + 1)).value=t[i * 4 + 2];
                              document.getElementById('State_S' + (i + 1)).value=t[i * 4 + 3];
                        }
                        
                }
        } });
 
}

//###################################################################################################//
//                                        Progress/Statistics PS1000                                 //
//###################################################################################################//

//This function is referenced in AdminContentUpdate.js
//Precondition: Compeition must exist
//Postcondition: Load's the Progress and Statistics table
function showTableProg()//Find Code ---------- PS1001
{
    $.ajax({url: "ProgressContent/progressImpl.php", success:function(result){

            $("#PTeamTables").html(result);
    }});
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
                                //alert(showPreTextXML.responseText);
		   
		}
	  }

	  showPreTextXML.open("GET","HintsContent/showPreDefHintText.php?problemSelected="+currProblemSelected + "&hintSelected=" + str,true);
	  showPreTextXML.send();

}


function sendHintPreDef()//Find Code ---------- H1005
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
	//getActiveCompetition();
        getMasterTime();
}

//Gets the master time from the server when the admin logs in, if it exists
//Since the master timer is synced with the administrators timer
function getMasterTime()//Find Code ---------- USC1002
{
    
    $.ajax({url: "AdminCompContent/getMasterTime.php", success:function(result){

        var time;
        time = $.trim(result);
        //alert(result);
       
        if(!isNaN(time))
        {
            if (time.length > 3)
            {

                    seconds = time.substring(time.length-2,time.length);
                    minutes = time.substring(0,time.length-2);
                    document.getElementById("header-timer").innerHTML=minutes+":"+seconds;
                    startTimerOnRefresh(); 
            }
            else
            {
                    //A competition has not been created.
            }
        }
        else if(time == "paused")
            {document.getElementById("header-timer").innerHTML="paused!";  startTimerOnRefresh();}
        else
            document.getElementById("header-timer").innerHTML="STOP!";

    }});
           
}

