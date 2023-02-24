<?php
session_name("soylang");
session_start();
require_once('php/common.php');
//================================================================
// API
//================================================================
if ($_SERVER['HTTP_HOST'] == 'api.soylang.org') {
	require_once('php/api.php');
	return;
}
//================================================================
// Data
//================================================================
if (isset($_GET['mime'])) {
	switch($_GET['mime']) {
	case 'css': { fetchCSS(dirname(__FILE__).'/css/'.htmlentities($_GET['css'])); } break;
	case 'js': { fetchJS(dirname(__FILE__).'/js/'.htmlentities($_GET['js'])); } break;
	case 'img': { fetchImage(dirname(__FILE__).'/data/img/'.htmlentities($_GET['img']), htmlentities($_GET['ext'])); } break;
	case 'font': { fetchFont(dirname(__FILE__).'/data/font/'.htmlentities($_GET['font']), htmlentities($_GET['ext'])); } break;
//	case 'audio': { fetchAudio(dirname(__FILE__).'/data/audio/'.htmlentities($_GET['audio']), htmlentities($_GET['ext'])); } break;
	case 'video': { fetchVideo(dirname(__FILE__).'/data/video/'.htmlentities($_GET['video']), htmlentities($_GET['ext'])); } break;
	case 'glsl': { fetchGLSL(dirname(__FILE__).'/data/glsl/'.htmlentities($_GET['glsl']), htmlentities($_GET['ext'])); } break;
	case 'zip': { fetchZIP(dirname(__FILE__).'/data/zip/'.htmlentities($_GET['zip'])); } break;
	case 'json': { fetchJSON(dirname(__FILE__).'/data/json/'.htmlentities($_GET['json'])); } break;
	default: fileNotFound();
	}
	return;
}
//================================================================
// Pages
//================================================================
require_once('php/site.php');
// Setup default header meta tags
SiteHeader::addTag('<meta charset="UTF-8" />');
SiteHeader::addTag('<meta name="viewport" content="width=device-width, initial-scale=1">');
SiteHeader::addTag('<meta name="theme-color" content="#104106" media="(prefers-color-scheme: light)" />');
SiteHeader::addTag('<meta name="theme-color" content="#106306" media="(prefers-color-scheme: dark)" />');
SiteHeader::addTag('<meta name="background_color" content="#104106" media="(prefers-color-scheme: light)" />');
SiteHeader::addTag('<meta name="background_color" content="#106306" media="(prefers-color-scheme: dark)" />');
SiteHeader::addTag('<meta name="description" content="Soy General Purpose Programming Language." />');
SiteHeader::addTag('<meta name="keywords" content="soylang, soy language, soy programming, programming language" />');
//SiteHeader::addTag('<link rel="apple-touch-icon" href="/soylang-thumb-512.png" />');
//SiteHeader::addTag('<link rel="apple-touch-icon-precomposed" href="/soylang-thumb-512.png" />');
//SiteHeader::addTag('<link rel="apple-touch-startup-image" href="/soylang-thumb-512.png" media="orientation: portrait" />');
//SiteHeader::addTag('<link rel="apple-touch-startup-image" href="/soylang-thumb-512.png" media="orientation: landscape" />');
SiteHeader::addTag('<link rel="icon" href="/favicon.png" />');
//SiteHeader::addTag('<link rel="manifest" href="/site.webmanifest" crossorigin="anonymous" />');
SiteHeader::addCSS($GLOBALS['mobile'] ? 'site-mobile.css' : 'site-desktop.css');
SiteHeader::addJS('ui.min.js');
// Set the default page title
SiteHeader::setTitle('Soylang Project');
SiteHeader::addClass('dark-theme');
// Output Page
if (isset($_GET['page'])) {
	// Switch between supported pages
	switch (getQSA('page')) {
	case 'home': { include_once('php/pages/home.php'); } break;
	case 'docs': { include_once('php/pages/docs.php'); } break;
	case 'changelog': { include_once('php/pages/changelog.php'); } break;
//	case ' ': { include_once('php/pages/ .php'); } break;
//	case 'resources': { include_once('php/pages/resources.php'); } break;
//	case 'forums': { include_once('php/pages/forum.php'); } break;
	default: { include_once('php/pages/error.php'); } break;
	}
}
// Default Page (home)
else { include_once('php/pages/home.php'); }
