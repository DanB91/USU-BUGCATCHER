//General
//---------------------------------------------------------------------------------------

var hasFinished = 0;

function getWinningTeams()
{
  var compID;
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    getWinningTeams=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    getWinningTeams=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  getWinningTeams.onreadystatechange=function()
  {
    if (getWinningTeams.readyState==4 && getWinningTeams.status==200)
    {
      document.getElementById("header-winningteams").innerHTML=getWinningTeams.responseText;
    }
  }
  getWinningTeams.open("GET","StudentContent/showWinningTeam.php",true);
  getWinningTeams.send();
}

function getCompID()
{
  var compID;
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    getCompIDXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    getCompIDXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  getCompIDXML.onreadystatechange=function()
  {
    if (getCompIDXML.readyState==4 && getCompIDXML.status==200)
    {
      //document.getElementById("header-middle").innerHTML="<h1> Competition ID: " + displayCompIDXML.responseText + "</h1>";
	  return getCompIDXML.responseText;
    }
  }
  getCompIDXML.open("GET","StudentContent/getCompIDFromStudent.php",true);
  getCompIDXML.send();
}

function instantMessaging(message)
{
  var compTime;
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    instantMessagingXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    instantMessagingXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  instantMessagingXML.onreadystatechange=function()
  {
    if (instantMessagingXML.readyState==4 && instantMessagingXML.status==200)
    {
	   document.getElementById("ChatInput").value="";
    }
  }
  instantMessagingXML.open("GET","StudentContent/instantMessaging.php?string="+message,true);
  instantMessagingXML.send();
}

//Problems and Requirements
////////////////////////////////////////////////////////////////////

var currProblem = '';
var coverage = '';

function getReqAndProb(str, cov)
{
	getProb(str, cov);
	getReq(str);
	currProblem = str;
	coverage = cov;
}

function getReq(str)
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
	  if(hasFinished == 0)
	  {
		document.getElementById("RequirementsList").innerHTML=loadInfoGetReq.responseText;
	  }
	  else
	  {
		document.getElementById("RequirementsList").innerHTML="This competition has concluded";
	  }
    }
  }
  loadInfoGetReq.open("GET","StudentContent/showCodeReq.php?problem="+str,true);
  loadInfoGetReq.send();
}

function getProb(str, cov)
{
  
  //currProblem = str;
  
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
	  if(hasFinished == 0)
	  {
		document.getElementById("ProblemCode").innerHTML=loadInfoGetProb.responseText;
		prettyPrint();
	  }
	  else
	  {
		document.getElementById("ProblemCode").innerHTML="This competition has concluded";
	  }
    }
  }
  loadInfoGetProb.open("GET","StudentContent/showCode.php?problem="+str+"&coverage="+cov,true);
  loadInfoGetProb.send();
}

//Bug testing
//---------------------------------------------------------------------------------------
function getBugTestInfo(str, str2)
{
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
	  if(loadBugTestInfo.responseText == "OK")
	  {
		  alert(loadBugTestInfo.responseText);
		  //document.getElementById("ResultsList").innerHTML=loadBugTestInfo.responseText;
		  document.getElementById("testInput").value='';
		  document.getElementById("testOutput").value='';;
	  }
	  else
	  {
		alert(loadBugTestInfo.responseText);
		document.getElementById("testInput").value='';
	    document.getElementById("testOutput").value='';
		//updates the coverage if a bug is found
		getProb(currProblem, coverage);
	  }
    }
  }

  loadBugTestInfo.open("GET","StudentContent/testCaseText.php?testInput="+str +"&testOutput="+str2 + "&problemNum=" + currProblem,true);
  loadBugTestInfo.send();
}

//Code coverage
//---------------------------------------------------------------------------------------
function check()
{
	if(currProblem != '')
		getReqAndProb(currProblem, 'true');
	//alert ("Checked");
}

function unCheck()
{
	if(currProblem != '')
		getReqAndProb(currProblem, 'false');
	//alert("Unchecked");
}

