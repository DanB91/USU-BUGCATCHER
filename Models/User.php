<?php

require_once 'Model.php';
require_once 'Team.php';
require_once 'TeamInvite.php';
require_once 'Chat.php';
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Represents a single User (competitor).  You should not have to instatiate the a user directly.
 * Please use the static methods.
 * 
 * Read the Model class description accessing and using fields
 *
 * @author danielbokser
 */
class User extends Model{
    
    /**
     *Constructs a user using a given unique value 
     * @param type $value unique vale (primary key by default)
     * @param type $fieldName name of the unique field
     */
    public function __construct($value, $fieldName = FALSE) {
        parent::__construct('USERS', $value, $fieldName, array('STUDENT_TEAM_LINK'));
    }
    
    
    public function addUserToTeam(Team $team)
    {
	if($team->getNumberOfStudentsOnTeam()==3)
	    return false;
        $this->createRelationToModel($team, 'STUDENT_TEAM_LINK');
	return true;
    }
    
    
    
    public function sendTeamInviteToUser(Team $team, User $user)
    {
        TeamInvite::createTeamInvite(array('senderid' => $this->getPrimaryKeyValue(), 'teamid' => $team->getPrimaryKeyValue(),
            'receiverid' => $user->getPrimaryKeyValue()));
    }
    
   
    public function getTeamInvites(){
        
        $retInvites = array();
        $this->connection = connectToDB();
        
        
        $sql = 'SELECT teaminviteid FROM TEAM_INVITES WHERE receiverid =' . $this->getPrimaryKeyValue();
        if(!$result = $this->connection->query($sql))
               throw new BugCatcherException('Query Failed: ' . $this->connection->error);
        
          
        while(($row = $result->fetch_assoc()))
        {
            $retInvites[] = new TeamInvite($row['teaminviteid']);
        }
        
        return $retInvites;   
    }


    
    /**
     * If user and password match, this method returns a user, else it returns false
     * @param type $username username of the user
     * @param type $password plain text password of the user
     * @return boolean|\User the user itself if password matches the username (and username exists) , else false
     */
    public static function login($username, $password)
    {
        
        try{
            $user = new User($username, 'username');
            
            if($user->password !== crypt($password, SALT))
                    return FALSE;
            
            return $user;
        }
        catch(BugCatcherException $ex)
        {
            echo $ex->getMessage();
            return FALSE;
            
        }
        
        
        
    }
    
    
    
    public static function registerUser(array $registerData)
    {
        
        foreach($registerData as $fieldName => &$value)
        {
            if($fieldName === 'password')
                continue;
            
            $value = "'" . $value . "'";
        }
        
        Model::addRow('USERS', $registerData);
        
        return new User($registerData['username'], 'username');
    }
    
    
    public function getUsersTeams(){
	$data['userid']=$this->getPrimaryKeyValue();
	$result=$this->findInDB("STUDENT_TEAM_LINK", $data);
	$teamArr= array();
	while(($row = $result->fetch_assoc())){
	    $teamArr[]=new Team($row['teamid']);
	}
	return $teamArr;
    }
    
    public function sendChat($compID, $chatText, $teamID){
	$data['chattext'] = $chatText;
	$data['chattype'] = "Chat";
	$data['teamid'] = $teamID;
	$data['userid'] = $this->getPrimaryKeyValue();
	$data['compid'] = $compID;
        Model::addRow('CHATS', $data);
    }
    
    public function submitTestCase($compID, $testText, $problemID, $teamID){
	$data['chattext'] = $testText;
	$data['chattype'] = "Test";
	$data['teamid'] = $teamID;
	$data['userid'] = $this->getPrimaryKeyValue();
	$data['problemid'] = $problemID;
	$data['compid'] = $compID;
        Model::addRow('CHATS', $data);
    }
     
}

?>
