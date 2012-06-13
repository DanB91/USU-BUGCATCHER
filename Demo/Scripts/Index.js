function loadIndex()
{
  document.getElementById("StateSelection").innerHTML=string_states;
  checkCookies();
  //CheckLoginForms();
  //CheckRegistrationForms();
  setInterval(function() { ValidateLoginForms(); ValidateRegistrationForms(); }, 100);
}

//====================================================================================//
//                                  Login Javascript                                  //
//====================================================================================//
var LOGIN_INPUTS_VALID = false;
function OnLogIn()
{
  if (LOGIN_INPUTS_VALID)
  {
    var loginXML;
    
    var LoginUsername = document.getElementById("Loginusername");
    var LoginPassword = document.getElementById("Loginpassword");
    var LoginCompId = document.getElementById("LogincompID");
    //var LoginUsertype = document.getElementById("Loginusertype");
    if (LOGIN_STUDENT)
    {
      var LoginUsertype = "student";
    }
    else
    {
      var LoginUsertype = "admin";
    }
    
    var LoginContent = "username="+login_new_user_str+"&";
    LoginContent += "password="+login_new_pass_str+"&";
    LoginContent += "competitionID="+login_new_comp_str+"&";
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
          {
            window.location = "Student.html";
          }
          if (LoginUsertype == "admin")
          {
            window.location = "Admin.html";
          }
        }
        else
        {
          document.getElementById("LoginError").innerHTML=loginXML.responseText;
        }
      }
    }
    loginXML.open("GET","LoginImpl.php?"+LoginContent,true);
    loginXML.send();
  }
  return true;
}

//function CheckLoginForms()
//{
  //setInterval(function() { ValidateLoginForms(); }, 100);
//}

var login_old_user_str = "";
var login_old_pass_str = "";
var login_old_comp_str = "";
var login_new_user_str = "";
var login_new_pass_str = "";
var login_new_comp_str = "";
var LOGIN_USERNAME_VALID = false;
var LOGIN_PASSWORD_VALID = false;
var LOGIN_COMPETITION_VALID = false;
var LOGIN_STUDENT = true;
var login_tempCompetition_str = '';

function getLoginUserType()
{
  if(document.LoginForm.Loginusertype[0].checked == true)
  {
    document.LoginForm.LogincompetitionID.disabled = true;
    login_tempCompetition_str = document.LoginForm.LogincompetitionID.value;
    document.LoginForm.LogincompetitionID.value = 'N/A';
    document.LoginForm.LogincompetitionID.style.backgroundColor = '';
    return false;
  }
  else if(document.LoginForm.Loginusertype[1].checked == true)
  {
    document.LoginForm.LogincompetitionID.disabled = false;
    if (document.LoginForm.LogincompetitionID.value.localeCompare('N/A') == 0)
    {
      document.LoginForm.LogincompetitionID.value = login_tempCompetition_str;
    }
    return true;
  }
}

