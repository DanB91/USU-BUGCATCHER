//Loads all the state names and values for the registration form state selection box
//Sets the intervals for JavaScript validation of the Login and Registration fields
function loadIndex()
{
 // document.getElementById("StateSelection").innerHTML=string_states;
  setInterval(function() { ValidateLoginForms(); }, 100);
  
    if (window.XMLHttpRequest)
    {
      loadIndexXML = new XMLHttpRequest();
    }
    else
    {
      loadIndexXML = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    loadIndexXML.open("GET","onLogCookies.php",true);
    loadIndexXML.send();
 
}

//====================================================================================//
//                                                                       Login Javascript                                                                         //
//====================================================================================//

//Variables used for Login
var LOGIN_INPUTS_VALID = false;
var login_old_user_str = "";
var login_old_pass_str = "";
var login_old_comp_str = "";
var login_new_user_str = "";
var login_new_pass_str = "";
var login_new_comp_str = "";
var LOGIN_USERNAME_VALID = false;
var LOGIN_PASSWORD_VALID = false;
var LOGIN_COMPETITION_VALID = true;
var LOGIN_STUDENT = true;
var login_tempCompetition_str = '';

//This function handles the event of the user attempting to log in.
//If any of the fields have an incorrect value length or no value at all the AJAX login
//code will not even be called. A "Login Error" will also keep them on the homepage.
function OnLogIn()
{
    
  if (LOGIN_INPUTS_VALID)
  {//The Login inputs are all valid
    var loginXML;
    
    var LoginUsername = document.getElementById("Loginusername");
    var LoginPassword = document.getElementById("Loginpassword");
    
    if (LOGIN_STUDENT)
    {//The user is attempting to log in as a student
      var LoginUsertype = "student";
    }
    else
    {//The user is attempting to log in as an administrator
      var LoginUsertype = "admin";
    }
    
    var LoginContent = "username="+login_new_user_str+"&";
    LoginContent += "password="+login_new_pass_str+"&";
    LoginContent += "usertype="+LoginUsertype;
 
    if (window.XMLHttpRequest)
    {
      loginXML = new XMLHttpRequest();
    }
    else
    {
      loginXML = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    loginXML.onreadystatechange=function()
    {
      if (loginXML.readyState == 4 && loginXML.status == 200)
      {
        if (loginXML.responseText == "")
        {
          if (LoginUsertype == "student")
          {//Redirects the user to "Student.html"
            window.location = "testLandingPage.html";
          }
          if (LoginUsertype == "admin")
          {//Redirects the user to "Admin.html"
            window.location = "Admin.html";
          }
        }
        else
        {//There was some sort of error with trying to log in
          document.getElementById("LoginError").innerHTML=loginXML.responseText;
        }
      }
    }
    loginXML.open("GET","LoginImpl.php?"+LoginContent,true);
    loginXML.send();
  }
  return true;
}

//This function determines whether the user is attempting to log in as a student
//or an administrator.  If the user is attempting to log in as an administrator the
//Competition ID field will be disabled and will be unnecessary for them to have
//filled in to successfully log in. Switching from 'admin' to 'student' will reverse this
//filling in the last data entered into the field, if any.
function getLoginUserType()
{
  if(document.LoginForm.Loginusertype[0].checked == true)
  {
    return false;
  }
  else if(document.LoginForm.Loginusertype[1].checked == true)
  {
    return true;
  }
}

//Checks to make sure that all of the necessary field for that user type are
//all valid. (Green=Valid & Red=Invalid)
function ValidateLoginForms()
{
  if (document.LoginForm.Loginusertype[1].checked != LOGIN_STUDENT)
  {
    LOGIN_STUDENT = getLoginUserType();
  }
  
  login_new_user_str = document.getElementById("Loginusername").value;
  login_new_pass_str = document.getElementById("Loginpassword").value;
 

  //These compare the previous entry to the current to detect any changes and check for validity
  if (login_new_user_str.localeCompare(login_old_user_str))
  {
    if (login_new_user_str.length >= 5 && login_new_user_str.length <= 20)
    {//Valid
      if(login_new_user_str.search('"') < 0 && login_new_user_str.search("'") < 0)
      {
        document.getElementById('Loginusername').style.backgroundColor = '#aad67b';
        LOGIN_USERNAME_VALID = true;
      }
      else
      {
        document.getElementById('Loginusername').style.backgroundColor = '#E38686';
        LOGIN_USERNAME_VALID = false;
      }
    }
    else if (login_new_user_str.length > 0)
    {//Invalid - Incorrect Length
      document.getElementById('Loginusername').style.backgroundColor = '#E38686';
      LOGIN_USERNAME_VALID = false;
    }
    else
    {//Invalid - Empty
      document.getElementById('Loginusername').style.backgroundColor = '';
      LOGIN_USERNAME_VALID = false;
    }
  }
  else if (login_new_pass_str.localeCompare(login_old_pass_str))
  {
    if (login_new_pass_str.length >= 6 && login_new_pass_str.length <= 20)
    {//Valid
      
      if(login_new_pass_str.search('"') < 0 && login_new_pass_str.search("'") < 0)
      {
        document.getElementById('Loginpassword').style.backgroundColor = '#aad67b';
        LOGIN_PASSWORD_VALID = true;
      }
      else
      {
        document.getElementById('Loginpassword').style.backgroundColor = '#E38686';
        LOGIN_PASSWORD_VALID = false;
      }
    }
    else if (login_new_pass_str.length > 0)
    {//Invalid - Incorrect Length
      document.getElementById('Loginpassword').style.backgroundColor = '#E38686';
      LOGIN_PASSWORD_VALID = false;
    }
    else
    {//Invalid - Empty
      document.getElementById('Loginpassword').style.backgroundColor = '';
      LOGIN_PASSWORD_VALID = false;
    }
  }
  
  
  login_old_user_str = login_new_user_str;
  login_old_pass_str = login_new_pass_str;
  login_old_comp_str = login_new_comp_str;
  
  LOGIN_INPUTS_VALID = LOGIN_USERNAME_VALID * LOGIN_PASSWORD_VALID;
  if (LOGIN_STUDENT)
  {
    //LOGIN_INPUTS_VALID *= LOGIN_COMPETITION_VALID;          //Only true times true will equal true ; faster than if()/else()
  }
}