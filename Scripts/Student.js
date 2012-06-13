/* 
Table of Contents
	1.	Global Variables ---------- GV1000
		1.1 hasFinished			  ---------- GV1001
		1.2 currProblem		      ---------- GV1002
		1.3 coverage			  ---------- GV1003
		1.4 prevFound			  ---------- GV1004
		1.5 t1					  ---------- GV1005
        1.7 t3					  ---------- GV1007
		1.8 t4				      ---------- GV1008
		1.9 pingCount		      ---------- GV1009
	2.  General 		---------- G1000 
		2.1 getWinningTeams		  ---------- G1001
		2.3 instantMessaging	  ---------- G1003
		2.4 recieve				  ---------- G1004
		2.5 setCodeCoverageState  ---------- G1005
	3.  Probs and Reqs  ---------- PR1000
		3.1 getReqAndProb		  ---------- PR1001
		3.2 getReq				  ---------- PR1002
		3.3 getProb				  ---------- PR1003
	4.  Bugs found 				  ---------- BF1000
		4.1 getBugs				  ---------- BF1001
		4.2 getBugTestInfo			  ---------- BF1002
	5.  Competition     ---------- C1000
		5.1 hasCompStarted		  ---------- C1001
		5.2 stopComp			  ---------- C1002
		5.3 checkCompFinished	  ---------- C1003
	6.  Initialization  ---------- I1000
		6.1 initialize			  ---------- I1001
	7.  Server Ping 	---------- SP1000 
		7.1 pingServer		      ---------- SP1001
*/

//###################################################################################################//
//                                         Global Variables GV1000                                   //
//###################################################################################################//

var hasFinished = 0;  //Find Code ---------- GV1001

//Problems and requirements
var currProblem = ''; //Find Code ---------- GV1002
var coverage = 0;	  //Find Code ---------- GV1003

//Bugs found
var prevFound = 0;	  //Find Code ---------- GV1004

//Competition
var t1;		 		  //Find Code ---------- GV1005
var t3;				  //Find Code ---------- GV1007
var t4;			      //Find Code ---------- GV1008

//Server ping
var pingCount = 0;	  //Find Code ---------- GV1009

var probNames;
var currIndex;

var recentlyLoged = true;
var countDownState = 0;

//###################################################################################################//
//                                             General G1000                                         //
//###################################################################################################//

//This function is called in the initialize function below
//Precondition: Student must be in a valid compeition
//Postcondition: Lists the top three teams on the student side
function getWinningTeams()//Find Code ---------- G1001
{
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
  getWinningTeams.open("GET","StudentContent/showWinningTeams.php",true);
  getWinningTeams.send();
}

//Precondition: Student must be on a team 
//Postcondition: Pushes the message to the appropriate team content file.
function instantMessaging(message)//Find Code ---------- G1003
{
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

//This function is called in the initialize function below
//Precondition: Student must be on a team and compeition must be valid
//Postcondition: Recieves the team content file and displays the contents
function recieve()//Find Code ---------- G1004
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
    }
  }
  loadInfoRecieve.open("GET","StudentContent/recieve.php",true);
  loadInfoRecieve.send();
}

//This function is called in the initialize function below
//Precondition: Competition must be valid
//Postcondition: Disables the radio buttons if code coverage is disabled
function setCodeCoverageState()//Find Code ---------- G1005
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

function loadStudentProblems()
{
  
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlloadStudentProblems=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlloadStudentProblems=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xmlloadStudentProblems.onreadystatechange=function()
  {
    if (xmlloadStudentProblems.readyState == 4 && xmlloadStudentProblems.status == 200)
    {
            //document.getElementById('SelectedProblems').innerHTML=xmlloadStudentProblems.responseText;
            //alert(xmlloadStudentProblems.responseText);
            var arr = eval(xmlloadStudentProblems.responseText);
            probNames = arr;


            for(var i = 1; i <= arr[0]; i++)
            {
                document.getElementById("Prob" + i).innerHTML = arr[i];
            }           
            
            if(arr[0] < 5)
            {
               
               var t = 5 - arr[0];
               t = 5 - t + 1;
               for(var notInUse = t; notInUse <= 5; notInUse++)
               {
                   document.getElementById("Prob" + notInUse).innerHTML = "<p></p>";
                   document.getElementById("P" + notInUse).innerHTML = '<a class="navMiddle" href="#"><p></p></a>';
               }
            }
    }
  }
  
  xmlloadStudentProblems.open("GET","StudentContent/loadStudProbs.php",true);
  xmlloadStudentProblems.send();
}

function displayHelp()
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    displayHelpXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    displayHelpXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  displayHelpXML.onreadystatechange=function()
  {
    if (displayHelpXML.readyState==4 && displayHelpXML.status==200)
    {
	document.getElementById("ProblemCode").innerHTML="<pre class='prettyprint lang-java linenums'>"+displayHelpXML.responseText+"</pre>";
	prettyPrint();
    }
  }
  displayHelpXML.open("GET","StudentContent/showHelp.php?",true);
  displayHelpXML.send();
}

