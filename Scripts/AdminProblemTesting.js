var customProblems;

function getCustomProblems()
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlpopCustomProbs=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlpopCustomProbs=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xmlpopCustomProbs.onreadystatechange=function()
  {
    if (xmlpopCustomProbs.readyState == 4 && xmlpopCustomProbs.status == 200)
    {
			customProblems = eval(xmlpopCustomProbs.responseText);
			var index = customProblems.indexOf(".");
			customProblems.splice(index, 1);
			index = customProblems.indexOf("..");
			customProblems.splice(index, 1);
			index = customProblems.indexOf("index.html");
			customProblems.splice(index, 1);
			refreshCustomProbList();
    }
  }
  xmlpopCustomProbs.open("GET","AdminCompContent/loadAdminCustomProblems.php",true);
  xmlpopCustomProbs.send();
}

function refreshCustomProbList()
{
	var customContent = '<select name="ProblemsList" id="ProblemsList" class="Cselect" size="25" onchange="getReqAndProb(this.options[this.selectedIndex].value,coverage)">';// onchange="getReqAndProb(this.option[selectedIndexvalue].value,coverage)"
	var customDifficulty;
	var cpSBD = new Array(); //problems sorted by difficulty
	
	for(var i = 0; i < customProblems.length; i++)
	{
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlGetCustomDiff=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
			xmlGetCustomDiff=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		xmlGetCustomDiff.onreadystatechange=function()
		{
			if (xmlGetCustomDiff.readyState == 4 && xmlGetCustomDiff.status == 200)
			{
				customDifficulty = parseInt(xmlGetCustomDiff.responseText);
				if(cpSBD[customDifficulty] == undefined)
				{
					cpSBD[customDifficulty] = new Array();
				}
				cpSBD[customDifficulty].push(customProblems[i]);
				//content += "<option onDblClick='addProb(this.value)' class='difficulty"+difficulty+"'>" + customProblems[i] + "</option>"; 
			}
		}
		
		xmlGetCustomDiff.open("GET","AdminCompContent/getCustomDifficulty.php?problem="+customProblems[i],false);
		xmlGetCustomDiff.send();
	}
	
	var customDiffStr = '';
	var customProbsIndex = 0;
	for(var customDifficulty = 0; customDifficulty < cpSBD.length; customDifficulty++)
	{
		if(cpSBD[customDifficulty] == undefined)
			continue;
		
		for(var cProb = 0; cProb < cpSBD[customDifficulty].length; cProb++)
		{
			switch(customDifficulty)
			{
				case 0: 
					customDiffStr = ' - Very Easy';
					break;
				case 1:
					customDiffStr = ' - Easy';
					break;
				case 2:
					customDiffStr = ' - Medium';
					break;
				case 3:
					customDiffStr = ' - Hard';
					break;
				case 4:
					customDiffStr = ' - Very Hard';
					break;
			}
			
			//content += "<option onDblClick='getProbReq(this.value,coverage)' class='difficulty"+difficulty+"' value='" + pSBD[difficulty][prob] + "'>" + pSBD[difficulty][prob] + diffStr +"</option>"; 
			//content += "<option class='difficulty"+difficulty+"' value='" + pSBD[difficulty][prob] + "'>" + pSBD[difficulty][prob] + diffStr +"</option>";
			customProblems[customProbsIndex] = cpSBD[customDifficulty][cProb];
			customContent += "<option class='difficulty"+customDifficulty+"' value='" + customProbsIndex + "'>" + cpSBD[customDifficulty][cProb] + customDiffStr +"</option>";
			customProbsIndex++;
		}
	}
	
	customContent += '</select>';
	document.getElementById('PopUpArea').innerHTML = customContent;
	/*content = '<select name="SelectedProblems" id="SelectedProblemsGet" class="Cselect"  size="5" onchange="showProbPreview(this)">';
	alert("Debug 10");
      
	for(i = 0; i < addedProbs.length; i++)
	{
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlGetDifficultyTwo=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
			xmlGetDifficultyTwo=new ActiveXObject("Microsoft.XMLHTTP");
		}
	
		xmlGetDifficultyTwo.onreadystatechange=function()
		{
			if (xmlGetDifficultyTwo.readyState == 4 && xmlGetDifficultyTwo.status == 200)
			{
				difficulty = parseInt(xmlGetDifficultyTwo.responseText); 
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
		}
		
		xmlGetDifficultyTwo.open("GET","AdminCompContent/getDifficulty.php?problem="+addedProbs[i],false);
		xmlGetDifficultyTwo.send();   
	}
	alert("Debug 11");
	
	content += '</select>'; 
	alert("Debug 12"); 
	document.getElementById('SelectedProblems').innerHTML = content;
	alert("Debug 13");*/
}

