
function recieve()
{
 /* //alert("recieving now");
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    loadInfoRecieve=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    loadInfoRecieve=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  loadInfoRecieve.onreadystatechange=function()
  {
    if (loadInfoRecieve.readyState==4 && loadInfoRecieve.status==200)
    {*/
    $.ajax({type: "GET", url:"StudentContent/recieve.php", success:function(result){
	    $("#recieveHint").html(result);
    }});
	/*document.getElementById("recieveHint").innerHTML=loadInfoRecieve.responseText;
    }
  }
  loadInfoRecieve.open("GET","StudentContent/recieve.php",true);
  loadInfoRecieve.send();*/
}