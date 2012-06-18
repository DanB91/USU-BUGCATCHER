<?php
    session_start();
    $compArray =  $_SESSION['adminObject']->getCompetitions;
    
    $content = "<select size='15' onclick='showCompInfo(this.value)' style='width:150px;'>";
    //$competitions = array();
    foreach( $compArray as $value)
    {
        $content .= "<option value='${compArray['compid']}'>${$compArray['compName']}</option>"; 
        //array_push($competitions, $row['compID']);
    }
    
    $content .= "</select>";
    
    echo $content;
//    session_start();
//    $_SESSION['compList'] = $competitions;
?>