function ValidateLoginForms()
{
  if (document.LoginForm.Loginusertype[1].checked != LOGIN_STUDENT)
  {
    LOGIN_STUDENT = getLoginUserType();
  }
  
  login_new_user_str = document.getElementById("Loginusername").value;
  login_new_pass_str = document.getElementById("Loginpassword").value;
  login_new_comp_str = document.getElementById("LogincompetitionID").value;
  /*
  var Ldebug = "Old Username: " + login_old_user_str + "  " + login_old_user_str.length + "<br>";
  Ldebug += "New Username: " + login_new_user_str + "  " + login_new_user_str.length + "<br><br>";
  Ldebug += "Old Password: " + login_old_pass_str + "  " + login_old_pass_str.length + "<br>";
  Ldebug += "New Password: " + login_new_pass_str + "  " + login_new_pass_str.length + "<br>";
  Ldebug += "Old Competition: " + login_old_comp_str + "  " + login_old_comp_str.length + "<br>";
  Ldebug += "New Competition: " + login_new_comp_str + "  " + login_new_comp_str.length + "<br>";
  //document.getElementById('JS_Output').innerHTML=Ldebug;
  */
  if (login_new_user_str.localeCompare(login_old_user_str))
  {
    if (login_new_user_str.length >= 5 && login_new_user_str.length <= 20)
    {
      document.getElementById('Loginusername').style.backgroundColor = '#69AF69';
      LOGIN_USERNAME_VALID = true;
    }
    else if (login_new_user_str.length > 0)
    {
      document.getElementById('Loginusername').style.backgroundColor = '#E38686';
      LOGIN_USERNAME_VALID = false;
    }
    else
    {
      document.getElementById('Loginusername').style.backgroundColor = '';
      LOGIN_USERNAME_VALID = false;
    }
  }
  else if (login_new_pass_str.localeCompare(login_old_pass_str))
  {
    if (login_new_pass_str.length >= 6 && login_new_pass_str.length <= 20)
    {
      document.getElementById('Loginpassword').style.backgroundColor = '#69AF69';
      LOGIN_PASSWORD_VALID = true;
    }
    else if (login_new_pass_str.length > 0)
    {
      document.getElementById('Loginpassword').style.backgroundColor = '#E38686';
      LOGIN_PASSWORD_VALID = false;
    }
    else
    {
      document.getElementById('Loginpassword').style.backgroundColor = '';
      LOGIN_PASSWORD_VALID = false;
    }
  }
  else if (login_new_comp_str.localeCompare(login_old_comp_str) && LOGIN_STUDENT)
  {
    if (login_new_comp_str.length == 8)
    {
      document.getElementById('LogincompetitionID').style.backgroundColor = '#69AF69';
      LOGIN_COMPETITION_VALID = true;
    }
    else if (login_new_comp_str.length > 0)
    {
      document.getElementById('LogincompetitionID').style.backgroundColor = '#E38686';
      LOGIN_COMPETITION_VALID = false;
    }
    else
    {
      document.getElementById('LogincompetitionID').style.backgroundColor = '';
      LOGIN_COMPETITION_VALID = false;
    }
  }
  
  login_old_user_str = login_new_user_str;
  login_old_pass_str = login_new_pass_str;
  login_old_comp_str = login_new_comp_str;
  
  LOGIN_INPUTS_VALID = LOGIN_USERNAME_VALID * LOGIN_PASSWORD_VALID;
  if (LOGIN_STUDENT)
  {
    LOGIN_INPUTS_VALID *= LOGIN_COMPETITION_VALID;          //Only true times true will equal true ; faster than if()/else()
  }
}

