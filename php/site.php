<?php
require_once(dirname(__FILE__).'/common.php');
//================================================================
class SiteHeader {
	private static array $tags = [];
	private static array $css = [];
	private static array $js = [];
	private static string $title = 'Untitled';
	private static string $locale = 'en-us';
	private static array $classNames = [];

	static public function outputHeader(): void {
		// Begin <html> and <head> tags
		echo '<!DOCTYPE html><html lang="'.SiteHeader::$locale.'"><head>';
		// Output meta tags
		foreach (SiteHeader::$tags as $str) { echo $str; }
		// Output CSS Links
		foreach (SiteHeader::$css as $css) { linkCSS($css); }
		// Output JS references
		foreach (SiteHeader::$js as $js) { linkJS($js); }
		// Output Title and closing </head> tag
		$classes = implode(' ', SiteHeader::$classNames);
		echo '<title>'.SiteHeader::$title."</title></head><body class=\"${classes}\">";
	}
	static public function setTitle($title): void { SiteHeader::$title = $title; }
	static public function setLocale($locale): void { SiteHeader::$locale = $locale; }
	static public function addClass($className): void { SiteHeader::$classNames[] = $className; }
	static public function addTag($str): void { SiteHeader::$tags[] = $str; }
	static public function addCSS($filename): void { SiteHeader::$css[] = $filename; }
	static public function addJS($filename): void { SiteHeader::$js[] = $filename; }
}
//================================================================
/*
 * Site Footer static class
 */
class SiteFooter {
	private static array $tags = [];
	private static array $css = [];
	private static array $js = [];
	private static array $jsEmbed = [];

	static public function outputFooter(): void
	{
		// Begin <footer>
		echo '<footer>';

		// Output tags
		foreach (SiteFooter::$tags as $str) { echo $str; }

		// Output CSS Links
		foreach (SiteFooter::$css as $css) { linkCSS($css); }

		// Output JS references
		foreach (SiteFooter::$js as $js) { linkJS($js); }

		// Output JS Embeds
		foreach (SiteFooter::$jsEmbed as $js) { embedJS($js); }

		// End footer </footer>, </body>, </html>
		echo '</footer></body></html>';
	}

	static public function addTag($str): void { SiteFooter::$tags[] = $str; }
	static public function addCSS($filename): void { SiteFooter::$css[] = $filename; }
	static public function addJS($filename): void { SiteFooter::$js[] = $filename; }
	static public function embedJS($filename): void { SiteFooter::$jsEmbed[] = $filename; }
}
//================================================================