//Bugs found
//---------------------------------------------------------------------------------------
var prevFound = 0;
function getBugs()
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
	  //alert(loadInfoGetBugs.responseText);
      document.getElementById("BugsFoundText").innerHTML=loadInfoGetBugs.responseText;
			if (prevFound != loadInfoGetBugs.responseText)
			{
				bugFoundAnimation();
				prevFound = loadInfoGetBugs.responseText;
			}
    }
  }
  //alert("This is a test" + str);
  
  loadInfoGetBugs.open("GET","StudentContent/getBugsFound.php",true);
  loadInfoGetBugs.send();
}


function recieve()
{
  //alert("recieving now");
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    loadInfoRecieve=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    loadInfoRecieve=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  loadInfoRecieve.onreadystatechange=function()
  {
    if (loadInfoRecieve.readyState==4 && loadInfoRecieve.status==200)
    {
       document.getElementById("ResultsList").innerHTML=loadInfoRecieve.responseText;
       document.getElementById("ResultsList").scrollTop = document.getElementById("ResultsList").scrollHeight;
    }
  }
  loadInfoRecieve.open("GET","StudentContent/recieve.php",true);
  loadInfoRecieve.send();
}

//Timer
////////////////////////////////////////////////////////
/*var m;
function initTime(compTime)
{
	var getCompTimeXML;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		getCompTimeXML=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
	  getCompTimeXML=new ActiveXObject("Microsoft.XMLHTTP");
	}

	m = 0;
	m=compTime; //minutes in a competition should be stored on the 4th line
	  
	//alert(id);

}
var s=0;
var timer_timeout;
var timer_is_on=0;

//take one off the time
function countdown()
{
	if(s == 0)
	{
		if(m == 0)
		{
			clearTimeout(timer_timeout);
			timer_is_on=0;
			document.getElementById('timer').innerHTML="STOP!";
		}
		else
		{
			document.getElementById('timer').innerHTML=leadingZero(m) + ":" + leadingZero(s);
			m=m-1;
			s=59;
		}
	}
	else 
	{
		document.getElementById('timer').innerHTML=leadingZero(m) + ":" + leadingZero(s);
		s=s-1;
	}
	timer_timeout=setTimeout("countdown()",1000);
}

//initialize the timer
function createTimer()
{
	if (!timer_is_on)
	{
		timer_is_on=1;
		countdown();
	}
}

//inserts leading zeroes on the numbers
function leadingZero(Time) 
{
    return (Time < 10) ? "0" + Time : + Time;
}
*/

function setCodeCoverageState()
{
	//alert("recieving now");
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    setCodeCoverageStateXml=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    setCodeCoverageStateXml=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  setCodeCoverageStateXml.onreadystatechange=function()
  {
    if (setCodeCoverageStateXml.readyState==4 && setCodeCoverageStateXml.status==200)
    {
       if(setCodeCoverageStateXml.responseText != "SET")
	   {
			//alert("The admin has disabled code coverage");
			document.getElementById("radio1").disabled = true;
			document.getElementById("radio2").disabled = true;
	   }
    }
  }
  setCodeCoverageStateXml.open("GET","StudentContent/codeCoverageState.php",true);
  setCodeCoverageStateXml.send();
}
//Competition
//////////////////////////////////////////////////////////////////
var t1;
var t2;
var t3;
var t4;

function hasCompStarted()
{

	//alert("recieving now");
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    sethasCompStartedXml=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    sethasCompStartedXml=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  sethasCompStartedXml.onreadystatechange=function()
  {
    if (sethasCompStartedXml.readyState==4 && sethasCompStartedXml.status==200)
    {
		//alert(sethasCompStartedXml.responseText);
       if(sethasCompStartedXml.responseText == 1)
	   {
			//alert("The admin has disabled code coverage");
			document.getElementById("testforBug").disabled = false;
			document.getElementById("testInput").disabled = false;
			document.getElementById("testOutput").disabled = false;
			clearInterval(t1);
			currProblem = 1;
			getProb(currProblem);
			getCompID();
			createTimer();
	   }
	   else
	   {
			//alert(sethasCompStartedXml.responseText);
			document.getElementById("testforBug").disabled = true;
			document.getElementById("testInput").disabled = true;
			document.getElementById("testOutput").disabled = true;
	   }
    }
  }
  sethasCompStartedXml.open("GET","StudentContent/checkCompStart.php",true);
  sethasCompStartedXml.send();

}

