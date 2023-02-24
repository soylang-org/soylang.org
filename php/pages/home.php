<?php
require_once(dirname(__FILE__).'/../site.php');
//================================================================
// Header
//================================================================
//SiteHeader::addCSS('/smart-syntax.css');
//SiteHeader::addJS('runtime.js');
SiteHeader::setTitle('Soylang Project');
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
	<style>
		* {
			font-family: Menlo, Monaco, Monospaced, sans-serif;
		}
	</style>
	<h1>Soylang Project</h1>
	<h1>Setting things up.</h1>
	<h3>This project will include tools and utilities alongside a new general purpose programming language (interpreted and compiled) called Soy.</h3>
	<h4>Soy General Purpose Programming Language, website is currently being worked on, please check back at a later time.</h4>
	<ol>
		<li><a href='/docs' target='_self'>Soy Language - Documentation</a></li>
		<li><a href='/changelog' target='_self'>Soy Language - Changelog</a></li>
	</ol>
	<a href="https://github.com/soylang-org" target="_blank">https://github.com/soylang-org</a>
	<br>
	<img src='/jesse.jpg' alt='Soy Jesse' width='64px' />
</main>
<?php
//================================================================
// Footer
//================================================================
//SiteHeader::addJS('home.min.js');
SiteFooter::outputFooter();
