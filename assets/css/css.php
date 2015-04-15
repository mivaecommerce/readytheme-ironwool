<?php
	if (extension_loaded('zlib')) {
		ob_start('ob_gzhandler');
	}
	header ('content-type: text/css; charset: UTF-8');
	header ('cache-control: must-revalidate');
	$offset = 60 * 60 * 24 *7; // Cache for 1 week
	$expire = 'expires: ' . gmdate ('D, d M Y H:i:s', time() + $offset) . ' GMT';
	header ($expire);
	ob_start('compress');
	function compress($buffer) {
		/* remove comments */
		$buffer = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $buffer);
		/* remove tabs, spaces, newlines, etc. */
		$buffer = str_replace(array("\r\n", "\r", "\n", "\t"), '', $buffer);
		return $buffer;
	}
	/* css files for compression */
	include('normalize.css');
	include('base.css');
	include('scaffolding.css');
	include('typography.css');
	include('buttons.css');
	include('fonts.css');
	include('forms.css');
	include('tables.css');
	include('colors.css');
	include('slider.css');
	include('magnific-popup.css');
	include('helpers.css');
	include('structure.css');
	include('pages.css');
	include('theme.css');
	include('print.css');
	if (extension_loaded('zlib')) {
		ob_end_flush();
	}
?>
