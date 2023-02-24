<?php
require_once(dirname(__FILE__) . '/http.php');
if (!isset($_SERVER['HTTP_REFERER'])) {
	http_response_code(HTTPResponseCode::CLIENT_ERROR_FORBIDDEN);
	die();
}
$url = parse_url($_SERVER['HTTP_REFERER']);
if (!key_exists('host', $url) || !preg_match('/^(\w+\.)?soylang\.(org)\/?/i', $url['host'])) {
	http_response_code(HTTPResponseCode::CLIENT_ERROR_FORBIDDEN);
	die();
}
//================================================================
//TODO: Enable rate limiting (10 requests per second [1 per 100 ms])
//================================================================
function APIErrorResponse($code, $msg): void
{
	header('Content-Type: application/json');
	http_response_code($code);
	echo json_encode([
		'status' => $code,
		'description' => $msg
	]);
	die();
}

//================================================================
// Allow CORS by setting headers
//================================================================
header('Access-Control-Allow-Origin: ' . "${url['scheme']}://${url['host']}");
header('Access-Control-Allow-Headers: x-requested-with,cookie,authorization,scope,client_id,client_secret,refresh_token,reset_token,client_token');
header('Access-Control-Allow-Credentials: true');    // Allows for cookies and web-authentication
header('Content-Type: text/plain;charset=UTF-8');    // default MIME type
/*
 * Allowed response Content-Type's
 * 1) application/x-www-form-urlencoded
 * 2) multipart/form-data
 * 3) text/plain
 * 4*) application/json
 */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	// No-Content response code 204
	http_response_code(HTTPResponseCode::SUCCESS_NO_CONTENT);
	// `CONNECT` and `TRACE` not included in the Access-Control-Allow-Methods:
	header('Access-Control-Allow-Methods: OPTIONS, HEAD, GET, POST, PUT, PATCH, UPDATE, DELETE');
	// Set duration until a `preflight` request
	// is needed by the client's browser to handle
	// certain CORS request methods. (PUT/PATCH/DELETE)
	header('Access-Control-Max-Age: 86400');
	die();
}
// Get the headers and change the header keys to lowercase
$headers = array_change_key_case(getallheaders());
// `client_secret` must be set, otherwise unauthorized access is forbidden
if (!array_key_exists('client_secret', $headers)) {
	APIErrorResponse(HTTPResponseCode::CLIENT_ERROR_UNAUTHORIZED, 'Authorization required');
}
//================================================================
// Members only content
//================================================================
switch ($_SERVER['REQUEST_METHOD']) {
case 'GET':
	{
		echo json_encode([
			'authorized' => TRUE,
			'method' => 'GET',
			'data' => $_GET
		]);
		die();
	}
	break;
case 'POST':
	{
		echo json_encode([
			'authorized' => TRUE,
			'method' => 'POST',
			'data' => $_POST
		]);
		die();
	}
	break;
}
// For privileged request methods
// Check if access has been forbidden
// for privileged request methods (PUT/PATCH/DELETE)
if (!isset($_SESSION['privileged'])) {
	APIErrorResponse(HTTPResponseCode::CLIENT_ERROR_FORBIDDEN, 'Forbidden');
	die();
}
//================================================================
// Privileged requests
//================================================================
switch ($_SERVER['REQUEST_METHOD']) {
case 'HEAD':
	{
		// No-Content response code 204
		http_response_code(HTTPResponseCode::SUCCESS_NO_CONTENT);
		header('Last-Modified: ' . date('r'));
		die();
	}
	break;
case 'GET':
	{
		// Privileged content
	}
	break;
case 'POST':
	{
		$rsp['post'] = $_POST;
	}
	break;
case 'PUT':
	{
		//parse_str(file_get_contents('php://input'), $_PUT);
		echo json_encode('');
		die();
	}
	break;
case 'PATCH':
	{
		parse_str(file_get_contents('php://input'), $_PATCH);
		$rsp['patch'] = $_PATCH;
		die();
	}
	break;
case 'DELETE':
	{
		parse_str(file_get_contents('php://input'), $_DELETE);
		$rsp['delete'] = $_DELETE;
		$rsp['headers'] = $headers;
		die();
	}
	break;
default:
	{
		APIErrorResponse(HTTPResponseCode::CLIENT_ERROR_BAD_REQUEST, 'Bad Request');
	}
	break;
}