//###################################################################################################//
//                                  Scripts for Select Problems Popup                                //
//###################################################################################################//

var HIDDEN=true;

//
function showProblemsList()
{
	if (HIDDEN)
	{
		document.getElementById("PopUpArea").setAttribute("class","PUA-"+PopUpShowingClass);
		document.getElementById("PopUpArea").setAttribute("className","PUA-"+PopUpShowingClass);
		HIDDEN=false;
	}
	else
	{
		document.getElementById("PopUpArea").setAttribute("class","PUA-hidden");
		document.getElementById("PopUpArea").setAttribute("className","PUA-hidden");
		HIDDEN=true;
	}
}


//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//
//###################################################################################################//

//###################################################################################################//
//                                         Global Variables GV1000                                   //
//###################################################################################################//

//Problems and requirements
var currProblem = ''; //Find Code ---------- GV1002
var coverage = 0;	  //Find Code ---------- GV1003

//Bugs found
var prevFound = 0;	  //Find Code ---------- GV1004

//Competition
var t1;		 		  //Find Code ---------- GV1005
var t3;				  //Find Code ---------- GV1007
var t4;			      //Find Code ---------- GV1008

var PopUpShowingClass = "";

var probNames;
var currIndex;

var recentlyLoged = true;
var countDownState = 0;

var custTName;
var doScrollDown = false;


//###################################################################################################//
//                                     Problems and Requirements PR1000                              //
//###################################################################################################//
/*
var HIDDEN=true;
//Comment About The Functions
function showProblemsList()
{
	if (HIDDEN)
	{
		document.getElementById("PopUpArea").setAttribute("class","PUA-"+PopUpShowingClass);
		document.getElementById("PopUpArea").setAttribute("className","PUA-"+PopUpShowingClass);
		HIDDEN=false;
	}
	else
	{
		document.getElementById("PopUpArea").setAttribute("class","PUA-hidden");
		document.getElementById("PopUpArea").setAttribute("className","PUA-hidden");
		HIDDEN=true;
	}
}
*/

//This function is called in the initialize function below
//Precondition: Student must be on a team and competition must be valid
//Postcondition: Recieves the team content file and displays the contents
function receive()//Find Code ---------- G1004
{
	//alert("recieving now");
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		loadInfoReceive=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		loadInfoReceive=new ActiveXObject("Microsoft.XMLHTTP");
	}

	loadInfoReceive.onreadystatechange=function()
	{
		if (loadInfoReceive.readyState==4 && loadInfoReceive.status==200)
		{
			var arr = JSON.parse(loadInfoReceive.responseText);
			document.getElementById("ResultsList").innerHTML=format(arr);
			if(doScrollDown)
				scrollResultsDown();
		}
	}
	loadInfoReceive.open("GET","AdminCompContent/StudentMirror/receive.php",true);
	loadInfoReceive.send();
}

//the array is alternating time tags and messages, time tags start at index 0
//the corresponding message for the time tag at index 0 is at index 1
//this is a bi-directional bubble sort that sorts by the time tags
function bubblesort(arr){
	var swapped=true;
	var j=0;
	while(swapped){
		j+=2;
		swapped=false;
		for(var i=j-2; i<arr.length-j; i+=2)
		{
			if(arr[i]>arr[i+2]){
				swapped=true;
				var temp=arr[i];
				arr[i]=arr[i+2];
				arr[i+2]=temp;

				temp=arr[i+1];
				arr[i+1]=arr[i+3];
				arr[i+3]=temp;
			}
		}

		for(var i=arr.length-j; i>j&&!swapped; i-=2)
		{
			if(arr[i]<arr[i-2]){
				swapped=true;
				var temp=arr[i];
				arr[i]=arr[i-2];
				arr[i-2]=temp;

				temp=arr[i-1];
				arr[i+1]=arr[i-1];
				arr[i-1]=temp;
			}
		}
	}
}

