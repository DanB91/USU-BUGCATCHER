<?php


    if(isset($_COOKIE['adminUserName']) && $_COOKIE['adminUserName'] != '')//Admin is logged in
    {
        $ProbName = $_GET["problem"];
        $file = fopen("C:\Dropbox\htdocs\NewDesign\Problems\\".$ProbName."\difficulty.txt", "r");
        
        $difficulty = fgets($file);
        fclose($file);
        echo $difficulty;
    }

?>