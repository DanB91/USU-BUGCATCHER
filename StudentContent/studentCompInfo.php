<?php
$fileLineNumber = $_GET['fileLine'];
$compID = $_GET['compID'];
$file = file("../Competitions/${compID}/${compID}.txt");
echo trim($file[$fileLineNumber]);
?>