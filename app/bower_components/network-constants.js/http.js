// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
	"use strict";

	var http_constants = {

		'methods': {
			'get':      'GET',
			'put':      'PUT',
			'post':     'POST',
			'delete':   'DELETE',
			'options':  'OPTIONS',
			'head':     'HEAD',
			'trace':    'TRACE',
			'connect':  'CONNECT',
			'propfind': 'PROPFIND' // referenced by mongoose. Real code ?

			// there are a few more, deprecated, not used or proposed
		},

		// HTTP status codes
		// http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
		// http://en.wikipedia.org/wiki/List_of_HTTP_status_codes
		//
		'status_codes': {

			// 100 : informational
			status_100_continue   : 100, // the server has received the request headers, and that the client should proceed to send the request body (in the case of a request for which a body needs to be sent)
			status_102_processing : 102, // the server has received and is processing the request, but no response is available yet.[3] This prevents the client from timing out and assuming the request was lost.

			// 200 : success
			status_200_ok:            200, // success, a response is returned
			status_201_created:       201,
			status_204_ok_no_content: 204, // success, with nothing special to return (ex. delete)

			// 300 redirection

			// 400 : Client errors
			status_400_client_error_bad_request:              400,
			status_401_client_unauthorized:                   401,
			status_403_client_forbidden:                      403, // used when the server doesn't want to explain why it refused the request
			status_404_client_error_not_found:                404,
			status_405_client_error_method_not_allowed:       405, // method not supported for this url
			status_406_client_error_not_acceptable:           406, // content type is not handled
			status_413_client_error_request_entity_too_large: 413,
			status_414_client_error_request_uri_too_long:     414,

			// 500 : Server error
			status_500_server_error_internal_error:  500,
			status_501_server_error_not_implemented: 501,
			status_502_bad_gateway:                  502,
			status_503_service_unavailable:          503, // maybe temporary overloading
			status_504_server_error_gateway_timeout: 504,
			status_507_insufficient_storage:         507
		},

		'status_messages': {
			100 : "Continue",
			102 : "Processing",

			200 : "OK",
			201 : "Created",
			204 : "No content",

			400 : "Bad Request",
			401 : "Unauthorized",
			403 : "Forbidden",
			404 : "Not Found",
			405 : "Method Not Allowed",
			406 : "Not Acceptable",
			413 : "Request Entity Too Large",
			414 : "Request-URI Too Long",

			500 : "Internal Server Error",
			501 : "Not Implemented",
			502 : "Bad gateway",
			503 : "Service unavailable",
			504 : "Gateway Timeout",
			507 : "Insufficient Storage"
		},

		// http://en.wikipedia.org/wiki/List_of_HTTP_header_fields
		'request_headers' : {
			'Accept':              undefined, // Content-Types that are acceptable for the response 	Accept: text/plain 	Permanent
			'Accept-Charset':      undefined, // Character sets that are acceptable 	Accept-Charset: utf-8
			'Accept-Encoding':     undefined, // List of acceptable encodings. See HTTP compression. 	Accept-Encoding: gzip, deflate
			'Accept-Language':     undefined, // List of acceptable human languages for response 	Accept-Language: en-US
			'Accept-Datetime':     undefined, // Acceptable version in time 	Accept-Datetime: Thu, 31 May 2007 20:35:00 GMT 	Provisional
			'Authorization':       undefined, // Authentication credentials for HTTP authentication 	Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
			'Cache-Control':       undefined, // Used to specify directives that MUST be obeyed by all caching mechanisms along the request/response chain 	Cache-Control: no-cache 	Permanent
			'Connection':          undefined, // What type of connection the user-agent would prefer 	Connection: keep-alive 	Permanent
			'Cookie':              undefined, // an HTTP cookie previously sent by the server with Set-Cookie (below) 	Cookie: $Version=1; Skin=new; 	Permanent: standard
			'Content-Length':      undefined, // The length of the request body in octets (8-bit bytes) 	Content-Length: 348 	Permanent
			'Content-MD5':         undefined, // A Base64-encoded binary MD5 sum of the content of the request body 	Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ== 	Permanent
			'Content-Type':        undefined, // The MIME type of the body of the request (used with POST and PUT requests) 	Content-Type: application/x-www-form-urlencoded 	Permanent
			'Date':                undefined, // The date and time that the message was sent 	Date: Tue, 15 Nov 1994 08:12:31 GMT 	Permanent
			'Expect':              undefined, // Indicates that particular server behaviors are required by the client 	Expect: 100-continue 	Permanent
			'From':                undefined, // The email address of the user making the request 	From: user@example.com 	Permanent
			'Host':                undefined, // The domain name of the server (for virtual hosting), and the TCP port number on which the server is listening. The port number may be omitted if the port is the standard port for the service requested.[8] Mandatory since HTTP/1.1. Although domain name are specified as case-insensitive,[9][10] it is not specified whether the contents of the Host field should be interpreted in a case-insensitive manner[11] and in practice some implementations of virtual hosting interpret the contents of the Host field in a case-sensitive manner.[citation needed] 	Host: en.wikipedia.org:80
			'If-Match':            undefined, // Only perform the action if the client supplied entity matches the same entity on the server. This is mainly for methods like PUT to only update a resource if it has not been modified since the user last updated it. 	If-Match: "737060cd8c284d8af7ad3082f209582d" 	Permanent
			'If-Modified-Since':   undefined, // Allows a 304 Not Modified to be returned if content is unchanged 	If-Modified-Since: Sat, 29 Oct 1994 19:43:31 GMT 	Permanent
			'If-None-Match':       undefined, // Allows a 304 Not Modified to be returned if content is unchanged, see HTTP ETag 	If-None-Match: "737060cd8c284d8af7ad3082f209582d" 	Permanent
			'If-Range':            undefined, // If the entity is unchanged, send me the part(s) that I am missing; otherwise, send me the entire new entity 	If-Range: "737060cd8c284d8af7ad3082f209582d" 	Permanent
			'If-Unmodified-Since': undefined, // Only send the response if the entity has not been modified since a specific time. 	If-Unmodified-Since: Sat, 29 Oct 1994 19:43:31 GMT 	Permanent
			'Max-Forwards':        undefined, // Limit the number of times the message can be forwarded through proxies or gateways. 	Max-Forwards: 10 	Permanent
			'Origin':              undefined, // Initiates a request for cross-origin resource sharing (asks server for an 'Access-Control-Allow-Origin' response header) . 	Origin: http://www.example-social-network.com 	Permanent: standard
			'Pragma':              undefined, // Implementation-specific headers that may have various effects anywhere along the request-response chain. 	Pragma: no-cache 	Permanent
			'Proxy-Authorization': undefined, // Authorization credentials for connecting to a proxy. 	Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ== 	Permanent
			'Range':               undefined, // Request only part of an entity. Bytes are numbered from 0. 	Range: bytes=500-999 	Permanent
			'Referer':             undefined, // [sic] 	This is the address of the previous web page from which a link to the currently requested page was followed. (The word “referrer” is misspelled in the RFC as well as in most implementations.) 	Referer: http://en.wikipedia.org/wiki/Main_Page 	Permanent
			'TE':                  undefined, // The transfer encodings the user agent is willing to accept: the same values as for the response header Transfer-Encoding can be used, plus the "trailers" value (related to the "chunked" transfer method) to notify the server it expects to receive additional headers (the trailers) after the last, zero-sized, chunk. 	TE: trailers, deflate 	Permanent
			'Upgrade':             undefined, // Ask the server to upgrade to another protocol. 	Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11 	Permanent
			'User-Agent':          undefined, // The user agent string of the user agent 	User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/21.0 	Permanent
			'Via':                 undefined, // Informs the server of proxies through which the request was sent. 	Via: 1.0 fred, 1.1 example.com (Apache/1.1) 	Permanent
			'Warning':             undefined // A general warning about possible problems with the entity body.
		},

		'response_headers' : {
			'Location':            undefined // Used in redirection, or when a new resource has been created.
		},

		'content_types': {
			'application' : {
				'json' : 'application/json',
				'text' : 'application/text'
			},
			'audio'     : {},
			'example'   : {},
			'image'     : {},
			'message'   : {},
			'model'     : {},
			'multipart' : {},
			'text'      : {
				'plain'  : 'text/plain'
			},
			'video'     : {},
			'vnd'       : {}
		}
	};


	Object.freeze(http_constants);
	Object.freeze(http_constants.methods);
	Object.freeze(http_constants.status_codes);
	Object.freeze(http_constants.status_messages);
	Object.freeze(http_constants.request_headers);

	return http_constants;
}); // requirejs module
