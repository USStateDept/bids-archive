function displaySideNav1Text() {
	sideNavText = '<h2 style=\'text-align: left\'>What is BIDS?</h2><p style=\'text-align: left\'>A product of Economic Statecraft, the Business Information Database System (BIDS) is designed to support U.S. businesses by putting at their fingertips information about significant foreign government and multilateral development bank procurements.   BIDS brings to life valuable U.S. Government data and contacts through an interactive map interface that businesses can use to search for procurement opportunities.</p><p style=\'text-align: left\'>As an open data platform, BIDS collects and archives reported procurement leads to build a database that can be used to analyze development and trade related metrics.</p>';
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function displaySideNav2Text() {
	sideNavText = "<h2 style=\'text-align: left\'>How does BIDS work?</h2><p style=\'text-align: left\'>BIDS enables U.S. Government officials to report new procurement opportunities to the U.S. business community as well as provide context, commentary, and contact information for already reported procurement opportunities.  BIDS facilitates connections between U.S. businesses and officials in the field to discuss procurement opportunities.  BIDS relies on regular inputs from officers in the field as well as an automatic system that catalogues procurement information in a database.  The BIDS database is regularly updated with new leads and automatically alerts officers to update or retire leads as needed.</p>";
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function displaySideNav3Text() {
	sideNavText = "<h2 style=\'text-align: left\'>Who is using BIDS?</h2><p style=\'text-align: left\'>BIDS and the data behind it are open to the public.  U.S. officials and U.S. businesses use BIDS as a continuously updated picture of procurement opportunities worldwide.  U.S. businesses can use BIDS to connect to extensive information about foreign markets on business tabs on U.S. Embassy websites; to foreign procurement officials, and to our world-wide staff of economic and commercial officers. </p>";
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function displaySideNav4Text() {
	sideNavText = "<h2 style=\'text-align: left\'>Getting started with BIDS</h2><h3 style=\'text-align: left\'>Accessing BIDS</h3><p style=\'text-align: left\'>Users can interact directly with the BIDS website to find project data and information to follow up.  BIDS data is also available for <a href=\'data.html\'>download directly from BIDS</a>, <a href=\'http://github.com/eDiper/bids/wiki#api-details'\>via API from BIDS</a>, and through the <a href=\'http://www.commerce.gov/'\>Department of Commerce</a> and other U.S. Government agencies.</p><h3 style=\'text-align: left\'>Inputting Data</h3><p style=\'text-align: left\'>U.S. Government officials can add data to BIDS and edit project information as outlined in the <a href=\'help.html\'>BIDS operating manual</a>.</p>";
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function displaySideNav5Text() {
	sideNavText = "";	
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function displaySideNav6Text() {
	sideNavText = "<h2 style=\'text-align: left\'>Disclaimer</h2><p style=\'text-align: left\'>The U.S. Government has compiled this information to identify opportunities for U.S. businesses.  This information is not intended to be complete; interested parties should not solely rely on the information provided herein.  Neither the U.S. Government nor its employees/contractors assume any legal liability for the accuracy, completeness, or utility of any information or process disclosed. It is the sole responsibility of the user of the information to verify its accuracy.</p>";
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function noSideNavText() {
	//sideNavText = '<p><stat>$' + leadsSumValue + '</stat> in leads<br>Leads worth <stat>' + leadsWeekSumValue + '</stat> added in the last week<br></p></div><div style="margin-left: auto; margin-right: auto; width: 220px; padding-top: 50px"><p><stat>' + leadsCount + '</stat> leads in these sectors...<br>Infrastructure: <stat>' + infCount + '</stat><br>ICT: <stat>' + ictCount + '</stat><br>Ag and Environment: <stat>' + ageCount + '</stat><br>Governance and Services: <stat>' + gosCount + '</stat><br>Natural Resources: <stat>' + narCount + '</stat><br>Energy: <stat>' + eneCount + '</stat><br></p></div></div>';
	sideNavText = '<div style="padding-top: 30px; text-align: left;"><div><p><stat>' + leadsSumValue + '</stat> in leads</p></div><br><p><stat>' + leadsCount + '</stat> leads in these sectors...<br>Infrastructure: <stat>' + infCount + '</stat><br>ICT: <stat>' + ictCount + '</stat><br>Ag and Environment: <stat>' + ageCount + '</stat><br>Governance and Services: <stat>' + gosCount + '</stat><br>Natural Resources: <stat>' + narCount + '</stat><br>Energy: <stat>' + eneCount + '</stat><br></p></div></div>';
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}