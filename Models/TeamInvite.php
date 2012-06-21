<?php
require_once 'Model.php';
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Represents a single TeamInvite.  You should not have to instatiate the a team directly.
 * Please use the static methods or methods of other models to get a team object.
 * 
 * Read the Model class description accessing and using fields
 *
 * @author danielbokser
 */
class TeamInvite extends Model {
    public function __construct($uniqueValue) {
        parent::__construct('TEAM_INVITES', $uniqueValue);
    }
    
    public function accept(){
	$data['userid']=$this->receiverid;
	$data['teamid']=$this->teamid;
	Model::addRow('STUDENT_TEAM_LINK', $data);
	
	$sql = 'DELETE FROM TEAM_INVITES WHERE teaminviteid=' . $this->getPrimaryKeyValue();

        if(!$this->connection->query($sql))
            throw new BugCatcherException('Invite update query failed: ' . $this->connection->error);
    }
    
    public function decline(){
	$sql = 'DELETE FROM TEAM_INVITES WHERE teaminviteid=' . $this->getPrimaryKeyValue();

        if(!$this->connection->query($sql))
            throw new BugCatcherException('Invite update query failed: ' . $this->connection->error);
    }
    
    public static function createTeamInvite(array $data)
    {
        Model::addRow('TEAM_INVITES', $data);
    }
    
    
    
}

?>