//do the filtering by tags, and then splice all the messages together for the results box
function format(arr){
	var curServerTime=arr.splice(arr.length-1,1);
	bubblesort(arr);
	var text="";
	var lastIncluded=-1;

	for(var i=1; i<arr.length; i+=2)
	{
		var tag=arr[i].substring(arr[i].indexOf('[')+1, arr[i].indexOf(']'));
		if(tag=="Chat" && document.getElementById("chatFilterBox").checked){
			text+="<br>"+arr[i]+"<br>";
			lastIncluded=i;
		}
		else if(tag=="Hint" && document.getElementById("hintFilterBox").checked){
			text+="<br>"+arr[i]+"<br>";
			lastIncluded=i;
		}
		else if(tag.substring(0, 4) =="Test"){
			if( document.getElementById("testFilterBox").checked) {
				text+="<br>"+arr[i]+"<br>";
				lastIncluded=i;
			}
			else{
				var firstCommaIndex=tag.indexOf(",");
				var secondCommaIndex=tag.indexOf(",", firstCommaIndex+2);

				var Problem=tag.substring(secondCommaIndex+2);
				//if it is the current problem, then include the test case
				if(Problem.trim()==currProblem.trim()){
					text+="<br>"+arr[i]+"<br>";
					lastIncluded=i;
				}
			}

		}
	}
	doScrollDown=false;
	if(lastIncluded>0)
		doScrollDown= ((curServerTime-arr[lastIncluded-1])<2);
	return text;
}

function scrollResultsDown(){
	document.getElementById("ResultsList").scrollTop =document.getElementById("ResultsList").scrollHeight;
}
var CLEARING = false;
function clearSavedResults()//Find Code ---------- G1004
{
	//alert("recieving now");
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		httpClearResults=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		httpClearResults=new ActiveXObject("Microsoft.XMLHTTP");
	}

	httpClearResults.onreadystatechange=function()
	{
		if (httpClearResults.readyState==4 && httpClearResults.status==200)
		{
			CLEARING = true;
			alert(httpClearResults.responseText);
			t3 = setInterval(receive,1000);
			getReqAndProb(currIndex, 1);
		}
	}
	clearInterval(t3);
	httpClearResults.open("GET","AdminCompContent/StudentMirror/clearSavedResults.php",true);
	httpClearResults.send();
}

//This function is referenced in Student.html
//This function takes the problem number as a string such as problem1, problem2, and so on. 
//The function also takes a bool, cov, true if coverage is enabled false otherwise
//Precondition: Problem and coverage files must exist
//Postcondition: The appropriate functions are called to set up the problems that will be seen by the students.
function getReqAndProb(index, cov)//Find Code ---------- PR1001
{
	
	if (index != currIndex)
	{
		AdminBugsFound = 0;
	}
	var OneOrTwo = 1;
	switch(OneOrTwo)
	{
		case 1:
			//alert(customProblems[index]);
			getProb(customProblems[index], cov, index);
			getReq(customProblems[index], index);
			currProblem = customProblems[index];
			coverage = 0;//cov;
			currIndex = index;
			break;
		case 2:
			getReqAndProb2(index, cov);
			//alert(customProblems[index]);
			break;
	}
	if (!CLEARING)
	{
		showProblemsList();
	}
	CLEARING = false;
}

//This function is called in the function getReqAndProb look up 
//Precondition: Competition must be valid and started
//Postcondition: Displays the requirements of the problem that was selected.
function getReq(str, index)//Find Code ---------- PR1002
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		loadInfoGetReq=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		loadInfoGetReq=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	loadInfoGetReq.onreadystatechange=function()
	{
		if (loadInfoGetReq.readyState==4 && loadInfoGetReq.status==200)
		{
			document.getElementById("RequirementsList").innerHTML=loadInfoGetReq.responseText;
		}
	}
	
	loadInfoGetReq.open("GET","AdminCompContent/StudentMirror/showCodeReq.php?problem="+str + "&index=" + index,true);
	loadInfoGetReq.send();
}

