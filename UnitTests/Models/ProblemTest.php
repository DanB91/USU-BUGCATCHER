<?php

require_once dirname(__FILE__) . '/../../Models/Problem.php';
require_once dirname(__FILE__) . '/../../Models/Competition.php';

/**
 * Test class for Problem.
 * Generated by PHPUnit on 2012-06-14 at 14:03:57.
 */
class ProblemTest extends PHPUnit_Framework_TestCase {

    /**
     * @var Problem
     */
    protected $object;

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp() {
	$this->object = new Problem(27);
    }

//    public function testFields(){
//	$this->assertSame($this->object->problemname, 'Fib');
//	$this->assertSame($this->object->description, 'fibbonacci');
//	$this->assertSame($this->object->technique, 'addition');
//	
//    }
//    
//    /**
//     * Tears down the fixture, for example, closes a network connection.
//     * This method is called after a test is executed.
//     */
//    protected function tearDown() {
//	
//    }
//
//    /**
//     * @covers Problem::addProblemToCompetition
//     * @todo Implement testAddProblemToCompetition().
//     */
//    public function testAddProblemToCompetition() {
//	$competition=new Competition(1);
//	$this->assertSame($competition->compname, 'test');
//	$this->object->addProblemToCompetition($competition);
//	$this->assertSame($competition->problemids, array('1'));
//	$this->assertSame($this->object->compids, array('1'));
//    }
//
//    /**
//     * @covers Problem::removeProblemFromCompetition
//     * @todo Implement testRemoveProblemFromCompetition().
//     */
//    public function testRemoveProblemFromCompetition() {
//	$competition=new Competition(1);
//	$this->assertSame($competition->compname, 'test');
//	$this->object->removeProblemFromCompetition($competition);
//	$this->assertSame($competition->problemids, array());
//	$this->assertSame($this->object->compids, array());
//    }
    
    public function testGetAllProblems()
    {
        var_dump(Problem::getAllProblems());
    }
    
    public function testGetBugs()
    {
        $bugs = $this->object->getBugs();
        $this->assertEquals($bugs[0]->bugid, 169);
    }
    
    
    

}

?>
