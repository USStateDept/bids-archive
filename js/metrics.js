window.onload = function() {
	ieCheck();
};

//var store;
var LayerNodeUI = Ext.extend(GeoExt.tree.LayerNodeUI, new GeoExt.tree.TreeNodeUIEventMixin());
//OpenLayers.ProxyHost="http://" + domain + "/geoserver/rest/proxy?url="

function as(n) {
	var themeUrl = "../ext-3.4.0/resources/css/xtheme-wireframe.css";
	Ext.util.CSS.swapStyleSheet("theme", themeUrl);
};

Ext.onReady(function() {
	var store, check;

	var toolbarItems = [];

	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

	var banks = [['African Development Bank'], ['Asian Development Bank'], ['Interamerican Development Bank'], ['Post Identified Project'], ['Washington Identified Project'], ['World Bank']]
	var regions = [['Africa'], ['East Asia and the Pacific'], ['Europe'], ['Middle East and North Africa'], ['South and Central Asia'], ['Western Hemisphere']]
	var arch = [['Archived'], ['In Procurement'], ['Pipeline']]
	var sizes = [['0-25M'], ['25-50M'], ['50-100M'], ['>100M'], ['Unpublished']]
	var sec = [['Ag and Environment'], ['Energy'], ['ICT'], ['Infrastructure'], ['Governance and Services'], ['Natural Resources']]

	var leadTotalValue;
	
	store = new GeoExt.data.FeatureStore({
		autoSave : true,
		fields : [{
			name : "Timestamp",
			type : "string"
		}, {
			name : "Project_Funding_Source",
			type : "string"
		}, {
			name : "Specific_Location",
			type : "string"
		}, {
			name : "Country",
			type : "string"
		}, {
			name : "DOS_Region",
			type : "string"
		}, {
			name : "Project_Title",
			type : "string"
		}, {
			name : "Project_Number",
			type : "string"
		}, {
			name : "Link_To_Project",
			type : "string"
		}, {
			name : "Sector",
			type : "string"
		}, {
			name : "Keyword",
			type : "string"
		}, {
			name : "Project_Size",
			type : "string"
		}, {
			name : "Project_Announced",
			type : "date",
			dateFormat : "Y-m-d\\Z"
		}, {
			name : "Tender_Date",
			type : "date",
			dateFormat : "Y-m-d\\Z"
		}, {
			name : "Borrowing_Entity",
			type : "string"
		}, {
			name : "Implementing_Entity",
			type : "string"
		}, {
			name : "Project_POCs",
			type : "string"
		}, {
			name : "Project_Description",
			type : "string"
		}, {
			name : "Post_Comments",
			type : "string"
		}, {
			name : "Submitting_Officer",
			type : "string"
		}, {
			name : "Submitting_Officer_Contact",
			type : "string"
		}, {
			name : "Source",
			type : "string"
		}, {
			name : "US_Firm_Contact",
			type : "string"
		}, {
			name : "US_Firm_Wins",
			type : "string"
		}, {
			name : "Marker",
			type : "string"
		}, {
			name : "Cleared",
			type : "string"
		}, {
			name : "Status",
			type : "string"
		}, {
			name : "fid",
			type : "string"
		}],
		proxy : new GeoExt.data.ProtocolProxy({
			protocol : new OpenLayers.Protocol.HTTP({
				url : "http://" + domain + "/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3ADATATABLE&maxfeatures=230&outputformat=json&Filter=%3CFilter%3E%3COr%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3EStatus%3C/PropertyName%3E%3CLiteral%3EIn%20Procurement%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3EStatus%3C/PropertyName%3E%3CLiteral%3EPipeline%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/Or%3E%3C/Filter%3E",
				format : new OpenLayers.Format.GeoJSON()
			})
		})//,
		//autoLoad : true
	});

	store.load();
	leadsSumValue = store.sum('Project_Size');
	leadsWeekSumValue = store.sum('Project_Size');
	leadsCount = store.getCount();
	infCount = store.getCount();
	ictCount = store.getCount();
	ageCount = store.getCount();
	gosCount = store.getCount();
	narCount = store.getCount();
	
	var enteringHttpProxy = new Ext.data.HttpProxy({
		url : 'servlet/Combo2',
		method : 'GET'
	});

	var regionHttpProxy = new Ext.data.HttpProxy({
		url : 'servlet/Combo2',
		method : 'GET'
	});

	var sectorHttpProxy = new Ext.data.HttpProxy({
		url : 'servlet/Combo2',
		method : 'GET'
	});

	var fundingHttpProxy = new Ext.data.HttpProxy({
		url : 'servlet/Combo2',
		method : 'GET'
	});

	var sourceHttpProxy = new Ext.data.HttpProxy({
		url : 'servlet/Combo2',
		method : 'GET'
	});

	var enteringStore = new Ext.data.Store({
		proxy : enteringHttpProxy,
		baseParams : {
			col : 'Submitting_Officer',
			label : 'EnteringOfficer'
		},

		reader : new Ext.data.XmlReader({
			record : 'Row',
			id : 'ID'
		}, ['EnteringOfficer'])
	});

	var regionStore = new Ext.data.Store({
		proxy : regionHttpProxy,
		baseParams : {
			col : 'DOS_Region',
			label : 'Region'
		},

		reader : new Ext.data.XmlReader({
			record : 'Row',
			id : 'ID'
		}, ['Region'])
	});

	var sectorStore = new Ext.data.Store({
		proxy : sectorHttpProxy,
		baseParams : {
			col : 'Sector',
			label : 'Sector'
		},

		reader : new Ext.data.XmlReader({
			record : 'Row',
			id : 'ID'
		}, ['Sector'])
	});

	var fundingStore = new Ext.data.Store({
		proxy : fundingHttpProxy,
		baseParams : {
			col : 'Project_Funding_Source',
			label : 'FundingSource'
		},

		reader : new Ext.data.XmlReader({
			record : 'Row',
			id : 'ID'
		}, ['FundingSource'])
	});

	var sourceStore = new Ext.data.Store({
		proxy : enteringHttpProxy,
		baseParams : {
			col : 'Source',
			label : 'Source'
		},

		reader : new Ext.data.XmlReader({
			record : 'Row',
			id : 'ID'
		}, ['Source'])
	});

	enteringStore.load();
	sectorStore.load();
	regionStore.load();
	fundingStore.load();

	var categorySelectedId;

	/*var metricsPanel = new Ext.Container({
		region : "center",
		html : '<div id="main"><div class="content"><div class="mainContent"><div style="text-align:center; padding-top: 20px"><p><stat>$' + leadsSumValue + '</stat> in leads<br>Leads worth <stat>' + leadsWeekSumValue + '</stat> added in the last week<br></p></div><div style="margin-left: auto; margin-right: auto; width: 220px; padding-top: 50px"><p><stat>' + leadsCount + '</stat> leads in these sectors...<br>Infrastructure: <stat>' + infCount + '</stat><br>ICT: <stat>' + ictCount + '</stat><br>Ag and Environment: <stat>' + ageCount + '</stat><br>Governance and Services: <stat' + gosCount + '</stat><br>Natural Resources: <stat>' + narCount + '</stat><br></p></div></div><div class="mainContent" style="padding-top:50px"><h2>What is BIDS?</h2><p>The Business Information Database System (BIDS) supports U.S. businesses by publishing significant foreign government and multilateral development bank procurements. It is an open data platform, collecting and archiving reported procurement leads to in a database to analyze development and trade related metrics.</p></div></div></div></div><div id="footer">Sponsored by: The U.S. Department of State<br>State Department has compiled this information in order to help identify opportunities for U.S. businesses.  It is not intended to be complete and interested parties should not solely rely on the information provided herein, and neither the U.S. Government not its imployees/contractors assume any legal liability for the accuracy, completeness, or  usefulness of any information or process disclosed. It is the sole responsibility of the user of the information to verify its accuracy.</div>',
		height : 679
	});*/
	/*
	// Creates the Layout
	new Ext.Viewport({
		layout : "fit",
		hideBorders : true,
		height : 840,
		width : 1020,
		autoScroll: true,
		items : {
			items : [
			{region : 'north',
				html : '<div id="wrap"><div id="header"><div class="row" style="margin: 0px -12px 0px 165px;"><a class="logo" data-bind="click: showHome" href="#"/><img width="237" height="60" alt="BIDS Logo" src="img/bids-logo.png"></a><ul class="nav"><li><a href="mailto:BIDS-Mailbox@state.gov">Contact Us</a></li><li><a href="help.html">Help</a></li><li><a href="faqs.html">FAQs</a></li><li><a href="data.html">Data</a></li><li><a href="resources.html">Resources</a></li><li><a href="index.html">Home</a></li></ul></div></div>',
				height : 121,
				border : true
			}, metricsPanel, 
			{
				layout : 'border',
				region : 'west',
				split : true,
				width : 180,
				html : '<div id="wrap"><div id="header"><div class="row"><ul class="nav"><li><a href="mailto:BIDS-Mailbox@state.gov">Contact Us</a></li><li><a href="help.html">Help</a></li><li><a href="faqs.html">FAQs</a></li><li><a href="data.html">Data</a></li><li><a href="resources.html">Resources</a></li><li><a href="index.html">Home</a></li></ul></div></div></div></div>',
			}
			
			]
		}
	});	*/
	
	
	new Ext.Panel({
		renderTo: document.body,
		
		height: 1020,
		layout: 'border',
		items: [{
			region : 'north',
			html : '<div id="wrap"><div id="header"><div class="row" style="margin: 0px -12px 0px 165px;"><a class="logo" data-bind="click: showHome" href="#"/><img width="237" height="60" alt="BIDS Logo" src="img/bids-logo.png"></a><ul class="nav"><li><a href="mailto:BIDS-Mailbox@state.gov">Contact Us</a></li><li><a href="help.html">Help</a></li><li><a href="faqs.html">FAQs</a></li><li><a href="data.html">Data</a></li><li><a href="resources.html">Resources</a></li><li><a href="index.html">Home</a></li></ul></div></div>',
			height : 121,
			
			border : false
			}, {
			width : 180,
			region : 'west',
			html : '<ul class="sideNav"><li><a href="mailto:BIDS-Mailbox@state.gov">What is BIDS?</a></li><li><a href="help.html">How many opportunities?</a></li><li><a href="faqs.html">Who uses BIDS?</a></li><li><a href="data.html">Getting started</a></li><li><a href="resources.html">Map of leads</a></li></ul></div>',
			layout: 'fit',
			unstyled: true
			},{
			region : 'center',
			html : '<div id="main" style="margin-top: 0px;"><div class="content"><div class="mainContent"><div style="text-align:center; padding-top: 20px"><p><stat>$' + leadsSumValue + '</stat> in leads<br>Leads worth <stat>' + leadsWeekSumValue + '</stat> added in the last week<br></p></div><div style="margin-left: auto; margin-right: auto; width: 220px; padding-top: 50px"><p><stat>' + leadsCount + '</stat> leads in these sectors...<br>Infrastructure: <stat>' + infCount + '</stat><br>ICT: <stat>' + ictCount + '</stat><br>Ag and Environment: <stat>' + ageCount + '</stat><br>Governance and Services: <stat' + gosCount + '</stat><br>Natural Resources: <stat>' + narCount + '</stat><br></p></div></div><div class="mainContent" style="padding-top:50px"><h2>What is BIDS?</h2><p>The Business Information Database System (BIDS) supports U.S. businesses by publishing significant foreign government and multilateral development bank procurements. It is an open data platform, collecting and archiving reported procurement leads to in a database to analyze development and trade related metrics.</p></div></div></div></div><div id="footer">Sponsored by: The U.S. Department of State<br>State Department has compiled this information in order to help identify opportunities for U.S. businesses.  It is not intended to be complete and interested parties should not solely rely on the information provided herein, and neither the U.S. Government not its imployees/contractors assume any legal liability for the accuracy, completeness, or  usefulness of any information or process disclosed. It is the sole responsibility of the user of the information to verify its accuracy.</div>',
			height : 679,
			border : false,
			xtype: 'container',
			layout: 'fit'
		}]
	});


	
	var filt = new OpenLayers.Filter.Comparison({
		type : OpenLayers.Filter.Comparison.LIKE,
		property : "Sector",
		value : "Water"//this.getValue()
	});

	function State_Select(box, record, index) {
	}

});
