//Timer
////////////////////////////////////////////////////////
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

function createStudentTimer()
{
	studentTimer = setInterval(function() {getTime();},100);
}
		
function getTime()
{
		//timer_compID = getCompID();
		var getTimeXML;
		
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
			  //document.getElementById("header-middle").innerHTML="<h1> Competition ID: " + displayCompIDXML.responseText + "</h1>";
			  var time = getTimeXML.responseText;
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
				  document.getElementById("timer").innerHTML=minutes+":"+seconds;
			  }
			  else
			  {
				  //A competition has not been created.
			  }
			}
		}
		getTimeXML.open("GET","StudentContent/updateStudentTimer.php?compID="+timer_compID,true);
		getTimeXML.send();	
}
/*
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