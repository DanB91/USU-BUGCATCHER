
function recieve()
{
    $.ajax({type: "GET", url:"StudentContent/recieve.php", success:function(result){
	    $("#recieveHint").html(result);
    }});
}