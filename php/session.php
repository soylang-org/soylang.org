<?php
session_name('soylang');
//ini_set('session.use_cookies', TRUE);
//ini_set('session.gc_maxlifetime', 604800);
//ini_set('session.cookie_lifetime', 604800);
//ini_set('session.cookie_path', '/');
//ini_set('session.cookie_domain', $_SERVER['HTTP_HOST']);
//ini_set('session.cookie_secure', TRUE);
//session_set_cookie_params([
//	'lifetime' => 604800,
//	'path' => '/',
//	'domain' => 'soylang.org',
//	'secure' => TRUE,
//	'httponly' => TRUE,
//	'samesite' => 'lax'
//]);
session_start();
/*
 * Helper function to get session key,
 * returns null (or if you specify a $default value)
 * if the $_SESSION key doesn't exist.
 */
function sessionKey($key, $default = NULL): mixed { return array_key_exists($key, $_SESSION) ? $_SESSION[$key] : $default; }
