
/*
Table of Contents
	1.Global Variables    ---------- GV1000
		1.1 teamN			  	---------- GV1001
		1.2 MAX_STUDENT_ON_TEAM ---------- GV1002
		1.3 currentStudent      ---------- GV1003
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

var currProblemSelected = '';//Find Code ---------- GV1005
var lastHintSelected = '';	 //Find Code ---------- GV1006
var currProbID = '';
var availableProbs = [];
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
    $.ajax({url: "AdminCompContent/StartCompetition.php", success:function(){
            //Need to write a new countdown function
            document.getElementById('header-controls').innerHTML = '<img title="Pause Competition" src="Images/pause.gif" height="79" width="107" onclick=pauseTimer(); />';
            //alert(xmlstartCompetitionhttp.responseText);
            startTimer();  
    }});    
}

function refreshProbList()
{
    var content = '<select name="ProblemsList" id="ProblemsListGet" class="Cselect" size="8" onchange="showProbPreview(this)">';
    var difficulty;
    var diffStr = '';
    
    
    
    $.ajax({
        url:"AdminCompContent/getDifficulty.php", 
        data: {
            problem: availableProbs
        },
        async: false, 
        success:function(result){    
                
            if(result.Error != undefined)
            {
                alert(result.Error);
            }
            else{
                    
                for(var difficulty in result)
                {
                    for(prob in result[difficulty])
                    {
                        switch(difficulty)
                        {
                            case 'VE':
                                diffStr = ' - Very Easy';
                                break;
                            case 'E':
                                diffStr = ' - Easy';
                                break;
                            case 'M':
                                diffStr = ' - Medium';
                                break;
                            case 'H':
                                diffStr = ' - Hard';
                                break;
                            case 'VH':
                                diffStr = ' - Very Hard';
                                break;	
                        }
                        
                        content += "<option onDblClick='addProb(this.value)' class='difficulty"+difficulty+"' value='" + result[difficulty][prob] + "'>" + result[difficulty][prob] + diffStr +"</option>";
                        
                    }
                }
            }
                
        }
    });			
    
   
  
    content += '</select>';
    
    document.getElementById('ProblemsList').innerHTML = content;
     
    content = '<select name="SelectedProblems" id="SelectedProblemsGet" class="Cselect"  size="5" onchange="showProbPreview(this)">';
     
     
    
    $.ajax({
        url:"AdminCompContent/getDifficulty.php", 
        data: {
            problem: addedProbs
        },
        async: false, 
        success:function(result){    
                
            if(result.Error != undefined)
            {
                alert(result.Error);
            }
            else{
                    
                for(var difficulty in result)
                {
                    for(prob in result[difficulty])
                    {
                        switch(difficulty)
                        {
                            case 'VE':
                                diffStr = ' - Very Easy';
                                break;
                            case 'E':
                                diffStr = ' - Easy';
                                break;
                            case 'M':
                                diffStr = ' - Medium';
                                break;
                            case 'H':
                                diffStr = ' - Hard';
                                break;
                            case 'VH':
                                diffStr = ' - Very Hard';
                                break;	
                        }
                        
                        content += "<option onDblClick='removeProb(this.value)' value='"+ result[difficulty][prob] + "' class='difficulty"+difficulty+"'>" + result[difficulty][prob] + diffStr + "</option>";                        
                    }
                }
            }
                
        }
    });		
    
      
    content += '</select>';
    
    $('#SelectedProblems').html(content);
}




//This function is referenced in AdminContentUpdate.js
//Precondition: Page is accessed
//Postcondition: Sets up files and does initial loading of problems available
function popProbSelectBox()//Find Code ---------- CS1003
{
    $.ajax({type: "GET", url: "AdminCompContent/loadProblems.php", success:function(result){
            
            availableProbs = JSON.parse(result);
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
    if(problem == '')
    {
        return;
    }


    var index = availableProbs.indexOf(problem);
    availableProbs.splice(index, 1);
    addedProbs.push(problem);
    

    if(addedProbs.length > 0)
        document.getElementById('rBut').disabled = false;

    if(addedProbs.length > 1)
    {
        document.getElementById('CMoveUp').disabled = false;
        document.getElementById('CMoveDown').disabled = false;
    }

    if(availableProbs.length == 0)
        document.getElementById('aBut').disabled = true;
    
    refreshProbList();

            
}

//This function is referenced in page.html
//Precondition: Problems are available to remove
//Postcondition: Removes the problem to the added box(Selected problems) and adds to the available box(available problems)
function removeProb(problem)//Find Code ---------- CS1005
{
  var index = addedProbs.indexOf(problem);
  addedProbs.splice(index, 1);
  availableProbs.push(problem);
  
  
  if(addedProbs.length == 0)
       document.getElementById('rBut').disabled = true;
   
  if(addedProbs.length < 2)
  {
      document.getElementById('CMoveUp').disabled = true;
      document.getElementById('CMoveDown').disabled = true;
  }
  
  if(availableProbs.length > 0)
       document.getElementById('aBut').disabled = false;
       
   refreshProbList();
}


//This function is referenced in load updateAddedBox.php
//Precondition: A problem must be available in the added box(selected problems) and problem content file must exist i.e. problemName.txt
//Postcondition:Shows a preview of the problem currently selected
function showProbPreview(prob)//Find Code ---------- CS1008
{
    var problem = prob.options[prob.selectedIndex].value;
    if(problem == '')
	return;
	
    $.ajax({url: "AdminCompContent/showPreview.php", async: true, data: "problem=" + problem, success:function(result){

            $("#CTextArea").val(result);
    }});
	
  showBugList(problem);
}

function showBugList(prob)
{
    if (prob == '')
	  return;
	  
    $.ajax({url: "AdminCompContent/showBugList.php", async: true, data: "problem=" + prob, success:function(result){

            $("#CBugArea").val(result);	
    }});		  
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
            $("#header-timer").html(TimeVal +":00");
            $("#CSetupError").html("Competition successfully created.");
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
            teamN = '';
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
                }});
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

//This function is referenced in Content_Hints.js
//Precondition: Hints string must be passed and competition must be valid
//Postcondition: Sends the custom hint to the compeition content file located in competitions folder
function sendHintsCust(str)//Find Code ---------- H1002
{
    $.ajax({type: "GET", async: true, url: "HintsContent/sendCustom.php", data: "customHint=" + str, success:function(){

            document.getElementById("CustomHint").value='';   
    }});	
}

function showPre(str)//Find Code ---------- H1003
{
    currProbID = str.id;
    currProblemSelected = str.value;
	
    $.ajax({type: "GET", async: true, url: "HintsContent/showPreDefHints.php", data: "hintPreDef=" + str.value, success:function(result){

            $("#HintNum").html(result);  
    }});  
}

function showPreHintText(str)//Find Code ---------- H1004
{   
    lastHintSelected = str;
    $.ajax({type: "GET", async: true, url: "HintsContent/showPreDefHintText.php", data: "problemSelected=" + currProblemSelected + "&hintSelected=" + str, success:function(result){

    $("#HintText").html(result);  
    }}); 
}


function sendHintPreDef()//Find Code ---------- H1005
{    
    $.ajax({type: "GET", async: true, url: "HintsContent/sendPre.php", data: "problemSelected=" + currProblemSelected + "&hintSelected=" + lastHintSelected + "&probID=" + currProbID, success:function(result){

        $("#HintText").html(result);  

    }});
}

function loadProblemNames()//Find Code ---------- H1006
{              
    $.ajax({type: "GET", url: "HintsContent/getProbNames.php", success:function(result){

            $("#probNamesHints").html(result);  

    }});               
}
//###################################################################################################//
//                                          Problem Upload                                           //
//###################################################################################################//

var slideDuration = 100;
var DESCRIPTION_CLICKED = false;
var SUB_CLICKED = false;

//hides the submenu and all the description when the page is loaded.
function hideOnLoad()
{
	$('ul[class*="hidden"]').hide();
	
	$("li").click(function(){handleListClick(this)});
}

//handles the li.onClick event
function handleListClick(element)
{
	if ($(element).attr("class") == "ul-D")
	{
		DESCRIPTION_CLICKED=true;
	}
	else if ($(element).attr("class") == "ul-S" || $(element).attr("class") == "ul-M")
	{
		if ($(element).attr("class") == "ul-S")
		{
			SUB_CLICKED=true;
		}
			
		if (DESCRIPTION_CLICKED)
		{
			DESCRIPTION_CLICKED=false;
		}
		else
		{
			if ($("#"+element.id+"-Description").attr("class") == "ul-Description")
			{
				doListHide($("#"+element.id+"-Description"),"ul-Description-hidden",slideDuration);
			}
			else
			{
				showExampleFile(element);
				$('ul[class="ul-Description"]').slideUp(slideDuration);
				$('ul[class="ul-Description"]').attr("class", "ul-Description-hidden");
				doListShow($("#"+element.id+"-Description"),"ul-Description");
			}
		}
	}
	else if ($(element).attr("class") == "ul-M-S")
	{
		if (SUB_CLICKED)
		{
			SUB_CLICKED=false;
		}
		else
		{
			if ($("#"+element.id+"-Sub").attr("class") == "ul-Sub")
			{
				var count = 1;
				while($("#"+element.id+"-S"+count).attr("id") != null)
				{
					doListHide($("#"+element.id+"-S"+count+"-Description"),"ul-Description-hidden",0);
					count++;
				}
				doListHide($("#"+element.id+"-Sub"),"ul-Sub-hidden",slideDuration);
				return;
			}
			$("#exampleFile").html("");
			$('ul[class="ul-Description"]').slideUp(slideDuration);
			$('ul[class="ul-Description"]').attr("class", "ul-Description-hidden");
			doListShow($("#"+element.id+"-Sub"),"ul-Sub");
			return;
		}
	}
}

//shows given list items
function doListShow(element,elementClass)
{
	$(element).slideDown(slideDuration);
	$(element).attr("class", elementClass);
}

//hides given list items
function doListHide(element,elementClass,time)
{
	$(element).slideUp(time);
	$(element).attr("class", elementClass);
	$("#exampleFile").html("");
}

//populates the text inside of the division to the right of the file structure list
function showExampleFile(element)
{
	var exampleFileOutput = "";
	var ul_Index = $(element).html().indexOf("<ul",0);
	if (ul_Index != -1)
	{
		exampleFileOutput += $(element).html().substring(0,ul_Index);
	}
	else
	{
		exampleFileOutput += $(element).html();
	}
	exampleFileOutput += "<br />----------------------------";
	var listItemValue = element.id.replace(element.id.substring(0,4),"");
	listItemValue = listItemValue.substring(0,2);
	if (listItemValue == 11)
	{
		subItemValue = element.id.replace(element.id.substring(0,8),"");
	}
	switch(Number(listItemValue))
	{
		case 1:
			break;
		case 2:
			break;
		case 3:
			break;
		case 4:
			break;
		case 5:
			break;
		case 6:
			exampleFileOutput += '<pre>public class Fibonacci {\n';
			exampleFileOutput += '\n';
			exampleFileOutput += ' public static void main(String[] args) {\n';
			exampleFileOutput += '    double N = Integer.parseInt(args[0]);\n';
			exampleFileOutput += '    if(Math.floor(N)==N && N>-1){\n';
			exampleFileOutput += '\n';
			exampleFileOutput += '      int f = 0, g = 1;\n';
			exampleFileOutput += '\n';
			exampleFileOutput += '      for (int i = 1; i <= N+1; i++) {\n';
			exampleFileOutput += '        f = f + g;\n';
			exampleFileOutput += '        g = f - g;\n';
			exampleFileOutput += '        System.out.print(f + " ");\n';
			exampleFileOutput += '      }\n';
			exampleFileOutput += '    }else{\n';
			exampleFileOutput += '    System.out.println("Error:  Input must be a positive integer.");\n';
			exampleFileOutput += '    }\n';
			exampleFileOutput += ' }\n';
			exampleFileOutput += '}</pre>\n';
			break;
		case 7:
			exampleFileOutput += '<pre>1. The Fibonacci series are the numbers that follow the sequence: 1 1 2 3 5 8 13 ...\n';
			exampleFileOutput += '&lt;br/>\n';
			exampleFileOutput += '2. Each subsequent number after is the sum of the previous two.\n';
			exampleFileOutput += '&lt;br/>\n';
			exampleFileOutput += '3. This program begins the sequence at 1 and prints until the Nth number in the sequence.\n';
			exampleFileOutput += '&lt;br/>\n';
			exampleFileOutput += '4. The Nth number is the number input by the user.\n';
			exampleFileOutput += '&lt;br/>\n';
			exampleFileOutput += '5. This program does not accept integers greater than 30.  If the entered integer is greater, the program will output: "Error: Input too large."\n';
			exampleFileOutput += '&lt;br/>\n';
			exampleFileOutput += '6. If the input is not a positive integer it will output, "Error:  Input must be a positive integer."\n';
			exampleFileOutput += '&lt;br/>\n';
			exampleFileOutput += '7. Other invalid inputs will output, "Error: Bad Input".</pre>\n';
			break;
		case 8:
			exampleFileOutput += '<pre>input: 4   output: 1 1 2 3</pre>';
			break;
		case 9:
			exampleFileOutput += '<pre>Fibonacci takes an int n, and outputs the first n fibonacci numbers.';
			exampleFileOutput += '<pre>1)line7: i<=N+1 should be i<=N otherwise an extra number is printed';
			exampleFileOutput += '<pre>2)Does not include a "try...catch" to catch all other input errors.';
			exampleFileOutput += '<pre>3)Does not check if input is less than 30.</pre>';
			break;
		case 10:
			exampleFileOutput += '<pre>1</pre>';
			break;
		case 11:
			switch(Number(subItemValue))
			{
				case 1:
					exampleFileOutput += '<pre>public class FibonacciOracle {\n';
					exampleFileOutput += '\n';
					exampleFileOutput += ' public static void main(String[] args) {\n';
					exampleFileOutput += '  try{\n';
					exampleFileOutput += '    double N = Integer.parseInt(args[0]);\n';
					exampleFileOutput += '    if(Math.floor(N)==N && N>-1){\n';
					exampleFileOutput += '\n';
					exampleFileOutput += '      if (N > 30) {\n';
					exampleFileOutput += '        System.out.println("Error: Input too large");\n';
					exampleFileOutput += '        return;\n';
					exampleFileOutput += '      }\n';
					exampleFileOutput += '\n';
					exampleFileOutput += '      int f = 0, g = 1;\n';
					exampleFileOutput += '\n';
					exampleFileOutput += '      for (int i = 1; i <= N; i++) {\n';
					exampleFileOutput += '        f = f + g;\n';
					exampleFileOutput += '        g = f - g;\n';
					exampleFileOutput += '        System.out.print(f + " ");\n';
					exampleFileOutput += '      }\n';
					exampleFileOutput += '    }else{\n';
					exampleFileOutput += '    System.out.println("Error:  Input must be a positive integer.");\n';
					exampleFileOutput += '    }\n';
					exampleFileOutput += '  }catch(Exception e){\n';
					exampleFileOutput += '    System.out.println("Error: Bad Input");\n';
					exampleFileOutput += '  }\n';
					exampleFileOutput += ' }\n';
					exampleFileOutput += '}</pre>\n';
					break;
				case 2:
					exampleFileOutput += '<pre>//Error: Line 14, adds one extra integer to the output\n';
					exampleFileOutput += 'public class Fibonaccibug1 {\n';
					exampleFileOutput += '\n';
					exampleFileOutput += ' public static void main(String[] args) {\n';
					exampleFileOutput += '  try{\n';
					exampleFileOutput += '    double N = Integer.parseInt(args[0]);\n';
					exampleFileOutput += '    if(Math.floor(N)==N && N>-1){\n';
					exampleFileOutput += '\n';
					exampleFileOutput += '      if (N > 30) {\n';
					exampleFileOutput += '        System.out.println("Error: Input too large");\n';
					exampleFileOutput += '        return;\n';
					exampleFileOutput += '      }\n';
					exampleFileOutput += '\n';
					exampleFileOutput += '      int f = 0, g = 1;\n';
					exampleFileOutput += '\n';
					exampleFileOutput += '      for (int i = 1; i <= N+1; i++) {\n';
					exampleFileOutput += '        f = f + g;\n';
					exampleFileOutput += '        g = f - g;\n';
					exampleFileOutput += '        System.out.print(f + " ");\n';
					exampleFileOutput += '      }\n';
					exampleFileOutput += '    }else{\n';
					exampleFileOutput += '    System.out.println("Error:  Input must be a positive integer.");\n';
					exampleFileOutput += '    }\n';
					exampleFileOutput += '  }catch(Exception e){\n';
					exampleFileOutput += '    System.out.println("Error: Bad Input");\n';
					exampleFileOutput += '  }\n';
					exampleFileOutput += ' }\n';
					exampleFileOutput += '}</pre>\n';
					break;
				case 3:
					exampleFileOutput += '<pre>//Error: does not check to see if input is a number; no try,catch\n';
					exampleFileOutput += 'public class Fibonaccibug2 {\n';
					exampleFileOutput += '\n';
					exampleFileOutput += ' public static void main(String[] args) {\n';
					exampleFileOutput += '    double N = Integer.parseInt(args[0]);\n';
					exampleFileOutput += '    if(Math.floor(N)==N && N>-1){\n';
					exampleFileOutput += '\n';
					exampleFileOutput += '      if (N > 30) {\n';
					exampleFileOutput += '        System.out.println("Error: Input too large");\n';
					exampleFileOutput += '        return;\n';
					exampleFileOutput += '      }\n';
					exampleFileOutput += '\n';
					exampleFileOutput += '      int f = 0, g = 1;\n';
					exampleFileOutput += '\n';
					exampleFileOutput += '      for (int i = 1; i <= N; i++) {\n';
					exampleFileOutput += '        f = f + g;\n';
					exampleFileOutput += '        g = f - g;\n';
					exampleFileOutput += '        System.out.print(f + " ");\n';
					exampleFileOutput += '      }\n';
					exampleFileOutput += '    }else{\n';
					exampleFileOutput += '    System.out.println("Error:  Input must be a positive integer.");\n';
					exampleFileOutput += '    }\n';
					exampleFileOutput += ' }\n';
					exampleFileOutput += '}</pre>\n';
					break;
				case 4:
					exampleFileOutput += '<pre>//Error: does not check to see if int is overflowed, max is N=30\n';
					exampleFileOutput += 'public class Fibonaccibug3 {\n';
					exampleFileOutput += '\n';
					exampleFileOutput += ' public static void main(String[] args) {\n';
					exampleFileOutput += '  try{\n';
					exampleFileOutput += '    double N = Integer.parseInt(args[0]);\n';
					exampleFileOutput += '    if(Math.floor(N)==N && N>-1){\n';
					exampleFileOutput += '\n';
					exampleFileOutput += '      int f = 0, g = 1;\n';
					exampleFileOutput += '\n';
					exampleFileOutput += '      for (int i = 1; i <= N; i++) {\n';
					exampleFileOutput += '        f = f + g;\n';
					exampleFileOutput += '        g = f - g;\n';
					exampleFileOutput += '        System.out.print(f + " ");\n';
					exampleFileOutput += '      }\n';
					exampleFileOutput += '    }else{\n';
					exampleFileOutput += '    System.out.println("Error:  Input must be a positive integer.");\n';
					exampleFileOutput += '    }\n';
					exampleFileOutput += '  }catch(Exception e){\n';
					exampleFileOutput += '    System.out.println("Error: Bad Input");\n';
					exampleFileOutput += '  }\n';
					exampleFileOutput += ' }\n';
					exampleFileOutput += '}</pre>\n';
					break;
				case 5:
					exampleFileOutput += '<pre>public class Fibonacci {\n';
					exampleFileOutput += '\n';
					exampleFileOutput += ' public static void main(String[] args) {\n';
					exampleFileOutput += '    double N = Integer.parseInt(args[0]);\n';
					exampleFileOutput += '    if(Math.floor(N)==N && N>-1){\n';
					exampleFileOutput += '\n';
					exampleFileOutput += '      int f = 0, g = 1;\n';
					exampleFileOutput += '\n';
					exampleFileOutput += '      for (int i = 1; i <= N+1; i++) {\n';
					exampleFileOutput += '        f = f + g;\n';
					exampleFileOutput += '        g = f - g;\n';
					exampleFileOutput += '        System.out.print(f + " ");\n';
					exampleFileOutput += '      }\n';
					exampleFileOutput += '    }else{\n';
					exampleFileOutput += '    System.out.println("Error:  Input must be a positive integer.");\n';
					exampleFileOutput += '    }\n';
					exampleFileOutput += ' }\n';
					exampleFileOutput += '}</pre>\n';
					break;
				default:
					break;
			}
			break;
		default:
			exampleFileOutput += "default";
			break;
	}
	$("#exampleFile").html(exampleFileOutput);
}

//###################################################################################################//
//                                          User Status Check USC1000                                //
//###################################################################################################//
//Checks all student users' current active status
function AdminLoadCheck()//Find Code ---------- USC1001
{
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
            {document.getElementById("header-timer").innerHTML="paused!";startTimerOnRefresh();}
        else
            document.getElementById("header-timer").innerHTML="STOP!";

    }});       
}

