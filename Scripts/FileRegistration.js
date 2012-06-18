var compID = "1234abcd";
//var ;

function CreateForm()
{
	var numberOfStudents = document.getElementById("PRnumStudents").value;
/*	if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    createFormXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    createFormXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  createFormXML.onreadystatechange=function()
  {
    if (createFormXML.readyState==4 && createFormXML.status==200)
    {*/
    $.ajax({type: "GET", url:"PreRegTemplate.php", data: "numberOfStudents="+numberOfStudents, success:function(){
      if (numberOfStudents > 0)
	{
		document.getElementById("PRTextArea").value=createFormXML.responseText;
		$("#PRDownloadLink").html("<a href='RegistrationTemplates/Template"+numberOfStudents+".xml'>Right click here and select 'save link as...' to download the form.</a>");
		//document.getElementById("PRDownloadLink").innerHTML="<a href='RegistrationTemplates/Template"+numberOfStudents+".xml'>Right click here and select 'save link as...' to download the form.</a>";
	}
    }});
    /*}
  }
  
  createFormXML.open("GET","PreRegTemplate.php?numberOfStudents="+numberOfStudents,true);
  createFormXML.send();*/
}

function UploadFile()
{
	/*if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    uploadFileXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    uploadFileXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  uploadFileXML.onreadystatechange=function()
  {
    if (uploadFileXML.readyState==4 && uploadFileXML.status==200)
    {*/
    $.ajax({type: "GET", url:"UploadRegistrationFile.php", data: "compID="+compID, success:function(result){
	alert(result);
	//alert(uploadFileXML.responseText);
    }});
  /*}

  uploadFileXML.open("GET","UploadRegistrationFile.php?compID="+compID,true);
  uploadFileXML.send();*/
}

function loadPrintPreview(element)
{
	/*var compID = element.options[element.selectedIndex].text;
	if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    printPreviewXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    printPreviewXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
	
  printPreviewXML.open("GET","RegistrationTemplates/"+compID+".xml",false);
	printPreviewXML.send();
	
	showPreview(printPreviewXML.responseXML);*/
    $.ajax({type: "GET", url:"RegistrationTemplates/"+compID+".xml", success:function(result){
	    showPreview(result);
    }});
}

