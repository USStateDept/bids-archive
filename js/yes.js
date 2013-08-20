check = 0;

function yes() {
	function myFunction() {
		var x;
		var r=confirm("By clicking okay, you agree that any trade lead added to this system will be <b>unclassified</b>, no clearances will be necessary to view the information you add, and that you understand the rules and regulations regarding this site. All information you add will become publically available.<br><br>If you have any questions, please refer to our <a href='/faqs.html'/ target='/_blank'/>Frequently Asked Questions</a> and <a href='/help.html'/ target='/_blank'/>Help</a> pages.");
		if (r==true)
		{
			myCallbackFunction();
		}
	}
}
