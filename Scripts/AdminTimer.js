//Timer variables
var minutes;
var seconds=0;
var adminTimer;
var timer_timeout;
var STOPPED = true;
var PAUSED = false;
var COUNTINGDOWN = false;

//Starts or unpauses the timer for the competition.
function startTimer()
{
	if (STOPPED || (!STOPPED && PAUSED))
	{
		adminTimer = setInterval(function() {countdown();},1000);
		STOPPED = false;
		PAUSED = false;
	}
}

//Pauses the timer for the competition.
function pauseTimer()
{
	if (!PAUSED && !STOPPED && !COUNTINGDOWN)
	{
		clearInterval(adminTimer);
		document.getElementById('header-controls').innerHTML = '<img title="Start Competition" src="Images/start.png" height="79" width="107" onclick=startCompetition(); />';
		PAUSED = true;
	}
}

//Counts down the competition timer.
function countdown()
{
  seconds--;
  if (seconds < 0)
  {
    seconds = 59;
    minutes--;
    COUNTINGDOWN = false;
  }
  if (minutes < 0)
  {
    clearInterval(adminTimer);
    minutes = 0;
    seconds = 0;
    document.getElementById('header-timer').innerHTML="STOP!";
    stopCompetition();
  }
  else
  {
    document.getElementById('header-timer').innerHTML=leadingZero(minutes) + ":" + leadingZero(seconds);
    updateTimer();
  }
}

//AJAX--Sets the initial value/time of the timer.
function setTimer()
{
	if (window.XMLHttpRequest)
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
		{
			//alert(setTimerXML.responseText);
		}
	}
	
	//setTimerXML.open("GET","AdminCompContent/setMasterTimer.php?adminCompID="+compSetID+"&time="+compSetTime,true);
	//setTimerXML.send();
}

//AJAX--Updates the competition timer file to sync with the admin.
function updateTimer()
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
    updateTimerXML = new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
    updateTimerXML = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	var TimerUpdateVars = "compID=" + compSetID + "&minutes=" + minutes + "&seconds=" + seconds;
	//updateTimerXML.open("GET","AdminCompContent/updateMasterTimer.php?"+TimerUpdateVars,true);
	//updateTimerXML.send();
}

//Initializes the timer.
function createTimer()
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		createTimerXML = new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		createTimerXML = new ActiveXObject("Microsoft.XMLHTTP");
	}

	seconds = compSetTimeS;
	minutes = compSetTimeM;
        alert(compSetTimeM + " " + seconds);

	STOPPED = true;
	PAUSED = false;
	
	if (seconds > 0)
		COUNTINGDOWN = true;
	//setTimer();  
}

//Inserts leading zeroes on the minutes and seconds for the timer
function leadingZero(timeValue)
{
  if (timeValue < 10)
  {
    return "0"+timeValue;
  }
  return timeValue;
}