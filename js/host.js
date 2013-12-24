var host = location.host;
var loc = window.location.pathname;
var site = loc.substring(0, loc.lastIndexOf('/')) + '/';

function gaParams() {
	gaID = "";
	if (host === 'dev.edip-maps.net') {
		gaID = "UA-42151027-1";
	} else {
		gaID = "UA-42151027-2";
	}
}