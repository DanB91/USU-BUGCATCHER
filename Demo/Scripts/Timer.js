var request = new XMLHttpRequest();
var url = "http://"+self.location.hostname+"/time.txt";
//var url = "localhost/CS3450/NewDesign/timer.txt";
//var url = self.location.hostname+"/time.txt";
request.open("GET",url,false);
request.setRequestHeader("User-Agent", navigator.userAgent);
request.send(null)
var m = 0;
if(request.status==200)
	m=responseText;
var s=0;
var t;
var timer_is_on=0;

function timedCount()
{
	if(s == 0)
	{
		if(m == 0)
		{
			clearTimeout(t);
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
	t=setTimeout("timedCount()",1000);
}

function doTimer()
{
	if (!timer_is_on)
	{
		timer_is_on=1;
		timedCount();
	}
}

function leadingZero(Time) 
{
    return (Time < 10) ? "0" + Time : + Time;
}