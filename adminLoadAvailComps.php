<?php
    require 'Models/Admin.php';
    session_start();
    
    $compArray =   $_SESSION['adminObject']->getCompetitions();
    
    $content = "<select size='15' onclick='CS_showCompAInfo(this.value)' style='width:150px;'>";
    //$competitions = array();
    foreach( $compArray as $value )
    {
        $content .= "<option value='$value->compid'>$value->compname</option>"; 
        //array_push($competitions, $row['compID']);
    }
    
    $content .= "</select>";
    
    echo $content;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
?>
