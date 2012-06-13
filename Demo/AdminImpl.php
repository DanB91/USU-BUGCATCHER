<?php

/*
TODO:
Make it so that after a competition is set up the page that is displayed is simply
an udeditable page that displays the data that was entered prior to starting the competition.

Also when an admin is created a code should be generated that can be given to students so that
we have a way to associate the admin with the students.
*/



class Admin 
{
	private $compMins_int    = 0;
	private $allowHints_bool = false;
	private $mode_string     = "default mode";
	private $numProblems_int = 0;
	private $ifIsComp_bool = false;//If the comp is set up, then true
	
	
	function setMins($mins_int)
	{
		$this->compMins_int = $mins_int;
	}
	
	function getMins()
	{
		return $this->compMins_int;
	}
	
	function setHints($hints_bool)
	{
		$this->allowHints_bool = $hints_bool;
	}
	
	function getHints()
	{
		return $this->allowHints_bool;
	}
	
	function setMode($mode_string)
	{
		$this->mode_string = $mode_string;
	}
	
	function getMode()
	{
		return $this->mode_string;
	}
	
	function setNumProblems($numProbs_int)
	{
		$this->numProblems_int = $numProbs_int;
	}
	
	function getNumProblems()
	{
		return $this->numProblems_int;
	}
	
	function notify($str)
	{
		print $str;
		print "<br />";
	}
	
	function setupComp()
	{
		//set up competition
	}
	
	function sendHint($hint)
	{
		
		if(is_numeric($hint))//If hint is custom
		{
			//Push hint
		}
		else
		{
			//Push predefined hint
		}
		
	}
	
	function pauseComp()
	{
		
	}
	
}

$admin = new Admin();//Instance of admin that is used throught the project

?>