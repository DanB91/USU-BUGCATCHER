//Timer
////////////////////////////////////////////////////////
var m;
var adminTimer;
var s=0;
var timer_timeout;
var STOPPED = true;
var PAUSED = false;

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
	m=compTime;

}

//Starts the timer for the competition.
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
	if (!PAUSED && !STOPPED)
	{
		clearInterval(adminTimer);
		PAUSED = true;
	}
}

//Counts down the competition timer.
function countdown()
{
	if(s == 0)
	{
		if(m == 0)
		{
			clearInterval(adminTimer);
			timer_is_on=0;
			document.getElementById('header-timer').innerHTML="STOP!";
		}
		else
		{
			document.getElementById('header-timer').innerHTML=leadingZero(m) + ":" + leadingZero(s);
			updateTimer();
			m=m-1;
			s=59;
		}
	}
	else 
	{
		document.getElementById('header-timer').innerHTML=leadingZero(m) + ":" + leadingZero(s);
		updateTimer();
		s=s-1;
	}
	//timer_timeout=setTimeout("countdown()",1000);
}

//Sets the initial value/time of the timer.
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
	
	setTimerXML.open("GET","AdminCompContent/setMasterTimer.php?compID="+compSetID+"&time="+compSetTime,true);
	setTimerXML.send();
}

//Updates the competition timer file to sync with the admin.
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
	
	updateTimerXML.onreadystatechange=function()
	{
		if (updateTimerXML.readyState == 4 && updateTimerXML.status == 200)
		{
		}
	}
	var TimerUpdateVars = "compID=" + compSetID + "&minutes=" + m + "&seconds=" + s;
	updateTimerXML.open("GET","AdminCompContent/updateMasterTimer.php?"+TimerUpdateVars,true);
	updateTimerXML.send();
}

//Initializes the timer.
function createTimer()
{
	STOPPED = true;
	PAUSED = true;
	m=compSetTime;
	s=0;
	document.getElementById('header-timer').innerHTML=leadingZero(m) + ":" + leadingZero(s);
	setTimer();
	/*if (!timer_is_on)
	{
		timer_is_on=1;
		document.getElementById('header-timer').innerHTML=leadingZero(m) + ":" + leadingZero(s);
		setTimer();
		//countdown();
	}*/
}

//inserts leading zeroes on the numbers
function leadingZero(Time)
{
    return (Time < 10) ? "0" + Time : + Time;
}
