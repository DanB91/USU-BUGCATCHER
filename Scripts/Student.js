/* 
   Table of Contents
   1.	Global Variables ---------- GV1000
   1.2 currProblem		      ---------- GV1002
   1.3 coverage			  ---------- GV1003
   1.4 prevFound			  ---------- GV1004
   1.5 t1					  ---------- GV1005
   1.7 t3					  ---------- GV1007
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
   4.2 getBugTestInfo		  ---------- BF1002
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


//Problems and requirements
var currProblem = ''; //Find Code ---------- GV1002
var coverage = 0;	  //Find Code ---------- GV1003

//Bugs found
var prevFound = 0;	  //Find Code ---------- GV1004

//Competition
var t1;		 		  //Find Code ---------- GV1005
var t3;				  //Find Code ---------- GV1007

var PopUpShowingClass = "";

//Server ping
var pingCount = 0;	  //Find Code ---------- GV1009

var probNames;
var currIndex;

var recentlyLogged = true;
var countDownState = 0;

var custTName;
var doScrollDown = false;

//###################################################################################################//
//                                             General G1000                                         //
//###################################################################################################//

//This function is called in the initialize function below
//Precondition: Student must be in a valid competition
//Postcondition: Lists the top three teams on the student side
function getWinningTeams()//Find Code ---------- G1001
{      
    $.post('StudentContent/showWinningTeams.php', "", 
        function(html){
            $("#header-winningteams").html(html);
        });
}

//Precondition: Student must be on a team 
//Postcondition: Pushes the message to the appropriate team content file.
function instantMessaging(message)//Find Code ---------- G1003
{
    $.post('StudentContent/instantMessging.php', "string="+message, 
        function(html){
            document.getElementById("ChatInput").value="";
        });			
}

//This function is called in the initialize function below
//Precondition: Student must be on a team and competition must be valid
//Postcondition: Recieves the team content file and displays the contents
function recieve()//Find Code ---------- G1004
{
        $.ajax({type: "GET", url:"StudentContent/recieve.php", success:
        function(html){
            		var arr = JSON.parse(html);
			$("#ResultsList").html(arr[0]);//format(arr));
			if(doScrollDown)
				scrollResultsDown();
        }});
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

		for(i=arr.length-j; i>j&&!swapped; i-=2)
		{
			if(arr[i]<arr[i-2]){
				swapped=true;
				temp=arr[i];
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

//This function is called in the initialize function below
//Precondition: Competition must be valid
//Postcondition: Disables the radio buttons if code coverage is disabled
function setCodeCoverageState()//Find Code ---------- G1005
{
    $.post('StudentContent/codeCoverageState.php', "", 
        function(html){
            if (html.trim() != "SET")
            {
                $("#Coverage").attr("disabled", true);
            }
        });	
}

function loadStudentProblems()
{
    $.post('StudentContent/loadStudProbs.php', "", 
        function(html){
            var arr = eval(html);
            probNames = arr;
            numberOfProblems = arr[0];
            var numberOfColumns = Math.floor((numberOfProblems/10));
            var lastProblemIndex = ((numberOfProblems-1)%10)+1;

            if (numberOfProblems%10 != 0)
            {
                numberOfColumns++;
            }
                        
            var problemLists = new Array();
            var outputString = "";
                        
            for (var h=0; h<numberOfColumns; h++)
            {
                problemLists[h] = "<ul>\n";		
                for (var k=0; k<10; k++)
                {
                    if(h == numberOfColumns-1 && k == lastProblemIndex)
                    {
                        k = 10;
                    }
                    else
                    {
                        var problemNumber = ((10*h)+k+1);
                        problemLists[h] += "  <li><a href='JavaScript:getReqAndProb("+problemNumber;
                        problemLists[h] += ", Coverage.checked);' >"+problemNumber+". "+probNames[problemNumber]+"</a></li>\n";
                    }
                }

                problemLists[h] += "</ul>\n\n";
                outputString += problemLists[h];
            }
            PopUpShowingClass = "showing-"+numberOfColumns+"col";
            $("#PopUpArea").html(outputString);
        });
}

function displayHelp()
{
	/*
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
	   */
}

//###################################################################################################//
//                                     Problems and Requirements PR1000                              //
//###################################################################################################//

var HIDDEN=true;

//
function showProblemsList()
{
	if (HIDDEN && ! document.getElementById("testforBug").disabled)
	{
		$("#PopUpArea").attr("class","PUA-"+PopUpShowingClass);
		$("#PopUpArea").attr("className","PUA-"+PopUpShowingClass);
		//$("#Background_Tinted").attr("class","BT-"+PopUpShowingClass);
		//$("#Background_Tinted").attr("className","BT-"+PopUpShowingClass);
		HIDDEN=false;
	}
	else
	{
		$("#PopUpArea").attr("class","PUA-hidden");
		$("#PopUpArea").attr("className","PUA-hidden");
		//$("#Background_Tinted").attr("class","BT-hidden");
		//$("Background_Tinted").attr("className","BT-hidden");
		HIDDEN=true;
	}
}

//This function is referenced in Student.html
//This function takes the problem number as a string such as problem1, problem2, and so on. 
//The function also takes a bool, cov, true if coverage is enabled false otherwise
//Precondition: Problem and coverage files must exist
//Postcondition: The appropriate functions are called to set up the problems that will be seen by the students.
function getReqAndProb(index, cov)//Find Code ---------- PR1001
{
	if(index){
	    currProblem = probNames[index];
	    coverage = 0;//cov;
	    currIndex = index;
	    getProb(probNames[index], cov, index);
	    getReq(probNames[index], index);
	}
}

