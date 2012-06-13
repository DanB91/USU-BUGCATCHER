function loadIndex()
{
  setInterval(function() { getResetUserType(); }, 100);
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
	var firstName = document.getElementById("Resetfirstname").value;
	var lastName = document.getElementById("Resetlastname").value;
	var schoolName = document.getElementById("Resetschoolname").value;
	var username = document.getElementById("Resetusername").value;
	var resetPass = document.getElementById("Resetpassword").value;
	var confirmResetPass = document.getElementById("ConfirmResetpassword").value;
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
		document.getElementById("ResetError").innerHTML="Passwords do not match. Please enter again.";
	}
	else if (resetPass.length < 6)
	{
		document.getElementById("ResetError").innerHTML="Password must be at least six characters.";	    
	}
	else
	{
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
    			window.location = "index.html";
   			}
		}
	
		xmlresetPassword.open("GET","ResetPasswordTwo.php?firstName="+firstName+"&lastName="+lastName+"&schoolName="+schoolName+"&username="+username+"&newPass="+resetPass+"&actType="+userType,true);
		xmlresetPassword.send();
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
/*  
  if ((document.getElementById("Resetpassword").value.length < 6) && (document.getElementById("Resetpassword").value.length > 0))
  {
  	document.getElementById("Resetpassword").style.backgroundColor = '#E38686';
  }
  else if (document.getElementById("Resetpassword").value.length >= 6)
  {
  	document.getElementById("Resetpassword").style.backgroundColor = '#69AF69';
  }*/
}