<html>
<head>
<title>Admin</title>

<link rel="stylesheet" href="CSS/styles.css" type="text/css" />
<script language="javascript" src="Scripts/Admin.js"></script>
<script language="javascript" src="Scripts/AdminContentUpdate.js"></script>
<script language="javascript" src="Scripts/AdminTimer.js"></script>
<script language="javascript" src="Scripts/CountdownTimer.js"></script>

<script language="javascript">
var compSetLanguage = '';
var compSetMode = '';
var compSetProblems = '';
var compSetHints = '';
var compSetTime = '';
var compSetID = '';
</script>

</head>

<body onload=AdminLoadCheck();>

<div id="container" class="gradient">
	<div id="header">
    	<div id="header-remainingTime">
          	Time remaining
			<p id="header-timer">00:00</p>
        </div><!--end header-remainingTime-->
        <div id="header-controls">
            <img title="Start Competition" src="Images/start.png" height="79" width="107" onclick=startCompetition(); /> 
        </div><!--end header-controls-->        
        <p id="adminHeader">Bug Catcher: Administrator</p>
	</div><!--end header-->
    
	<div id="admenu">
		<div id="navTabs" style="width: 583px; margin: 0 -200px 0 200px;">
            <ul>
                <li><a id="navComp" class="navNormal" href="JavaScript:setCompetition()" ><h4>Competition Setup</h4></a></li>
                <li><a id="navManage" class="navNormal" href="JavaScript:setManage()"><h4>Team Management</h4></a></li>
                <li><a id="navProgress" class="navNormal" href="JavaScript:setProgress()" ><h4>Progress/Statistics</h4></a></li>
                <li><a id="navHints" class="navNormal" href="JavaScript:setHints()" ><h4>Hints</h4></a></li>
            </ul>
		</div><!--end navTabs-->
	</div><!--end navigation-->
    
	<div id="Content">
<!--Do Not Delete The Comment Below This-->
<!--CONVERSION_STARTS_HERE-->
		<div id="CustomHeader" align=center>
      <h2>Select Comp</h2>
    </div>
    <div id="PreDefHeader" align=center style="background: #D3FBA7; padding-left: 11px;">
      <h2>Users in Comp</h2>
    </div>
		<div id="HintsLeft" align=center>
      <p>Select a Competition:</p>
      <select name="HProbNum" id="HProbNum" size=5 class="CSselect" onchange=showPre(this.value);>
      </select>
      <!--id="SendCustom"-->
      <a class="button" onclick="selectCompetition()"><p>Control Competition</p></a>
		</div>
		<div id="HintsRight" align=center style="background: #D3FBA7; height: 380px; padding-left: 11px;">
                    <br>
                    <p>View of users in comp:</p><br>
      <form onSubmit="event.preventDefault(); sendHintsCust(CustomHint.value); " method="get">
                      <select name="HProbNum" id="HProbNum" size=5 class="CSselect" onchange=showPre(this.value);>
              </select> 
        
        
      </form >
                    <div id="HintsPreDefTop" style="background: #D3FBA7;">
        <div id="HintsPreDefRight" style="background: #D3FBA7;">

        </div>
        <div id="HintsPreDefLeft" style="background: #D3FBA7;">

        </div>
      </div>
      <div id="HintsPreDefBottom" style="background: #D3FBA7;">

      </div>
		</div>
<!--CONVERSION_ENDS_HERE-->
<!--Do Not Delete The Comment Above This-->
	</div><!--end content-->
    
	<div id="footer" style="margin: 0 auto;">
  		<div id="adminCompID"></div>
    	<div id="copyright"><p></p></div>
	</div><!--end footer-->
	<div class="nooverflow"></div>
</div><!--end container-->

</body>

</html>


<?php echo "pie";?>
