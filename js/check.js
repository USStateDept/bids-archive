function checkTest() {
	if (check === undefined)
		{
			no();
		}
	else
		{
			yes();
		}
}
	
function no() {
	Ext.Msg.alert('Access Denied','Adding leads is only available for US government employees working at the State Department and/or who have access to an OpenNet computer.');
}

function checkTestEditMap() {
	if (check === undefined)
		{
			noEditMap();
		}
	else
		{
			yesEditMap();
		}
}
	
function yesEditMap() {
	Ext.Msg.alert('Edit a Lead', 'To edit a lead, first select a lead from the list below. Then, click the "Edit Entry" button.');
}

function noEditMap() {
	Ext.Msg.alert('Access Denied','Editing leads is only available for US government employees working at the State Department and/or who have access to an OpenNet computer.');
}

function checkTestEditGrid() {
	if (check === undefined)
		{
			noEditGrid();
		}
	else
		{
			yesEdit();
		}
}
	
function noEditGrid() {
	Ext.Msg.alert('Access Denied','Editing leads is only available for US government employees working at the State Department and/or who have access to an OpenNet computer.');
}