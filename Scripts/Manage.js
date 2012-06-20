function loadTeamInfo(str)
{
  if (str.length == 0)
  {
    $("#TeamTable").html("");
    return;
  } 
  
    $.ajax({type: "GET", url:"manageImpl2.php", data: "q="+str, success:function(result){
	    $("#TeamTable").html(result);
    }});
}

function addTeam()
{
    var TeamName = "teamName=" + document.getElementById("teamName").value;
    
    $.ajax({type: "GET", url:"manageImpl.php", data: TeamName, success:function(result){
      $("#TeamList").html(result);
      document.getElementById("teamName").value='';
    }});
}

function loadTeamNames()
{
    $.ajax({type: "GET", url:"manageImpl3.php", success:function(result){
      $("#TeamList").html(result);
    }});
}