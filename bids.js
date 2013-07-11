//var store;
var LayerNodeUI = Ext.extend(GeoExt.tree.LayerNodeUI, new GeoExt.tree.TreeNodeUIEventMixin());
//OpenLayers.ProxyHost="http://localhost:8080/geoserver/rest/proxy?url="
Ext.onReady(function() {

	var sb, store, grid;

	var toolbarItems = [];

	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

	var banks = [['African Development Bank'], ['Asian Development Bank'], ['Interamerican Development Bank'], ['Post Identified Project'], ['Washington Identified Project'], ['World Bank']]
	var regions = [['Africa'], ['East Asia and the Pacific'], ['Europe'], ['Middle East and North Africa'], ['South and Central Asia'], ['Western Hemisphere']]
	var arch = [['Archived'], ['Unarchived']]
	var sizes = [['0-25M'], ['25-50M'], ['50-100M'], ['>100M'], ['Unpublished']]

	var tabs = new Ext.FormPanel({
		labelWidth : 75,
		border : false,
		width : 350,
		height : 550,
		url : 'servlet/LeadAdder',
		autoScroll : true,
		//extraParams: {"Cleared":0,"Archived":0},
		items : [{
			title : ' ',
			layout : 'form',
			defaults : {
				width : 200
			},
			defaultType : 'textfield',

			items : [{
				xtype : 'hidden',
				name : 'Cleared',
				value : '0'
			}, {
				xtype : 'hidden',
				name : 'Archived',
				value : '0'
			}, {
				xtype : 'hidden',
				name : 'fid',
				value : '0'
			}, {
				fieldLabel : 'Project Funding Source',
				name : 'Project_Funding_Source'
			}, {

				fieldLabel : 'Specific Location',
				name : 'Specific_Location',
				id : 'sspec'
			}, {

				fieldLabel : 'Country or Region',
				name : 'Country'
			}, new Ext.form.ComboBox({
				store : new Ext.data.ArrayStore({
					fields : ['DOS_Region'],
					data : regions // from states.js
				}),
				name : 'DOS_Region',
				fieldLabel : 'DOS Region',
				displayField : 'DOS_Region',
				typeAhead : true,
				mode : 'local',
				forceSelection : true,
				triggerAction : 'all',
				//emptyText : 'Select Source',
				selectOnFocus : true
				//applyTo: 'local-states'
			}), new Ext.form.ComboBox({
				store : new Ext.data.ArrayStore({
					fields : ['Source'],
					data : banks // from states.js
				}),
				name : 'Source',
				fieldLabel : 'Source',
				displayField : 'Source',
				typeAhead : true,
				mode : 'local',
				forceSelection : true,
				triggerAction : 'all',
				//emptyText : 'Select Source',
				selectOnFocus : true
				//applyTo: 'local-states'
			}), {
				fieldLabel : 'Project Title',
				name : 'Project_Title'
			}, {
				fieldLabel : 'Project Number',
				name : 'Project_Number'
			}, {
				fieldLabel : 'Link to Project',
				name : 'Link_To_Project'
			}, {
				fieldLabel : 'Keywords',
				name : 'Keyword'
			}, {
				fieldLabel : 'Project Size',
				name : 'Project_Size'
			}, new Ext.form.DateField({
				fieldLabel : 'Project Announced',
				name : 'Project_Announced',
				width : 190
			}), new Ext.form.DateField({
				fieldLabel : 'Expected Tender Date',
				name : 'Tender_Date',
				width : 190
			}), {
				fieldLabel : 'Borrowing Entity',
				name : 'Borrowing_Entity'
			}, {
				fieldLabel : 'Implementing Entity',
				name : 'Implementing_Entity'
			}, {
				fieldLabel : 'Submitting Officer',
				name : 'Submitting_Officer'
			}, {
				fieldLabel : 'Submitting Officer Email',
				name : 'Submitting_Officer_Contact'
			}, {
				xtype : 'textarea',
				fieldLabel : 'Implementing Entity POCs & Contact Info',
				name : 'Project_POCs'
			}, {
				xtype : 'textarea',
				fieldLabel : 'Project Description & Bidding Requirements',
				name : 'Project_Description'
			}, {
				xtype : 'textarea',
				fieldLabel : 'Post Comments',
				name : 'Post_Comments'
			}, {
				xtype : 'fieldset',
				title : 'Sector',
				//name : "Sector",
				width : 270,
				autoHeight : true,
				defaultType : 'checkbox', // each item will be a radio button
				items : [{
					fieldLabel : '',
					boxLabel : 'Administration',
					name : 'chAdmin'
				}, {
					fieldLabel : '',
					labelSeparator : '',
					boxLabel : 'Agriculture',
					name : 'chAgr'
				}, {
					fieldLabel : '',
					labelSeparator : '',
					boxLabel : 'Education',
					name : 'chEd'
				}, {
					fieldLabel : '',
					labelSeparator : '',
					boxLabel : 'Energy',
					name : 'chEn'
				}, {
					fieldLabel : '',
					labelSeparator : '',
					boxLabel : 'Finance',
					name : 'chFin'
				}, {
					fieldLabel : '',
					labelSeparator : '',
					boxLabel : 'Infrastructure',
					name : 'chInf'
				}, {
					fieldLabel : '',
					labelSeparator : '',
					boxLabel : 'Resource Management',
					name : 'chRes'
				}, {
					fieldLabel : '',
					labelSeparator : '',
					boxLabel : 'Social Services',
					name : 'chSoc'
				}, {
					fieldLabel : '',
					labelSeparator : '',
					boxLabel : 'Telecommunications',
					name : 'chTel'
				}, {
					fieldLabel : '',
					labelSeparator : '',
					boxLabel : 'Tourism',
					name : 'chTou'
				}, {
					fieldLabel : '',
					labelSeparator : '',
					boxLabel : 'Transportation',
					name : 'chTra'
				}, {
					fieldLabel : '',
					labelSeparator : '',
					boxLabel : 'Water',
					name : 'chWa'
				}, {
					xtype : 'textfield',
					fieldLabel : 'Other',
					name : 'chOth'
				}]
			}]
		}],
		/*
		 listeners : {
		 render : function() {
		 countryStore.load();
		 }
		 },*/
		buttons : [{
			text : 'Edit',
			id : 'btnEdit',
			handler : function() {
				tabs.getForm().submit({
					params : {
						editType : 'edit'
					}
				});
			}
		}, {
			text : 'Save',
			id : 'btnSave',
			handler : function() {
				tabs.getForm().submit({
					params : {
						editType : 'insert'
					},
					success : function(form, action) {
						Ext.Msg.alert('Success', 'It worked');
					},
					failure : function(form, action) {
						//Ext.Msg.alert('Warning', 'Error');
						win.hide();
						tabs.getForm().reset();
						grid.getView().refresh();
						sd.refresh({
							force : true
						});
					}
				});
			}
		}, {
			text : 'Reset',
			id : 'btnReset',
			handler : function() {
				tabs.getForm().reset();
			}
		}]
		/*buttons : [{
		 text : 'Save'
		 }, {
		 text : 'Cancel'
		 }]*/
	});

	tabs.render(document.body);

	var win = new Ext.Window({
		id : 'formanchor-win',
		autoHeight : true,
		minWidth : 500,
		plain : true,
		title : 'Add a Lead',
		border : false,
		closeAction : 'hide',
		items : tabs

	});

	win.myExtraParams = {
		e : false
	};

	/*var action = new GeoExt.Action({
		//control: new OpenLayers.Control.ZoomToMaxExtent(),
		//map: map,
		text : "Add a Lead",
		icon : 'add.png',
		handler : function() {
			//Ext.example.msg('Click','You clicked on "Action 1".');

			Ext.Msg.show({
				title : 'Add a Lead',
				msg : 'By clicking okay, you agree that any trade lead added to this system will be unclassified, and that you understand the rules and regulations regarding this site.',
				width : 300,
				buttons : Ext.MessageBox.OK,
				fn : myCallbackFunction
				//icon : Ext.MessageBox.ERROR
			})
		}
		//tooltip: "zoom to max extent"
	});*/

	function myCallbackFunction() {

		win.myExtraParams.e = false;

		if (win.myExtraParams.e == false) {
			Ext.getCmp('btnEdit').disable();
			Ext.getCmp('btnSave').enable();
			Ext.getCmp('btnReset').enable();
		}
		win.show();
	}


	//toolbarItems.push(action);

	var mapPanel = new GeoExt.MapPanel({
		region : "center",
		//renderTo: "mapPanel",
		tbar : toolbarItems,
		//center : [146.1569825, -41.6109735],
		//projection: "EPSG:900913",

		wrapDateLine: true,
		map : {
			projection : "EPSG:900913"
		},

		zoom : 3,
		layers : [new OpenLayers.Layer.XYZ("Map", ["http://otile1.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png", "http://otile2.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png", "http://otile3.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png", "http://otile4.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png"], {
			attribution : "Data, imagery and map information provided by MapQuest, Open Street Map and contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/' target='_blank'>CC-BY-SA.</a>",
			transitionEffect : "resize"
		}), new OpenLayers.Layer.XYZ("Imagery", ["http://otile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png", "http://otile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png", "http://otile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png", "http://otile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png"], {
			attribution : "Tiles Courtesy of MapQuest. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency.",
			transitionEffect : "resize"
		})]
	});

	var info;
	var map = mapPanel.map;

	// create our own layer node UI class, using the TreeNodeUIEventMixin
	var LayerNodeUI = Ext.extend(GeoExt.tree.LayerNodeUI, new GeoExt.tree.TreeNodeUIEventMixin());

	// using OpenLayers.Format.JSON to create a nice formatted string of the
	// configuration for editing it in the UI
	var treeConfig = [{
		nodeType : "gx_baselayercontainer",
		expanded : true
	}, {
		nodeType : "gx_overlaylayercontainer",
		expanded : true,
		// render the nodes inside this container with a radio button,
		// and assign them the group "foo".
		loader : {
			baseAttrs : {
				radioGroup : "foo",
				uiProvider : "layernodeui"
			}
		}
	}];
	// The line below is only needed for this example, because we want to allow
	// interactive modifications of the tree configuration using the
	// "Show/Edit Tree Config" button. Don't use this line in your code.
	treeConfig = new OpenLayers.Format.JSON().write(treeConfig, true);

	// create the tree with the configuration from above
	tree = new Ext.tree.TreePanel({
		border : true,
		region : "north",
		title : "Layers",
		height : 145,
		width : 200,
		split : true,
		collapsible : true,
		collapsed : true,
		collapseMode : "mini",
		autoScroll : true,
		plugins : [new GeoExt.plugins.TreeNodeRadioButton({
			listeners : {
				"radiochange" : function(node) {
					alert(node.text + " is now the active layer.");
				}
			}
		})],
		loader : new Ext.tree.TreeLoader({
			// applyLoader has to be set to false to not interfer with loaders
			// of nodes further down the tree hierarchy
			applyLoader : false,
			uiProviders : {
				"layernodeui" : LayerNodeUI
			}
		}),
		root : {
			nodeType : "async",
			// the children property of an Ext.tree.AsyncTreeNode is used to
			// provide an initial set of layer nodes. We use the treeConfig
			// from above, that we created with OpenLayers.Format.JSON.write.
			children : Ext.decode(treeConfig)
			// Don't use the line above in your application. Instead, use
			//children: treeConfig

		},
		listeners : {
			"radiochange" : function(node) {
				alert(node.layer.name + " is now the the active layer.");
			}
		},
		rootVisible : false,
		lines : false

	});

	// dialog for editing the tree configuration
	var treeConfigWin = new Ext.Window({
		layout : "fit",
		hideBorders : true,
		closeAction : "hide",
		width : 300,
		height : 400,
		title : "Tree Configuration",
		items : [{
			xtype : "form",
			layout : "fit",
			items : [{
				id : "treeconfig",
				xtype : "textarea"
			}],
			buttons : [{
				text : "Save",
				handler : function() {
					var value = Ext.getCmp("treeconfig").getValue()
					try {
						var root = tree.getRootNode();
						root.attributes.children = Ext.decode(value);
						tree.getLoader().load(root);
					} catch(e) {
						alert("Invalid JSON");
						return;
					}
					treeConfig = value;
					treeConfigWin.hide();
				}
			}, {
				text : "Cancel",
				handler : function() {
					treeConfigWin.hide();
				}
			}]
		}]
	});

	var sd = new OpenLayers.Layer.Vector('Leads', {
		//projection: geographicProj,
		strategies : [new OpenLayers.Strategy.Fixed(), new OpenLayers.Strategy.Cluster()],
		styleMap : new OpenLayers.StyleMap({
			'default' : new OpenLayers.Style({
				pointRadius : '${radius}',
				fillOpacity : 0.7,
				fillColor : '#FF6600',
				strokeOpacity: 0.7,
				strokeWidth: 0.5,
				strokeColor : '#A24100'
			}, {
				context : {
					radius : function(feature) {
						return Math.min(feature.attributes.count, 10) * 1.5 + 4;
					}
				}
			}),
			'select' : {
				fillColor : '#FFCC00'
			}
		}),
		protocol : new OpenLayers.Protocol.HTTP({
			url : "http://localhost:8080/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3ADATATABLE&maxfeatures=170&outputformat=json",
			format : new OpenLayers.Format.JSON()
		})
	});

	var fpControl = new OpenLayers.Control.FeaturePopups({
		boxSelectionOptions : {},
		layers : [[
		// Uses: Templates for hover & select and safe selection
		sd, {
			templates : {
				// hover: single & list
				// hover single
				hover : '<div><font size=\"2\"><b>${.Project_Title}' + '</b></font></div>' + '<div><font size=\"1\" color=\"#909090\"><b>Sector: </b>${.Sector}' + '<br><b>Funding Source: </b>${.Project_Funding_Source}' + '</font></div>',
				// hover list
				hoverList : '<div><font size=\"2\"><b>${count} leads found</b></font><br><font size=\"1\" color=\"#909090\">Click for more information</font></div>',
				//hoverItem : '<div style =\"font-size: 10px\"><b>${.SpecLoc}: </b>${.PrTitle}<br></div>',
				// selected item from single & list
				single : '<div><font size=\"3\"><b>${.Project_Title}</b></font></div>' +  '<div><font size=\"1\" color=\"#909090\"><b>Country: </b>${.Country}' +'<div><font size=\"1\" color=\"#909090\"><b>Sector: </b>${.Sector}'+'<div><font size=\"1\" color=\"#909090\"><b>Data Added: </b>'  + '<br><b>Funding Source: </b>${.Project_Funding_Source}' + '<br><b>Project Size (USD): </b>${.Project_Size}' + '<br><b>Description: </b><br><div style="width: 200px; height: 50px; overflow-y: scroll;">${.Project_Description}</div>' +  '<br><a href=\"${.Link_To_Project}\">Project Website</a>' + '<br><a href=\"mailto:${.Submitting_Officer_Contact}\">Contact Embassy</a>' + '</font></div>',
				// List of clustered items
				item : '<li><a href=\"#\" ${showPopup()}>${.Project_Title}</a></li>' + '<div><font size = \"1\" color=\"#909090\">' + '<b>Country: </b>${.Country}' + '<br><b>Sector: </b>${.Sector}' + '<br><b>Funding Source: </b>${.PrFSrc}' + '</font></div><br>',
			}
		}]]
	});
	map.addControl(fpControl);

	//vecLayer.addFeatures(features);

	map.addLayer(sd);

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
			name : "fid",
			type : "string"
		}],
		proxy : new GeoExt.data.ProtocolProxy({
			protocol : new OpenLayers.Protocol.HTTP({
				url : "http://localhost:8080/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3ADATATABLE&maxfeatures=170&outputformat=json",
				format : new OpenLayers.Format.GeoJSON()
			})
		})//,
		//autoLoad : true
	});

	store.load();

	grid = new Ext.grid.GridPanel({

		//id: "grid",
		title : "Compare Projects",
		region : "south",
		collapsible : true,
		collapsed : true,
		store : store,
		id : 'gridx',
		plugins : [Ext.ux.PanelCollapsedTitle],

		columns : [/*{
			header : "Timestamp",
			dataIndex : "Timestam",
			width : 100
		},*/ {
			header : "Project Funding Source",
			dataIndex : "Project_Funding_Source",
			width : 200
		}, {
			header : "Specific Location",
			dataIndex : "Specific_Location",
			width : 175
		}, {
			header : "Country",
			dataIndex : "Country",
			width : 100
		}, {
			header : "DOS Region",
			dataIndex : "DOS_Region",
			width : 125
		}, {
			header : "Project Title",
			dataIndex : "Project_Title",
			width : 125
		}, {
			header : "Project Number",
			dataIndex : "Project_Number",
			width : 125
		}, {
			header : "Link to Project",
			dataIndex : "Link_To_Project",
			width : 125
		}, {
			header : "Sector",
			dataIndex : "Sector",
			width : 125
		}, {
			header : "Keywords",
			dataIndex : "Keyword",
			width : 125
		}, {
			header : "Project Size",
			dataIndex : "Project_Size",
			width : 125
		}, {
			header : "Project Announced",
			dataIndex : "Project_Announced",
			width : 125,
			format : 'm/d/Y',
			renderer : Ext.util.Format.dateRenderer('m/d/Y')
		}, {
			header : "Expected Tender Date",
			dataIndex : "Tender_Date",
			width : 125,
			format : 'm/d/Y',
			renderer : Ext.util.Format.dateRenderer('m/d/Y')
		}, {
			header : "Borrowing Entity",
			dataIndex : "Borrowing_Entity",
			width : 125
		}, {
			header : "Implementing Entity",
			dataIndex : "Implementing_Entity",
			width : 125
		}, {
			header : "Implementing Entity POC",
			dataIndex : "Project_POCs",
			width : 125
		}, {
			header : "Proj Descr/Bidding Req",
			dataIndex : "Project_Description",
			width : 125
		}, {
			header : "Post Comments",
			dataIndex : "Post_Comments",
			width : 125
		}, {
			header : "Submitting Officer",
			dataIndex : "Submitting_Officer",
			width : 125
		}, {
			header : "Submitting Officer Comments",
			dataIndex : "Submitting_Officer_Contact",
			width : 125
		}, {
			header : "Source",
			dataIndex : "Source",
			width : 125
		}, {
			header : "US Firm Contact",
			dataIndex : "US_Firm_Contact",
			width : 125
		}, {
			header : "US Firm Wins",
			dataIndex : "US_Firm_Wins",
			width : 125
		}, /*{
			header : "Marker",
			dataIndex : "Marker",
			width : 125
		}, {
			header : "Cleared",
			dataIndex : "Cleared",
			width : 125
		}, {
			header : "ID",
			dataIndex : "fid",
			width : 125
		}*/],
		sm : new GeoExt.grid.FeatureSelectionModel(),

		height : 200,

		tbar : [{
			text : 'Edit Entry',
			tooltip : 'Edit',
			icon : 'pencil.png',
			handler : function() {

				var sp = grid.getSelectionModel().getSelected().data.SpecLoc;
				var pr = grid.getSelectionModel().getSelected().data.PrFSrc;
				var co = grid.getSelectionModel().getSelected().data.Country;
				var prt = grid.getSelectionModel().getSelected().data.PrTitle;
				var prn = grid.getSelectionModel().getSelected().data.PrNum;
				var li = grid.getSelectionModel().getSelected().data.LinkPr;
				var se = grid.getSelectionModel().getSelected().data.Sector;
				var ke = grid.getSelectionModel().getSelected().data.Keyword;
				var prs = grid.getSelectionModel().getSelected().data.PrSize;
				var pra = grid.getSelectionModel().getSelected().data.PrAnnou;
				var br = grid.getSelectionModel().getSelected().data.BrEnt;
				var im = grid.getSelectionModel().getSelected().data.ImEnt;
				var ime = grid.getSelectionModel().getSelected().data.ImEnPOC;
				var prd = grid.getSelectionModel().getSelected().data.PrDesc;
				var pos = grid.getSelectionModel().getSelected().data.PostCom;
				var su = grid.getSelectionModel().getSelected().data.SubOff;
				var subo = grid.getSelectionModel().getSelected().data.SubOffC;
				var sou = grid.getSelectionModel().getSelected().data.Source;
				var fid = grid.getSelectionModel().getSelected().data.fid;
				var ten = grid.getSelectionModel().getSelected().data.TenDate;
				//var us = grid.getSelectionModel().getSelected().data.USFirWi;
				//var usf = grid.getSelectionModel().getSelected().data.USFirCo;
				console.log(ten);
				//console.log(record);
				tabs.getForm().findField("SpecLoc").setValue(sp);
				tabs.getForm().findField("PrFSrc").setValue(pr);
				tabs.getForm().findField("Country").setValue(co);
				tabs.getForm().findField("PrTitle").setValue(prt);
				tabs.getForm().findField("PrNum").setValue(prn);
				tabs.getForm().findField("LinkPr").setValue(li);
				//tabs.getForm().findField("Sector").setValue(se);
				tabs.getForm().findField("Keyword").setValue(ke);
				tabs.getForm().findField("PrSize").setValue(prs);
				tabs.getForm().findField("PrAnnou").setValue(pra);
				tabs.getForm().findField("BrEnt").setValue(br);
				tabs.getForm().findField("ImEnt").setValue(im);
				tabs.getForm().findField("ImEnPOC").setValue(ime);
				tabs.getForm().findField("PrDesc").setValue(prd);
				tabs.getForm().findField("PostCom").setValue(pos);
				tabs.getForm().findField("SubOff").setValue(su);
				tabs.getForm().findField("SubOffC").setValue(subo);
				tabs.getForm().findField("Source").setValue(sou);
				tabs.getForm().findField("fid").setValue(fid);

				//var dt = new Date(ten);
				//dt.format('m/d/Y');
				tabs.getForm().findField("TenDate").setValue(ten);
				//tabs.getForm().findField("USFirWi").setValue(us);
				//tabs.getForm().findField("USFirCo").setValue(usf);

				if (se.indexOf("Water") != -1) {
					tabs.getForm().findField("chWa").setValue(true);
				}
				if (se.indexOf("Education") != -1) {
					tabs.getForm().findField("chEd").setValue(true);
				}
				if (se.indexOf("Energy") != -1) {
					tabs.getForm().findField("chEn").setValue(true);
				}
				if (se.indexOf("Finance") != -1) {
					tabs.getForm().findField("chFin").setValue(true);
				}
				if (se.indexOf("Infrastructure") != -1) {
					tabs.getForm().findField("chInf").setValue(true);
				}
				if (se.indexOf("Resource Management") != -1) {
					tabs.getForm().findField("chRes").setValue(true);
				}
				if (se.indexOf("Social Services") != -1) {
					tabs.getForm().findField("chSoc").setValue(true);
				}
				if (se.indexOf("Telecommunications") != -1) {
					tabs.getForm().findField("chTel").setValue(true);
				}
				if (se.indexOf("Tourism") != -1) {
					tabs.getForm().findField("chTou").setValue(true);
				}
				if (se.indexOf("Transportation") != -1) {
					tabs.getForm().findField("chTra").setValue(true);
				}
				if (se.indexOf("Administration") != -1) {
					tabs.getForm().findField("chAdmin").setValue(true);
				}
				if (se.indexOf("Agriculture") != -1) {
					tabs.getForm().findField("chAgr").setValue(true);
				}

				win.myExtraParams.e = true;

				if (win.myExtraParams.e == true) {
					Ext.getCmp('btnEdit').enable();
					Ext.getCmp('btnSave').disable();
					Ext.getCmp('btnReset').disable();
					//Ext.getCmp('sspec').disabled=true;
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

	//countryStore.load();
	enteringStore.load();
	sectorStore.load();
	regionStore.load();
	fundingStore.load();
	//sourceStore.load();

	var categorySelectedId;

	var filterPanel = new Ext.FormPanel({
		labelWidth : 100, // label settings here cascade unless overridden
		frame : true,
		title : 'Filter',
		region : 'center',
		bodyStyle : 'padding:5px 5px 0',

		//width: 210,
		defaults : {
			width : 135
		},
		defaultType : 'textfield',

		items : [ dBegin = new Ext.form.DateField({
			emptyText : 'Begin...',
			fieldLabel : 'Date Range',
			width : 190
			//allowBlank : false
		}), dEnd = new Ext.form.DateField({
			//fieldLabel : 'Tender Date',
			emptyText : 'End...',
			width : 190
			//allowBlank : false
		}), tBegin = new Ext.form.DateField({
			emptyText : 'Begin...',
			fieldLabel : 'Tender Date',
			//disabled : true,
			//name : 'tBegin',
			width : 190
			//allowBlank : false
		}), tEnd = new Ext.form.DateField({
			//fieldLabel : 'Date Range',
			emptyText : 'End...',
			//disabled : true,
			//name : 'tEnd',
			width : 190
			//allowBlank : false
			//}), eoBox= new Ext.ux.form.LovCombo({
		}), eoBox = new Ext.ux.form.CheckboxCombo({
			//xtype: 'checkboxcombo',
			//name: 'eoBox',
			//multiSelect: true,
			store : enteringStore,
			fieldLabel : 'Entering Officer',
			displayField : 'EnteringOfficer',
			//typeAhead : true,
			mode : 'local',
			//allowBlank: false,
			valueField : 'EnteringOfficer',
			//forceSelection : true,
			//triggerAction : 'all',
			emptyText : 'Select Officer...',
			//selectOnFocus : true
			//applyTo: 'local-states'
		}), regBox = new Ext.ux.form.CheckboxCombo({
			store : regionStore,
			fieldLabel : 'Region',
			displayField : 'Region',
			valueField : 'Region',
			//typeAhead : true,
			mode : 'local',
			//forceSelection : true,
			//triggerAction : 'all',
			emptyText : 'Select Region...'
			//selectOnFocus : true
			//applyTo: 'local-states'
		}), secBox = new Ext.ux.form.CheckboxCombo({
			store : sectorStore,
			fieldLabel : 'Sector',
			displayField : 'Sector',
			valueField : 'Sector',
			//typeAhead : true,
			mode : 'local',
			//forceSelection : true,
			//triggerAction : 'all',
			emptyText : 'Select Sector...'
			//selectOnFocus : true
			//valueField : 'Water'
			/*listeners : {
			select : State_Select
			}*/

			//applyTo: 'local-states'
		}), sizeBox = new Ext.ux.form.CheckboxCombo({
			store : new Ext.data.ArrayStore({
				fields : ['PrSize'],
				data : sizes // from states.js
			}),
			fieldLabel : 'Size',
			displayField : 'PrSize',
			valueField : 'PrSize',
			//typeAhead : true,
			mode : 'local',
			//forceSelection : true,
			//triggerAction : 'all',
			emptyText : 'Select Size...'
			//selectOnFocus : true
			//applyTo: 'local-states'
		}), fsBox = new Ext.ux.form.CheckboxCombo({
			store : fundingStore,
			fieldLabel : 'Funding Source',
			displayField : 'FundingSource',
			valueField : 'FundingSource',
			//typeAhead : true,
			mode : 'local',
			//forceSelection : true,
			//triggerAction : 'all',
			emptyText : 'Select Funding...'
			//selectOnFocus : true
			//applyTo: 'local-states'
		}), arcBox = new Ext.form.ComboBox({
			store : new Ext.data.ArrayStore({
				fields : ['Archived'],
				data : arch // from states.js
			}),
			fieldLabel : 'Archived',
			displayField : 'Archived',
			typeAhead : true,
			mode : 'local',
			forceSelection : true,
			triggerAction : 'all',
			emptyText : 'Select Archived...',
			//disabled : true,
			selectOnFocus : true
			//applyTo: 'local-states'
		}), txtKey = new Ext.form.TextField({
			fieldLabel : 'Keyword Search'
		})],
		buttons : [{
			text : 'Add a Lead',
			//text : "Add a Lead",
			icon : 'add.png',
			handler : function() {
				//Ext.example.msg('Click','You clicked on "Action 1".');

				Ext.Msg.show({
					title : 'Add a Lead',
					msg : 'By clicking okay, you agree that any trade lead added to this system will be unclassified, and that you understand the rules and regulations regarding this site.',
					width : 300,
					buttons : Ext.MessageBox.OK,
					fn : myCallbackFunction
					//icon : Ext.MessageBox.ERROR
				})
			}
		}, {
			text : 'Submit',
			handler : function() {

				var count = 0;
				var filter = "";
				var sec = secBox.displayField;
				var secVal = secBox.getValue();
				var fs = "PrFSrc";
				var fsVal = fsBox.getValue();
				var eo = "SubOff";
				var eoVal = eoBox.getValue();
				var reg = "DOSReg";
				var regVal = regBox.getValue();
				var keyy = "Keyword";
				var keyVal = txtKey.getValue();
				var ten = "TenDate";
				var tBeginVal = tBegin.getValue();
				var tEndVal = tEnd.getValue();
				var pra = "PrAnnou";
				var dBeginVal = dBegin.getValue();
				var dEndVal = dEnd.getValue();
				var arc = arcBox.displayField;
				var arcVal = arcBox.getValue();
				var siz = "PrSize";
				var sizeVal = sizeBox.getValue();

				var urlWhole = "http://localhost:8080/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3ADATATABLE&maxfeatures=150&outputformat=json";

				if (sizeVal != '') {
					if (sizeVal.indexOf(",") != -1) {
						//console.log(eoVal);
						var parts = sizeVal.split(",");
						filter = filter + "<Or>";

						for (var i = 0; i < parts.length; i++) {

							if (parts[i] == '0-25M') {
								begin = '0';
								end = '25000000';
								filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + siz + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin + "%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"

							}
							if (parts[i] == '25-50M') {
								begin = '25000000';
								end = '50000000';
								filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + siz + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin + "%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"

							}
							if (parts[i] == '50-100M') {
								begin = '50000000';
								end = '100000000';
								filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + siz + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin + "%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"

							}
							if (parts[i] == '>100M') {
								begin = '100000000';

								filter = filter + "<PropertyIsGreaterThan><PropertyName>PrSize</PropertyName><Literal>" + begin + "</Literal></PropertyIsGreaterThan>";
							}

						}
						filter = filter + "</Or>";
						console.log(filter);
					} else {

						if (sizeVal == '0-25M') {
							begin = '0';
							end = '25000000';
							filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + siz + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin + "%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"

						}
						if (sizeVal == '25-50M') {
							begin = '25000000';
							end = '50000000';
							filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + siz + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin + "%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"

						}
						if (sizeVal == '50-100M') {
							begin = '50000000';
							end = '100000000';
							filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + siz + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin + "%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"

						}
						if (sizeVal == '>100M') {
							begin = '100000000';

							filter = filter + "<PropertyIsGreaterThan><PropertyName>PrSize</PropertyName><Literal>" + begin + "</Literal></PropertyIsGreaterThan>";
						}
					}
					//filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + siz + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin +"%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"
					count = count + 1;
				}
				////Tender Date
				if (tBeginVal != '') {
					var begin = Ext.util.Format.date(tBeginVal, 'm/d/Y');
					var end = Ext.util.Format.date(tEndVal, 'm/d/Y');
					filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + ten + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin + "%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"
					count = count + 1;
				}
				////Date
				if (dBeginVal != '') {
					//var begin = tBeginVal + "/" + tBegin.getValue().DAY + "/" + tBegin.getValue().YEAR;
					//var end = tEndVal + "/" + tEnd.getValue().DAY + "/" + tEnd.getValue().YEAR;
					var begin = Ext.util.Format.date(dBeginVal, 'm/d/Y');
					var end = Ext.util.Format.date(dEndVal, 'm/d/Y');
					filter = filter + "%3CPropertyIsBetween%3E%3CPropertyName%3E" + pra + "%3C/PropertyName%3E%3CLowerBoundary%3E%3CLiteral%3E" + begin + "%3C/Literal%3E%3C/LowerBoundary%3E%3CUpperBoundary%3E%3CLiteral%3E" + end + "%3C/Literal%3E%3C/UpperBoundary%3E%3C/PropertyIsBetween%3E"
					count = count + 1;
				}

				if (arcVal.length > 0) {

					if (arcVal == "Archived") {
						arcVal = 1;
					} else {
						arcVal = 0;
					}

					filter = filter + "%3CPropertyIsEqualTo%3E%3CPropertyName%3E" + arc + "%3C/PropertyName%3E%3CLiteral%3E" + arcVal + "%3C/Literal%3E%3C/PropertyIsEqualTo%3E"
					count = count + 1;
				}
				/////////////////
				//////Sector
				//////////////////
				if (secVal.length > 0) {

					if (secVal.indexOf(",") != -1) {
						//console.log(eoVal);
						var parts = secVal.split(",");
						filter = filter + "<Or>";
						console.log(filter);
						for (var i = 0; i < parts.length; i++) {
							parts[i] = parts[i].replace(" ", "*");
							filter = filter + "%3CPropertyIsLike wildCard=\"*\" singleChar=\".\" escape=\"!\"%3E%3CPropertyName%3E" + sec + "%3C/PropertyName%3E%3CLiteral%3E*" + parts[i] + "*%3C/Literal%3E%3C/PropertyIsLike%3E"
						}
						filter = filter + "</Or>";
						console.log(filter);
					} else {
						secVal = secVal.replace(" ", "*");
						filter = filter + "%3CPropertyIsLike wildCard=\"*\" singleChar=\".\" escape=\"!\"%3E%3CPropertyName%3E" + sec + "%3C/PropertyName%3E%3CLiteral%3E*" + secVal + "*%3C/Literal%3E%3C/PropertyIsLike%3E"
					}
					count = count + 1;
				}
				///////////////
				////////Funding Source
				//////////////
				if (fsVal.length > 0) {
					if (fsVal.indexOf(",") != -1) {
						//console.log(eoVal);
						var parts = fsVal.split(",");
						filter = filter + "<Or>";
						console.log(filter);
						for (var i = 0; i < parts.length; i++) {

							filter = filter + "%3CPropertyIsEqualTo%3E%3CPropertyName%3E" + fs + "%3C/PropertyName%3E%3CLiteral%3E" + parts[i] + "%3C/Literal%3E%3C/PropertyIsEqualTo%3E"
							console.log(filter);
						}
						filter = filter + "</Or>";
						console.log(filter);
					} else {
						filter = filter + "%3CPropertyIsEqualTo%3E%3CPropertyName%3E" + fs + "%3C/PropertyName%3E%3CLiteral%3E" + fsVal + "%3C/Literal%3E%3C/PropertyIsEqualTo%3E"
					}
					count = count + 1;
				}
				/////////////////////
				//////Entering Officer
				/////////////////////
				if (eoVal.length > 0) {
					if (eoVal.indexOf(",") != -1) {
						//console.log(eoVal);
						var parts = eoVal.split(",");
						filter = filter + "<Or>";
						console.log(filter);
						for (var i = 0; i < parts.length; i++) {

							filter = filter + "%3CPropertyIsEqualTo%3E%3CPropertyName%3E" + eo + "%3C/PropertyName%3E%3CLiteral%3E" + parts[i] + "%3C/Literal%3E%3C/PropertyIsEqualTo%3E"
							console.log(filter);
						}
						filter = filter + "</Or>";
						console.log(filter);
					} else {
						filter = filter + "%3CPropertyIsEqualTo%3E%3CPropertyName%3E" + eo + "%3C/PropertyName%3E%3CLiteral%3E" + eoVal + "%3C/Literal%3E%3C/PropertyIsEqualTo%3E"
					}
					count = count + 1;
				}
				////////////////////
				////////Region
				///////////////////////
				if (regVal.length > 0) {
					if (regVal.indexOf(",") != -1) {
						//console.log(eoVal);
						var parts = regVal.split(",");
						filter = filter + "<Or>";
						console.log(filter);
						for (var i = 0; i < parts.length; i++) {

							filter = filter + "%3CPropertyIsEqualTo%3E%3CPropertyName%3E" + reg + "%3C/PropertyName%3E%3CLiteral%3E" + parts[i] + "%3C/Literal%3E%3C/PropertyIsEqualTo%3E"
							console.log(filter);
						}
						filter = filter + "</Or>";
						console.log(filter);
					} else {
						filter = filter + "%3CPropertyIsEqualTo%3E%3CPropertyName%3E" + reg + "%3C/PropertyName%3E%3CLiteral%3E" + regVal + "%3C/Literal%3E%3C/PropertyIsEqualTo%3E"
					}
					count = count + 1;
				}
				///////////////////
				//////Keyword
				//////////////////
				if (keyVal.length > 0) {
					keyVal = keyVal.replace(" ", "*");
					filter = filter + "%3CPropertyIsLike wildCard=\"*\" singleChar=\".\" escape=\"!\"%3E%3CPropertyName%3E" + keyy + "%3C/PropertyName%3E%3CLiteral%3E*" + keyVal + "*%3C/Literal%3E%3C/PropertyIsLike%3E"
					count = count + 1;
				}

				if (count == 1) {
					urlWhole = urlWhole + "&Filter=%3CFilter%3E" + filter + "%3C/Filter%3E";
				}

				if (count > 1) {
					filter = "&Filter=%3CFilter%3E%3CAnd%3E" + filter + "%3C/And%3E%3C/Filter%3E";
					urlWhole = urlWhole + filter;
				}

				var tProxy = new GeoExt.data.ProtocolProxy({
					protocol : new OpenLayers.Protocol.HTTP({
						url : urlWhole,
						format : new OpenLayers.Format.GeoJSON()
					})
				});
				//
				store.proxy = tProxy;
				store.reload();
				grid.getView().refresh();

			}
		}, {
			text : 'Reset',
			id : 'btnResetFilter',
			handler : function() {
				filterPanel.getForm().reset();
			}
		}]
	});

	new Ext.Viewport({
		layout : "fit",
		hideBorders : true,
		items : {
			layout : "border",
			items : [mapPanel, {
				layout : 'border',
				region : 'west',
				split : true,
				width : 275,
				items : [tree, filterPanel]
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
