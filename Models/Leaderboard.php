<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Leaderboard
 *
 * @author danielbokser
 */
class Leaderboard {
    
    private $competition;
    
    public function __construct(Competiton $competition) {
        $this->competition = $competition;
    }
    
    private function load()
    {
        $sql = 'SELECT teamid, COUNT(bugid), SUM() as bugsfound FROM TEAM_FOUND_BUG WHERE compid = ' . $this->competition->primaryKeyValue . 
                'GROUP BY teamid ORDER BY bugsfound DESC, ';
    }
}

?>
