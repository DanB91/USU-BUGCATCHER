<?php
require_once 'Model.php';
require_once 'User.php';
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Represents a single Team.  You should not have to instatiate the a team directly.
 * Please use the static methods or methods of other models to get a team object.
 * 
 * Read the Model class description accessing and using fields
 *
 * @author danielbokser
 */
class Team extends Model {
    public $chats;
    
    public function __construct($uniqueValue, $uniqueFieldName = FALSE) {
	$this->chats=array();
        parent::__construct('TEAMS', $uniqueValue, $uniqueFieldName, array('STUDENT_TEAM_LINK', 'TEAM_COMPETITION_LINK'));
    }
    
    /**
     *
     * @param array $registerData
     * @return \Team the team you have created
     */
    public static function createTeam(array $registerData)
    {
        
        foreach($registerData as &$value)
        {
            $value = "'" . $value . "'";
        }
        
        Model::addRow('TEAMS', $registerData);
        return new Team($registerData['teamname'], 'teamname');
    }
    
    public function addTeamToCompetition(Competition $comp)
    {
	$this->createRelationToModel($comp, 'TEAM_COMPETITION_LINK');
    }
    
    public function removeTeamFromCompetition(Competition $comp)
    {
	$this->removeRelationFromModel($comp, 'TEAM_COMPETITION_LINK');
    }
    
    public function foundBugInCompetition(Bug $bug, Competition $comp){
	$data=array();
	$data['teamid']=$this->getPrimaryKeyValue();
	$data['bugid']=$bug->getPrimaryKeyValue();
	$data['compid']=$comp->getPrimaryKeyValue();
	Model::addRow("TEAM_FOUND_BUG", $data);
    }
    
    public function hasFoundBugInCompetition(Bug $bug, Competition $comp){
	$data=array();
	$data['teamid']=$this->getPrimaryKeyValue();
	$data['bugid']=$bug->getPrimaryKeyValue();
	$data['compid']=$comp->getPrimaryKeyValue();
	$result=$this->findInDB("TEAM_FOUND_BUG", $data);
	if(($row = $result->fetch_assoc()))
	    return $row['timesolved'];
	else
	    return false;
    }
    
    public function getBugCount(Competition $comp){
	$this->connection = connectToDB();
	$data=array();
	$data['teamid']=$this->getPrimaryKeyValue();
	$data['compid']=$comp->getPrimaryKeyValue();
	$result=$this->findInDB("TEAM_FOUND_BUG", $data);
	$count=0;
	while(($row = $result->fetch_assoc()))
	    $count++;
	return $count;
    }
    
    public function getNumberOfStudentsOnTeam(){
	$data['teamid']=$this->getPrimaryKeyValue();
	$result=$this->findInDB("STUDENT_TEAM_LINK", $data);
	$numStudents=0;
	while(($row = $result->fetch_assoc())){
	    $numStudents++;
	}
	return $numStudents;
    }
    
    public function getUsers()
    {
        $retArray = array();
        
        foreach($this->userids as $userid)
        {
            $retArray[] = new User($userid);
        }
        
        return $retArray;
    }
    
    public function getTeamLeader()
    {
        return $this->teamleaderid;
    }
    
    public function refreshChats($comp){
	$lastRecieve=$chats[count($chats)-1]['timesent'];
	
	$sql= "SELECT * FROM CHATS WHERE (teamid=".$this->getPrimaryKeyValue();
	$sql= "OR teamid=NULL) AND timesent >".$lastRecieve." AND compid=".$comp->compid;
	
	
	if(!$result = $this->connection->query($sql))
               throw new BugCatcherException('Select Failed: ' . $this->connection->error);
	
	while(($row = $result->fetch_assoc()))
	    $this->chats[]=new Chat($row['chatid']);
    }
    
    public function getChats(){
	return $this->chats;
    }
    
    public function getCompetitions()
    {
        $retArray = array();
        
        $this->connection = connectToDB();
	
        $data['teamid']=$this->getPrimaryKeyValue();
        $result=$this->findInDB("TEAM_COMPETITION_LINK", $data);
	while(($row = $result->fetch_assoc()))
	    $retArray[] = new Competition ($row['compid']);
	return $retArray;
    }
}



?>
