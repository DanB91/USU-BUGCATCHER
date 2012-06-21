<?php
session_start();
session_destroy();

//Redirects to the homepage
header("Location: index.html");
?>