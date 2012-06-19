<?php
require_once 'Model.php';
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
    public function __construct($uniqueValue, $uniqueFieldName = FALSE) {
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
    
    public function getNumberOfStudentsOnTeam(){
	$data['teamid']=$this->getPrimaryKeyValue();
	$result=$this->findInDB("STUDENT_TEAM_LINK", $data);
	$numStudents=0;
	while(($row = $result->fetch_assoc())){
	    $numStudents++;
	}
	return $numStudents;
    }
}

?>
