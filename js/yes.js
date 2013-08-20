check = 0;

function yes() {
	Ext.Msg.show({
					title : 'Add Your Lead',
					msg : 'By clicking okay, you agree that any trade lead added to this system will be <b>unclassified</b>, no clearances will be necessary to view the information you add, and that you understand the rules and regulations regarding this site. All information you add will become publically available.<br><br>If you have any questions, please refer to our <a href="faqs.html" target="_blank">Frequently Asked Questions</a> and <a href="help.html" target="_blank">Help</a> pages.',
					width : 300,
					buttons : Ext.MessageBox.OK
					//fn : checkTest
				})
				ga('send', 'event', 'Search_Panel', 'Add_Search_Panel', {'nonInteraction': 1});
				myCallbackFunction;
}