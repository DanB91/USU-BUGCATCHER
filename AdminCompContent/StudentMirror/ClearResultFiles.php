<?php
$AdminUsername = $_COOKIE['adminUserName'];

$files = glob("../../Uploads/".$AdminUsername."/TempCompetition/*.txt");

foreach($files as $file) rmdir($file);

echo "Complete";
?>