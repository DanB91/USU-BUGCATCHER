<?php


    if(isset($_COOKIE['adminUserName']) && $_COOKIE['adminUserName'] != '')//Admin is logged in
    {
        $fContents = scandir("C:\Dropbox\htdocs\NewDesign\Problems", 0);


        $ret = json_encode($fContents);
        echo $ret;
    }

?>