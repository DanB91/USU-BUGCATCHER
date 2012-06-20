<?php

require_once dirname(__FILE__) . '/../Database/Connection.php';
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
    private $teamsStats;
    
    
    public function __construct(Competiton $competition) {
        $this->competition = $competition;
        
        $this->load();
    }
    
    
    /**
     * Updates the leaderboard and returns an array of team stats sorted by place
     * Access the each value  array using 
     * $array['teamName']
     * @return type 
     */
    public function getStats()
    {
        $this->load();
        return $this->teamsStats;
    }
    
    
    private function load()
    {
        //holds a single teams stats
        $teamStats = array();
        
        $connection = connectToDB();
        $sql = 'select TEAMS.teamname, count(TEAM_FOUND_BUG.bugid) as bugsfound, max(TEAM_FOUND_BUG.timestamp) as latest'.
                ' from TEAM_FOUND_BUG inner join TEAMS on TEAM_FOUND_BUG.teamid = TEAMS.teamid where compid = '. 
                $this->competition->getPrimaryKeyValue() .' group by TEAM_FOUND_BUG.teamid order by bugsfound desc, latest asc';
        
        $teamStats = array();
        
        if(!$result = $connection->query($sql))
               throw new BugCatcherException('Query Failed: ' . $connection->error);
        
        
        while(($row = $result->fetch_assoc()))
        {
            $teamStats['teamName'] = $row['TEAMS.teamname'];
            $teamStats['bugsFound'] = $row['bugsfound'];
            $teamStats['lastTimeBugFound'] = $row['latest'];
            
            $this->teamsStats[] = $teamStats;
           
        }
        
        
    }
    
    
}

?>
