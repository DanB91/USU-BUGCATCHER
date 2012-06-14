<?php

    $con = mysql_connect("localhost", "guest", "");
    mysql_select_db("competition", $con);
    $sql = "SELECT * FROM usedids WHERE joinable='1' AND hasfinished='0'";
    $result = mysql_query($sql);

    $content = "<select size='15' onclick='showCompInfo(this.value)' style='width:150px;'>";
    //$competitions = array();
    while($row = mysql_fetch_array($result))
    {
        $content .= "<option>${row['compID']}</option>"; 
        //array_push($competitions, $row['compID']);
    }
    
    $content .= "</select>";
    
    echo $content;
//    session_start();
//    $_SESSION['compList'] = $competitions;
?>
