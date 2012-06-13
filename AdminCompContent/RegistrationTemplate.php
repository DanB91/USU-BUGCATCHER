<?php
//Variable for creating the Template XML file.
$numStudents = $_GET['numberOfStudents'];
$regTemp=fopen("../RegistrationTemplates/Template".$numStudents.".xml","w+");

//If file can be opened, the Template will be created and then be available
//to be downloaded by the administrator.
if (is_numeric($numStudents) && $numStudents >= 0)
{
	if ($regTemp)
	{
		fwrite($regTemp,"<?xml version='1.0' encoding='utf-8'?>");
		fwrite($regTemp,"\r\n");
		fwrite($regTemp,"<!--***EXAMPLE***");
		fwrite($regTemp,"\r\n");
		fwrite($regTemp,"  <student>");
		fwrite($regTemp,"\r\n");
		fwrite($regTemp,"    <first_name>John</first_name>");
		fwrite($regTemp,"\r\n");
		fwrite($regTemp,"    <last_name>Doe</last_name>");
		fwrite($regTemp,"\r\n");
		fwrite($regTemp,"    <username>MyUsername</username>");
		fwrite($regTemp,"\r\n");
		fwrite($regTemp,"    <password>MyPassword</password>");
		fwrite($regTemp,"\r\n");
		fwrite($regTemp,"    <school_name>Example High School</school_name>");
		fwrite($regTemp,"\r\n");
		fwrite($regTemp,"    <state>NY</state> NOTE: Use 2-letter state abbreviations.");
		fwrite($regTemp,"\r\n");
		fwrite($regTemp,"  </student>");
		fwrite($regTemp,"\r\n");
		fwrite($regTemp,"-->");
		fwrite($regTemp,"\r\n");
		fwrite($regTemp,"\r\n");
		fwrite($regTemp,"\r\n");
		
		fwrite($regTemp,"<registration_form>");
		fwrite($regTemp,"\r\n");	
		for ($index=0; $index < $numStudents; $index++)
		{
			if ($index%3 == 0)
			{
				fwrite($regTemp,"\r\n");
				fwrite($regTemp,"  <team>");
				fwrite($regTemp,"\r\n");
				fwrite($regTemp,"    <team_name></team_name>");
				fwrite($regTemp,"\r\n");
			}
			
			fwrite($regTemp,"\r\n");
			fwrite($regTemp,"    <!--Student ".($index+1)." Information-->");
			fwrite($regTemp,"\r\n");
			fwrite($regTemp,"    <student>");
			fwrite($regTemp,"\r\n");
			fwrite($regTemp,"      <first_name></first_name>");
			fwrite($regTemp,"\r\n");
			fwrite($regTemp,"      <last_name></last_name>");
			fwrite($regTemp,"\r\n");
			fwrite($regTemp,"      <username></username>");
			fwrite($regTemp,"\r\n");
			fwrite($regTemp,"      <password></password>");
			fwrite($regTemp,"\r\n");
			fwrite($regTemp,"      <school_name></school_name>");
			fwrite($regTemp,"\r\n");
			fwrite($regTemp,"      <state></state>");
			fwrite($regTemp,"\r\n");
			fwrite($regTemp,"    </student>");
			fwrite($regTemp,"\r\n");
			
			if ($index%3 == 2)
			{
				fwrite($regTemp,"  </team>");
				fwrite($regTemp,"\r\n");
			}
		}
		fwrite($regTemp,"</registration_form>");
		fwrite($regTemp,"\r\n");
		fclose($regTemp);
		
		//Outputs file to JavaScript for Previewing
		$regTemp2 = fopen("../RegistrationTemplates/Template".$numStudents.".xml","r");
		while (!feof($regTemp2))
		{
		 $line = fgets($regTemp2);
		 echo $line;
		}
		fclose($regTemp2);
	}
	//If file could not be opened.
	else
	{
		echo ("");
	}
}
?>