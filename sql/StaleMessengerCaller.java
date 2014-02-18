import java.net.*;
import java.io.*;

public class StaleMessengerCaller{

	public static void main(String[] args){

		String[] times = new String[]{"90","140","150","151"};
	
		for(int i=0;i<times.length;i++){
		
			String time=times[i];
			try {
				URL myURL = new URL("http://localhost/bids/servlet/StaleMessenger?time="+time);
				URLConnection myURLConnection = myURL.openConnection();
				myURLConnection.connect();
				BufferedReader br = new BufferedReader(
								   new InputStreamReader(myURLConnection.getInputStream()));

				String inputLine;
				while ((inputLine = br.readLine()) != null) {
						System.out.println(inputLine);
				}
				br.close();

				System.out.println("Done");
			} 
			catch (MalformedURLException e) { 
				System.out.println(e.getMessage());
			} 
			catch (IOException e) {  
			System.out.println(e.getMessage());		
				// openConnection() failed
				// ...
			}
		}

	}
}