function stopComp()
{

		//alert("recieving now");
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    stopCompXml=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    stopCompXml=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  stopCompXml.onreadystatechange=function()
  {
    if (stopCompXml.readyState==4 && stopCompXml.status==200)
    {
			//alert(stopCompXml.responseText);
			document.getElementById("testforBug").disabled = true;
			document.getElementById("testInput").disabled = true;
			document.getElementById("testOutput").disabled = true;
			hasFinished = 1;
			getReqAndProb(currProblem);
    }
  }
  stopCompXml.open("GET","StudentContent/stopCompOnEnd.php",true);
  stopCompXml.send();


}


function checkCompFinished()
{
	
		//alert("recieving now");
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    checkCompFinishedXml=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    checkCompFinishedXml=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  checkCompFinishedXml.onreadystatechange=function()
  {
    if (checkCompFinishedXml.readyState==4 && checkCompFinishedXml.status==200)
    {
		//alert(checkCompFinishedXml.responseText);
       if(checkCompFinishedXml.responseText == 0)
	   {
			//alert("The admin has disabled code coverage");
			document.getElementById("testforBug").disabled = false;
			document.getElementById("testInput").disabled = false;
			document.getElementById("testOutput").disabled = false;
	   }
	   else
	   {
			//alert(checkCompFinishedXml.responseText);
			document.getElementById("testforBug").disabled = true;
			document.getElementById("testInput").disabled = true;
			document.getElementById("testOutput").disabled = true;
			clearInterval(t1);
			clearInterval(t2);
			clearInterval(t3);
			document.getElementById("ResultsList").innerHTML="This competition has concluded";
			hasFinished = 1;
			getReqAndProb(currProblem);
	   }
    }
  }
  checkCompFinishedXml.open("GET","StudentContent/hasCompFinished.php",true);
  checkCompFinishedXml.send();
	
}

//Initialization - all things that need to be done onLoad go here
//////////////////////////////////////////////////
function initialize()
{
	setCodeCoverageState();
    prettyPrint();
	//getBugs();
	createStudentTimer();
	t2 = setInterval(getBugs,3000);
	t5 = setInterval(getWinningTeams, 6000);
	t1 = setInterval(hasCompStarted, 500);
	t3 = setInterval(recieve,500);
	t4 = setInterval(pingServer,500);
	checkCompFinished();
}

//Server Ping
////////////////////////////////////////////////
var pingCount = 0;

function pingServer()
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		pingXML=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		pingXML=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	
	
	pingXML.onreadystatechange=function()
	{
		if (pingXML.readyState==4 && pingXML.status==200)
		{
		}
	}
	
	pingCount++;
	pingXML.open("GET","PingImpl.php?pingCount="+pingCount,true);
	pingXML.send();
}

//Bug Found Animation Video
//////////////////////////////////////
var VideoInterval;
var PLAYING = false;
var videoEmbedCode = '<embed src="Flash/bugStomper.swf" width="75" height="50"></embed>';

function bugFoundAnimation()
{ 
	if (!PLAYING)
	{
		playVideo();
		VideoInterval = setInterval(playVideo,4000);
	}
}

function playVideo()
{
	if (!PLAYING)
	{
		//var videoCode = "";
		//document.getElementById("video").innerHTML=videoEmbedCode;
		//swfobject.embedSWF("bugStomper.swf", "video", "75", "50", "9.0.0");
		document.getElementById("ProblemCode").innerHTML = swfCode;
		PLAYING = true;
	}
	else
	{
		getProb(currProblem);
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