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
	alert("Adding leads is only available for State Department employees - which could be you! Go to www.usajobs.gov! Be one of us!");
}

function checkEditTest() {
	if (check === undefined)
		{
			noEdit();
		}
	else
		{
			yesEdit();
		}
}
	
function noEdit() {
	alert("Editing leads is only available for State Department employees - which could be you! Go to www.usajobs.gov! Be one of us!");
}