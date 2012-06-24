var compSelected;

//checks that a users cookies are set before allowing them to view the page
function checkUser()
{
    $.post('StudentContent/checkUser.php', "", 
        function(html){
            //if the user is not logged in, redirect them to login page
            if (html.trim() == 0){
                alert(html);
}
        });
}

function hideButton()
{
    $("#joinbutton").hide();
}

//Pre-Conditions:
//Post-Conditions:
function loadComps(isCaptn)
{
    $.post('StudentContent/loadAvailComps.php', "isCaptn="+isCaptn, 
        function(html){
            $("#LandingCompSelect").html(html);
            compSelected = "";
        });
}

//Pre-Conditions:
//Post-Conditions:
function joinComp()
{
    var password = $("#CompPassword").val();
    $.ajax({type:"POST", url:'joinComp.php', data:"compS="+compSelected+"&pword="+password, 
        success: function(html){

            var t = html.trim();
            if(t != '1')
            {
		alert(html);
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

function loadTeams()
{
    $.post('StudentContent/loadTeams.php', "", 
        function(html){
            $("#TeamSelectBox").html(html);
        });
}

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
  
  if (!compSelected)
      return;
  
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    getCompInfoXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    getCompInfoXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  getCompInfoXML.open("GET","StudentContent/studentCompInfo.php?compID="+compSelected+"&fileLine="+0,true)
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
            getCompInfoXML.open("GET","StudentContent/studentCompInfo.php?compID="+compSelected+"&fileLine="+1,true)
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
            loopCount++
            getCompInfoXML.open("GET","StudentContent/studentCompInfo.php?compID="+compSelected+"&fileLine="+3,true)
            getCompInfoXML.send();
            if (coverage == 0)
            {
              coverage="No";
            }
            else
            {
              coverage="Yes";
            }
            displayOutput += "\nCode Coverage Allowed: " + coverage;
            break;
          case 4:
            var password = getCompInfoXML.responseText;
            if (password == 0)
            {
                $("#CompPassword").val("N/A");
                $("#CompPassword").attr("disabled", true);
            }
            else
            {
                $("#CompPassword").val("");
                $("#CompPassword").attr("disabled", false);    
            }
            $('#displayInfo').val(displayOutput);
            break;
          default:
            break;
        }
    }
  }
}

//Pre-Conditions:
//Post-Conditions:
function showCompInfo(compID)
{
    if (compID == "-1")
        return;
    else
    {
        compSelected = compID;
        getCompInfo();
    }
}

//refreshMember displays the information about other team members on refresh.
//it takes a boolean to determine if the team member is the captain, so that information can be displayed as well.
function refreshMember(isCapt)
{
            $.post('StudentContent/teamName.php', "", 
        function(html){
            $("#TeamName2").html(html);
        });
        
    $.post('StudentContent/getTeamMemberInfo.php', "isCaptain="+isCapt, 
        function(html){
            $("#TMS").html(html);
        });
}

//function refreshMember2()
//{
//        $.post('StudentContent/teamName.php', "", 
//        function(html){
//            $("#TeamName2").html(html);
//        });
//    
//    $.post('StudentContent/getTeamMemberInfo.php', "isCaptain=true", 
//        function(html){
//            $("#TMS").html(html);
//        });
//}

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

            }
            else
                alert(html);
        });      
}

function RejoinTeam(teamID)
{
        $.post('StudentContent/rejoinTeam.php', "teamID="+teamID, 
        function(html){
            if (html.trim() == '1')
            {
                window.location = "teamManagementM.html";
            }
            else if (html.trim() == '2')
            {
               window.location = "teamManagementC.html";     
            }
            else
                alert(html);
        });
}

function LeaveTeam()
{

    $.post('StudentContent/leaveTeam.php',"", 
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
//function CaptainLeaveTeam()
//{
//    $.ajax({
//        type: "POST",
//        url:'StudentContent/leaveTeam.php', 
//        data: "captain=false",
//        async: false,
//        success: function(){
//        }
//    });  
//    window.location = "StudentLanding.html";
//}

function sendInvites()
{
       var inviteOne = $("#LandingInvite3").val();
        var inviteTwo = $("#LandingInvite4").val();
         $.post('StudentContent/captainCreateTeam.php', "newTeam=false&teamName=none&inviteOne="+inviteOne+"&inviteTwo="+inviteTwo, 
        function(){
            $("#LandingInvite3").val('');
            $("#LandingInvite4").val('');
            alert("Invites sent!");
        });
}

function removeFromTeam(memberID)
{
    $.post('StudentContent/removeFromTeam.php', "memberID="+memberID,
    function(){
       refreshMember(true); 
    });
}
