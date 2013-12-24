var host = location.host;
var loc = window.location.pathname;
var site = loc.substring(0, loc.lastIndexOf('/')) + '/';

function siteParams() {
	gaID = "";
	formSite = "";
	
	if (host === 'dev.edip-maps.net') {
		formSite = host;
		gaID = "UA-42151027-1";
	} else {
		formSite = 'state.gov';
		gaID = "UA-42151027-2";
	}
}