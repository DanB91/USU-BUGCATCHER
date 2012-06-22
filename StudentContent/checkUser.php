<?php
require_once "../header.php";
session_start();
if ($_SESSION['userObject']!=null)
    echo 1;
else 
    echo 0;
?>
