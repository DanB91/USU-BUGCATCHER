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
        $sql = 'SELECT * FROM TEAM_FOUND_BUG WHERE compid = ' . $this->competition->primaryKeyValue;
    }
}

?>
