var compID = "S6GEX329";

function CreateForm()
{
	var numberOfStudents = parseInt(document.getElementById("RNumStudents").value);
	numberOfStudents += (numberOfStudents%3)-1;
	
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
    $.ajax({type: "GET", url:"AdminCompContent/RegistrationTemplate.php", data: "numberOfStudents="+numberOfStudents, success:function(){
      if (numberOfStudents > 0)
			{
				//document.getElementById("PRTextArea").value=createFormXML.responseText;
				$("#RFormDownload").html("<a href='RegistrationTemplates/Template"+numberOfStudents+".xml'>Right click here and select 'save link as...' to download the form.</a>");
				//document.getElementById("RFormDownload").innerHTML="<a href='RegistrationTemplates/Template"+numberOfStudents+".xml'>Right click here and select 'save link as...' to download the form.</a>";
			}
    }});
    /*}
  }
  
  createFormXML.open("GET","AdminCompContent/RegistrationTemplate.php?numberOfStudents="+numberOfStudents,true);
  createFormXML.send();*/
}

function UploadFile()
{
	if (window.XMLHttpRequest)
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
    {
			alert(uploadFileXML.responseText);
    }
  }
  
  uploadFileXML.open("GET","UploadRegistrationFile.php?compID="+compID,true);
  uploadFileXML.send();
}

function loadPrintPreview(element)
{
	var compID = element.options[element.selectedIndex].text;
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
	
	showPreview(printPreviewXML.responseXML);
}