//====================================================================================//
//                              Registration Javascript                               //
//====================================================================================//
var REGISTRATION_INPUT_VALID = false;
function OnRegister()
{
  if (REGISTRATION_INPUT_VALID)
  {
    var registrationXML;
    
    var RegistrationFirstname = document.getElementById("Registrationfirstname").value;
    var RegistrationLastname = document.getElementById("Registrationlastname").value;
    var RegistrationSchool = document.getElementById("Registrationschoolname").value;
    var RegistrationState = document.getElementById("Registrationstate").value;
    var RegistrationUsername = document.getElementById("Registrationusername").value;
    var RegistrationPassword = document.getElementById("Registrationpassword").value;
    //var RegistrationUsertype = document.getElementById("Registrationusertype").option[Registrationusertype.selectedIndex].value;
    if (REGISTRATION_STUDENT)
    {
      var RegistrationUsertype = "student";
    }
    else
    {
      var RegistrationUsertype = "admin";
    }
    
    
    var RegistrationContent = "firstname="+RegistrationFirstname+"&";
    RegistrationContent += "lastname="+RegistrationLastname+"&";
    RegistrationContent += "schoolname="+RegistrationSchool+"&";
    RegistrationContent += "state="+RegistrationState+"&";
    RegistrationContent += "username="+RegistrationUsername+"&";
    RegistrationContent += "password="+RegistrationPassword+"&";
    RegistrationContent += "usertype="+RegistrationUsertype;
    
    if (window.XMLHttpRequest)
    {
      registrationXML = new XMLHttpRequest();
    }
    else
    {
      registrationXML = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    registrationXML.onreadystatechange=function()
    {
      if (registrationXML.readyState == 4 && registrationXML.status == 200)
      {
        if (registrationXML.responseText == "")
        {
          if (RegistrationUsertype == "admin")
          {
            alert("Registration as Administrator was successful!");
          }
          if (RegistrationUsertype == "student")
          {
            alert("Registration as Student was successful!");
          }
          document.getElementById("Registrationfirstname").value = '';
          document.getElementById("Registrationlastname").value = '';
          document.getElementById("Registrationschoolname").value = '';
          document.getElementById("Registrationstate").selectedIndex = 0;
          //document.RegistrationForm.Registrationstate.style.backgroundColor = '';
          document.getElementById("Registrationusername").value = '';
          document.getElementById("Registrationpassword").value = '';
        }
        else
        {
          alert(registrationXML.responseText);
        }
      }
    }
    
    registrationXML.open("GET","RegistrationImpl.php?"+RegistrationContent,true);
    registrationXML.send();
  }
  return true;
}

//function CheckRegistrationForms()
//{
  //setInterval(function() { ValidateRegistrationForms(); }, 100);
//}

var registration_old_first_str = "";
var registration_old_last_str = "";
var registration_old_school_str = "";
var registration_old_state_str = "";
var registration_old_user_str = "";
var registration_old_pass_str = "";
var registration_new_first_str = "";
var registration_new_last_str = "";
var registration_new_school_str = "";
var registration_new_state_str = "";
var registration_new_user_str = "";
var registration_new_pass_str = "";
var REGISTRATION_FIRSTNAME_VALID = false;
var REGISTRATION_LASTNAME_VALID = false;
var REGISTRATION_SCHOOLNAME_VALID = false;
var REGISTRATION_STATE_VALID = false;
var REGISTRATION_USERNAME_VALID = false;
var REGISTRATION_PASSWORD_VALID = false;
var REGISTRATION_STUDENT = true;
var registration_tempSchoolName_str = '';
var registration_tempState_index = 0;
var registration_prev_state_selected = 1;

function setStateSelectStyle(bgcolor)
{
  var stateElement = document.getElementById("Registrationstate");
  stateElement.style.backgroundColor = bgcolor;
  for(var i = 0; i < stateElement.options.length; i++)
  {
    stateElement.options[i].style.backgroundColor = '';
  }
  stateElement.options[stateElement.selectedIndex].style.backgroundColor = bgcolor;
}

function getRegistrationUserType()
{
  if(document.RegistrationForm.Registrationusertype[0].checked == true)
  {
    document.RegistrationForm.Registrationschoolname.disabled = true;
    document.RegistrationForm.Registrationstate.disabled = true;
    registration_tempSchoolName_str = document.RegistrationForm.Registrationschoolname.value;
    //registration_tempState_str = document.RegistrationForm.Registrationstate.value;
    registration_tempState_index = Registrationstate.selectedIndex;
    document.RegistrationForm.Registrationschoolname.value = 'N/A';
    //document.RegistrationForm.Registrationstate.value = 'N/A';
    Registrationstate.selectedIndex = 0;
    document.RegistrationForm.Registrationschoolname.style.backgroundColor = '';
    document.RegistrationForm.Registrationstate.style.backgroundColor = '';
    return false;
  }
  else if(document.RegistrationForm.Registrationusertype[1].checked == true)
  {
    document.RegistrationForm.Registrationschoolname.disabled = false;
    document.RegistrationForm.Registrationstate.disabled = false;
    if (document.RegistrationForm.Registrationschoolname.value.localeCompare('N/A') == 0)// &&
        //document.RegistrationForm.Registrationstate.value.localeCompare('N/A') == 0)
    {
      document.RegistrationForm.Registrationschoolname.value = registration_tempSchoolName_str;
      Registrationstate.selectedIndex = registration_tempState_index;
    }
    return true;
  }
}

function isValid_RegistrationField(fieldName, oldString, newString, minLength, maxLength)
{
  //document.getElementById('JS_Output').innerHTML="They're Different!";
  if (newString.localeCompare(oldString))
  {
    if (newString.length >= minLength && newString.length <= maxLength)
    {
      if (fieldName.localeCompare("Registrationstate") == 0)
      {
        setStateSelectStyle('#69AF69')
      }
      else
      {
        document.getElementById(fieldName).style.backgroundColor = '#69AF69';
      }
      return true;
    }
    else if (newString.length > 0)
    {
      if (fieldName.localeCompare("Registrationstate") == 0)
      {
        setStateSelectStyle('')
      }
      else
      {
        document.getElementById(fieldName).style.backgroundColor = '#E38686';
      }
      return false;
    }
    else
    {
      document.getElementById(fieldName).style.backgroundColor = '';
      return false;
    }
  }
  if (newString.length >= minLength && newString.length <= maxLength)
  {
    return true;
  }
  return false;
}

function ValidateRegistrationForms()
{
  if (document.RegistrationForm.Registrationusertype[1].checked != REGISTRATION_STUDENT)
  {
    REGISTRATION_STUDENT = getRegistrationUserType();
  }
  
  registration_new_first_str = document.getElementById("Registrationfirstname").value;
  registration_new_last_str = document.getElementById("Registrationlastname").value;
  registration_new_school_str = document.getElementById("Registrationschoolname").value;
  registration_new_state_str = document.getElementById("Registrationstate").value;
  registration_new_user_str = document.getElementById("Registrationusername").value;
  registration_new_pass_str = document.getElementById("Registrationpassword").value;
  
  REGISTRATION_INPUT_VALID = isValid_RegistrationField('Registrationfirstname', registration_old_first_str, registration_new_first_str, 1, 20);
  REGISTRATION_INPUT_VALID *= isValid_RegistrationField('Registrationlastname', registration_old_last_str, registration_new_last_str, 1, 20);
  if (REGISTRATION_STUDENT)
  {
    REGISTRATION_INPUT_VALID *= isValid_RegistrationField('Registrationschoolname', registration_old_school_str, registration_new_school_str, 1, 50);
    REGISTRATION_INPUT_VALID *= isValid_RegistrationField('Registrationstate', registration_old_state_str, registration_new_state_str, 2, 2);
  }
  REGISTRATION_INPUT_VALID *= isValid_RegistrationField('Registrationusername', registration_old_user_str, registration_new_user_str, 5, 20);
  REGISTRATION_INPUT_VALID *= isValid_RegistrationField('Registrationpassword', registration_old_pass_str, registration_new_pass_str, 6, 20);
  /*
  var Rdebug = "Old Firstname: " + registration_old_first_str + "  " + registration_old_first_str.length + "<br>";
  Rdebug += "New Firstname: " + registration_new_first_str + "  " + registration_new_first_str.length + "<br><br>";
  Rdebug += "Old Lastname: " + registration_old_last_str + "  " + registration_old_last_str.length + "<br>";
  Rdebug += "New Lastname: " + registration_new_last_str + "  " + registration_new_last_str.length + "<br><br>";
  Rdebug += "Old Schoolname: " + registration_old_school_str + "  " + registration_old_school_str.length + "<br>";
  Rdebug += "New Schoolname: " + registration_new_school_str + "  " + registration_new_school_str.length + "<br><br>";
  Rdebug += "Old State: " + registration_old_state_str + "  " + registration_old_state_str.length + "<br>";
  Rdebug += "New State: " + registration_new_state_str + "  " + registration_new_state_str.length + "<br><br>";
  Rdebug += "Old Username: " + registration_old_user_str + "  " + registration_old_user_str.length + "<br>";
  Rdebug += "New Username: " + registration_new_user_str + "  " + registration_new_user_str.length + "<br><br>";
  Rdebug += "Old Password: " + registration_old_pass_str + "  " + registration_old_pass_str.length + "<br>";
  Rdebug += "New Password: " + registration_new_pass_str + "  " + registration_new_pass_str.length + "<br><br>";
  if (REGISTRATION_INPUT_VALID)
    Rdebug += "All Input are Valid!";
  else
    Rdebug += "One or more inputs are not valid.";
  document.getElementById('JS_Output').innerHTML=Rdebug;
  */
  registration_old_first_str = registration_new_first_str;
  registration_old_last_str = registration_new_last_str;
  registration_old_school_str = registration_new_school_str;
  registration_old_state_str = registration_new_state_str;
  registration_old_user_str = registration_new_user_str;
  registration_old_pass_str = registration_new_pass_str;
  registration_prev_state_selected = document.getElementById("Registrationstate").selectedIndex;
}

//====================================================================================//
//                                  Misc. Javascript                                  //
//====================================================================================//
function checkCookies()
{
  var checkCookiesXML;
  
  var Mode = document.getElementById("Mode");
  var NumProbs = document.getElementById("NumOfProblems");
  var Hints = document.getElementById("AllowHints");
  var Time = document.getElementById("CompTime");
  
  if (window.XMLHttpRequest)
  {
    checkCookiesXML = new XMLHttpRequest();
  }
  else
  {
    checkCookiesXML = new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  checkCookiesXML.onreadystatechange=function()
  {
    if (checkCookiesXML.readyState == 4 && checkCookiesXML.status == 200)
    {
    }
  }
    
  checkCookiesXML.open("GET","indexImpl.php",true);
  checkCookiesXML.send();
}