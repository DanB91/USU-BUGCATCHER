var compSelected;


//Pre-Conditions:
//Post-Conditions:
function loadComps()
{
    $.post('StudentContent/loadAvailComps.php', "", 
        function(html){
            $("#LandingCompSelect").html(html);
            compSelected = "";
        });
}

//Pre-Conditions:
//Post-Conditions:
function joinComp()
{
    $.ajax({ type:"GET", url:'joinComp.php', data:"compS="+compSelected, 
        success: function(html){

            var t = html.trim();
            if(t != '1')
            {
		alert("something bad happened when adding your team to the competition, too bad for you sucka");
               /* var studTName = prompt("This competition has started please enter your team name.");
                while(studTName.search('"') >= 0 || studTName.search("'") >= 0)
                {
                    studTName = prompt("Team name contained invalid characters. Please enter a different team name.");
                }
                if(studTName != null)
                    createSTeam(studTName);*/
            }
            else{
                window.location = "Student.html";
            }
        }});
}

//Pre-Conditions:
//Post-Conditions:
function loadTeamInvites()
{
    $.post('StudentContent/loadTeamInvites.php', "", 
        function(html){
            $("#InviteSelectBox").html(html);
        });
}

//Pre-Conditions:
//Post-Conditions:
function createSTeam(tName)
{
    $.post('createSTeam.php', "compS="+compSelected+"&tName="+tName, 
        function(html){

            var t = html.trim();
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

//refreshMember1 and 2 display the information about other team members on refresh.
//refreshMember1 displays them for a regular user
function refreshMember1()
{
    $.post('StudentContent/getTeamMemberInfo.php', "isCaptain=false", 
        function(html){
            var members = html.split(",");
            var counter = 1;
            for (m in members)
                {
                    $("#TMandC"+counter).html(members[m]);
                    counter++;
                }

        });
}

//refreshMember2 displays them for the team captain.
function refreshMember2()
{
        $.post('StudentContent/teamName.php', "", 
        function(html){
            $("#TeamName2").html(html);
        });
    
    $.post('StudentContent/getTeamMemberInfo.php', "isCaptain=true", 
        function(html){
            var members = html.split(",");
            var counter = 1;
            for(m in members)
                {
                    $("#TM"+counter).html(members[m]);
                    counter++;
                }
        });
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
function StartToMember(inviteID)
{
        
    $.post('StudentContent/addMemberToTeam.php', "inviteID="+inviteID, 
        function(html){
            if (html.trim() == '1')
            {
                window.location = "teamManagementM.html";
                loadComps();
                refreshMember2();
            }
            else
                alert(html);
        });
        
}

//
function MemberLeaveTeam()
{

    $.post('StudentContent/leaveTeam.php',"captain=false", 
        function(){
        });
    window.location = "StudentLanding.html";
}

//
function StartToCaptain()
{

        
    var teamName = $("#LandingTeamName").val();
    var inviteOne = $("#LandingInvite1").val();
    var inviteTwo = $("#LandingInvite2").val();
            
    $.ajax({
        type: "POST",
        url:'StudentContent/captainCreateTeam.php', 
        data:"newTeam=true&teamName="+teamName+"&inviteOne="+inviteOne+"&inviteTwo="+inviteTwo, 
        success: function(html){
            if (html.trim() == '1')
            {
                window.location = "teamManagementC.html";
                loadComps();
            }
            else
                alert(html);
        }
    });
        
}

//
function CaptainLeaveTeam()
{
        
            $.post('StudentContent/leaveTeam.php',"captain=true", 
        function(){
        });
        window.location = "StudentLanding.html";
}

function sendInvites()
{
       var inviteOne = $("#LandingInvite1").val();
        var inviteTwo = $("#LandingInvite2").val();
         $.post('StudentContent/captainCreateTeam.php', "newTeam=false&teamName=none&inviteOne="+inviteOne+"&inviteTwo="+inviteTwo, 
        function(){
        });
}
