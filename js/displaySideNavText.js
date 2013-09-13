function displaySideNav1Text() {
	sideNavText = '<div class=\'sideNavTextContent\'><div class=\'sideNavTextH2\'>What is BIDS?</div><div class=\'sideNavTextP\'>A product of Economic Statecraft, the Business Information Database System (BIDS) is designed to support U.S. businesses by putting at their fingertips information about significant foreign government and multilateral development bank procurements.   BIDS brings to life valuable U.S. Government data and contacts through an interactive map interface that businesses can use to search for procurement opportunities.</div><div class=\'sideNavTextP\'>As an open data platform, BIDS collects and archives reported procurement leads to build a database that can be used to analyze development and trade related metrics.</div></div>';
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function displaySideNav2Text() {
	sideNavText = "<div class=\'sideNavTextContent\'><div class=\'sideNavTextH2\'>How does BIDS work?</div><div class=\'sideNavTextP\'>BIDS enables U.S. Government officials to report new procurement opportunities to the U.S. business community as well as provide context, commentary, and contact information for already reported procurement opportunities.  BIDS facilitates connections between U.S. businesses and officials in the field to discuss procurement opportunities.  BIDS relies on regular inputs from officers in the field as well as an automatic system that catalogues procurement information in a database.  The BIDS database is regularly updated with new leads and automatically alerts officers to update or retire leads as needed.</div></div>";
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function displaySideNav3Text() {
	sideNavText = "<div class=\'sideNavTextContent\'><div class=\'sideNavTextH2\'>Who is using BIDS?</div><div class=\'sideNavTextP\'>BIDS and the data behind it are open to the public.  U.S. officials and U.S. businesses use BIDS as a continuously updated picture of procurement opportunities worldwide.  U.S. businesses can use BIDS to connect to extensive information about foreign markets on business tabs on U.S. Embassy websites; to foreign procurement officials, and to our world-wide staff of economic and commercial officers. </div></div>";
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function displaySideNav4Text() {
	sideNavText = "<div class=\'sideNavTextContent\'><div class=\'sideNavTextH2\'>Getting started with BIDS</div><div class=\'sideNavTextH3\'>Accessing BIDS</div><div class=\'sideNavTextP\'>Users can interact directly with the BIDS website to find project data and information to follow up.  BIDS data is also available for <a href=\'data.html\'>download directly from BIDS</a>, <a href=\'http://github.com/eDiper/bids/wiki#api-details'\>via API from BIDS</a>, and through the <a href=\'http://www.commerce.gov/'\>Department of Commerce</a> and other U.S. Government agencies.</div><div class=\'sideNavTextH3\'>Inputting Data</div><div class=\'sideNavTextP\'>U.S. Government officials can add data to BIDS and edit project information as outlined in the <a href=\'help.html\'>BIDS operating manual</a>.</div></div>";
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function displaySideNav5Text() {
	sideNavText = "";	
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function displaySideNav6Text() {
	sideNavText = "<div class=\'sideNavTextContent\'><div class=\'sideNavTextH2\'>Disclaimer</div><div class=\'sideNavTextP\'>The U.S. Government has compiled this information to identify opportunities for U.S. businesses.  This information is not intended to be complete; interested parties should not solely rely on the information provided herein.  Neither the U.S. Government nor its employees/contractors assume any legal liability for the accuracy, completeness, or utility of any information or process disclosed. It is the sole responsibility of the user of the information to verify its accuracy.</div></div>";
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}

function noSideNavText() {
	// The next line is for production //
	sideNavText = '<div id=\'sideNavTextContent\' id=\'sideNavTextMetrics\'><div><p><statUnit>' + leadsSumValue + '</statUnit> in leads</div><br><p><statUnit>' + leadsCount + '</statUnit> leads in these sectors...<br>Infrastructure: <statUnit>' + infCount + '</statUnit><br>ICT: <statUnit>' + ictCount + '</statUnit><br>Ag and Environment: <statUnit>' + ageCount + '</statUnit><br>Governance and Services: <statUnit>' + gosCount + '</statUnit><br>Natural Resources: <statUnit>' + narCount + '</statUnit><br>Energy: <statUnit>' + eneCount + '</statUnit></div>';
	// The next line is for local development //
	//sideNavText = '<div class=\'sideNavTextContent\' id=\'sideNavTextMetrics\'><div><statUnit>asdsadsadsadsad</statUnit><statText> in leads</statText></div><br><statUnit>sadasdfdsafdsa</statUnit><statText> leads in these sectors...</statText><br><statText>Infrastructure: </statText><statUnit>dsfdsaf dsfdsaf</statUnit><statText><br>ICT: </statText><statUnit>45432523</statUnit><statText><br>Ag and Environment: </statText><statUnit>23432432</statUnit><statText><br>Governance and Services: </statText><statUnit>324324</statUnit><statText><br>Natural Resources: </statText><statUnit>234324324</statUnit><statText><br>Energy: </statText><statUnit>234324324</statUnit></div>';
	document.getElementById("sideNavTextDiv").innerHTML = sideNavText;
}