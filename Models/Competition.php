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
    
    /**
     * Gets all the problems that are associated with this competition
     * @return \Problem 
     */
    
    public function getProblems(){
        $retArray = array();
        
	foreach($this->problemids as $id)
            $retArray[] = new Problem ($id);
            
        return $retArray;
    }
    
    public function getTeams()
    {
        $retArray = array();
        
	foreach($this->teamids as $id)
            $retArray[] = new Team ($id);
            
        return $retArray;
    }
    
    
}


?>
