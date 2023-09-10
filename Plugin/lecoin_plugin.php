<?php

/**
*Plugin Name: lecoinPG
*Description: This is a test plugin
**/
function f1(){
	$var1="Este plugin es de prueba";
	return $var1;
	
}

add_shortcode('lecoinPG', 'f1');



?>