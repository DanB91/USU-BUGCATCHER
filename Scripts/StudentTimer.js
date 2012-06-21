//Variable for the student's timer
var minutes;
var seconds = 0;
var studentTimer;
var STOPPED = true;
var PAUSED = false;
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
	$.ajax({type: "GET", url:"StudentContent/updateStudentTimer.php", success:function(time){
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
	    }
	    if(time < 0001)//Check if comp has finished
	    {
		    checkCompFinished();
		    $("#timer").html("STOP!");
	    }
	}});
}