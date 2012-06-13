<?php
$htmlFilePath = $_GET['filePath'];

if(file_exists($htmlFilePath))
{
	$file = file($htmlFilePath);
	$output = "";
	$CONVERTING = false;
	
	for($i = 0; $i < count($file); $i++)
	{
		$fileLine = $file[$i];
		
		if(trim($fileLine) == "<!--CONVERSION_STARTS_HERE-->")
		{
			$CONVERTING = true;
		}
		else if(trim($fileLine) == "<!--CONVERSION_ENDS_HERE-->")
		{
			$CONVERTING = false;
		}
		else if($CONVERTING)
		{
			$output .= $fileLine;
		}
	}
	
	if ($CONVERTING || empty($output))
	{
		die("One or both of the delimeters is missing or there was no content between the two.");
	}
	
	echo $output;
}
?>