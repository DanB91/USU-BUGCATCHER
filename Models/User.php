<?php

require_once 'Model.php';
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
        
        foreach($registerData as &$value)
        {
            $value = "'" . $value . "'";
        }
        
        Model::addRow('USERS', $registerData);
    }
    
    
    
}

?>
