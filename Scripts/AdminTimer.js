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
       
        $.ajax({url: "AdminCompContent/setMasterTimer.php", success:function(){
               
            if(PAUSED)
            {
                $.ajax({url: "AdminCompContent/unPause.php", success:function(){
                        
                    getMasterTime();
                    STOPPED = false;
                    PAUSED = false;
                     
                } });
               
            }
            else
            {
                adminTimer = setInterval(function() {countdown();},1000);
                STOPPED = false;
            }
                
        } });
        
       
        
       
    } 
}

function startTimerOnRefresh()
{
    
    $.ajax({url: "AdminCompContent/getPauseState.php", success:function(result){
            $.ajax({url: "AdminCompContent/getStartedState.php", success:function(result2){
                    
                if(result != "paused" && result2 == "started")
                {
                    adminTimer = setInterval(function() {countdown();},1000);
                    document.getElementById('header-controls').innerHTML = '<img title="Pause Competition" src="Images/pause.gif" height="79" width="107" onclick=pauseTimer(); />';
                    STOPPED = false;
                    PAUSED = false;
                }
                else
                {
                    PAUSED = true;
                    document.getElementById('header-controls').innerHTML = '<img title="Start Competition" src="Images/start.png" height="79" width="107" onclick=startCompetition(); />';
                }
            }});
        }}); 
        
     
}

//Pauses the timer for the competition.
function pauseTimer()
{
    if (!PAUSED && !STOPPED && !COUNTINGDOWN)
    {
            clearInterval(adminTimer);
            document.getElementById('header-controls').innerHTML = '<img title="Start Competition" src="Images/start.png" height="79" width="107" onclick=startCompetition(); />';
            PAUSED = true;
            $.ajax({url: "AdminCompContent/pauseTimer.php", success:function(){} }); 
    }  
}

//Stops the timer with out setting pause.
function stopTimer()
{
        clearInterval(adminTimer);
        document.getElementById('header-controls').innerHTML = '<img title="Start Competition" src="Images/start.png" height="79" width="107" onclick=startCompetition(); />';	
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
    
  }
  else
  {
    document.getElementById('header-timer').innerHTML=minutes + ":" + leadingZero(seconds);
    updateTimer();
  }
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
	updateTimerXML.open("GET","AdminCompContent/updateMasterTimer.php?"+TimerUpdateVars,true);
	updateTimerXML.send();
}

//Initializes the timer.
function createTimer()
{

    seconds = compSetTimeS;
    minutes = compSetTimeM;
    
    STOPPED = true;
    PAUSED = false;

    if (seconds > 0){

        COUNTINGDOWN = true;
    }
 

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
