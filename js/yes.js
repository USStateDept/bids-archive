check = 0;

function yes() {	
		var x;
		var r=confirm('By clicking okay, you agree that any trade lead added to this system will be unclassified, no additional clearances will be necessary to publish or view the information you add, and that you understand the rules and regulations regarding this site. All information you add will become publically available.\n\nIf you have any questions, please refer to our Frequently Asked Questions and Help pages.');

		if (r==true)
		{
			x=myCallbackFunction();
		}
		else
		{
			x="Cancelled.";
		}	
}

function yesEdit() {	
		var x;
		var r=confirm('By clicking okay, you agree that any trade lead information added to this system will be unclassified, no additional clearances will be necessary to publish or view the information you add, and that you understand the rules and regulations regarding this site. All information you add will become publically available.\n\nIf you have any questions, please refer to our Frequently Asked Questions and Help pages.');

		if (r==true)
		{
			x=editEntryFunction();
		}
		else
		{
			x="Cancelled.";
		}	
}

function codeAddress() {
  var geocoder = new google.maps.Geocoder();	
  var address = tabs.getForm().findField("Specific_Location").getValue();//'Washington, DC'; 
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
	  var lat = results[0].geometry.location.lat();
	  alert(lat);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function editEntryFunction() {
	sp = grid.getSelectionModel().getSelected().data.Specific_Location;
	pr = grid.getSelectionModel().getSelected().data.Project_Funding_Source;
	co = grid.getSelectionModel().getSelected().data.Country;
	prt = grid.getSelectionModel().getSelected().data.Project_Title;
	prn = grid.getSelectionModel().getSelected().data.Project_Number;
	li = grid.getSelectionModel().getSelected().data.Link_To_Project;
	bt = grid.getSelectionModel().getSelected().data.Business_URL;
	se = grid.getSelectionModel().getSelected().data.Sector;
	ke = grid.getSelectionModel().getSelected().data.Keyword;
	prs = grid.getSelectionModel().getSelected().data.Project_Size;
	pra = grid.getSelectionModel().getSelected().data.Project_Announced;
	br = grid.getSelectionModel().getSelected().data.Borrowing_Entity;
	im = grid.getSelectionModel().getSelected().data.Implementing_Entity;
	ime = grid.getSelectionModel().getSelected().data.Project_POCs;
	prd = grid.getSelectionModel().getSelected().data.Project_Description;
	pos = grid.getSelectionModel().getSelected().data.Post_Comments;
	su = grid.getSelectionModel().getSelected().data.Submitting_Officer;
	subo = grid.getSelectionModel().getSelected().data.Submitting_Officer_Contact;
	sou = grid.getSelectionModel().getSelected().data.Source;
	fid = grid.getSelectionModel().getSelected().data.fid;
	ten = grid.getSelectionModel().getSelected().data.Tender_Date;
	sta = grid.getSelectionModel().getSelected().data.Status;
	
	tabs.getForm().findField("Specific_Location").setValue(sp);
	tabs.getForm().findField("Project_Funding_Source").setValue(pr);
	tabs.getForm().findField("Country").setValue(co);
	tabs.getForm().findField("Project_Title").setValue(prt);
	tabs.getForm().findField("Project_Number").setValue(prn);
	tabs.getForm().findField("Link_To_Project").setValue(li);
	tabs.getForm().findField("Business_URL").setValue(bt);
	tabs.getForm().findField("Sector").setValue(se);
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
	tabs.getForm().findField("Status").setValue(sta);
	
	//Uncheck Archive checkbox
	tabs.getForm().findField("chArc").setValue(false);

	//Check the Archive checkbox for that record
	if (se.indexOf("Archived") != -1) {
		tabs.getForm().findField("chArc").setValue(true);
	}

	win.myExtraParams.e = true;

	if (win.myExtraParams.e == true) {
		Ext.getCmp('btnEdit').enable();
		Ext.getCmp('btnEdit').show();
		Ext.getCmp('btnClone').enable();
		Ext.getCmp('btnClone').show();
		Ext.getCmp('btnCancel').enable();
		Ext.getCmp('btnCancel').show();
		Ext.getCmp('btnSave').hide();
		Ext.getCmp('btnReset').hide();
		Ext.getCmp('chArc').setDisabled(false);
		Ext.getCmp('chArc').checked=false;
		Ext.getCmp('chArc').show();
		Ext.getCmp('chMaj').setDisabled(false);
		Ext.getCmp('chMaj').checked=true;
		Ext.getCmp('chMaj').show();
	}

	win.show();
	
	ga('send', 'event', 'Grid_Panel', 'Edit_Grid_Panel', {'nonInteraction': 1});
}

required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
funding = [['Development Banks'], ['Government'], ['Private'], ['Self Financed'], ['Other']]
sources = [['African Development Bank'], ['Asian Development Bank'], ['European Bank for Reconstruction and Development'], ['Inter-American Development Bank'], ['Post Identified Project'], ['Washington Identified Project'], ['World Bank']]
regions = [['Africa'], ['East Asia and the Pacific'], ['Europe'], ['Middle East and North Africa'], ['South and Central Asia'], ['Western Hemisphere']]
stat = [['In Procurement'], ['Pipeline'], ['Fulfilled']]
arch = [['Active'], ['Archived']]
sizes = [['0-25M'], ['25-50M'], ['50-100M'], ['>100M'], ['Unpublished']]
sec = [['Administrative and Support and Waste Management and Remediation Services'],['Agriculture, Forestry, Fishing and Hunting'],['Construction'],['Educational Services'],['Finance and Insurance'],['Health Care and Social Assistance'],['Information'],['Manufacturing'],['Mining, Quarrying, and Oil and Gas Extraction'],['Professional, Scientific, and Technical Services'],['Public Administration'],['Transportation and Warehousing'],['Utilities']]

// Add a lead Form / Edit a lead Form
tabs = new Ext.FormPanel({
	layout : 'form',
	labelWidth : 80,
	border : false,
	width : 340,
//	height : 1375,
//	height : 1020,
	url : 'servlet/LeadAdder',
	//autoScroll : true,
	monitorValid : true,
	listeners: {
		clientvalidation : function(form, valid) {
			Ext.getCmp('btnSave').setDisabled(!valid);
			Ext.getCmp('btnEdit').setDisabled(!valid);
			Ext.getCmp('btnClone').setDisabled(!valid);
		}
	},
	items : [{
		xtype : 'hidden',
		name : 'Archived'
		//value : '0'
	},{
		xtype : 'hidden',
		name : 'Cleared'
		//value : '0'
	}, {
		xtype : 'hidden',
		name : 'fid',
		value : '0'
	}, {
		name : 'Project_Title',
		emptyText : 'Project Title',
		xtype : 'textfield',
		width : 275,
		allowBlank: false,
		blankText: 'a Project Title is required.',
		emptyClass: 'reqField'
	}, {
		name : 'Country',
		xtype : 'textfield',
		emptyText : 'Country',
		width : 275,
		allowBlank: false,
		blankText: 'a Country is required.',
		emptyClass: 'reqField'
	}, {
		name : 'Specific_Location',
		xtype : 'textfield',
		emptyText : 'City, Province, or Region',
		width : 275,
		emptyClass: 'reqField'
	}, new Ext.form.ComboBox({
		store : new Ext.data.ArrayStore({
			fields : ['Sector'],
			data : sec
		}),
		name : 'Sector',
		displayField : 'Sector',
		emptyText : 'Primary Sector',
		typeAhead : true,
		editable : false,
		mode : 'local',
		forceSelection : true,
		triggerAction : 'all',
		selectOnFocus : true,
		width : 275,
		height : 140,
		allowBlank: false,
		blankText: 'a Primary Sector is required.',
		emptyClass: 'reqField'
	}), {
		name : 'Project_Size',
		emptyText : 'Estimated Project Value (in US$)',
		xtype : 'numberfield',
		maxValue : 999999999999,
		// Suggest changing minValue to 1000. Logic being our FSOs should be able to ballpark a value, and 1000 is high enough to prevent "2.5" being entered instead of "2,500,000".
		minValue : 1000,
		autoStripChars: true,
		width : 275,
		allowBlank: false,
		blankText: 'a Project Value is required.',
		emptyClass: 'reqField'
	}, new Ext.form.ComboBox({
		store : new Ext.data.ArrayStore({
			fields : ['Status'],
			data : stat
		}),
		name : 'Status',
		displayField : 'Status',
		emptyText : 'Status',
		typeAhead : true,
		editable : false,
		mode : 'local',
		forceSelection : true,
		triggerAction : 'all',
		selectOnFocus : true,
		width : 275,
		height : 140,
		allowBlank: false,
		blankText: 'a Status is required.',
		emptyClass: 'reqField'
	}), {
		name : 'Project_Number',
		emptyText : 'Project Number',
		xtype : 'textfield',
		width : 275
	}, new Ext.form.ComboBox({
		store : new Ext.data.ArrayStore({
			fields : ['Project_Funding_Source'],
			data : funding
		}),
		name : 'Project_Funding_Source',
		displayField : 'Project_Funding_Source',
		emptyText : 'Primary Funding Source',
		typeAhead : true,
		editable : false,
		mode : 'local',
		forceSelection : true,
		triggerAction : 'all',
		selectOnFocus : true,
		width : 275,
		height : 140,
		allowBlank: false,
		blankText: 'a Primary Funding Source is required.',
		emptyClass: 'reqField'
	}), new Ext.form.ComboBox({
		store : new Ext.data.ArrayStore({
			fields : ['Source'],
			data : sources
		}),
		name : 'Source',
		displayField : 'Source',
		emptyText : 'Information Source',
		typeAhead : true,
		editable : false,
		mode : 'local',
		forceSelection : true,
		triggerAction : 'all',
		selectOnFocus : true,
		width : 275,
		height : 140,
		allowBlank: false,
		blankText: 'an Information Source is required.',
		emptyClass: 'reqField'
	}), {
		name : 'Project_Description',
		emptyText : 'Project Description & Bidding Requirements',
		xtype : 'textarea',
		width : 275,
		height : 140,
		allowBlank: false,
		blankText: 'a Project Description is required.',
		emptyClass: 'reqField'
	}, {
		name : 'Keyword',
		emptyText : 'Keywords',
		xtype : 'textfield',
		width : 275,
		allowBlank: false,
		blankText: 'Keywords are required.',
		emptyClass: 'reqField'
	}, new Ext.form.DateField({
		emptyText : 'Project Announced  (mm/dd/yyyy)',
		name : 'Project_Announced',
		width : 275
	}), new Ext.form.DateField({
		name : 'Tender_Date',
		emptyText : 'Expected Tender Date (mm/dd/yyyy)',
		width : 275
	}), {
		name : 'Borrowing_Entity',
		emptyText : 'Borrowing Entity',
		xtype : 'textfield',
		width : 275
	}, {
		name : 'Implementing_Entity',
		emptyText : 'Implementing Entity',
		xtype : 'textfield',
		width : 275,
		allowBlank: false,
		blankText: 'an Implementing Entity is required.',
		emptyClass: 'reqField'
	}, {
		name : 'Link_To_Project',
		emptyText : 'Project Website (http://www.example.gov/)',
		xtype : 'textfield',
		vtype : 'url',
		width : 275
	}, {
		name : 'Business_URL',
		emptyText : 'Post Business Tab (http://www.example.gov/business/)',
		xtype : 'textfield',
		vtype : 'url',
		width : 275
	}, {
		name : 'Submitting_Officer',
		emptyText : 'USG Submitting Officer',
		xtype : 'textfield',
		width : 275,
		allowBlank: false,
		blankText: 'a USG Submitting Officer is required.',
		emptyClass: 'reqField'
	}, {
		name : 'Submitting_Officer_Contact',
		emptyText : 'USG Submitting Officer Email',
		xtype : 'textfield',
		vtype : 'email',
		width : 275,
		allowBlank: false,
		blankText: 'a USG Submitting Officer Email is required.',
		emptyClass: 'reqField'
	}, {
		name : 'Submitting_Officer_Contact2',
		emptyText : 'Please reenter your email for validation.',
		xtype : 'textfield',
		vtype : 'email',
		width : 275,
		allowBlank: false,
		blankText: 'Please reenter your email for validation.',
		emptyClass: 'reqField'
	}, {
		xtype : 'textarea',
		name : 'Project_POCs',
		emptyText : 'Implementing Entity POCs & Contact Info',
		xtype : 'textfield',
		width : 275,
		height : 80
	}, {
		xtype : 'textarea',
		name : 'Post_Comments',
		emptyText : 'Post Comments',
		xtype : 'textfield',
		width : 275,
		height : 80
	}, {
		xtype : 'checkbox',
		boxLabel : 'This is a major edit',
		name : 'chMaj',
		id : 'chMaj',
		autoScroll : false
	}, {
		xtype : 'checkbox',
		boxLabel : 'Archive this lead',
		name : 'chArc',
		id : 'chArc',
		autoScroll : false
	}, {
		html: '<div style="margin-left: 10px; margin-right: 10px;"><h6>All <font class="reqField">required</font> fields must be input before you can save.<br>Information must be unclassified.</h6></div>'
	}],
	buttons : [{
		text : 'Save Edits',
		id : 'btnEdit',
		handler : function() {
			if (tabs.getForm().findField("Submitting_Officer_Contact").getValue().toLowerCase() == tabs.getForm().findField("Submitting_Officer_Contact2").getValue().toLowerCase()) {
				var emailDomain = (/[^@]*$/.exec(tabs.getForm().findField("Submitting_Officer_Contact").getValue().toLowerCase())[0]);
				if (emailDomain == 'state.gov') {
					geo('edit','edit');
				} else if (emailDomain == 'commerce.gov') {
					geo('edit','edit');
				} else {
					Ext.Msg.alert('Invalid email address','BIDS only accepts submissions from users with a state.gov or commerce.gov email address.');
				}
			}
			else {
				Ext.Msg.alert('Email address not verified','Please reenter your email address.');
			}
		}
	}, {
		text : 'Save as New Lead',
		id : 'btnClone',
		handler : function() {
			if (tabs.getForm().findField("Submitting_Officer_Contact").getValue().toLowerCase() == tabs.getForm().findField("Submitting_Officer_Contact2").getValue().toLowerCase()) {
				var emailDomain = (/[^@]*$/.exec(tabs.getForm().findField("Submitting_Officer_Contact").getValue().toLowerCase())[0]);
				if (emailDomain == 'state.gov') {
					geo('clone','insert');
				} else if (emailDomain == 'commerce.gov') {
					geo('clone','insert');
				} else {
					Ext.Msg.alert('Invalid email address','BIDS only accepts submissions from users with a state.gov or commerce.gov email address.');
				}
			}
			else {
				Ext.Msg.alert('Email address not verified','Please reenter your email address.');
			}
		}
	}, {
		text : 'Save',
		id : 'btnSave',
		handler : function() {
			if (tabs.getForm().findField("Submitting_Officer_Contact").getValue().toLowerCase() == tabs.getForm().findField("Submitting_Officer_Contact2").getValue().toLowerCase()) {
				var emailDomain = (/[^@]*$/.exec(tabs.getForm().findField("Submitting_Officer_Contact").getValue().toLowerCase())[0]);
				if (emailDomain == 'state.gov') {
					geo('save','insert');
				} else if (emailDomain == 'commerce.gov') {
					geo('save','insert');
				} else {
					Ext.Msg.alert('Invalid email address','BIDS only accepts submissions from users with a state.gov or commerce.gov email address.');
				}
			}
			else {
				Ext.Msg.alert('Email address not verified','Please reenter your email address.');
			}
		}
	}, {
		text : 'Cancel',
		id : 'btnCancel',
		handler : function() {
			tabs.getForm().reset();
			win.hide();
			
			ga('send', 'event', 'Add_Lead', 'Cancel_Lead_Details', {'nonInteraction': 1});
		}
	}, {
		text : 'Reset',
		id : 'btnReset',
		handler : function() {
			tabs.getForm().reset();
			
			ga('send', 'event', 'Add_Lead', 'Reset_Lead_Details', {'nonInteraction': 1});
		}
	}]
});

function geo(type,eType) 
{
	var lon='0';
	var geocoder = new google.maps.Geocoder();
	var address;
	var components;
	
	if (type=='edit') {
	
		if (tabs.getForm().findField("chArc").getValue() == true) {
			tabs.getForm().findField('Archived').setValue('1');
		}
		else {
			tabs.getForm().findField('Archived').setValue('0');
		}	
		if (tabs.getForm().findField("chMaj").getValue() == true) {
 			tabs.getForm().findField('Cleared').setValue('0');
 		} else {
 			var cleared = grid.getSelectionModel().getSelected().data.Cleared;
 				if (cleared == '0') {
 				tabs.getForm().findField('Cleared').setValue('0');
 			} else {
 				tabs.getForm().findField('Cleared').setValue('1');
 			}
 		}
		//tabs.getForm().findField('Cleared').setValue('1');
	}
	
	if (type=='clone') {
	
		if (tabs.getForm().findField("chArc").getValue() == true) {
			tabs.getForm().findField('Archived').setValue('1');
		}
		else {
			tabs.getForm().findField('Archived').setValue('0');
		}	
		tabs.getForm().findField('Cleared').setValue('0');
	}

	if (tabs.getForm().findField("Specific_Location").getValue() != '') {
		address = tabs.getForm().findField("Specific_Location").getValue(); //'Washington, DC';
		components = tabs.getForm().findField("Country").getValue(); //'United States of America';
		
		geocoder.geocode({ 'address': address, 'componentRestrictions':{'country': components}}, function(results, status) {
			if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
				address = tabs.getForm().findField("Country").getValue(); //'Washington, DC';
		
				geocoder.geocode( { 'address': address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
						// On failure to Geocode, return is: ZERO_RESULTS
						Ext.Msg.alert('Geocoding Failed','Geocoding was not able to return any results.<br>Please enter the "Country" or "City, Province, or Region" information again.');
					
						ga('send', 'event', 'Add_Lead', 'Geocode_SpecLoc_Failure', {'nonInteraction': 1});
					}
					
					else {
		
						lat = results[0].geometry.location.lat().toString();
						lon = results[0].geometry.location.lng().toString();
						
						if(type=='save') {
						tabs.getForm().findField('Cleared').setValue('0');
						tabs.getForm().findField('Archived').setValue('0');
						}
						
						tabs.getForm().submit({
						
							submitEmptyText : false,
							params : {
								editType : eType,
								Lat: lat,
								Lon: lon
							},
							success : function(form, action) {
								
								win.hide();
								tabs.getForm().reset();
								store.load();
								grid.getView().refresh();
								sd.refresh({
									force : true
								});
							},
							failure : function(form, action) {
								//Ext.Msg.alert('Warning', 'Error');
								win.hide();
								tabs.getForm().reset();
								store.load();
								grid.getView().refresh();
								sd.refresh({
									force : true
								});
								
							}
						});
			
						Ext.Msg.alert('Submission Successful', 'Thanks for submiting your information; we will review it and it should be posted within two business days.');
						
						if(type=='save'){
						ga('send', 'event', 'Add_Lead', 'Save_Lead_Details', {'nonInteraction': 1});
						}
						else if(type=='clone'){
						ga('send', 'event', 'Add_Lead', 'Clone_Lead_Details', {'nonInteraction': 1});
						}
						else{
						ga('send', 'event', 'Add_Lead', 'Edit_Lead_Details', {'nonInteraction': 1});
						}
					} 
				});
			}
			else {

				lat = results[0].geometry.location.lat().toString();
				lon = results[0].geometry.location.lng().toString();
				
				if(type=='save'){
				tabs.getForm().findField('Cleared').setValue('0');
				tabs.getForm().findField('Archived').setValue('0');
				}
				
				tabs.getForm().submit({
				
					submitEmptyText : false,
					params : {
						editType : eType,
						Lat: lat,
						Lon: lon
					},
					success : function(form, action) {
						win.hide();
						tabs.getForm().reset();
						store.load();
						grid.getView().refresh();
						sd.refresh({
							force : true
						});
					},
					failure : function(form, action) {
						win.hide();
						tabs.getForm().reset();
						store.load();
						grid.getView().refresh();
						sd.refresh({
							force : true
						});
					}
				});
			
				Ext.Msg.alert('Submission Successful', 'Thanks for submiting your information; we will review it and it should be posted within two business days.');
				
				if(type=='save') {
				ga('send', 'event', 'Add_Lead', 'Save_Lead_Details', {'nonInteraction': 1});
				}
				else if(type=='clone') {
				ga('send', 'event', 'Add_Lead', 'Clone_Lead_Details', {'nonInteraction': 1});
				}
				else{
				ga('send', 'event', 'Add_Lead', 'Edit_Lead_Details', {'nonInteraction': 1});
				}
			} 
		});		
	}
	else {
		address = tabs.getForm().findField("Country").getValue(); //'Washington, DC';
		
		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
				
				Ext.Msg.alert('Geocoding Failed','Geocoding was not able to return any results.<br>Please enter the "Country" or "City, Province, or Region" information again.');
			
				ga('send', 'event', 'Add_Lead', 'Geocode_Country_Failure', {'nonInteraction': 1});
			}
			else {

				lat = results[0].geometry.location.lat().toString();
				lon = results[0].geometry.location.lng().toString();
				
				if(type=='save') {
				tabs.getForm().findField('Cleared').setValue('0');
				tabs.getForm().findField('Archived').setValue('0');
				}

				tabs.getForm().submit({
					submitEmptyText : false,
					params : {
						editType : eType,
						Lat: lat,
						Lon: lon
					},
					success : function(form, action) {
						win.hide();
						tabs.getForm().reset();
						store.load();
						grid.getView().refresh();
						sd.refresh({
							force : true
						});
					},
					failure : function(form, action) {
						win.hide();
						tabs.getForm().reset();
						store.load();
						grid.getView().refresh();
						sd.refresh({
							force : true
						});
					}
				});
				
				if(type=='save') {
				ga('send', 'event', 'Add_Lead', 'Save_Lead_Details', {'nonInteraction': 1});
				Ext.Msg.alert('Submission Successful', 'Thanks for submiting your information; we will review it and it should be posted within two business days.');
				}
				else if(type=='clone') {
				ga('send', 'event', 'Add_Lead', 'Clone_Lead_Details', {'nonInteraction': 1});
				Ext.Msg.alert('Submission Successful', 'Thanks for submiting your information; we will review it and it should be posted within two business days.');
				}
				else {
				Ext.Msg.alert('Submission Successful', 'Thanks for revising your information! If this was a major edit, we will review it and it should be posted within two business days. Otherwise, the edits will appear immediately.');
				ga('send', 'event', 'Add_Lead', 'Edit_Lead_Details', {'nonInteraction': 1});
				}
			} 
		});
	}
}

