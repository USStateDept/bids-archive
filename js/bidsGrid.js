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
	var store, grid, check;

	var toolbarItems = [];

	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

	var banks = [['African Development Bank'], ['Asian Development Bank'], ['Interamerican Development Bank'], ['Post Identified Project'], ['Washington Identified Project'], ['World Bank']]
	var regions = [['Africa'], ['East Asia and the Pacific'], ['Europe'], ['Middle East and North Africa'], ['South and Central Asia'], ['Western Hemisphere']]
	var arch = [['Archived'], ['In Procurement'], ['Pipeline']]
	var sizes = [['0-25M'], ['25-50M'], ['50-100M'], ['>100M'], ['Unpublished']]
	var sec = [['Ag and Environment'], ['Energy'], ['ICT'], ['Infrastructure'], ['Governance and Services'], ['Natural Resources']]

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

	grid = new Ext.grid.GridPanel({
		title : "Business Lead List",
		region: 'south',
		store : store,
		height : 700,
		width : 1000,
		style: 'margin:0 auto;margin-top:0px;',
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
			header : "Specific Location",
			dataIndex : "Specific_Location",
			width : 175
		}, {
			header : "Status",
			dataIndex : "Status",
			width : 120,
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
		}, {
			header : "Expected Tender Date",
			dataIndex : "Tender_Date",
			width : 125,
			format : 'm/d/Y',
			renderer : Ext.util.Format.dateRenderer('m/d/Y'),
			sortable : true
		}, {
			header : "Project Number",
			dataIndex : "Project_Number",
			width : 90,
			sortable : true
		}, {
			header : "Keyword",
			dataIndex : "Keyword",
			width : 240,
			sortable : true
		}, {
			header : "Implementing Entity",
			dataIndex : "Implementing_Entity",
			width : 220,
			sortable : true
		}, {
			header : "Borrowing Entity",
			dataIndex : "Borrowing_Entity",
			width : 175
		}, {
			header : "Link to Project",
			dataIndex : "Link_To_Project",
			width : 175
		},{
			header : "Project Point of Contact",
			dataIndex : "Project_POCs",
			width : 175
		}, {
			header : "Post Comments",
			dataIndex : "Post_Comments",
			width : 175
		}, {
			header : "Submitting Officer",
			dataIndex : "Submitting_Officer",
			width : 175
		}, {
			header : "Submitting Officer Contact",
			dataIndex : "Submitting_Officer_Contact",
			width : 175
		}],
		sm : new GeoExt.grid.FeatureSelectionModel(),

		tbar : [{
			text : 'Export to CSV',
			tooltip : 'Export',
			icon : '../img/csv.jpg',
			handler: function() {
				window.location.href='http://' + domain + '/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&srsName=EPSG:4326&typeName=opengeo%3ADATATABLE&outputformat=csv';
				ga('send', 'event', 'Export', 'CSV_Export', {'nonInteraction': 1});
			}
		}]
	});

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

	// Creates the Layout
	new Ext.Viewport({
		layout : "fit",
		hideBorders : true,
		autoHeight: true,
		items : {
			items : [{
				region : 'north',
				html : '<div class="container"><header><div class="row"><a class="logo" href=""/><img width="237" height="60" alt="BIDS Logo" src="img/bids-logo.png"></a><ul class="nav"><li><a href="index.html">Home</a></li><li><a href="resources.html">Resources</a></li><li><a href="#">Data</a></li><li><a href="faqs.html">FAQs</a></li><li><a href="help.html">Help</a></li><li><a href="mailto:BIDS-Mailbox@state.gov">Contact Us</a></li></ul></div></header></div>',
				height : 121,
				border : true
			}, grid]
		}
	});

	var filt = new OpenLayers.Filter.Comparison({
		type : OpenLayers.Filter.Comparison.LIKE,
		property : "Sector",
		value : "Water"//this.getValue()
	});

	function State_Select(box, record, index) {
	}

});
