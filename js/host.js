var host = location.host;
var loc = window.location.pathname;
var site = loc.substring(0, loc.lastIndexOf('/')) + '/';

var gaSite = function() {
	if (host === 'edipmaps.net') {
		'edipmaps.net';
	} else {
		'state.gov';
	}
}

var gaID = function() {
	if (host === 'edipmaps.net') {
		'UA-42151027-1';
	} else {
		'UA-42151027-2';
	}
}