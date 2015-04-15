<?php
	/* Sets a variable to halt processing until we know the submission is valid. */
	$proceed = false;
	
	/* Sets the amount of time allowed to complete the form. 5 minutes seems like a good amount of time. */
	$seconds = 60 * 5;
	
	/* Checkes that the cookie and security token are present. If they are, we continue processing. */
	if (isset($_POST['mms']) && isset($_COOKIE['token']) && $_COOKIE['token'] == md5('abrasax salt'.$_POST['mms'])) {
		$proceed = true;
	}
	
	/* Check all form inputs for possible XSS using strip_tags function. */
	$tafName = clean(strip_tags($_POST['tafName']));
	$tafEmail = clean(strip_tags($_POST['tafEmail']));
	$tafFriendEmail = clean(strip_tags($_POST['tafFriendEmail']));
	/* IF YOU WANT TO SEND TO MULTIPLE FRIENDS, COMMENT OUT THE LINE ABOVE AND UNCOMMENT THE NEXT THREE. */
	//$tafFriendEmail1 = clean(strip_tags($_POST['tafFriendEmail1']));
	//$tafFriendEmail2 = clean(strip_tags($_POST['tafFriendEmail2']));
	//$tafFriendEmail3 = clean(strip_tags($_POST['tafFriendEmail3']));
	$tafComment = clean(strip_tags($_POST['tafComment']));
	
	/* Add the store and current time information. */
	$prodName = clean(strip_tags($_POST['prodName']));
	$prodURL = clean(strip_tags($_POST['prodURL']));
	$storeName = clean(strip_tags($_POST['storeName']));
	$storeURL = clean(strip_tags($_POST['storeURL']));
	$storeEmail = base64_decode($_POST['storeEmail']);
	$storeEmail = clean(strip_tags($storeEmail));
	date_default_timezone_set('UTC');
	$now = time();
	
	/* Does the token match the timestamp when run through the md5() function? If not, we know something is up and exit. */
	if (!$proceed) { 
		echo 'Error: Form processing halted for suspicious activity!';
	}
	/* Has too much time elapsed? If so, we take the customer to the error page. */
	elseif (((int)$_POST['mms'] + $seconds) < mktime()) {
		echo 'Error: We\'re sorry, there was a problem processing your request. Your session has expired.';
	}
	/* If e-mail is not valid show error message. This is a fail-safe measure in case the script is hit directly by a bot. */
	elseif (!preg_match('/^[_A-z0-9-]+((\.|\+)[_A-z0-9-]+)*@[A-z0-9-]+(\.[A-z0-9-]+)*(\.[A-z]{2,4})$/', $tafEmail)) {
		echo 'Error: You have entered an invalid email address!';
	}
	else {
		/* Set TO Email Addresses */
		$to = $tafFriendEmail;
		/* IF YOU WANT TO SEND TO MULTIPLE FRIENDS, COMMENT OUT THE LINE ABOVE AND UNCOMMENT THE NEXT TWO. */
		//$addresses = array($tafFriendEmail1, $tafFriendEmail2, $tafFriendEmail3);
		//$to = implode(',', $addresses);
		
		/* Let's prepare the message for the e-mail. */
		$message = "<p>Hello,</p><p>Your friend, $tafName, was visiting the $storeName website and thought you might be interested in the following product:</p><p>Product Name: $prodName<br />Link to Product: <a href='$prodURL'>$prodURL</a></p><p>Here's what $tafName thought about $prod_name:<br /><em>\"$tafComment\"</em><p>Sincerely,<br />$storeName<br /><a href='$storeURL' title='$storeName'>$storeURL</a></p>";
		
		/* Is the OS Windows or Mac or Linux? */
		if (strtoupper(substr(PHP_OS, 0, 3) === 'WIN')) {
			$eol = "\r\n";
		}
		elseif (strtoupper(substr(PHP_OS, 0, 3) === 'MAC')) {
			$eol = "\r";
		}
		else {
			$eol = "\n";
		}
		
		/* Set Common Headers */
		$headers = 'From: '.$tafName.'<'.$tafEmail.'>'.$eol;
		$headers .= 'Reply-To:'.$tafName.'<'.$tafEmail.'>'.$eol;
		$headers .= 'Return-Path:'.$tafName.'<'.$tafEmail.'>'.$eol;    // These two to set reply address.
		$headers .= "Message-ID: <".$now." TheSystem@".$_SERVER['SERVER_NAME'].">".$eol;
		$headers .= "X-Mailer: PHP v".phpversion().$eol;          // These two are used to help avoid spam-filters.
		$headers .= 'MIME-Version: 1.0'.$eol;
		$headers .= 'Content-Type: text/html; charset=UTF-8' .$eol;
		
		/* Send the message using mail() function */
		mail($to, $tafName." found a product at ".$storeName." that you might like", $message, $headers);
		
		/* Notify vistor of success or failue */
		if (mail) {
			echo 'Your message has been sent. Thank you for sharing with your friends.';
		}
		else {
			echo 'Error: We\'re sorry, there was a problem processing your request.';
		}
	}
	
	function clean($string){
		$string = str_replace(array( "\r", "\n", "%0a", "%0d"), '', stripslashes($string));
		return $string;
	}
	
	exit;
?>

<!-- Just a nice gag in case someone can actually visit this page. -->
<p>If you want to "attack" this form, <a href="../php/clearCookie.php">try this demo</a>.</p>
