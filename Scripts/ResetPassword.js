function loadIndex()
{
  setInterval(function() {getResetUserType();}, 100);
}

//not in use in new (ie...easy) version.
function SendResetEmail()
{

	username = document.getElementById("ResetPasswordUsername").value;
	email = document.getElementById("ResetPasswordEmail").value;
	
	if(document.ResetPasswordEmailForm.ResetPasswordEmailusertype[0].checked == true)
	{
		actType = "admin";
	}
	else
	{
		actType = "student";
	}
	
 	if (window.XMLHttpRequest)
  	{// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlsendEmail=new XMLHttpRequest();
  	}
	else
  	{// code for IE6, IE5
  		xmlsendEmail=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	xmlsendEmail.onreadystatechange=function()
	{
 		if (xmlsendEmail.readyState==4 && xmlsendEmail.status==200)
    	{
    		alert(xmlsendEmail.responseText);
   		}
	}
	
	xmlsendEmail.open("GET","SendEmailReset.php?username="+username+"&email="+email+"&usertype="+actType,true);
	xmlsendEmail.send();
}

function resetPassword()
{
    
	var newPassOne = document.getElementById("NewPassword").value;
	var newPassTwo = document.getElementById("NewPasswordConfirm").value;
	
 	if (window.XMLHttpRequest)
  	{// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlresetPassword=new XMLHttpRequest();
  	}
	else
  	{// code for IE6, IE5
  		xmlresetPassword=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	xmlresetPassword.onreadystatechange=function()
	{
 		if (xmlresetPassword.readyState==4 && xmlresetPassword.status==200)
    	{
    		alert(xmlresetPassword.responseText);
   		}
	}
	
	xmlhttp.open("GET","ResetPassword.php?username="+username+"&email="+email+"&usertype="+actType,true);
	xmlhttp.send();	
}

function VerifyResetTwo()
{
        
    var firstName = $("#Resetfirstname").val();
    var lastName = $("#Resetlastname").val();
    var schoolName = $("#Resetschoolname").val();
    var username = $("#Resetusername").val();
    var resetPass = $("#Resetpassword").val();
    var confirmResetPass = $("#ConfirmResetpassword").val();
    var userType;
	
    if(document.ResetFormTwo.Resetusertype[0].checked == true)
    {
        userType = "admin";
    }
    else
    {
        userType = "student";
    }
	
    if (!resetPass == confirmResetPass)
    {
        $("#ResetError").html="Passwords do not match. Please enter again.";
    }
    else if (resetPass.length < 6)
    {
        $("#ResetError").html="Password must be at least six characters.";	    
    }
    else
    {
        $.post('ResetPasswordTwo.php', "firstName="+firstName+"&lastName="+lastName+"&schoolName="+schoolName+"&username="+username+"&newPass="+resetPass+"&actType="+userType, 
            function(html){
                alert(html);
                window.location = "index.html";
            });
    }
}

var recentlyChanged;

function getResetUserType()
{
  if(document.ResetFormTwo.Resetusertype[0].checked == true)
  {
    document.ResetFormTwo.Resetschoolname.disabled = true;
    document.ResetFormTwo.Resetschoolname.value = 'N/A';
    document.ResetFormTwo.Resetschoolname.style.backgroundColor = '';
    recentlyChanged = true;
    return false;
  }
  else if(document.ResetFormTwo.Resetusertype[1].checked == true)
  {
    document.ResetFormTwo.Resetschoolname.disabled = false;
    if (recentlyChanged)
    {
    	document.ResetFormTwo.Resetschoolname.value = '';
    	recentlyChanged = false;
    }
    return true;
  }
 
  if (($("#Resetpassword").val().length < 6) && ($("#Resetpassword").val().length > 0))
  {
  	document.getElementById("Resetpassword").style.backgroundColor = '#E38686';
  }
  else if (document.getElementById("Resetpassword").value.length >= 6)
  {
  	document.getElementById("Resetpassword").style.backgroundColor = '#69AF69';
  }
}