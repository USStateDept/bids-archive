import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.*;
import java.net.*;
import java.util.Properties;
import java.text.SimpleDateFormat;

public class StaleMessenger extends HttpServlet {

ArrayList<String> mailList = new ArrayList<String>();

public static class ShellOut {

		public void shell(String to,String sub, String text) {  
			try {  

				String command = "cmd /c cd C:\\SendMail && set CLASSPATH=%CLASSPATH%;C:\\OpenGeo\\webapps\\bids\\WEB-INF\\lib\\javax.mail.jar;. && java SendMail " + to + " \"" + sub + "\" \"" + text + "\"";
				Process p = Runtime.getRuntime().exec(command); 

				BufferedReader in = new BufferedReader(  
						new InputStreamReader(p.getInputStream()));  
				String line = null;  
				while ((line = in.readLine()) != null) {  
					System.out.println(line);  
				}  
			} catch (IOException e) {  
				e.printStackTrace();  
			}  
		} 
	}

public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
			
			doPost(req,res);
	}
	
	public void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
			
			Connection con = null;
			Statement stmt = null;
			ResultSet rs = null;
			res.setContentType("text/html");
			PrintWriter out = res.getWriter();
			
			String m2to="";
	
			Properties prop = new Properties();
	
			try{
				String propertiesFilePath = getServletContext().getRealPath("WEB-INF/config.properties");
				
				prop.load(new FileInputStream(propertiesFilePath));
				m2to = prop.getProperty("m2to");
			} catch (IOException ex) {
					ex.printStackTrace();
			}
			
			
			try {

			Class.forName("org.postgresql.Driver");

			con = DriverManager.getConnection(
					"jdbc:postgresql://localhost:54321/geoserver", "postgres",
					"postgres");
			stmt = con.createStatement();
			String strTime = req.getParameter("time");
			out.println(strTime);
			int time = Integer.parseInt(strTime);
			
				String sel="";
				
			
				
				if(time==90){
					sel = "select fid, \"Submitting_Officer_Contact\",\"Project_Title\" from Opengeo.\"BIDS_Status_Email_List\" where \"contact_status\" = 90";
				}else if(time==140){
					sel = "select fid, \"Submitting_Officer_Contact\",\"Project_Title\" from Opengeo.\"BIDS_Status_Email_List\" where \"contact_status\" = 140";
				}else if(time==150){
					sel = "select fid, \"Submitting_Officer_Contact\",\"Project_Title\" from Opengeo.\"BIDS_Status_Email_List\" where \"contact_status\" = 150";
				}else if(time==151){
					sel = "select fid, \"Submitting_Officer_Contact\",\"Project_Title\" from Opengeo.\"BIDS_Status_Email_List\" where \"contact_status\" = 151";
				}
				
				rs = stmt.executeQuery(sel);
				String mid,bid;
				while (rs.next()) {
				//String country = rs.getString("Country");
				String title = rs.getString("Project_Title");
				String email = rs.getString("Submitting_Officer_Contact");
					if(email == null || email.isEmpty())
						email=m2to;
				String strFid = rs.getString("fid");
				int fid = Integer.parseInt(strFid);
				
				send(fid,email,m2to,title,time);
				out.println(title +  " " + email + " sent</br>");
				}
			
			} catch (ClassNotFoundException e) {
			out.println("Couldn't load database driver: " + e.getMessage());
			
		} catch (SQLException e) {
			out.println ("SQLException caught: " + e.getMessage());
			
		} finally {
			
			try {
				if (con != null)
					con.close();
			} catch (SQLException ignored) {
			}
		}
			
	}
	
	public void send(int fid, String email, String m2to,String title,int time)
	{
	
	String message="";
	String subject="";
	
	
	
	if(time==90){
		message="Click <a href=\"http://localhost/bids/servlet/Archive?fid="+fid+"\">Archive</a> or edit your lead on the <a href=\"http://bids.state.gov\">BIDS Website</a>, or your Lead - " + title + " - will auto-archive in 90 days.";
	
		subject="90 Day Lead Archival";
		
		StaleMessenger.ShellOut b = new StaleMessenger.ShellOut();
		b.shell(email,subject,message);
		
	}else if(time==140){
	
		message="Click <a href=\"http://localhost/bids/servlet/Archive?fid="+fid+"\">Archive</a> or edit your lead on the <a href=\"http://bids.state.gov\">BIDS Website</a>, or your Lead - " + title + " - will auto-archive in 10 days.";
	
		subject="10 Day Lead Archival";
		
		StaleMessenger.ShellOut b = new StaleMessenger.ShellOut();
		b.shell(email,subject,message);
		
		String message2 = "Lead  -" + title + "- will auto-archive in 10 days. You will receive an email in 10 days if FSO takes no action";
		
		StaleMessenger.ShellOut c = new StaleMessenger.ShellOut();
		c.shell(m2to,subject,message2);
		
	}else if(time==150){
		
		message="Lead -" + title + "- will auto-archive in 24 hours. Click to edit the lead on the <a href=\"http://bids.state.gov\">BIDS Website</a>";
	
		subject="24 Hour Lead Archival";
		
		StaleMessenger.ShellOut b = new StaleMessenger.ShellOut();
		b.shell(m2to,subject,message);
		
	}else if(time==151){
	
		message="This lead has been auto-archived. Click to <a href=\"http://localhost/bids/servlet/Reopen?fid="+fid+"\">Reopen</a>";
		
		subject="Lead Archival";
		
		StaleMessenger.ShellOut b = new StaleMessenger.ShellOut();
		b.shell(email,subject,message);
		
		StaleMessenger.ShellOut c = new StaleMessenger.ShellOut();
		c.shell(m2to,subject,message);
	}
	
	}

}