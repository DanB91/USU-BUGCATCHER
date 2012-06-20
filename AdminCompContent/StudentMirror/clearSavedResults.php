<?php
$AdminUsername = $_COOKIE['adminUserName'];

$directory = "C:\WEB\REU\CurrentTesting\Uploads\asdflkj\TempCompetition";
//$files = glob("C:/WEB/REU/CurrentTesting/Uploads/".$AdminUsername."/TempCompetition/*.txt");
$files = glob("../../Uploads/".$AdminUsername."/TempCompetition/*.txt");
foreach($files as $file){ // iterate files
  if(is_file($file))
    unlink($file); // delete file
}

fopen("../../Uploads/".$AdminUsername."/TempCompetition/Content.txt","w+");

echo "All Results Cleared.";
?>