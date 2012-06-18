//Timer variables
var minutes;
var seconds=0;
var adminTimer;
var timer_timeout;
var STOPPED = true;
var PAUSED = false;

//Starts or unpauses the timer for the competition.
function startTimerCD()
{
	if (STOPPED || (!STOPPED && PAUSED))
	{
		adminTimer = setInterval(function() {countdown();},1000);
		STOPPED = false;
		PAUSED = false;
	}
}

//Pauses the timer for the competition.
function pauseTimerCD()
{
	if (!PAUSED && !STOPPED)
	{
		clearInterval(adminTimer);
		$('#header-controls').html('<img src="Images/start.gif" height="50" width="50" onclick=startCompetition(); />');
		PAUSED = true;
	}
}

//Counts down the competition timer.
function countdownCD()
{
  seconds--;
  if (seconds < 0)
  {
    seconds = 59;
    minutes--;
  }
  
  if (minutes < 0)
  {
    clearInterval(adminTimer);
    minutes = 0;
    seconds = 0;
    $('#header-timer').html("STOP!");
  }
  else
  {
    $('#header-timer').html(leadingZero(minutes) + ":" + leadingZero(seconds));
    updateTimer();
  }
}

//AJAX--Sets the initial value/time of the timer.
function setTimerCD()
{
	/*if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	setTimerXML = new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
	setTimerXML = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	setTimerXML.onreadystatechange=function()
	{
		if (setTimerXML.readyState == 4 && setTimerXML.status == 200)
		{*/
    $.ajax({type: "GET", url:"AdminCompContent/setCountdownTimer.php", data: "compID="+compSetID+"&time="+compSetTime, success:function(result){
			//alert(setTimerXML.responseText);
    }});
		/*}
	}
	
	setTimerXML.open("GET","AdminCompContent/setCountdownTimer.php?compID="+compSetID+"&time="+compSetTime,true);
	setTimerXML.send();*/
}

//AJAX--Updates the competition timer file to sync with the admin.
function updateTimerCD()
{
	/*if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
    updateTimerXML = new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
    updateTimerXML = new ActiveXObject("Microsoft.XMLHTTP");
	}*/
	
	var TimerUpdateVars = "compID=" + compSetID + "&minutes=" + minutes + "&seconds=" + seconds;
	$.ajax({type: "GET", url:"AdminCompContent/updateCountdownTimer.php", data: TimerUpdateVars, success:function(){
	}});
	/*updateTimerXML.open("GET","AdminCompContent/updateCountdownTimer.php?"+TimerUpdateVars,true);
	updateTimerXML.send();*/
}

//Initializes the timer.
function createTimerCD()
{
	STOPPED = true;
	PAUSED = true;
	minutes=compSetTime;
	seconds=0;
	$('#header-timer').html(leadingZero(minutes) + ":" + leadingZero(seconds));
	setTimer();
}

//Inserts leading zeroes on the minutes and seconds for the timer
function leadingZeroCD(timeValue)
{
  if (timeValue < 10)
  {
    return "0"+timeValue;
  }
  return timeValue;
}