//###################################################################################################//
//                                     Problems and Requirements PR1000                              //
//###################################################################################################//

//This function is referenced in Student.html
//This function takes the problem number as a string such as problem1, problem2, and so on. 
//The function also takes a bool, cov, true if coverage is enabled false otherwise
//Precondition: Problem and coverage files must exist
//Postcondition: The appropriate functions are called to set up the problems that will be seen by the students.
function getReqAndProb(index, cov)//Find Code ---------- PR1001
{
    
        //alert(probNames[index]);
	getProb(probNames[index], cov, index);
	getReq(probNames[index], index);
	currProblem = probNames[index];
	coverage = 0;//cov;
        currIndex = index;
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
  loadInfoGetReq.open("GET","StudentContent/showCodeReq.php?problem="+str + "&index=" + index,true);
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
	  if(hasFinished == 0)
	  {
		document.getElementById("ProblemCode").innerHTML="<pre class='prettyprint lang-java linenums'>"+loadInfoGetProb.responseText+"</pre>";
		prettyPrint();
	  }
	  else
	  {
		document.getElementById("ProblemCode").innerHTML="This competition has concluded";
	  }
    }
  }
  //alert(cov);
  loadInfoGetProb.open("GET","StudentContent/showCode.php?problem="+str+"&coverage="+cov + "&index=" + index,true);
  loadInfoGetProb.send();
}

//###################################################################################################//
//                                             Bugs found BF1000  	                             //
//###################################################################################################//


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
      
      
            if (prevFound != loadInfoGetBugs.responseText && !recentlyLoged)
            {
                 bugFoundAnimation();
                 prevFound = loadInfoGetBugs.responseText;
            }
            else
            {
                 recentlyLoged = false;
                 prevFound = loadInfoGetBugs.responseText;
            }
    }
  }
  
  loadInfoGetBugs.open("GET","StudentContent/getBugsFound.php",true);
  loadInfoGetBugs.send();
}

//Bug testing ---- BF1002
//---------------------------------------------------------------------------------------
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
            alert(loadBugTestInfo.responseText);
            getBugs();
            document.getElementById("testInput").value='';
            document.getElementById("testOutput").value='';
	   
    }
  }

  loadBugTestInfo.open("GET","StudentContent/testCaseText.php?testInput="+str +"&testOutput="+str2 + "&problemNum=" + currProblem ,true);
  loadBugTestInfo.send();
}

//###################################################################################################//
//                                             Competition C1000  	                                 //
//###################################################################################################//

function getAniState()
{
 
    if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    getAniStateXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    getAniStateXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  getAniStateXML.onreadystatechange=function()
  {
    if (getAniStateXML.readyState==4 && getAniStateXML.status==200)
    {
           //alert(getAniStateXML.responseText);
           countDownState = getAniStateXML.responseText;
    }
  }

  getAniStateXML.open("GET","StudentContent/getAniState.php", true);
  getAniStateXML.send();
 
}

//This function is called in the initialize function below
function hasCompStarted()//Find Code ---------- C1001
//Precondition: Compeition must be valid
//Postcondition: Checks to see if the competition has started and sets up the competition if the response text = 1
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
                   
                    clearInterval(t1);
                    
                    if(countDownState != 0)
                    {
                        playCountAni(); 
                    }
                    else
                    {
                        document.getElementById("testforBug").disabled = false;
                        document.getElementById("testInput").disabled = false;
                        document.getElementById("testOutput").disabled = false;
                        document.getElementById('ProblemCode').innerHTML= "The competition has started please select a problem.";
                    }
	   }
	   else
	   {
                    document.getElementById("testforBug").disabled = true;
                    document.getElementById("testInput").disabled = true;
                    document.getElementById("testOutput").disabled = true;
	   }
    }
  }
  sethasCompStartedXml.open("GET","StudentContent/checkCompStart.php",true);
  sethasCompStartedXml.send();

}

function playCountAni()
{
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        playCountAniXml=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        playCountAniXml=new ActiveXObject("Microsoft.XMLHTTP");
    }

    playCountAniXml.onreadystatechange=function()
    {
        if (playCountAniXml.readyState==4 && playCountAniXml.status==200)
        {
                //alert(playCountAniXml.responseText);
            if(playCountAniXml.responseText == '1')
            {
                 countAnimation();                  
            }
           
        }
    }
    playCountAniXml.open("GET","StudentContent/compareTime.php",true);
    playCountAniXml.send();
}

