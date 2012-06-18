<?php
    $compArray =  $_SESSION['adminObject']->avaiableComp;
    
    $content = "<select size='15' onclick='showCompInfo(this.value)' style='width:150px;'>";
    //$competitions = array();
    foreach( $compArray as $value )
    {
        $content .= "<option value='${compArray['compid']}'>${$compArray['compName']}</option>"; 
        //array_push($competitions, $row['compID']);
    }
    
    $content .= "</select>";
    
    echo $content;
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
?>