//This function is called in the function getReqAndProb look up 
//Precondition: Competition must be valid and started
//Postcondition: Displays the requirements of the problem that was selected.
function getReq(str, index)//Find Code ---------- PR1002
{
    $.post('StudentContent/showCodeReq.php', "problem="+str + "&index=" + index, 
        function(html){
             $("#RequirementsList").html(html);
        });
}

//This function is called in the function getReqAndProb look up 
//Precondition: Competition must be valid and started
//Postcondition: Displays the problem that the student selected
function getProb(str, cov, index)//Find Code ---------- PR1003
{
    
    $.post('StudentContent/showCode.php', "problem="+currProblem+"&coverage="+coverage + "&index=" + currIndex, 
        function(html){
	    $("#ProblemCode").html("<pre class='prettyprint lang-java linenums'>"+html+"</pre>");
	    $("#ProblemName").html(probNames[index]);
	    prettyPrint();
	    getToolTip(currProblem);
        });
	
}

function getToolTip(str)

{
    $.post('StudentContent/getToolTip.php', "problem="+str, 
        function(html){	
            $("#BugTesterDiv").attr("title",html);
            $("#ProblemName").html(str);
        });


}

//###################################################################################################//
//                                             Bugs found BF1000  	                             //
//###################################################################################################//


//This function is called in the initialize function below
//Precondition: Competition must be valid and student must be on a team
//Postcondition: Displays a team's bugs found
function getBugs()//Find Code ---------- BF1001
{
    $.post('StudentContent/getBugsFound.php', "", 
        function(html){
            $("#BugsFoundText").html(html);

        });
}

//Bug testing ---- BF1002
//---------------------------------------------------------------------------------------
function getBugTestInfo(str, str2)
{
    
    $.post('StudentContent/testCaseText.php', "testInput="+str +"&testOutput="+str2 + "&problemNum=" + currProblem + "&codeCov=" + coverage, 
        function(html){
            getBugs();     
            alert(html);
            if (html.trim() == '1' && !recentlyLogged)
            {
                bugFoundAnimation();
            }
            else
            {
                getProb(currProblem, coverage, currIndex);
                recentlyLogged = false;
            }

            $("#testInput").val('');
            $("#testOutput").val('');
        });


}

//###################################################################################################//
//                                             Competition C1000  	                                 //
//###################################################################################################//

function getAniState()
{
    $.post('StudentContent/getAniState.php', "", 
        function(html){	
            countDownState = html;
        });
}

//This function is called in the initialize function below
function hasCompStarted()//Find Code ---------- C1001
{
    //Precondition: Competition must be valid
    //Postcondition: Checks to see if the competition has started and sets up the competition if the response text = 1
    $.post('StudentContent/checkCompStart.php', "", 
        function(html){	
            if(html.trim() == 1)
            {

                clearInterval(t1);

                if(countDownState != 0)
                {
                    playCountAni(); 
                }
                else
                {
                    $("#testforBug").attr("disabled", false);
                    $("#testInput").attr("disabled", false);
                    $("#testOutput").attr("disabled", false);
                    $("#ProblemCode").html ("The competition has started please select a problem.");
                }
            }
            else
            {
                $("#testforBug").attr("disabled", true);
                $("#testInput").attr("disabled", true);
                $("#testOutput").attr("disabled", true);
		$("#ProblemCode").html ("The competition has not yet started.");
            }
        });
}

function playCountAni()
{
    $.post('StudentContent/compareTime.php', "", 
        function(html){	
            if (html.trim() == '1')
            {
                countAnimation();
            }
        });
}

function compHasFinished()//Find Code ---------- C1003
{
    $("#testforBug").attr("disabled", true);
    $("#testInput").attr("disabled", true);
    $("#testOutput").attr("disabled", true);
    clearInterval(t1);
    clearInterval(t3);
    $("#ResultsList").html("This competition has concluded");
    $("#RequirementsList").html("This competition has concluded");
    $("#ProblemCode").html("This competition has concluded");
    $("#timer").html("STOP!");
}

function changeOnLogID()
{
    $.post('StudentContent/onLogCookiesChange.php', "", 
        function(html){	
        });
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
	//prettyPrint();
	t6 = setInterval(getBugs, 1000);
	createStudentTimer();
	t5 = setInterval(getWinningTeams, 6000);
	t3 = setInterval(recieve,1000);
	t1 = setInterval(hasCompStarted, 2000);
	getAniState();
	setInterval(getCurrentTeam, 15000);
        getCurrentTeam();
}


//###################################################################################################//
//                                            Server Ping SP1000                                     //
//###################################################################################################//


//Pings the server at a given interval to indicate user account activity
//Precondition: Student must be loged in
//Postcondition: Pings the server to check if the student is active
/*
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
*/

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
		//alert("play");
		$("#ProblemCode").html (swfCode);
		PLAYING = true;
	}
	else
	{
		getProb(currProblem, coverage, currIndex);
		//$("#ProblemCode").html("");
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
		$("#ProblemCode").html ( swfCodeCount);
		PLAYINGCOUNT = true;
	}
	else
	{
		$('#ProblemCode').html("The competition has started please select a problem.");
		document.getElementById("testforBug").disabled = false;
		document.getElementById("testInput").disabled = false;
		document.getElementById("testOutput").disabled = false;

		PLAYINGCOUNT = false;
		clearInterval(VideoIntervalCount);
	}
}

function scrollResultsDown(){
	document.getElementById("ResultsList").scrollTop =document.getElementById("ResultsList").scrollHeight;
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


function getCurrentTeam()
{
    $.post('StudentContent/teamName.php', "", 
        function(html){	
            $("#smallerHeader").html (html);
        });
}

function toggleCoverage(checkBoxObj)
{
	if(checkBoxObj.checked)
		coverage = 1;
	else 
		coverage = 0;

	getProb(currProblem, coverage, currIndex);

}
