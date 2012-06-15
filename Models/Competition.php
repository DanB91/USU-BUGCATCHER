<?php
include_once 'Model.php';
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Competition
 *
 * @author danielbokser
 */
class Competition extends Model{
    public function __construct($uniqueValue, $uniqueFieldName = FALSE) {
        parent::__construct('COMPETITIONS', $uniqueValue, $uniqueFieldName, array('COMPETITION_PROBLEM_LINK', 'TEAM_COMPETITION_LINK'));
    }
    
    public function getProblems()
    {
        
    }
}


?>
