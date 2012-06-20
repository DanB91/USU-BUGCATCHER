function loadIndex()
{
  setInterval(function() {validateResetFields();}, 100);
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
	
 	
	$.ajax({type: "GET", url:"SendEmailReset.php", data: "username="+username+"&email="+email+"&usertype="+actType, success:function(result){
    		alert(result);
	}});
   	
}

function resetPassword()
{
    
	var newPassOne = $("#NewPassword").val();
	var newPassTwo = $("#NewPasswordConfirm").val();
        
        $.post('ResetPassword.php', "username="+username+"&email="+email+"&usertype="+actType, 
        function(html){
            alert(html);
        });	
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
	
    if (!(resetPass == confirmResetPass))
    {
        alert("Passwords do not match. Please enter again.");
    }
    else if (resetPass.length < 6)
    {
        alert("Password must be at least six characters.");	    
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

function validateResetFields()
{
  if(document.ResetFormTwo.Resetusertype[0].checked == true)
  {
    document.ResetFormTwo.Resetschoolname.disabled = true;
    document.ResetFormTwo.Resetschoolname.value = 'N/A';
    document.ResetFormTwo.Resetschoolname.style.backgroundColor = '';
    recentlyChanged = true;
  }
  
  else if(document.ResetFormTwo.Resetusertype[1].checked == true)
  {
    document.ResetFormTwo.Resetschoolname.disabled = false;
    if (recentlyChanged)
    {
    	document.ResetFormTwo.Resetschoolname.value = '';
    	recentlyChanged = false;
    }
  }
  if (($("#Resetpassword").val().length < 6) && ($("#Resetpassword").val().length > 0))
  {
  	document.getElementById("Resetpassword").style.backgroundColor = '#E38686';
  }
  else if (document.getElementById("Resetpassword").value.length >= 6)
  {
  	document.getElementById("Resetpassword").style.backgroundColor = '#69AF69';
  }
  
  
   if (($("#Resetfirstname").val().length <= 20) && ($("#Resetfirstname").val().length > 0))
  {
  	document.getElementById("Resetfirstname").style.backgroundColor = '#69AF69';
  }
  else if (document.getElementById("Resetfirstname").value.length > 20)
  {
  	document.getElementById("Resetfirstname").style.backgroundColor = '#E38686';
  } else
  {
      document.getElementById("Resetfirstname").style.backgroundColor = 'white';
  }
  
  
   if (($("#Resetlastname").val().length <= 20) && ($("#Resetlastname").val().length > 0))
  {
  	document.getElementById("Resetlastname").style.backgroundColor = '#69AF69';
  }
  else if (document.getElementById("Resetlastname").value.length > 20)
  {
  	document.getElementById("Resetlastname").style.backgroundColor = '#E38686';
  } else
  {
    document.getElementById("Resetlastname").style.backgroundColor = 'white';
  }
    
   if (($("#Resetschoolname").val().length <= 20) && ($("#Resetschoolname").val().length > 0))
  {
  	document.getElementById("Resetschoolname").style.backgroundColor = '#69AF69';
  }
  else if (document.getElementById("Resetschoolname").value.length > 20)
  {
  	document.getElementById("Resetschoolname").style.backgroundColor = '#E38686';
  } else
  {
      document.getElementById("Resetschoolname").style.backgroundColor = 'white';
  }
      
   if (($("#Resetusername").val().length <= 20) && ($("#Resetusername").val().length >= 5))
  {
  	document.getElementById("Resetusername").style.backgroundColor = '#69AF69';
  }
  else if ((document.getElementById("Resetusername").value.length > 0) &&(document.getElementById("Resetusername").value.length < 5))
  {
  	document.getElementById("Resetusername").style.backgroundColor = '#E38686';
  } else
  {
      document.getElementById("Resetusername").style.backgroundColor = 'white';
  }
}