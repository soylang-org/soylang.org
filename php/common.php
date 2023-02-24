<?php
require_once(dirname(__FILE__).'/session.php');
//================================================================
function getQSA($key, $default = NULL) { return array_key_exists($key, $_GET) ? htmlentities($_GET[$key], ENT_QUOTES, 'UTF-8') : $default; }
//================================================================
function isMobile(): bool { return !!preg_match('/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i', $_SERVER['HTTP_USER_AGENT']); }
// Global constant 'MOBILE', so we only need to call isMobile() once
$GLOBALS['mobile'] = isMobile();
//================================================================
function fileNotFound(): void { header(':', TRUE, HTTPResponseCode::CLIENT_ERROR_NOT_FOUND); die(); }
//================================================================
// JSON
//================================================================
function fetchJSON($pathname): void {
	if (!file_exists($pathname)) { fileNotFound(); }
	header('Content-type: application/json');
	echo file_get_contents($pathname);
}
function linkJSON($src): void { echo "<script type=\"application/json\" src=\"$src\"></script>\r\n"; }
function embedJSON($src): void {
	if (file_exists($src)) {
		echo "<script type=\"application/json\">\r\n";
		echo file_get_contents($src);
		echo "</script>\r\n";
	}
}
//================================================================
// HTML
//================================================================
function fetchHTML($pathname): void {
	if (!file_exists($pathname)) { fileNotFound(); }
	header('Cache-Control: no-cache; must-revalidate');
	header('Content-type: text/html');
	echo file_get_contents($pathname);
}
function embedHTML($pathname): void {
	if (!file_exists($pathname)) { return; }
	echo file_get_contents($pathname);
}
//================================================================
// CSS
//================================================================
function fetchCSS($pathname): void {
	if (!file_exists($pathname)) { fileNotFound(); }
	header('Cache-Control: no-cache; must-revalidate');
	header('Content-type: text/css');
	echo file_get_contents($pathname);
}
function linkCSS($src): void { echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"$src\" />\r\n"; }
function embedCSS($src): void {
	if (file_exists(dirname(__FILE__) . "/../css/$src")) {
		echo "<style>\r\n";
		echo file_get_contents(dirname(__FILE__) . "/../css/$src");
		echo "</style>\r\n";
	}
}

//================================================================
// JS
//================================================================
function fetchJS($pathname): void {
	if (!file_exists($pathname)) { fileNotFound(); }
	header('Cache-Control: no-cache; must-revalidate');
	header('Content-type: application/javascript');
	echo file_get_contents($pathname);
}
function linkJS($src): void { echo "<script type=\"application/javascript\" src=\"$src\"></script>\r\n"; }
function embedJS($src): void {
	if (file_exists($src)) {
		echo "<script type=\"application/javascript\">\r\n";
		echo file_get_contents($src);
		echo "</script>\r\n";
	}
}
//================================================================
// Images
//================================================================
function fetchImage($pathname, $ext): void {
	if (!file_exists($pathname)) { fileNotFound(); }
	$file = fopen($pathname, 'rb');
	if ($file) {
		switch ($ext) {
		case 'jpg':
		case 'jpeg': header('Content-type: image/jpeg'); break;
		case 'png': header('Content-type: image/png'); break;
		case 'svg': header('Content-type: image/svg+xml'); break;
		case 'gif': header('Content-type: image/gif'); break;
		case 'webp': header('Content-type: image/webp'); break;
		case 'bmp': header('Content-type: image/x-windows-bmp'); break;
		default: fileNotFound();
		}
		$sz = filesize($pathname);
		header('Cache-Control: public, max-age=15552000, immutable');
		header('Pragma: '); // Remove HTTP1.0 default behavior of `no-cache`
		header('Content-Length:' . $sz);
		echo stream_get_contents($file);
		fclose($file);
	}
}
function linkImage($filename, $class = '', $id = ''): void { echo "<img src=\"$filename\" class=\"$class\" id=\"$id\" alt='' />"; }
//================================================================
// Video
//================================================================
function fetchVideo($pathname, $ext): void {
	if (!file_exists($pathname)) { fileNotFound(); }
	$sz = filesize($pathname);
	switch ($ext) {
	case 'mp4': header('Content-type: application/mp4'); break;
	case 'm4v': header('Content-type: video/m4v'); break;
	case 'mov': header('Content-type: video/quicktime'); break;
	case 'avi': header('Content-type: video/x-msvideo'); break;
	case 'mpg': header('Content-type: video/mpg'); break;
	case 'm2v': header('Content-type: video/m2v'); break;
	case 'mpeg': header('Content-type: video/mpeg'); break;
	case 'flv': header('Content-type: video/x-flv'); break;
	case 'webm': header('Content-type: video/webm'); break;
	case 'mkv': header('Content-type: video/mkv'); break;
	case 'gifv': header('Content-type: video/gifv'); break;
	case 'wmv': header('Content-type: video/x-ms-wmv'); break;
	case 'vob': header('Content-type: video/vob'); break;
	case 'yuv': header('Content-type: video/yuv'); break;
	default: fileNotFound();
	}
	header('Accept-Ranges: bytes');
	header('Content-Length: '.$sz);
	header('Content-Transfer-Encoding: binary');
	echo file_get_contents($pathname);
}

//================================================================
// ZIP
//================================================================
function fetchZIP($pathname): void {
	if (!file_exists($pathname)) { fileNotFound(); }
	$sz = filesize($pathname);
	header('Content-type: application/zip');
	header('Content-Length:' . $sz);
	$file = fopen($pathname, 'rb');
	echo stream_get_contents($file);
	fclose($file);
}
//================================================================
// Font
//================================================================
function fetchFont($pathname, $extension): void {
	if (!file_exists($pathname)) { fileNotFound(); }
	switch ($extension) {
	case 'woff2': header('Content-type: application/font-woff2'); break;
	case 'woff': header('Content-type: application/font-woff'); break;
	case 'ttf': header('Content-type: application/x-font-ttf'); break;
	case 'otf': header('Content-type: application/x-font-opentype'); break;
	case 'eot': header('Content-type: application/vnd.ms-fontobject'); break;
	case 'sfnt': header('Content-type: application/font-sfnt'); break;
	default: fileNotFound();
	}
	header('Cache-Control: public, max-age=15552000, immutable');
	header('Pragma:');
	echo file_get_contents($pathname);
}
//================================================================
// GLSL
//================================================================
function fetchGLSL($pathname, $ext): void {
	if (!file_exists($pathname)) { fileNotFound(); }
	switch ($ext) {
	case 'vs': case 'vert': header('Content-type: x-shader/x-vertex'); break;
	case 'fs': case 'frag': header('Content-type: x-shader/x-fragment'); break;
	default: fileNotFound();
	}
	echo file_get_contents($pathname);
}
//================================================================
// Downloads
//================================================================
function fetchFile($pathname, $ext): void {
	if (!file_exists($pathname)) { fileNotFound(); }
	$sz = filesize($pathname);
	switch ($ext) {
	case 'conf':
	case 'txt': header('Content-type: text/plain'); break;
	case 'pdf': header('Content-type: application/pdf'); break;
	case 'csv': header('Content-type: csv'); break;
	default: fileNotFound();
	}
	header('Accept-Ranges: bytes');
	header('Content-Transfer-Encoding: binary');
	header('Content-Length:' . $sz);
	$file = fopen($pathname, 'rb');
	echo stream_get_contents($file);
	fclose($file);
}
