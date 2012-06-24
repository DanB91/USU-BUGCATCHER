<?php

require_once '../header.php';
session_start();

if(isset($_SESSION['adminObject']))
{
    if(isset($_COOKIE['compN']) && $_COOKIE['compN'] != '')
    {
        $admin = $_SESSION['adminObject'];
        $compN = $_COOKIE['compN'];
        
        $problems = $admin->getCompetitionByCompName($compN)->getProblems();
        
            $content = '<select name="HProbNum" id="HProbNum" size=5 class="Hselect">';
            
                for($i = 0; $i < count($problems); $i++)
                {
                    $probID = $problems[$i]->problemid;
                    $prob = $problems[$i]->problemname;
                    $content .= "<option id=${probID} onclick=showPre(this); > ${prob} </option>";
                }

                $content .= '</select>';
                echo $content;
    }
    else
        echo "Please select a competition";       
}
else
    header( 'Location: index.html');
?>
