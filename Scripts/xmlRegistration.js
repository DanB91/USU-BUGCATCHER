/*if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
	getFileNameXML=new XMLHttpRequest();
}
else
{// code for IE6, IE5
	getFileNameXML=new ActiveXObject("Microsoft.XMLHTTP");
}

getFileNameXML.open("GET","Registration/getFileName.php",true);
getFileNameXML.send();

getFileNameXML.onreadystatechange=function()
{
	if (getFileNameXML.readyState==4 && getFileNameXML.status==200)
	{*/
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			getDocXML=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
			getDocXML=new ActiveXObject("Microsoft.XMLHTTP");
		}
		getDocXML.open("GET",getFileNameXML.responseText,false);
		getDocXML.send();
		
		xmlDoc = getDocXML.responseXML;
		var xTeams = xmlDoc.getElementsByTagName("team");
		//alert("Hoping a praying that elements.length will actually work this time...");
		var xTLength = xTeams.length;
		//alert("Hey, elements.length didn't fail!!");
//###############################################################################################################
		var teamNames = new Array();
		for (var a=0; a < xTLength; a++)
		{
			var xTeamName = xTeams[a].getElementsByTagName("team_name");
			if (xTeamName[0].childNodes.length == 0)
			{
				teamNames[a] = "";
			}
			else
			{
				teamNames[a] = xTeamName[0].childNodes[0].nodeValue;
			}
		}
		
		var studentFirstNames = new Array();
		var studentLastNames = new Array();
		var studentUsernames = new Array();
		var studentPasswords = new Array();
		var studentSchoolNames = new Array();
		var studentStates = new Array();
		var studentIndexes = new Array();
		for (var b=0; b < xTLength; b++)
		{
			var xTStudents = xTeams[b].getElementsByTagName("student");
			for (var c = 0; c < 3; c++)
			{//xStudents[i].getElementsByTagName("username")[0].childNodes.length != 0
				var d = ((3*b)) + (c);
				studentIndexes[d] = c+1;
			
				//alert("Member #"+c);
				var xFirstName = xTStudents[c].getElementsByTagName("first_name");			
				var xLastName = xTStudents[c].getElementsByTagName("last_name");
				
				if(xFirstName[0].childNodes.length && xLastName[0].childNodes.length)
				{
					studentFirstNames[d] = xFirstName[0].childNodes[0].nodeValue;
					studentLastNames[d] = xLastName[0].childNodes[0].nodeValue;
					
					var xUsername = xTStudents[c].getElementsByTagName("username");
					if (xUsername[0].childNodes.length == 0)
					{
						studentUsernames[d] = "";
					}
					else
					{
						studentUsernames[d] = xUsername[0].childNodes[0].nodeValue;
					}
					
					var xPassword = xTStudents[c].getElementsByTagName("password");
					if (xPassword[0].childNodes.length == 0)
					{
						studentPasswords[d] = "";
					}
					else
					{
						studentPasswords[d] = xPassword[0].childNodes[0].nodeValue;
					}
					
					var xSchoolName = xTStudents[c].getElementsByTagName("school_name");
					if (xSchoolName[0].childNodes.length == 0)
					{
						studentSchoolNames[d] = "NA";
					}
					else
					{
						studentSchoolNames[d] = xSchoolName[0].childNodes[0].nodeValue;
					}
					
					var xState = xTStudents[c].getElementsByTagName("state");
					if (xState[0].childNodes.length == 0)
					{
						studentStates[d] = "NA";
					}
					else
					{
						studentStates[d] = xState[0].childNodes[0].nodeValue;
					}
				}
			}
		}
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			registerStudentsXML=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
			registerStudentsXML=new ActiveXObject("Microsoft.XMLHTTP");
		}

		registerStudentsXML.onreadystatechange=function()
		{
			if (registerStudentsXML.readyState==4 && registerStudentsXML.status==200)
			{
				alert(registerStudentsXML.responseText)
				alert("Students have been successfully registered.");
			}
		}
		
		/*var StudentInfo = "firstNames[]="+studentFirstNames;
		StudentInfo += "&lastNames[]="+studentLastNames;
		StudentInfo += "&usernames[]="+studentUsernames;
		StudentInfo += "&passwords[]="+studentPasswords;
		StudentInfo += "&schoolNames[]="+studentSchoolNames;
		StudentInfo += "&states[]="+studentStates;*/
		alert("Registering students...");
		registerStudentsXML.open("GET","Registration/bulkRegistration.php?firstNames[]="+studentFirstNames+"&lastNames[]="+studentLastNames+"&usernames[]="+studentUsernames+"&passwords[]="+studentPasswords+"&schoolNames[]="+studentSchoolNames+"&states[]="+studentStates+"&teamNames[]="+teamNames+"&studentIndexes[]="+studentIndexes,true);
		registerStudentsXML.send();
//###############################################################################################################
		getDocXML.onreadystatechange=function()
		{
			if (getDocXML.readyState==4 && getDocXML.status==200)
			{
			}
		}
	}
}