function showPreview(xmlDoc)
{
	var xStudents=xmlDoc.getElementsByTagName("student");
	var xLength=xStudents.length;
	var PreviewContent = "";
	var index = 0;
	for (var i=0;i<xLength;i++)
	{
		index = i+1;
		PreviewContent += "Student "+index+": ";
		PreviewContent += "\nFirst Name: ";
		if (xStudents[i].getElementsByTagName("first_name")[0].childNodes.length != 0)
		{
	    PreviewContent += xStudents[i].getElementsByTagName("first_name")[0].childNodes[0].nodeValue;
		}
		else
		{
			PreviewContent += "Will be assigned";
		}
		PreviewContent += "\nLast Name: ";
		if (xStudents[i].getElementsByTagName("last_name")[0].childNodes.length != 0)
		{
	    PreviewContent += xStudents[i].getElementsByTagName("last_name")[0].childNodes[0].nodeValue;
		}
		else
		{
			PreviewContent += "Will be assigned";
		}
		PreviewContent += "\nUsername: ";
		if (xStudents[i].getElementsByTagName("username")[0].childNodes.length != 0)
		{
			PreviewContent += xStudents[i].getElementsByTagName("username")[0].childNodes[0].nodeValue;
		}
		else
		{
			PreviewContent += "Will be assigned";
		}
		PreviewContent += "\nPassword: ";
		if (xStudents[i].getElementsByTagName("password")[0].childNodes.length != 0)
		{
	    PreviewContent += xStudents[i].getElementsByTagName("password")[0].childNodes[0].nodeValue;
		}
		else
		{
			PreviewContent += "Will be assigned";
		}
		PreviewContent += "\nSchool Name: ";
		if (xStudents[i].getElementsByTagName("school_name")[0].childNodes.length != 0)
		{
	    PreviewContent += xStudents[i].getElementsByTagName("school_name")[0].childNodes[0].nodeValue;
		}
		else
		{
			PreviewContent += "Will be assigned";
		}
		PreviewContent += "\nState: ";
		if (xStudents[i].getElementsByTagName("state")[0].childNodes.length != 0)
		{
	    PreviewContent += xStudents[i].getElementsByTagName("state")[0].childNodes[0].nodeValue;
		}
		else
		{
			PreviewContent += "Will be assigned";
		}
		PreviewContent += "\n\n";
	}
	document.getElementById("PRTextArea").value=PreviewContent;
}
//-----------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------//
/*
var PreviewContent="";
var EditContent="";
var compID = "1234abcd";

//This function handles the creation of the file the administrator
//will be using to register students (en-mass) for a competition.


function PreviewEdit(buttonValue)
{
	if (buttonValue == 0)
	{
		PreviewContent = document.getElementById("PRTextArea").value;
		document.getElementById("PRTextArea").value = EditContent;
	}
	else if (buttonValue == 1)
	{
		EditContent = document.getElementById("PRTextArea").value;
		EditContent = EditContent.replace("\r\n", "\n");
		
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			previewFormXML=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
			previewFormXML=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		previewFormXML.open("GET","PreRegFile.php?compID="+compID+"&fileContent="+EditContent,true);
		previewFormXML.send();
		
		previewFormXML.onreadystatechange=function()
		{
			if (previewFormXML.readyState==4 && previewFormXML.status==200)
			{
				getPreRegFile();
			}
		}	
		//makePreRegFile(EditContent);
	}
}

function makePreRegFile(fileContent)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		previewFormXML=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		previewFormXML=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	previewFormXML.open("GET","PreRegFile.php?compID="+compID+"&fileContent="+fileContent,true);
	previewFormXML.send();
	
	previewFormXML.onreadystatechange=function()
	{
		if (previewFormXML.readyState==4 && previewFormXML.status==200)
		{
			getPreRegFile();
		}
	}
}

function getPreRegFile()
{
	alert("hello");
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		filePrevXML=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		filePrevXML=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	filePrevXML.open("GET","RegistrationTemplates/"+compID+".xml",false);
	filePrevXML.send();
	
	showPreview(filePrevXML.responseXML);
	
	filePrevXML.onreadystatechange=function()
	{
		if (filePrevXML.readyState==4 && filePrevXML.status==200)
		{
			showPreview(filePrevXML.responseXML);
		}
	}
}

function wait(msecs)
{
	var start = new Date().getTime();
	var cur = start
	while(cur - start < msecs)
	{
	cur = new Date().getTime();
	}	
} 

function showPreview(xmlDoc)
{
	var xStudents=xmlDoc.getElementsByTagName("student");
	var xLength=xStudents.length;
	PreviewContent = "";
	var index = 0;
	for (var i=0;i<xLength;i++)
	{
		index = i+1;
		PreviewContent += "Student "+index+": ";
		PreviewContent += "\nFirst Name: ";
		if (xStudents[i].getElementsByTagName("first_name")[0].childNodes.length != 0)
		{
	    PreviewContent += xStudents[i].getElementsByTagName("first_name")[0].childNodes[0].nodeValue;
		}
		else
		{
			PreviewContent += "Will be assigned";
		}
		PreviewContent += "\nLast Name: ";
		if (xStudents[i].getElementsByTagName("last_name")[0].childNodes.length != 0)
		{
	    PreviewContent += xStudents[i].getElementsByTagName("last_name")[0].childNodes[0].nodeValue;
		}
		else
		{
			PreviewContent += "Will be assigned";
		}
		PreviewContent += "\nUsername: ";
		if (xStudents[i].getElementsByTagName("username")[0].childNodes.length != 0)
		{
			PreviewContent += xStudents[i].getElementsByTagName("username")[0].childNodes[0].nodeValue;
		}
		else
		{
			PreviewContent += "Will be assigned";
		}
		PreviewContent += "\nPassword: ";
		if (xStudents[i].getElementsByTagName("password")[0].childNodes.length != 0)
		{
	    PreviewContent += xStudents[i].getElementsByTagName("password")[0].childNodes[0].nodeValue;
		}
		else
		{
			PreviewContent += "Will be assigned";
		}
		PreviewContent += "\nSchool Name: ";
		if (xStudents[i].getElementsByTagName("school_name")[0].childNodes.length != 0)
		{
	    PreviewContent += xStudents[i].getElementsByTagName("school_name")[0].childNodes[0].nodeValue;
		}
		else
		{
			PreviewContent += "Will be assigned";
		}
		PreviewContent += "\nState: ";
		if (xStudents[i].getElementsByTagName("state")[0].childNodes.length != 0)
		{
	    PreviewContent += xStudents[i].getElementsByTagName("state")[0].childNodes[0].nodeValue;
		}
		else
		{
			PreviewContent += "Will be assigned";
		}
		PreviewContent += "\n\n";
	}
	document.getElementById("PRTextArea").value=PreviewContent;
}







function Preview(file)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		PreviewXML=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		PreviewXML=new ActiveXObject("Microsoft.XMLHTTP");
	}
	PreviewXML.onreadystatechange=function()
  {
    if (PreviewXML.readyState==4 && PreviewXML.status==200)
    {
      xmlDoc=xmlhttp.responseXML;
			loadPreview(xmlDoc);
    }
  }
	
	PreviewXML.open("GET","Computers.xml",false);
	PreviewXML.send();
}

function uploadPreview(file)
{
	var xStudents=xmlDoc.getElementsByTagName("student");
	var xLength=xStudents.length;
	document.getElementById("PreRegPreview").innerHTML="";
	for (var i=0;i<xLength;i++)
	{
		formInfo += "<h2>Name: ";
		formInfo += xComputers[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
		formInfo += "</h2><p>Type: ";
		formInfo += xComputers[i].getElementsByTagName("type")[0].childNodes[0].nodeValue;
		formInfo += "<br />Model: ";
		formInfo += xComputers[i].getElementsByTagName("model")[0].childNodes[0].nodeValue;
		formInfo += "<br />Speed: ";
		formInfo += xComputers[i].getElementsByTagName("speed")[0].childNodes[0].nodeValue;
		formInfo += "<br />Memory: ";
		formInfo += xComputers[i].getElementsByTagName("memory")[0].childNodes[0].nodeValue;
		formInfo += "<br />Storage: ";
		formInfo += xComputers[i].getElementsByTagName("storage")[0].childNodes[0].nodeValue;
		formInfo += "<br />Video Card 1: ";
		formInfo += xComputers[i].getElementsByTagName("video_card_1")[0].childNodes[0].nodeValue;
		formInfo += "<br />Video Card 2: ";
		formInfo += xComputers[i].getElementsByTagName("video_card_2")[0].childNodes[0].nodeValue;
		formInfo += "</p>";
	}
	document.getElementById("content").innerHTML=compInfo;
}



/*
function CreateForm()
{
	var numberOfStudents = document.getElementById("PRnumStudents").value;
	if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    createFormXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    createFormXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  createFormXML.onreadystatechange=function()
  {
    if (createFormXML.readyState==4 && createFormXML.status==200)
    {
      if (numberOfStudents > 0)
			{
				if (buttonValue == 0)
				{//Preview
					document.getElementById("PreRegPreview").innerHTML="<textarea cols=84 rows=24>"+createFormXML.responseText+"</textarea>";
				}
				else if (buttonValue == 1)
				{//Download
					alert("How to download: When the page following this loads, simply right click and select 'Save As..'.  Save the document and then press back to return to this page.");
					var url = 'RegistrationTemplates/Template'+numberOfStudents+'.xml';
					window.location = url;
				}
			}
    }
  }
  
  createFormXML.open("GET","PreRegTemplate.php?numberOfStudents="+numberOfStudents,true);
  createFormXML.send();  
}
*/