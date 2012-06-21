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
    
    
    public function getProblems(){
	$arr=array();
	
	foreach($this->problemids as $id)
	    $arr[]=new Problem($id);
	
	return $arr;
    }
    
    public function getNumProblems(){
	return count($this->problemids);
    }
    
    public function getNumTeams(){
	return count($this->teamids);
    }
    
    public function getTeams()
    {
        $retArray = array();
        
	foreach($this->teamids as $id)
            $retArray[] = new Team ($id);
            
        return $retArray;
    }
    
    public static function getJoinableCompetitions()
    {
        $retComps = array();
        
        $connection = connectToDB();
        
        $sql = 'SELECT compid FROM COMPETITIONS WHERE hidden = 0 and notjoinable = 0';
        if(!$result = $connection->query($sql))
               throw new BugCatcherException('Query Failed: ' . $connection->error);
        
          
        
        while(($row = $result->fetch_assoc()))
        {          
            $retComps[] = new Competition($row['compid']);
        }
        
        return $retComps;   
    }
    
    public function hasStarted(){
	if($this->starttime=="0000-00-00 00:00:00")
	    return false;
	return true;
    }
    
    
    public function hasCompleted(){
	if($this->hasfinish==0)
	    return false;
	return true;
    }
    
    public function isPaused(){
	if($this->pausestate=="0000-00-00 00:00:00")
	    return false;
	return true;
    }
}


?>