function stopComp()//Find Code ---------- C1002
//Precondition: Competition must be valid and time must be 0
//Postcondition: Stops the competition
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
			getReqAndProb(currProblem, coverage);
    }
  }
  stopCompXml.open("GET","StudentContent/stopCompOnEnd.php",true);
  stopCompXml.send();


}

function checkCompFinished()//Find Code ---------- C1003
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
			clearInterval(t3);
			document.getElementById("ResultsList").innerHTML="This competition has concluded";
			hasFinished = 1;
			getReqAndProb(currProblem, coverage);
	   }
    }
  }
  checkCompFinishedXml.open("GET","StudentContent/hasCompFinished.php",true);
  checkCompFinishedXml.send();
	
}

function changeOnLogID()
{
    if (window.XMLHttpRequest)
    {
      changeOnLogIDXML = new XMLHttpRequest();
    }
    else
    {
      changeOnLogIDXML = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    changeOnLogIDXML.onreadystatechange=function()
    {
      if (changeOnLogIDXML.readyState == 4 && changeOnLogIDXML.status == 200)
      {
        
        
      }
    }
    changeOnLogIDXML.open("GET","StudentContent/onLogCookiesChange.php",true);
    changeOnLogIDXML.send();
}

//###################################################################################################//
//                Initialization - all things that need to be done onLoad go here I000	             //
//###################################################################################################//

//This function is referenced in Student.html
//Precondition: None
//Postcondtion: Sets up the student side
function initialize()//Find Code ---------- I1000
{
        loadStudentProblems();
	setCodeCoverageState();
        prettyPrint();
	getBugs();
	createStudentTimer();
        t5 = setInterval(getWinningTeams, 6000);
	t3 = setInterval(recieve,500);
	t4 = setInterval(pingServer,500);
        t1 = setInterval(hasCompStarted, 500);
	checkCompFinished();
        getAniState();
}


//###################################################################################################//
//                                            Server Ping SP1000                                     //
//###################################################################################################//


//Pings the server at a given interval to indicate user account activity
//Precondition: Student must be loged in
//Postcondition: Pings the server to check if the student is active
function pingServer()//Find Code ---------- SP1001
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
////////////////////////////////////
var VideoInterval;
var PLAYING = false;
var videoEmbedCode = '<embed src="Flash/bugStomper.swf" width="75" height="50"></embed>';

function bugFoundAnimation()
{ 
	if (!PLAYING)
	{
		playVideo();
		VideoInterval = setInterval(playVideo,3750);
	}
}

function playVideo()
{
    
	if (!PLAYING)
	{
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


//Count Down Animation Video
//////////////////////////////////////
var VideoIntervalCount;
var PLAYINGCOUNT = false;
var videoEmbedCodeCount = '<embed src="Flash/countdownTimer.swf" width="75" height="50"></embed>';

function countAnimation()
{ 
        
	if (!PLAYINGCOUNT)
	{
		playVideoCount();
		VideoIntervalCount = setInterval(playVideoCount,9900);
	}
}

function playVideoCount()
{
        
	if (!PLAYINGCOUNT)
	{
		//var videoCode = "";
		//document.getElementById("video").innerHTML=videoEmbedCode;
		//swfobject.embedSWF("bugStomper.swf", "video", "75", "50", "9.0.0");
		document.getElementById("ProblemCode").innerHTML = swfCodeCount;
		PLAYINGCOUNT = true;
	}
	else
	{
		document.getElementById('ProblemCode').innerHTML= "The competition has started please select a problem.";
                document.getElementById("testforBug").disabled = false;
                document.getElementById("testInput").disabled = false;
                document.getElementById("testOutput").disabled = false;
                    
		PLAYINGCOUNT = false;
		clearInterval(VideoIntervalCount);
	}
}

function scrollResultsDown(){
    document.getElementById("ResultsList").scrollTop = document.getElementById("ResultsList").scrollHeight;
}

var swfCodeCount = '';
swfCodeCount += '<object classid="clsid27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="450" height="300" wmode="transparent">';
//Video Parameters
swfCodeCount += '<param name="movie" value="countdownTimer.swf" />';
swfCodeCount += '<param name="quality" value="high" />';
//swfCode += '<param name="bgcolor" value="#ffffff" />';
swfCodeCount += '<param name="play" value="true" />';
swfCodeCount += '<param name="loop" value="false" />';
swfCodeCount += '<param name="wmode" value="transparent" />';
swfCodeCount += '<param name="scale" value="noborder" />';
swfCodeCount += '<param name="menu" value="false" />';
swfCodeCount += '<param name="devicefont" value="false" />';
swfCodeCount += '<param name="salign" value="" />';
swfCodeCount += '<param name="allowscriptaccess" value="sameDomain" />';
//Video Embed Code
swfCodeCount += '<embed src="Flash/countdownTimer.swf" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="450" height="300" wmode="transparent"></embed>';
swfCodeCount += '</object>';
