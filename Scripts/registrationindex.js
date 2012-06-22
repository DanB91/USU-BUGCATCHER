//Loads all the state names and values for the registration form state selection box
//Sets the intervals for JavaScript validation of the Login and Registration fields
function loadIndex()
{
  $("#StateSelection").html(string_states);
  setInterval(function() {ValidateRegistrationForms();}, 100);

    $.post('onLogCookies.php', "", 
        function(){
        });
 
}

//====================================================================================//
//                                                                    Registration Javascript                                                                   //
//====================================================================================//

//Variable used for Registration
var REGISTRATION_INPUT_VALID = false;
var registration_old_first_str = "";
var registration_old_last_str = "";
var registration_old_school_str = "";
var registration_old_state_str = "";
var registration_old_nick_str = "";
var registration_old_user_str = "";
var registration_old_pass_str = "";
var registration_new_first_str = "";
var registration_new_last_str = "";
var registration_new_school_str = "";
var registration_new_state_str = "";
var registration_new_user_str = "";
var registration_new_pass_str = "";
var registration_new_nick_str = "";
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
var registration_tempNickname_str = '';

//This function handles the event of the user attempting to register.
//If any of the fields have an incorrect value length or no value at all the AJAX login
//code will not even be called. A "Login Error" will also keep them on the homepage.
function OnRegister()
{
  if (REGISTRATION_INPUT_VALID)
  {
    var registrationXML;
    
    var RegistrationFirstname = $("#Registrationfirstname").val();
    var RegistrationLastname = $("#Registrationlastname").val();
    var RegistrationSchool = $("#Registrationschoolname").val();
    var RegistrationState = $("#Registrationstate").val();
    var RegistrationUsername = $("#Registrationusername").val();
    var RegistrationPassword = $("#Registrationpassword").val();
    var RegistrationNickname = $("#RegistrationNickname").val();
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
    RegistrationContent += "nickname="+RegistrationNickname+"&";
    RegistrationContent += "usertype="+RegistrationUsertype;
    
    
        $.post('RegistrationImpl.php', RegistrationContent, 
            function(html){
            
                if (html == "")
                {
                    if (RegistrationUsertype == "admin")
                    {
                        alert("Registration as Administrator was successful!");
                        window.location = "index.html";
                    }
                    if (RegistrationUsertype == "student")
                    {
                        alert("Registration as Student was successful!");
                        window.location = "index.html";
                    }
                    $("#Registrationfirstname").val('');
                    $("#Registrationlastname").val('');
                    $("#Registrationschoolname").val('');
                    $("#Registrationstate").selectedIndex = 0;
                    $("#Registrationusername").val('');
                    $("#Registrationpassword").val('');
                    $("#RegistrationNickname").val('');
                }
                else
                {
                    alert(html);
         
                }
            });

    }
    return true;
}


function setStateSelectStyle(bgcolor)
{
  var stateElement = document.getElementById("Registrationstate");
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
    registration_tempState_index = Registrationstate.selectedIndex;
    document.RegistrationForm.Registrationschoolname.value='N/A';
    Registrationstate.selectedIndex = 0;
    document.RegistrationForm.Registrationschoolname.style.backgroundColor = '';
    document.RegistrationForm.Registrationstate.style.backgroundColor = '';
    if (document.RegistrationForm.RegistrationNickname.value.localeCompare('N/A') == 0)
    {
      document.RegistrationForm.RegistrationNickname.value = registration_tempNickname_str;
    }
    return false;
  }
  else if(document.RegistrationForm.Registrationusertype[1].checked == true)
  {
    document.RegistrationForm.RegistrationNickname.disabled = true;
    document.RegistrationForm.Registrationschoolname.disabled = false;
    document.RegistrationForm.Registrationstate.disabled = false;
    registration_tempNickname_str = document.RegistrationForm.RegistrationNickname.value;
    document.RegistrationForm.RegistrationNickname.value = 'N/A';
    if (document.RegistrationForm.Registrationschoolname.value.localeCompare('N/A') == 0)
    {
      document.RegistrationForm.Registrationschoolname.value = registration_tempSchoolName_str;
      Registrationstate.selectedIndex = registration_tempState_index;
    }
    return true;
  }
  
}
  
function isValid_RegistrationField(fieldName, oldString, newString, minLength, maxLength)
{
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
        if (newString.search('"') < 0 && newString.search("'") < 0)
        {
          document.getElementById(fieldName).style.backgroundColor = '#69AF69';
        }
        else
        {
          document.getElementById(fieldName).style.backgroundColor = '#E38686';
          return false;
        }
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
  
  registration_new_first_str = $("#Registrationfirstname").val();
  registration_new_last_str = $("#Registrationlastname").val();
  registration_new_school_str = $("#Registrationschoolname").val();
  registration_new_state_str = $("#Registrationstate").val();
  registration_new_user_str = $("#Registrationusername").val();
  registration_new_pass_str = $("#Registrationpassword").val();
  registration_new_nick_str = $("#RegistrationNickname").val();
  
  REGISTRATION_INPUT_VALID = isValid_RegistrationField('Registrationfirstname', registration_old_first_str, registration_new_first_str, 1, 20);
  REGISTRATION_INPUT_VALID *= isValid_RegistrationField('Registrationlastname', registration_old_last_str, registration_new_last_str, 1, 20);
  if (REGISTRATION_STUDENT)
  {
    REGISTRATION_INPUT_VALID *= isValid_RegistrationField('Registrationschoolname', registration_old_school_str, registration_new_school_str, 1, 50);
    REGISTRATION_INPUT_VALID *= isValid_RegistrationField('Registrationstate', registration_old_state_str, registration_new_state_str, 2, 2);
  }
  REGISTRATION_INPUT_VALID *= isValid_RegistrationField('Registrationusername', registration_old_user_str, registration_new_user_str, 5, 20);
  REGISTRATION_INPUT_VALID *= isValid_RegistrationField('Registrationpassword', registration_old_pass_str, registration_new_pass_str, 6, 20);

  registration_old_first_str = registration_new_first_str;
  registration_old_last_str = registration_new_last_str;
  registration_old_school_str = registration_new_school_str;
  registration_old_state_str = registration_new_state_str;
  registration_old_user_str = registration_new_user_str;
  registration_old_pass_str = registration_new_pass_str;
  registration_old_nick_str = registration_new_nick_str;
  registration_prev_state_selected = Document.getElementById("Registrationstate").selectedIndex;
}