//This function is called in the function getReqAndProb look up 
//Precondition: Competition must be valid and started
//Postcondition: Displays the problem that the student selected
function getProb(str, cov, index)//Find Code ---------- PR1003
{
	//alert("Called from getProb");
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		loadInfoGetProb=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		loadInfoGetProb=new ActiveXObject("Microsoft.XMLHTTP");
	}
	loadInfoGetProb.onreadystatechange=function()
	{
		if (loadInfoGetProb.readyState==4 && loadInfoGetProb.status==200)
		{
			document.getElementById("ProblemCode").innerHTML="<pre class='prettyprint lang-java linenums'>"+loadInfoGetProb.responseText+"</pre>";
			//prettyPrint();
			getToolTip(str);
		}
	}
	loadInfoGetProb.open("GET","AdminCompContent/StudentMirror/showCode.php?problem="+str+"&coverage="+cov + "&index=" + index,true);
	loadInfoGetProb.send();
}

function getToolTip(str)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		loadToolTip=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		loadToolTip=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	loadToolTip.onreadystatechange=function()
	{
		if (loadInfoGetProb.readyState==4 && loadInfoGetProb.status==200)
		{
			var example = loadToolTip.responseText; 	
			document.getElementById("BugTesterDiv").title=example;
			document.getElementById("ProblemName").innerHTML=str;
		}
	}
	
	loadToolTip.open("GET","AdminCompContent/StudentMirror/getToolTip.php?problem="+str,true);
	loadToolTip.send();
}


//#####################################################################################################################################################
//#####################################################################################################################################################

//This function is referenced in Student.html
//This function takes the problem number as a string such as problem1, problem2, and so on. 
//The function also takes a bool, cov, true if coverage is enabled false otherwise
//Precondition: Problem and coverage files must exist
//Postcondition: The appropriate functions are called to set up the problems that will be seen by the students.
function getReqAndProb2(index, cov)//Find Code ---------- PR1001
{
	if (index != currIndex)
	{
		AdminBugsFound = 0;
	}
	alert(customProblems[index]);
	getProb2(customProblems[index], cov, index);
	getReq2(customProblems[index], index);
	currProblem = customProblems[index];
	coverage = 0;//cov;
	currIndex = index;
}

//This function is called in the function getReqAndProb look up 
//Precondition: Competition must be valid and started
//Postcondition: Displays the requirements of the problem that was selected.
function getReq2(str, index)//Find Code ---------- PR1002
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		loadInfoGetReq=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		loadInfoGetReq=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	loadInfoGetReq.onreadystatechange=function()
	{
		if (loadInfoGetReq.readyState==4 && loadInfoGetReq.status==200)
		{
			document.getElementById("RequirementsList").innerHTML=loadInfoGetReq.responseText;
		}
	}
	
	loadInfoGetReq.open("GET","AdminCompContent/StudentMirror/showCodeReq.php?problem="+str + "&index=" + index,true);
	loadInfoGetReq.send();
}

//This function is called in the function getReqAndProb look up 
//Precondition: Competition must be valid and started
//Postcondition: Displays the problem that the student selected
function getProb2(str, cov, index)//Find Code ---------- PR1003
{
	//alert("Called from getProb");
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		loadInfoGetProb=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		loadInfoGetProb=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	loadInfoGetProb.onreadystatechange=function()
	{
		if (loadInfoGetProb.readyState==4 && loadInfoGetProb.status==200)
		{
			document.getElementById("ProblemCode").innerHTML="<pre class='prettyprint lang-java linenums'>"+loadInfoGetProb.responseText+"</pre>";
			prettyPrint();
			getToolTip(str);
		}
	}
	
	loadInfoGetProb.open("GET","AdminCompContent/StudentMirror/showCode.php?problem="+str+"&coverage="+cov + "&index=" + index,true);
	loadInfoGetProb.send();
}

function getToolTip2(str)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		loadToolTip=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		loadToolTip=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	loadToolTip.onreadystatechange=function()
	{
		if (loadInfoGetProb.readyState==4 && loadInfoGetProb.status==200)
		{
			var example = loadToolTip.responseText; 	
			document.getElementById("BugTesterDiv").title=example;
			document.getElementById("ProblemName").innerHTML=str;
		}
	}
	
	loadToolTip.open("GET","AdminCompContent/StudentMirror/getToolTip.php?problem="+str,true);
	loadToolTip.send();
}
//###################################################################################################//
//                                             Bugs found BF1000  	                             //
//###################################################################################################//
var AdminBugsFound = 0;

