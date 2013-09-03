function displaySideNav1Text() {
	sideNavText = '<h2>What is BIDS?</h2><p>The Business Information Database System (BIDS) supports U.S. businesses by publishing significant foreign government and multilateral development bank procurements. It is an open data platform, collecting and archiving reported procurement leads to in a database to analyze development and trade related metrics.</p>';
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function displaySideNav2Text() {
	sideNavText = "text for sideNav2";
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function displaySideNav3Text() {
	sideNavText = "text for sideNav3";
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function displaySideNav4Text() {
	sideNavText = "text for sideNav4";
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function displaySideNav5Text() {
	sideNavText = "text for sideNav5";
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function noSideNavText() {
	sideNavText = '<p><stat>$' + leadsSumValue + '</stat> in leads<br>Leads worth <stat>' + leadsWeekSumValue + '</stat> added in the last week<br></p></div><div style="margin-left: auto; margin-right: auto; width: 220px; padding-top: 50px"><p><stat>' + leadsCount + '</stat> leads in these sectors...<br>Infrastructure: <stat>' + infCount + '</stat><br>ICT: <stat>' + ictCount + '</stat><br>Ag and Environment: <stat>' + ageCount + '</stat><br>Governance and Services: <stat' + gosCount + '</stat><br>Natural Resources: <stat>' + narCount + '</stat><br></p></div></div>';
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}