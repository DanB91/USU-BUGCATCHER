<?php

require_once dirname(__FILE__) . '/../../Models/Team.php';
require_once dirname(__FILE__) . '/../../Models/Competition.php';

/**
 * Test class for Team.
 * Generated by PHPUnit on 2012-06-13 at 23:56:44.
 */
class TeamTest extends PHPUnit_Framework_TestCase {

    /**
     * @var Team
     */
    protected $object;

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp() {
        $this->object = new Team(1);
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown() {
        
    }

    /**
     * @covers Team::createTeam
     * @todo Implement testCreateTeam().
     */
    public function testCreateTeam() {
        Team::createTeam(array('teamname' => 'team1', 'teamleaderid' => 1, 'hidden' => 1));
    }
    
    public function testAddTeamToCompetition() {
	$competition=new Competition(1);
	$this->assertSame($competition->compname, 'test');
	$this->object->addTeamToCompetition($competition);
    }

    public function testRemoveTeamFromCompetition() {
	$competition=new Competition(1);
	$this->assertSame($competition->compname, 'test');
	$this->object->removeTeamFromCompetition($competition);
    }

}

?>
