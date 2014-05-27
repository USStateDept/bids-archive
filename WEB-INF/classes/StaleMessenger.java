
import java.io.*;
import java.sql.*;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.servlet.*;
import javax.servlet.http.*;

import java.util.*;
import java.net.*;
import java.util.Properties;
import java.text.SimpleDateFormat;

/**
 * Servlet implementation class StaleMessenger
 */
public class StaleMessenger extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static SendEmail sendEmail = new SendEmail();

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public StaleMessenger() {
		super();
		// TODO Auto-generated constructor stub
	}

	Hashtable<String, String> myList = new Hashtable<String, String>();

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();

		String message2to = "";

		Properties prop = new Properties();

		try {
			String propertiesFilePath = getServletContext().getRealPath("WEB-INF/config.properties");
			
			prop.load(new FileInputStream(propertiesFilePath));
			message2to = prop.getProperty("message2to");
		} catch (IOException ex) {
			ex.printStackTrace();
		}

		try {

			Class.forName("org.postgresql.Driver");

			con = DriverManager.getConnection(
					"jdbc:postgresql://localhost:54321/geoserver", "postgres",
					"postgres");
			stmt = con.createStatement();
			String strTime = request.getParameter("time");
			out.println(strTime);
			int time = Integer.parseInt(strTime);

			String sel = "";

			if (time == 90) {
				sel = "select * from Opengeo.\"BIDS_Status_Email_List\" where \"contact_status\" = 90";
			} else if (time == 140) {
				sel = "select * from Opengeo.\"BIDS_Status_Email_List\" where \"contact_status\" = 140";
			} else if (time == 150) {
				sel = "select * from Opengeo.\"BIDS_Status_Email_List\" where \"contact_status\" = 150";
			} else if (time == 151) {
				sel = "select * from Opengeo.\"BIDS_Status_Email_List\" where \"contact_status\" = 151";
			}

			rs = stmt.executeQuery(sel);
			String mid, bid;
			while (rs.next()) {

				myList.clear();
				
				
				String prTitle = (rs.getString("Project_Title")==null)?"":rs.getString("project_title");
				String specLoc = (rs.getString("specific_location")==null)?"":rs.getString("specific_location");
				String status = (rs.getString("status")==null)?"":rs.getString("status");
				String country = (rs.getString("country")==null)?"":rs.getString("country");
				String lat = (rs.getString("lat")==null)?"":rs.getString("lat");
				String lon = (rs.getString("lon")==null)?"":rs.getString("lon");
				String sector = (rs.getString("sector")==null)?"":rs.getString("sector");
				String prSize = (rs.getString("project_size")==null)?"":rs.getString("project_size");
				String prNum = (rs.getString("project_number")==null)?"":rs.getString("project_number");
				String prFun = (rs.getString("project_funding_source")==null)?"":rs.getString("project_funding_source");
				String source = (rs.getString("source")==null)?"":rs.getString("source");
				String prDesc = (rs.getString("project_description")==null)?"":rs.getString("project_description");
				String keyw = (rs.getString("keyword")==null)?"":rs.getString("keyword");
				String prAnnou = (rs.getString("project_announced")==null)?"":rs.getString("project_announced");
				String tenDate = (rs.getString("tender_date")==null)?"":rs.getString("tender_date");
				String borrEnt = (rs.getString("borrowing_entity")==null)?"":rs.getString("borrowing_entity");
				String impEnt = (rs.getString("implementing_entity")==null)?"":rs.getString("implementing_entity");
				String linkPr = (rs.getString("link_to_project")==null)?"":rs.getString("link_to_project");
				String bussURL = (rs.getString("business_url")==null)?"":rs.getString("business_url");
				String subOff = (rs.getString("submitting_officer")==null)?"":rs.getString("submitting_officer");
				String subOffC = (rs.getString("submitting_officer_contact")==null)?"":rs.getString("submitting_officer_contact");
				
				String projPOC = (rs.getString("project_pocs")==null)?"":rs.getString("project_pocs");
				String pComm = (rs.getString("post_comments")==null)?"":rs.getString("post_comments");
				
				myList.put("Project_Title", prTitle);
				myList.put("Specific_Location",specLoc);
				myList.put("Country", country);
				myList.put("Lat", lat);
				myList.put("Lon", lon);
				myList.put("Sector", sector);
				myList.put("Project_Size", prSize);
				myList.put("Status", status);
				myList.put("Project_Number", prNum);
				myList.put("Project_Funding_Source",prFun);
				myList.put("Source", source);
				myList.put("Project_Description",prDesc);
				myList.put("Keyword", keyw);
				myList.put("Project_Announced",prAnnou);
				myList.put("Tender_Date", tenDate);
				myList.put("Borrowing_Entity", borrEnt);
				myList.put("Implementing_Entity",impEnt);
				myList.put("Link_To_Project", linkPr);
				myList.put("Business_URL", bussURL);
				myList.put("Submitting_Officer",subOff);
				myList.put("Submitting_Officer_Contact",subOffC);
				myList.put("Project_POCs", projPOC);
				myList.put("Post_Comments", pComm);

				Set<String> keys = myList.keySet();

				for (String key : keys) {
					String val = myList.get(key);
					val = val.replace("'", "&#39;");
					val = val.replace("\"", "&#34;");
					val = val.replace("\\", "&#92;");
					myList.put(key, val);
				}

				// String country = rs.getString("Country");
				String title = rs.getString("Project_Title");
				String email = rs.getString("Submitting_Officer_Contact");
				if (email == null || email.isEmpty())
					email = message2to;
				else
				{
				email=email.trim();
				}
				String strFid = rs.getString("fid");
				int fid = Integer.parseInt(strFid);

				send(fid, email, message2to, title, time);
				out.println(title + " " + email + " sent</br>");
			}

		} catch (ClassNotFoundException e) {
			out.println("Couldn't load database driver: " + e.getMessage());

		} catch (SQLException e) {
			out.println("SQLException caught: " + e.getMessage());

		} finally {

			try {
				if (con != null)
					con.close();
			} catch (SQLException ignored) {
			}
		}

	}

	public void send(int fid, String email, String message2to, String title,
			int time) {

		String message = "";
		String subject = "";
		String[] recipients = new String[1];
		
		String text="";
		
		String title2 = (String) myList.get("Project_Title");
		String spec = (String) myList.get("Specific_Location");
		String country = (String) myList.get("Country");
		String lat = (String) myList.get("Lat");
		String lon = (String) myList.get("Lon");
		String sector = (String) myList.get("Sector");
		String size = (String) myList.get("Project_Size");
		String status = (String) myList.get("Status");
		String number = (String) myList.get("Project_Number");
		String fundSource = (String) myList.get("Project_Funding_Source");
		String source = (String) myList.get("Source");
		String descrip = (String) myList.get("Project_Description");
		String keywords = (String) myList.get("Keyword");
		String announDate = (String) myList.get("Project_Announced");
		String tenderDate = (String) myList.get("Tender_Date");
		String borrowEntity = (String) myList.get("Borrowing_Entity");
		String impleEntity = (String) myList.get("Implementing_Entity");
		String projLink = (String) myList.get("Link_To_Project");
		String busURL = (String) myList.get("Business_URL");
		String subOff = (String) myList.get("Submitting_Officer");
		String subOffEmail = (String) myList.get("Submitting_Officer_Contact");
		String pocs = (String) myList.get("Project_POCs");
		String comments = (String)myList.get("Post_Comments");

		text += "<br/>Project Title: <b>"
				+ title2
				+ "</b><br/>Sector: <b>"
				+ sector
				+ "</b><br/>Project Size: US$<b>"
				+ size
				+ "</b><br/>Status: <b>"
				+ status
				+ "</b><br/>Project Number: <b>"
				+ number
				+ "</b><br/>Funding Source: <b>"
				+ fundSource
				+ "</b><br/>Information Source: <b>"
				+ source
				+ "</b><br/>Project Description: <b>"
				+ descrip
				+ "</b><br/>Keywords: <b>"
				+ keywords
				+ "</b><br/>Announced Date: <b>"
				+ announDate
				+ "</b><br/>Tender Date: <b>"
				+ tenderDate
				+ "</b><br/>Borrowing Entity: <b>"
				+ borrowEntity
				+ "</b><br/>Implementing Entity: <b>"
				+ impleEntity
				+ "</b><br/>Project Website: <b>"
				+ projLink
				+ "</b><br/>Business Tab: <b>"
				+ busURL
				+ "</b><br/>Submitting Officer: <b>"
				+ subOff
				+ "</b><br/>Submitting Officer Email: <b>"
				+ subOffEmail
				+ "</b><br/>Project Point of Contacts: <b>"
				+ pocs
				+ "</b><br/>Post Comments: <b>"
				+ comments
				+ "</b><br/>Tracking ID: <b>"
				+ fid
				+ "</b><br/> <br/>Country: <b>"
				+ country + "</b><br/><br/>Geographic Location: <b>" + spec
				+ "</b><br/>";
		
		try {
			if (time == 90) {

				recipients[0] = email;
				
				
				message = "The following lead will auto archive, in 90 days. This means it will no longer appear on the BIDS map as an active lead. To prevent auto archiving, follow the link below to review and update the information on the website. When you click Save the auto-archive clock will be reset to another 90 days, at which point you'll receive this message again. If you take no action, you will receive another e-mail in 80 days confirming the auto archive. Please review the instructions in the Standard Operating Procedures (on the BIDS Help page) to retrieve and reactivate archived leads.";
				
				message += "<br>Click <a href=\"http://localhost/bids/servlet/Archive?fid="
						+ fid
						+ "\">Archive</a> or edit your lead on the <a href=\"http://bids.state.gov\">BIDS Website</a>";
				
				message+="<br>"+text;
				
				subject = "90 Day Lead Archival";

				sendEmail.SendingEmail(recipients, subject, message);

			} else if (time == 140) {

				recipients[0] = email;
				
				
				message = "The following lead will auto archive, in 10 days. This means it will no longer appear on the BIDS map as an active lead. To prevent auto archiving, follow the link below to review and update the information on the website. When you click Save the auto-archive clock will be reset to another 90 days, at which point you'll receive this message again. If you take no action, you will receive another e-mail in 9 days confirming the auto archive. Please review the instructions in the Standard Operating Procedures (on the BIDS Help page) to retrieve and reactivate archived leads.";
				
				message += "<br>Click <a href=\"http://localhost/bids/servlet/Archive?fid="
						+ fid
						+ "\">Archive</a> or edit your lead on the <a href=\"http://bids.state.gov\">BIDS Website</a>";
				
				message+="<br>"+text;

				subject = "10 Day Lead Archival";

				sendEmail.SendingEmail(recipients, subject, message);

				recipients[0] = message2to;
				

				String message2 = "Lead  -"
						+ title
						+ "- will auto-archive in 10 days. You will receive an email in 10 days if FSO takes no action";

				sendEmail.SendingEmail(recipients, subject, message2);

			} else if (time == 150) {

				message = "The following lead will auto archive, in 24 hours. This means it will no longer appear on the BIDS map as an active lead. To prevent auto archiving, follow the link below to review and update the information on the website. When you click Save the auto-archive clock will be reset to another 90 days, at which point you'll receive this message again. If you take no action, you will receive another e-mail in 1 day confirming the auto archive. Please review the instructions in the Standard Operating Procedures (on the BIDS Help page) to retrieve and reactivate archived leads.";
				
				message += "<br>Click <a href=\"http://localhost/bids/servlet/Archive?fid="
						+ fid
						+ "\">Archive</a> or edit your lead on the <a href=\"http://bids.state.gov\">BIDS Website</a>";
				
				message+="<br>"+text;
				subject = "24 Hour Lead Archival";

				recipients[0] = message2to;
				

				sendEmail.SendingEmail(recipients, subject, message);

			} else if (time == 151) {

				message = "This lead has been auto-archived. Click to <a href=\"http://localhost/bids/servlet/Reopen?fid="
						+ fid + "\">Reopen</a>";

				subject = "Lead Archival";

				recipients = new String[1];
				recipients[0] = email;
				

				sendEmail.SendingEmail(recipients, subject, message);

				recipients[0] = message2to;

				sendEmail.SendingEmail(recipients, subject, message);
			}
		} catch (AddressException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	// }

}
