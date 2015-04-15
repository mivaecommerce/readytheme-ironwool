<?php
	date_default_timezone_set('UTC');
	$ct = mktime();
	setcookie('token', md5('abrasax salt'.$ct), 0, '/');

/* Internet Explorer has a nasty habit of caching the token.php file. After the cookie is sent, we're going to send some special headers to prevent this. */
	# 'Expires' in the past
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
	
	# Always modified
	header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
	
	# HTTP/1.1
	header("Cache-Control: no-store, no-cache, must-revalidate");
	header("Cache-Control: post-check=0, pre-check=0", false);
	
	# HTTP/1.0
	header("Pragma: no-cache");
	echo $ct; 
?>