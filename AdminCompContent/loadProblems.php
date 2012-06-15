<?php

    setcookie("adminUserName", "dan", time() + 60 * 60 * 60);
     
    if(isset($_COOKIE['adminUserName']) && $_COOKIE['adminUserName'] != '')//Admin is logged in
    {
        $fContents = scandir("../../USU-BUGCATCHER/Problems", 0);


        $ret = json_encode($fContents);
        echo $ret;
    }

?>