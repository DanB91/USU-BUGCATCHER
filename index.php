  <?
  Header('Cache-Control: no-cache');
  Header('Pragma: no-cache');
  ?>
<html>
<head>
<title></title>

<script language="javascript" src="Scripts/Index.js"></script>
<script language="javascript" src="Scripts/States.js"></script>
<link rel="stylesheet" href="CSS/index.css" type="text/css" />

</head>

<body onload=loadIndex()>

<div id="container">
	<div id="header">
    <img src="Images/BannerSmall.gif" id="banner">
	</div>
	<div id="header-bar">
	</div>
	<div id="content-container">
		<div id="IndexLeft" align=center>
      <h2>Welcome to BugStomper!</h2>
      <div id="WelcomeText">
        <p>This website is designed to run competitions where students are able to compete to see who can find the most bugs in the least amount of time.</p>
        <p>These competitions are moderated by a chosen competition administrator, usually a member of the school faculty.</p>
        <p>We hope that you have an enjoyable experience.</p>
        <p>Happy Stomping!!</p>
        <div id="Signature"><p>-Team MAMAN</p></div>
      </div>
		</div>
		<div id="IndexRight" align=center>
      <h3>Not a Registered User?</h3>
      <div name="RegistrationError" id="RegistrationError"></div>
      <div id="Registration">
        <form name="RegistrationForm" method="get" onsubmit="event.preventDefault(); OnRegister(); return false;">
          <p>First Name</p>
          <input type="text" id="Registrationfirstname" name="Registrationfirstname" class="Itext"><br>
          <p>Last Name</p>
          <input type="text" id="Registrationlastname" name="Registrationlastname" class="Itext"><br>
          <p>School Name</p>
          <input type="text" id="Registrationschoolname" name="Registrationschoolname" class="Itext"><br>
          <p>State</p>
          <div id="StateSelection"><select name="Registrationstate" id="Registrationstate"></select></div>
          <!-- <input type="text" id="Registerstate" name="Registerstate" class="Itext"><br> -->
          <p>Username</p>
          <input type="text" id="Registrationusername" name="Registrationusername" class="Itext"><br>
          <p>Password</p>
          <input type="password" id="Registrationpassword" name="Registrationpassword" class="Itext"><br>
          <p>Usertype</p>
          <div id="RegistrationRadioBox" class="RadioBox">
            <input type="radio" name="Registrationusertype" id="Registrationusertype" value="admin" class="Iradio">Admin
            <input type="radio" name="Registrationusertype" id="Registrationusertype" value="student" checked class="Iradio">Student<br>
          </div>
          <input type="submit" value="Register" class="Ibutton">
        </form>
      </div>
    </div>
    <div id="IndexMiddle" align=center>
      <h3>Log in</h3>
      <div name="LoginError" id="LoginError"></div>
      <div id="Login">
        <form name="LoginForm" id="LoginForm" method="get" onsubmit="event.preventDefault(); OnLogIn(); return false;">
          <p>Username</p>
          <input type="text" id="Loginusername" name="Loginusername" class="Itext"><br>
          <p>Password</p>
          <input type="password" id="Loginpassword" name="Loginpassword" class="Itext"><br>
          <p>Competition ID</p>
          <input type="text" id="LogincompetitionID" name="LogincompetitionID" class="Itext"><br>
          <p>Usertype</p>
          <div id="LoginRadioBox" class="RadioBox">
            <input type="radio" name="Loginusertype" id="Loginusertype" value="admin" class="Iradio">Admin
            <input type="radio" name="Loginusertype" id="Loginusertype" value="student" checked class="Iradio">Student
          </div><br>
          <input type="submit" value="Log In" class="Ibutton" id="LoginButton">
        </form>
      </div>
      <div class="nooverflow">&nbsp;</div>
    </div>
	</div>
	<div id="footer">
    <p>Copyright � MAMAN, 2012</p>
  </div>
	<div class="nooverflow">&nbsp;</div>
</div>
<div id="JS_Output" style="position: absolute; top: 0px; left: 0px;"></div>
<div id="LoginResult"></div>
</body>

</html>