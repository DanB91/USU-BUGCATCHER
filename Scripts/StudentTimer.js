//Variable for the student's timer
var minutes;
var seconds = 0;
var studentTimer;
var STOPPED = true;
var PAUSED = false;
var timer_compID;
var timeCount = 0;
var currentTime = 3;
var previousTime = 0;
var lastTimeChecked = 0;

//Sets the interval for getting the competition time from the server.
function createStudentTimer()
{
	studentTimer = setInterval(function() {getTime();},100);
}

//Get the current competition time from the server and displays it
function getTime()
{
	/*var getTimeXML;
	
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		getTimeXML=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		getTimeXML=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	getTimeXML.onreadystatechange=function()
	{
		if (getTimeXML.readyState==4 && getTimeXML.status==200)
		{
			var time = getTimeXML.responseText;*/
    //getTimeXML.open("GET","StudentContent/updateStudentTimer.php?compID="+timer_compID,true);
	$.ajax({type: "GET", url:"StudentContent/updateStudentTimer.php", data: "compID="+timer_compID, success:function(time){
	    currentTime = time;
	    if(currentTime-lastTimeChecked >= 30)
	    {
		    lastTimeChecked = currentTime;
		    if(previousTime == currentTime && !PAUSED)
		    {
			    PAUSED = true;
			    document.getElementById("testforBug").disabled = true;
			    document.getElementById("testInput").disabled = true;
			    document.getElementById("testOutput").disabled = true;
		    }
		    else
		    {
			    if(PAUSED)
			    {
				    PAUSED = false;
				    previousTime = currentTime;
				    document.getElementById("testforBug").disabled = false;
				    document.getElementById("testInput").disabled = false;
				    document.getElementById("testOutput").disabled = false;
			    }
		    }
	    }
	    if (time.length)
	    {
		    seconds = time.substring(time.length-2,time.length);
		    minutes = time.substring(0,time.length-2);
		    $("#timer").html(minutes+":"+seconds);
		    //document.getElementById("timer").innerHTML=minutes+":"+seconds;
	    }
	    else
	    {
	    //A competition has not been created.
	    }
	    if(time < 0001)//Check if comp has finished
	    {
		    checkCompFinished();
		    $("#timer").html("STOP!");
		    //document.getElementById("timer").innerHTML="STOP!";
	    }
	}});
	/*	}
	}
	
	getTimeXML.open("GET","StudentContent/updateStudentTimer.php?compID="+timer_compID,true);
	getTimeXML.send();	*/
}