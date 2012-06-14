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
        parent::__construct('TEAMS', $uniqueValue, $uniqueFieldName, array('STUDENT_TEAM_LINK', 'TEAM_COMPETITION_LINK'));
    }
    
    /**
     *Starts the competition 
     */
    public function start()
    {
        $this->pausestate = 0;
        $this->commitToDB();
    }
    
    /**
     *Pauses the competition 
     */
    public function pause()
    {
        $this->pausestate = 1;
        $this->commitToDB();
    }
    
    /**
     *Gets the pause state
     * @return boolean whether the competion is paused or not 
     */
    public function isPaused()
    {
        return $this->pausestate;
    }
}


?>
