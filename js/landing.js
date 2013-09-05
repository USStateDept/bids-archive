window.onload = function() {
	ieCheck();
};

function as(n) {
	var themeUrl = "../ext-3.4.0/resources/css/xtheme-wireframe.css";
	Ext.util.CSS.swapStyleSheet("theme", themeUrl);
};

var leadsSumValue, leadsWeekSumValue, leadsCount, leadsWeekCount, infCount, ictCount, ageCount, gosCount, narCount, eneCount;
	
Ext.onReady(function() {
	var storeTest, check;

	var btn_sideNav1, btn_sideNav2, btn_sideNav3, btn_sideNav4, btn_sideNav5, sideNavText;
	
	store = new GeoExt.data.FeatureStore({
		autoSave : true,
		fields : [{
			name : "int_allLeadsCount",
			type : "string"
		}, {
			name : "int_allLeadsValueSum",
			type : "string"
		}, {
			name : "int_weekLeadsCount",
			type : "string"
		}, {
			name : "int_weekSumValueLeads",
			type : "string"
		}, {
			name : "int_allSecCountInf",
			type : "string"
		}, {
			name : "int_allSecCountIct",
			type : "string"
		}, {
			name : "int_allSecCountAge",
			type : "string"
		}, {
			name : "int_allSecCountGos",
			type : "string"
		}, {
			name : "int_allSecCountNar",
			type : "string"
		}, {
			name : "int_allSecCountEne",
			type : "string"
		}],
		proxy : new GeoExt.data.ProtocolProxy({
			protocol : new OpenLayers.Protocol.HTTP({
				//url : "http://" + domain + "/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3Atbl_dailyMetrics&maxfeatures=230&outputformat=json",
				url : "http://edip-maps.net/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3Atbl_dailyMetrics&maxfeatures=230&outputformat=json",
				format : new OpenLayers.Format.GeoJSON()
			})
		})
	});
	
	store.load({
		callback: function(records, operation, success) {
        	leadsSumValue = numeral(records[0].data.int_allLeadsValueSum).format('$ 0,0[.]00');
			leadsWeekSumValue = records[0].data.int_weekSumValueLeads;
			leadsCount = records[0].data.int_allLeadsCount;
			leadsWeekCount = records[0].data.int_weekLeadsCount;
			infCount = records[0].data.int_allSecCountInf;
			ictCount = records[0].data.int_allSecCountIct;
			ageCount = records[0].data.int_allSecCountAge;
			gosCount = records[0].data.int_allSecCountGos;
			narCount = records[0].data.int_allSecCountNar;
			eneCount = records[0].data.int_allSecCountEne;
			
			noSideNavText(); 
		}
	});

	
	
	// MAIN PANEL
	var mainPanel = new Ext.FormPanel({
		region : "center",
		height : 500,
		autoWidth : true,
		html : '<div class="content"><div class="mainContent"><div style="text-align:center; padding-top: 20px"><div id="sideNavTextDiv"></div></div></div></div>'
	});
	
	// FOOTER PANEL
	var footerPanel = new Ext.FormPanel({
		region : "south",
		height : 70,
		html : '<div id="footer" style="margin-top: 0px !important;">Sponsored by: The U.S. Department of State<br>State Department has compiled this information in order to help identify opportunities for U.S. businesses.  It is not intended to be complete and interested parties should not solely rely on the information provided herein, and neither the U.S. Government not its employees/contractors assume any legal liability for the accuracy, completeness, or  usefulness of any information or process disclosed. It is the sole responsibility of the user of the information to verify its accuracy.</div>'
	});
	
	// SIDENAV PANEL
	var sideNavPanel = new Ext.FormPanel({
		frame : false,
		region : 'center',
		html : '<ul class="sideNav"><li id="sideNav1"><a href="javascript:displaySideNav1Text()">What is BIDS?</a></li><li id="sideNav2"><a href="javascript:displaySideNav2Text()">How does BIDS work?</a></li><li id="sideNav3"><a href="javascript:displaySideNav3Text()">Who is using BIDS?</a></li><li id="sideNav4"><a href="javascript:displaySideNav4Text()">Getting started with BIDS</a></li><li id="sideNav5"><a href="map.html">Map of leads</a></li><li id="sideNav6"><a href="javascript:displaySideNav6Text()">Disclaimer</a></li></ul></div>'
	});

	// Creates the Layout
	new Ext.Viewport({
		layout : "fit",
		hideBorders : true,
		autoHeight: true,
		autoScroll: false,
		minWidth: 1000,
		items : {
			layout : "border",
			items : [{
				region : 'north',
				html : '<div id="wrap"><div id="header"><div class="row" style="margin: 0px -12px 0px 7px;"><a class="logo" data-bind="click: showHome" href="#"/><img id="bidsLogo" alt="BIDS Logo" src="img/bidsLogo.png"></a><ul class="nav"><li><a href="mailto:BIDS-Mailbox@state.gov">Contact Us</a></li><li><a href="help.html">Help</a></li><li><a href="faqs.html">FAQs</a></li><li><a href="data.html">Data</a></li><li><a href="map.html">Map</a></li><li><a href="index.html">Home</a></li></ul></div></div>',
				height : 121,
				maxWidth: 1200,
				border : true
			}, mainPanel, {
				layout : 'border',
				region : 'west',
				width : 195,
				items : [sideNavPanel]
			}, footerPanel]
		}
	});
});
