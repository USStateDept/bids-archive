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

var domain = 'localhost'
//var domain = 'edip-maps.net'
var site = '/bids/'

var sd;

Ext.onReady(function() {
	var sb, store, grid, check;

	var toolbarItems = [];

	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

	var banks = [['African Development Bank'], ['Asian Development Bank'], ['Interamerican Development Bank'], ['Post Identified Project'], ['Washington Identified Project'], ['World Bank']]
	var regions = [['Africa'], ['East Asia and the Pacific'], ['Europe'], ['Middle East and North Africa'], ['South and Central Asia'], ['Western Hemisphere']]
	var arch = [['Archived'], ['In Procurement'], ['Pipeline']]
	var sizes = [['0-25M'], ['25-50M'], ['50-100M'], ['>100M'], ['Unpublished']]
	var sec = [['Ag and Environment'], ['Energy'], ['ICT'], ['Infrastructure'], ['Governance and Services'], ['Natural Resources']]

	store = new GeoExt.data.FeatureStore({
		autoSave : true,
		layer : sd,
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
			header : "Status",
			dataIndex : "Status",
			width : 120,
			sortable : true
		}, {
			hidden : true,
			header : "Specific Location",
			dataIndex : "Specific_Location",
			width : 175
		}, {
			hidden : true,
			header : "Link to Project",
			dataIndex : "Link_To_Project",
			width : 175
		}, {
			hidden : true,
			header : "Post Comments",
			dataIndex : "Post_Comments",
			width : 175
		}, {
			hidden : true,
			header : "Submitting Officer",
			dataIndex : "Submitting_Officer",
			width : 175
		}, {
			hidden : true,
			header : "Submitting Officer Contact",
			dataIndex : "Submitting_Officer_Contact",
			width : 175
		}, {
			hidden : true,
			header : "Project Size",
			dataIndex : "Project_Size",
			width : 175
		}],
		sm : new GeoExt.grid.FeatureSelectionModel(),

		tbar : [{
			text : 'Edit Entry',
			tooltip : 'Edit',
			icon : 'img/pencil.png',
			handler : function() {

				var sp = grid.getSelectionModel().getSelected().data.Specific_Location;
				var pr = grid.getSelectionModel().getSelected().data.Project_Funding_Source;
				var co = grid.getSelectionModel().getSelected().data.Country;
				var prt = grid.getSelectionModel().getSelected().data.Project_Title;
				var prn = grid.getSelectionModel().getSelected().data.Project_Number;
				var li = grid.getSelectionModel().getSelected().data.Link_To_Project;
				var se = grid.getSelectionModel().getSelected().data.Sector;
				var ke = grid.getSelectionModel().getSelected().data.Keyword;
				var prs = grid.getSelectionModel().getSelected().data.Project_Size;
				var pra = grid.getSelectionModel().getSelected().data.Project_Announced;
				var br = grid.getSelectionModel().getSelected().data.Borrowing_Entity;
				var im = grid.getSelectionModel().getSelected().data.Implementing_Entity;
				var ime = grid.getSelectionModel().getSelected().data.Project_POCs;
				var prd = grid.getSelectionModel().getSelected().data.Project_Description;
				var pos = grid.getSelectionModel().getSelected().data.Post_Comments;
				var su = grid.getSelectionModel().getSelected().data.Submitting_Officer;
				var subo = grid.getSelectionModel().getSelected().data.Submitting_Officer_Contact;
				var sou = grid.getSelectionModel().getSelected().data.Source;
				var fid = grid.getSelectionModel().getSelected().data.fid;
				var ten = grid.getSelectionModel().getSelected().data.Tender_Date;
				tabs.getForm().findField("Specific_Location").setValue(sp);
				tabs.getForm().findField("Project_Funding_Source").setValue(pr);
				tabs.getForm().findField("Country").setValue(co);
				tabs.getForm().findField("Project_Title").setValue(prt);
				tabs.getForm().findField("Project_Number").setValue(prn);
				tabs.getForm().findField("Link_To_Project").setValue(li);
				tabs.getForm().findField("Keyword").setValue(ke);
				tabs.getForm().findField("Project_Size").setValue(prs);
				tabs.getForm().findField("Project_Announced").setValue(pra);
				tabs.getForm().findField("Borrowing_Entity").setValue(br);
				tabs.getForm().findField("Implementing_Entity").setValue(im);
				tabs.getForm().findField("Project_POCs").setValue(ime);
				tabs.getForm().findField("Project_Description").setValue(prd);
				tabs.getForm().findField("Post_Comments").setValue(pos);
				tabs.getForm().findField("Submitting_Officer").setValue(su);
				tabs.getForm().findField("Submitting_Officer_Contact").setValue(subo);
				tabs.getForm().findField("Source").setValue(sou);
				tabs.getForm().findField("fid").setValue(fid);
				tabs.getForm().findField("Tender_Date").setValue(ten);

				if (se.indexOf("Ag and Environment") != -1) {
					tabs.getForm().findField("chAg").setValue(true);
				}
				if (se.indexOf("Energy") != -1) {
					tabs.getForm().findField("chEnergy").setValue(true);
				}
				if (se.indexOf("ICT") != -1) {
					tabs.getForm().findField("chICT").setValue(true);
				}
				if (se.indexOf("Infrastructure") != -1) {
					tabs.getForm().findField("chInfrastructure").setValue(true);
				}
				if (se.indexOf("Natural Resources") != -1) {
					tabs.getForm().findField("chNatural").setValue(true);
				}

				win.myExtraParams.e = true;

				if (win.myExtraParams.e == true) {
					Ext.getCmp('btnEdit').enable();
					Ext.getCmp('btnSave').disable();
					Ext.getCmp('btnReset').disable();
					Ext.getCmp('btnArchive').enable();
					Ext.getCmp('btnArchive').toggle(false);
				}

				console.log(win.myExtraParams.e);

				win.show();
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
				html : '<div class="container"><header><div class="row"><a class="logo" href=""/><img width="237" height="60" alt="BIDS Logo" src="img/bids-logo.png"></a><ul class="nav"><li><a href="index.html">Home</a></li><li><a href="javascript:checkTest();">Add a Lead</a></li><li><a href="resources.html">Resources</a></li><li><a href="#">Data</a></li><li><a href="faqs.html">FAQs</a></li><li><a href="help.html">Help</a></li></ul></div></header></div>',
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
