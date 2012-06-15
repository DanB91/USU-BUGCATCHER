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
    
    public static function createTeam(array $registerData)
    {
        
        foreach($registerData as &$value)
        {
            $value = "'" . $value . "'";
        }
        
        Model::addRow('TEAMS', $registerData);
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
	if($result)
	    return $result['timesolved'];
	else
	    return false;
    }
}

?>
