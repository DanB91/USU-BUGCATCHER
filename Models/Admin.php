<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
require_once 'Model.php';
require_once 'Competition.php';
/**
 * Class the represents admin
 *
 * @author danielbokser
 */
class Admin extends Model{
    
    public function __construct($uniqueValue, $uniqueFieldName = FALSE) {
        parent::__construct('ADMINS', $uniqueValue, $uniqueFieldName);
    }
    
    
    /**
     *Creates a competition with this admin as a creator.  
     * When passing in data, do not pass in the 'user id'.  That is added automatically
     * @param array $data data dictionary
     * @param array $problems problems to add to Competition, must be problem objects!
     * @return Competition the competition object
     */
    public function createCompetition(array $data, array $problems = NULL)
    {
        foreach($data as $fieldName => &$value)
        {
            if($fieldName === 'password')
                continue;
            

           
            switch($fieldName)
            {
                case 'compname':
                case 'description':
                    $value = "'" . $value . "'";
            }
            
        }
        
        
        $data['userid'] = $this->getPrimaryKeyValue();
        Model::addRow('COMPETITIONS', $data);
        
        $newComp = new Competition($data['compname'], 'compname');
        
        if ($problems) {
            foreach ($problems as $problem) {
                $problem->addProblemToCompetition($newComp);
            }
        }
        
        return $newComp;
    }
    
    
    public function getCompetitions()
    {
        $retCompetitions = array();
        $this->connection = connectToDB();
        
        
        $sql = 'SELECT compid FROM COMPETITIONS WHERE userid =' . $this->getPrimaryKeyValue();
        if(!$result = $this->connection->query($sql))
               throw new BugCatcherException('Query Failed: ' . $this->connection->error);
        
        //create a competition object foreach associated compeition
        while(($row = $result->fetch_assoc()))
        {
            $retCompetitions[] = new Competition($row['compid']);
        }
        
        return $retCompetitions;
    }
    
    public function getCompetitionByCompName($compeitionName)
    {   
        return new Competition($compeitionName, 'compname');
    }



    public static function registerAdmin(array $registerData)
    {
        foreach($registerData as $fieldName => &$value)
        {
            if($fieldName === 'password')
                continue;
            
            $value = "'" . $value . "'";
        }
        
        Model::addRow('ADMINS', $registerData);
    }
    
    /**
     * If username and password match, this method returns an admin object, else it returns false
     * @param type $username username of the admin
     * @param type $password plain text password of the user
     * @return boolean|\User the user itself if password matches the username (and username exists) , else false
     */
    public static function login($username, $password)
    {
        
        try{
            $admin = new Admin($username, 'username');
            
            if($admin->password !== crypt($password, SALT))
                    return FALSE;
            
            return $admin;
        }
        catch(BugCatcherException $ex)
        {
            echo $ex->getMessage();
            return FALSE;
            
        }
        
        
        
    }
    
    public function sendHint($compID, $hintText, $problemID){
	$data['chattext'] = "'${hintText}'";
	$data['chattype'] = "'Hint'";
	$data['userid'] = $this->getPrimaryKeyValue();
	$data['problemid'] = $problemID;
	$data['compid'] = $compID;
        Model::addRow('CHATS', $data);
    }
    
    public function sendCustHint($compID, $hintText){
	$data['chattext'] = "'${hintText}'";
	$data['chattype'] = "'Hint'";
	$data['userid'] = $this->getPrimaryKeyValue();
	$data['compid'] = $compID;
        Model::addRow('CHATS', $data);
    }
}

?>