//This function is called in the initialize function below
//Precondition: Competition must be valid and student must be on a team
//Postcondition: Displays a team's bugs found
function getBugs()//Find Code ---------- BF1001
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		loadInfoGetBugs=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		loadInfoGetBugs=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	loadInfoGetBugs.onreadystatechange=function()
	{
		if (loadInfoGetBugs.readyState==4 && loadInfoGetBugs.status==200)
		{
			document.getElementById("BugsFoundText").innerHTML=loadInfoGetBugs.responseText;
		}
	}
	
	loadInfoGetBugs.open("GET","AdminCompContent/StudentMirror/getBugsFound.php",false);
	loadInfoGetBugs.send();
}

//Bug testing ---- BF1002
//---------------------------------------------------------------------------------------
//Comment About The Functions
function getBugTestInfo(str, str2)
{
	//alert("in getBugTestInfo");
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		loadBugTestInfo=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		loadBugTestInfo=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	loadBugTestInfo.onreadystatechange=function()
	{
		if (loadBugTestInfo.readyState==4 && loadBugTestInfo.status==200)
		{
			//alert(loadBugTestInfo.responseText);
			AdminBugsFound++;
			if (loadBugTestInfo.responseText.trim() == '1')// && !recentlyLoged)
			{
				bugFoundAnimation();
			}
			else
			{
				getProb(currProblem, coverage, currIndex);
				//recentlyLoged = false;
			}
			document.getElementById("testInput").value='';
			document.getElementById("testOutput").value='';
		}
	}
	
	loadBugTestInfo.open("GET","AdminCompContent/StudentMirror/testCaseText.php?testInput="+str +"&testOutput="+str2 + "&problemNum=" + currProblem + "&codeCov=" + coverage  ,true);
	loadBugTestInfo.send();
}

//###################################################################################################//
//                                             Competition C1000  	                                 //
//###################################################################################################//


//Bug Found Animation Video
////////////////////////////////////
var VideoInterval;
var PLAYING = false;
var videoEmbedCode = '<embed src="Flash/bugStomper.swf" width="75" height="50"></embed>';

function bugFoundAnimation()
{ 
	if (!PLAYING)
	{
		//alert("begin play");
		playVideo();
		VideoInterval = setInterval(playVideo,3750);
	}
}

function playVideo()
{
	if (!PLAYING)
	{
		//alert("play");
		document.getElementById("ProblemCode").innerHTML = swfCode;
		PLAYING = true;
	}
	else
	{
		getProb(currProblem, coverage, currIndex);
		//document.getElementById("ProblemCode").innerHTML="";
		PLAYING = false;
		clearInterval(VideoInterval);
	}
}

var swfCode = '';
swfCode += '<object classid="clsid27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="450" height="300" wmode="transparent">';
//Video Parameters
swfCode += '<param name="movie" value="bugstomper.swf" />';
swfCode += '<param name="quality" value="high" />';
//swfCode += '<param name="bgcolor" value="#ffffff" />';
swfCode += '<param name="play" value="true" />';
swfCode += '<param name="loop" value="false" />';
swfCode += '<param name="wmode" value="transparent" />';
swfCode += '<param name="scale" value="noborder" />';
swfCode += '<param name="menu" value="false" />';
swfCode += '<param name="devicefont" value="false" />';
swfCode += '<param name="salign" value="" />';
swfCode += '<param name="allowscriptaccess" value="sameDomain" />';
//Video Embed Code
swfCode += '<embed src="Flash/bugstomper.swf" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="450" height="300" wmode="transparent"></embed>';
swfCode += '</object>';


function scrollResultsDown(){
	document.getElementById("ResultsList").scrollTop =document.getElementById("ResultsList").scrollHeight;
}


function toggleCoverage(checkBoxObj)
{
	if(checkBoxObj.checked)
		coverage = 1;
	else 
		coverage = 0;

	getProb(currProblem, coverage, currIndex);
}