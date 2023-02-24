<?php
require_once(dirname(__FILE__).'/../site.php');
//================================================================
// Header
//================================================================
//SiteHeader::addCSS('/smart-syntax.css');
//SiteHeader::addJS('runtime.js');
SiteHeader::setTitle('Soy - Changelog');
SiteHeader::outputHeader();
//================================================================
// Site Top Nav
//================================================================
//require_once(dirname(__FILE__).'/../shared_nav.php');
//================================================================
// Body
//================================================================
//embedHTML(dirname(__FILE__) . '/../../html/site_nav.html');
?>
	<main>
		<p>Currently working on changelog page, <a href="/" target="_self">Back to Home</a></p>
	</main>
<?php
//================================================================
// Footer
//================================================================
//SiteHeader::addJS('home.min.js');
SiteFooter::outputFooter();
