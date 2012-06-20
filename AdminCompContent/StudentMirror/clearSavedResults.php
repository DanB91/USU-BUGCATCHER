<?php
require '../../Models/Admin.php';
session_start();
$AdminUsername = $_SESSION['adminObject']->username;

//$directory = "C:\WEB\REU\CurrentTesting\Uploads\asdflkj\TempCompetition";
//$files = glob("C:/WEB/REU/CurrentTesting/Uploads/".$AdminUsername."/TempCompetition/*.txt");
$files = glob("../../Uploads/".$AdminUsername."/TempCompetition/*.txt");
foreach($files as $file){ // iterate files
  if(is_file($file))
    unlink($file); // delete file
}

fopen("../../Uploads/".$AdminUsername."/TempCompetition/Content.txt","w+");

echo "All Results Cleared.";
?>