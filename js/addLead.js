function myCallbackFunction() {
		
		win.myExtraParams.e = false;

		if (win.myExtraParams.e == false) {
			Ext.getCmp('btnEdit').disable();
			Ext.getCmp('btnSave').enable();
			Ext.getCmp('btnReset').enable();
			Ext.getCmp('btnArchive').disable();
			Ext.getCmp('chMaj').setDisabled(true);
			Ext.getCmp('chMaj').checked=false;
		}
		tabs.getForm().reset();
		win.show();
		
		ga('send', 'event', 'Clearance_Popup', 'Add_Clearance_Popup', {'nonInteraction': 1});
	}