win = new Ext.Window({
	id : 'formanchor-win',
	//autoHeight : true,
	width : 380,
	height : 460,
	autoScroll : true,
	plain : true,
	title : 'Lead Information',
	border : false,
	closeAction : 'hide',
	resizable : false,
	resizeHandles : false,
	items : tabs
});

win.myExtraParams = {
	e : false
};

function myCallbackFunction() {
	win.myExtraParams.e = false;

	if (win.myExtraParams.e == false) {
		Ext.getCmp('btnEdit').hide();
		Ext.getCmp('btnClone').hide();
		Ext.getCmp('btnCancel').hide();
		Ext.getCmp('btnSave').enable();
		Ext.getCmp('btnSave').show();
		Ext.getCmp('btnReset').enable();
		Ext.getCmp('btnReset').show();
		Ext.getCmp('chArc').setDisabled(true);
		Ext.getCmp('chArc').checked=false;
		Ext.getCmp('chArc').hide();
		Ext.getCmp('chMaj').setDisabled(true);
		Ext.getCmp('chMaj').checked=false;
		Ext.getCmp('chMaj').hide();
	}
	
	tabs.getForm().reset();
	win.show();
	
	ga('send', 'event', 'Clearance_Popup', 'Add_Clearance_Popup', {'nonInteraction': 1});
}