function loadTeamInfo(str)
{
  if (str.length == 0)
  {
    $("#TeamTable").html("");
    //document.getElementById("TeamTable").innerHTML="";
    return;
  } 
  /*if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    loadInfoXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    loadInfoXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  loadInfoXML.onreadystatechange=function()
  {
    if (loadInfoXML.readyState==4 && loadInfoXML.status==200)
    {*/
    $.ajax({type: "GET", url:"manageImpl2.php", data: "q="+str, success:function(result){
	    $("#TeamTable").html(result);
    }});
    /*document.getElementById("TeamTable").innerHTML=loadInfoXML.responseText;
    }
  }
  
  loadInfoXML.open("GET","manageImpl2.php?q="+str,true);
  loadInfoXML.send();*/
}

function addTeam()
{
  /*if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    addTeamXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    addTeamXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  addTeamXML.onreadystatechange=function()
  {
    if (addTeamXML.readyState == 4 && addTeamXML.status == 200)
    {*/
    var TeamName = "teamName=" + document.getElementById("teamName").value;
    
    $.ajax({type: "GET", url:"manageImpl.php", data: TeamName, success:function(result){
      $("#TeamList").html(result);
      document.getElementById("teamName").value='';
    }});
    /*}
  }
  
 
  addTeamXML.open("GET","manageImpl.php?"+TeamName,true);
  addTeamXML.send();*/
}

function loadTeamNames()
{
    /*
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    loadTeamsXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    loadTeamsXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  loadTeamsXML.onreadystatechange=function()
  {
    if (loadTeamsXML.readyState==4 && loadTeamsXML.status==200)
    {*/
    $.ajax({type: "GET", url:"manageImpl3.php", success:function(result){
      $("#TeamList").html(result);
    }});
    /*}
  }
  loadTeamsXML.open("GET","manageImpl3.php",true);
  loadTeamsXML.send();*/
}