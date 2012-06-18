var compSelected;

//Pre-Conditions:
//Post-Conditions:
function loadComps()
{
    $.post('loadAvailComps.php', "", 
        function(html){
            $("#LandingCompSelect").html(html);
            compSelected = "";
        });
}

//Pre-Conditions:
//Post-Conditions:
function joinComp()
{
    $.post('joinComp.php', "compS="+compSelected, 
        function(html){

            var t = html.trim();
            if(t == '1')
            {
                var studTName = prompt("This competition has started please enter your team name.");
                while(studTName.search('"') >= 0 || studTName.search("'") >= 0)
                {
                    studTName = prompt("Team name contained invalid characters. Please enter a different team name.");
                }
                if(studTName != null)
                    createSTeam(studTName);
            }
            else{
                window.location = "Student.html";
            }
        });
}

//Pre-Conditions:
//Post-Conditions:
function loadTeamInvites()
{
    $.post('loadTeamInvites.php', "", 
        function(html){
            $("#TeamInvitations").html(html);
        });
}

//Pre-Conditions:
//Post-Conditions:
function createSTeam(tName)
{
    $.post('createSTeam.php', "compS="+compSelected+"&tName="+tName, 
        function(html){

            var t = html.trim();
            //alert(t);
            if(t == '1')
            {
                //alert("2compID: "+compSelected);
                window.location = "Student.html";
            }
            else
            {
                alert("Team already exists");
            }

        });

    mSetCookie('tName',tName,365);
}

//Pre-Conditions:
//Post-Conditions:
function mSetCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

//Pre-Conditions:
//Post-Conditions:
function getCompInfo()
{
  var loopCount = 1;
  var displayOutput = "";
         
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    getCompInfoXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    getCompInfoXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  getCompInfoXML.open("GET","StudentContent/studentCompInfo.php?compID="+compSelected+"&fileLine="+3,true)
  getCompInfoXML.send();
  
  getCompInfoXML.onreadystatechange=function()
  {
    if (getCompInfoXML.readyState == 4 && getCompInfoXML.status == 200)
    {
        switch(loopCount)
        {
          case 1:
            var mins = getCompInfoXML.responseText;
            displayOutput += "Competition ID: " + compSelected;
            displayOutput += "\n\nCompetition Length: " + mins + " mins\n";
            loopCount++;
            getCompInfoXML.open("GET","StudentContent/studentCompInfo.php?compID="+compSelected+"&fileLine="+0,true)
            getCompInfoXML.send();
            break;
          case 2:
            var probs = getCompInfoXML.responseText;
            displayOutput += "\nNumber of Problems: " + probs + "\n";
            loopCount++;
            getCompInfoXML.open("GET","StudentContent/studentCompInfo.php?compID="+compSelected+"&fileLine="+2,true)
            getCompInfoXML.send();
            break;
          case 3:
            var coverage = getCompInfoXML.responseText;
            if (coverage == 0)
            {
              coverage="No";
            }
            else
            {
              coverage="Yes";
            }
            displayOutput += "\nCode Coverage Allowed: " + coverage;
            document.getElementById('displayInfo').value = displayOutput;
            break;
          default:
            break;
        }
    }
  }
}

//Pre-Conditions:
//Post-Conditions:
function showCompInfo(str,page)
{
  compSelected = str;
  getCompInfo();
}

//Pre-Conditions:
//Post-Conditions:
function search()
{
}

//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//
//############################################################################//

//############################################################################//
//#                          jQuery Sliding Scripts                          #//
//############################################################################//

//
function StartToMember(teamID)
{
    $("#LandingView-Start").hide();
    $("#LandingView-Member").show();
        
    $.post('StudentContent/addMemberToTeam.php', "teamID="+teamID, 
        function(){
        });
        
}

//
function MemberLeaveTeam()
{
	$("#LandingView-Member").hide();
	$("#LandingView-Start").show();
}

//
function StartToCaptain()
{
	$("#LandingView-Start").hide();
	$("#LandingView-Captain").show();
}

//
function CaptainLeaveTeam()
{
	$("#LandingView-Captain").hide();
	$("#LandingView-Start").show();
}