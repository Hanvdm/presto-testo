<!doctype html>
<meta charset="utf-8" />
<?php

	print "Result: ";

	if (isset($_POST["test"]) and strlen($_POST["test"]) == 484095) {
		print "PASS";
	} else {
		print "FAIL";
	}

?>

