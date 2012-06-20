<?php
require '../../Models/Admin.php';
session_start();
$AdminUsername = $_SESSION['adminObject']->username;

$files = glob("../../Uploads/".$AdminUsername."/TempCompetition/*.txt");

foreach($files as $file) rmdir($file);

echo "Complete";
?>