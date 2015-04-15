<?php
	/* Check all form inputs using check_input function. */
	$newsletterEmail = clean(strip_tags($_POST['newsletterEmail']));
	
	/* Add the store and current time information. */
	$storeName = clean(strip_tags($_POST['storeName']));
	$storeURL = strip_tags($_POST['storeURL']);
	$storeEmail = base64_decode($_POST['storeEmail']);
	$storeEmail = clean(strip_tags($storeEmail));
	date_default_timezone_set('UTC');
	$now = time();
	
	/* If e-mail is not valid show error message. This is a fail-safe measure in case the script is hit directly by a bot. */
	if (empty($newsletterEmail)) {  
		echo 'Error: You did not enter an email address!';
	}  
	else if (!preg_match('/^[_A-z0-9-]+((\.|\+)[_A-z0-9-]+)*@[A-z0-9-]+(\.[A-z0-9-]+)*(\.[A-z]{2,4})$/', $newsletterEmail)) {
		echo 'Error: You have entered an invalid email address!';
	} 
	else {
		/* Let's prepare the admin message for the e-mail. */
		$adminMessage = "<p>Hello $storeName,</p><p>A visitor has requested to receive email updates and exclusive offers from your website.</p><p>Here is their email address: <a href='mailto:$newsletterEmail'>$newsletterEmail</a></p>";
		$visitorMessage = "<p>Hello,</p><p>Thank you for joining the $storeName Mailing List.<br />You will begin receiving your newsletter with our next update.</p><p>Sincerely,<br />$storeName<br /><a href='$storeURL' title='$storeName'>$storeURL</a></p>";
		
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
		
		/* Set Admin Headers */
		$headers = 'From: '.$storeName.' Newsletter Sign Up <'.$storeEmail.'>'.$eol;
		$headers .= 'Reply-To: '.$storeName.' Newsletter Sign Up <'.$storeEmail.'>'.$eol;
		$headers .= 'Return-Path: '.$storeName.' Newsletter Sign Up <'.$storeEmail.'>'.$eol;    // These two to set reply address.
		$headers .= "Message-ID: <".$now." TheSystem@".$_SERVER['SERVER_NAME'].">".$eol;
		$headers .= "X-Mailer: PHP v".phpversion().$eol;          // These two are used to help avoid spam-filters.
		$headers .= 'MIME-Version: 1.0'.$eol;
		$headers .= 'Content-Type: text/html; charset=UTF-8' .$eol;
		
		/* Send the message using mail() function. */
		mail($storeEmail, "Your ".$storeName." Newsletter Sign Up Has Been Submitted", $adminMessage, $headers);
		mail($newsletterEmail, $storeName." Newsletter Sign Up Confirmation", $visitorMessage, $headers);
		
		/* Notify vistor of success or failue */
		if (mail) {
			echo 'Thank you for joining the '.$storeName.' mailing list.';
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
