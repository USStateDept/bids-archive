window.onload = function() {
	ieCheck();
};

function as(n) {
	var themeUrl = "../ext-3.4.0/resources/css/xtheme-wireframe.css";
	Ext.util.CSS.swapStyleSheet("theme", themeUrl);
};

var leadsSumValue, leadsWeekSumValue, leadsCount, leadsWeekCount, infCount, ictCount, ageCount, gosCount, narCount, eneCount;
var required, banks, regions, arch, sizes, sec;
var metricsStore, check;
var miniGrid, miniSearchFunc;
var urlWhole;
	

Ext.onReady(function() {
	banks = [['African Development Bank'], ['Asian Development Bank'], ['Interamerican Development Bank'], ['Post Identified Project'], ['Washington Identified Project'], ['World Bank']]
	regions = [['Africa'], ['East Asia and the Pacific'], ['Europe'], ['Middle East and North Africa'], ['South and Central Asia'], ['Western Hemisphere']]
	arch = [['Archived'], ['In Procurement'], ['Pipeline']]
	sizes = [['0-25M'], ['25-50M'], ['50-100M'], ['>100M'], ['Unpublished']]
	sec = [['Ag and Environment'], ['Energy'], ['ICT'], ['Infrastructure'], ['Governance and Services'], ['Natural Resources']];

	var btn_sideNav1, btn_sideNav2, btn_sideNav3, btn_sideNav4, btn_sideNav5, sideNavText;
	
	metricsStore = new GeoExt.data.FeatureStore({
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
				url : "http://" + domain + "/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3Atbl_dailyMetrics&outputformat=json",
				format : new OpenLayers.Format.GeoJSON()
			})
		})
	});
	
	metricsStore.load({
		callback: function(records, operation, failure) {
			// COMMENT THE NEXT 10 LINES OUT FOR LOCAL DEVELOPMENT //
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
				url : "http://" + domain + "/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3ADATATABLE&outputformat=json&Filter=%3CFilter%3E%0A%09%3CAnd%3E%0A%09%09%3COr%3E%0A%09%09%09%3CPropertyIsEqualTo%3E%0A%09%09%09%09%3CPropertyName%3EStatus%3C%2FPropertyName%3E%0A%09%09%09%09%3CLiteral%3EIn%20Procurement%3C%2FLiteral%3E%0A%09%09%09%3C%2FPropertyIsEqualTo%3E%0A%09%09%09%3CPropertyIsEqualTo%3E%0A%09%09%09%09%3CPropertyName%3EStatus%3C%2FPropertyName%3E%0A%09%09%09%09%3CLiteral%3EPipeline%3C%2FLiteral%3E%0A%09%09%09%3C%2FPropertyIsEqualTo%3E%0A%09%09%3C%2FOr%3E%0A%09%09%3CPropertyIsEqualTo%3E%0A%09%09%09%3CPropertyName%3ECleared%3C%2FPropertyName%3E%0A%09%09%09%3CLiteral%3E1%3C%2FLiteral%3E%0A%09%09%3C%2FPropertyIsEqualTo%3E%0A%09%3C%2FAnd%3E%0A%3C%2FFilter%3E",
				format : new OpenLayers.Format.GeoJSON()
			})
		})
	});

	store.load();
	
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

	// BUTTON LINK TO MAP.HTML
	var mapLink = function() {
		window.open("map.html", "_self");
		ga('send', 'event', 'Metrics_Panel', 'mapLink_Metrics_Panel', {'nonInteraction': 1});
	};
	
	// GRID FOR SEARCH RESULTS
	miniGrid = new Ext.grid.GridPanel({
		region : "center",
		store : store,
		id : 'gridx',
		columns : [{
			header : "Project Title",
			dataIndex : "Project_Title",
			width : 340,
			sortable : true
		}, {
			header : "Country",
			dataIndex : "Country",
			width : 75,
			sortable : true
		}, {
			header : "Sector",
			dataIndex : "Sector",
			width : 125,
			sortable : true
		}, {
			header : "Project Funding Source",
			dataIndex : "Project_Funding_Source",
			width : 200,
			sortable : true
		}, {
			header : "Project Size",
			dataIndex : "Project_Size",
			renderer : Ext.util.Format.numberRenderer('$0,000'),
			width : 80,
			sortable : true
		}, {
			header : "Project Announced",
			dataIndex : "Project_Announced",
			width : 110,
			format : 'm/d/Y',
			renderer : Ext.util.Format.dateRenderer('m/d/Y'),
			sortable : true
		}],
		sm : new GeoExt.grid.FeatureSelectionModel(),
		height : 265
	});
	
	// SEARCH RESULTS POP-UP
	winResults = new Ext.Window({
		id : 'formanchor-win',
		width : 800,
		height : 300,
		autoScroll : true,
		plain : true,
		title : 'Search results',
		border : false,
		closeAction : 'hide',
		resizable : false,
		resizeHandles : false,
		items : miniGrid
	});
	
	// MAIN PANEL
	var mainPanel = new Ext.FormPanel({
		region : "center",
		autoEl : { tag : 'center'},
		items: [
			new Ext.Container({
				autoEl : { tag : 'center'},
				html : '<div class="content"><div class="mainContent"><div id="sideNavTextDiv"></div></div></div>'
			}),
			new Ext.Container({
				autoEl : { tag : 'center'},
				width : 275,
				defaults : {
					style : {
						'margin-bottom' : '10px'
					}
				},
				items: 
				[ new Ext.Container({
					html: '<h6 style="font-weight: bold;">Get Started (select):</h6>',
					width : 275,
					autoEl : { tag : 'left'}
				}),
					txtKey = new Ext.form.TextField({
					emptyText : 'Search for...',
					width : 200
				}), secBox = new Ext.ux.form.CheckboxCombo({
					//store : sectorStore,
					store : new Ext.data.ArrayStore({
						fields : ['Sector'],
						data : sec // from states.js
					}),
					displayField : 'Sector',
					valueField : 'Sector',
					mode : 'local',
					emptyText : 'Select Sector...',
					width : 200
				}), dBegin = new Ext.form.DateField({
					emptyText : 'Announce Date Begin...',
					width : 200
				}),
				{
					xtype: 'container',
					autoEl: {tag: 'center'},
					width : 205,				
					items: { 
						buttons : [{
							text : 'Search',
							handler : miniSearchFunc
						}, {
							text : 'See All Leads',
							id : 'btnMapLink',
							handler : mapLink
						}]
					}
				}
			]}) 
		]
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
				cls : 'backgroundDiv',
		items : {
			layout : "border",
			items : [{
				region : 'north',
				html : '<div id="wrap"><div id="header"><div class="row" style="margin: 0px 0px 0px -100px;"><a class="logo" data-bind="click: showHome" href="index.html"/><img id="bidsLogo" alt="BIDS Logo" src="img/bidsLogo.png"></a><ul class="nav"><li><a href="mailto:BIDS-Mailbox@state.gov">Contact Us</a></li><li><a href="help.html">Help</a></li><li><a href="faqs.html">FAQs</a></li><li><a href="data.html">Data</a></li><li><a href="map.html">Map</a></li><li><a href="index.html">Home</a></li></ul></div></div>',
				height : 101,
				boxMinWidth: 800,
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
