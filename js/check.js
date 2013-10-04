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
	Ext.Msg.alert('Access Denied','Adding leads is only available for State Department employees - which could be you! Go to www.usajobs.gov! Be one of us!<br><br>If you are a State Department employee and are currently using an OpenNet computer, please try again.');
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
	Ext.Msg.alert('Access Denied','Editing leads is only available for State Department employees - which could be you! Go to www.usajobs.gov! Be one of us!<br><br>If you are a State Department employee and are currently using an OpenNet computer, please try again.');
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
	Ext.Msg.alert('Access Denied','Editing leads is only available for State Department employees - which could be you! Go to www.usajobs.gov! Be one of us!<br><br>If you are a State Department employee and are currently using an OpenNet computer, please try again.');
}