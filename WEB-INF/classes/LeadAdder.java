import java.io.*;
import java.sql.*;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.*;
import java.net.*;
import java.util.Properties;
import java.text.SimpleDateFormat;

/**
 * Servlet implementation class Test
 */
public class LeadAdder extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static SendEmail sendEmail = new SendEmail();

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LeadAdder() {
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

		String names = "\"Timestamp\",\"Contact_Timestamp\",";
		String values = "\'NOW()\',\'NOW()\',";
		boolean isUpdate = false;

		Enumeration paramNames = request.getParameterNames();

		java.util.Date date = new java.util.Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm");

		String editType = request.getParameter("editType");
		String lat = request.getParameter("Lat");
		String lon = request.getParameter("Lon");
		String fid = request.getParameter("fid");
		String update = "";
		String popupUpdateAdd = "";
		String popupUpdateEdit = "";

		fid = fid.substring(fid.indexOf('.') + 1);

		if (editType.equals("edit")) {
			isUpdate = true;

			myList.clear();
			myList.put("Project_Title", request.getParameter("Project_Title"));
			myList.put("Specific_Location",
					request.getParameter("Specific_Location"));
			myList.put("Country", request.getParameter("Country"));
			myList.put("Lat", request.getParameter("Lat"));
			myList.put("Lon", request.getParameter("Lon"));
			myList.put("Sector", request.getParameter("Sector"));
			myList.put("Project_Size", request.getParameter("Project_Size"));
			myList.put("Status", request.getParameter("Status"));
			myList.put("Project_Number", request.getParameter("Project_Number"));
			myList.put("Project_Funding_Source",
					request.getParameter("Project_Funding_Source"));
			myList.put("Source", request.getParameter("Source"));
			myList.put("Project_Description",
					request.getParameter("Project_Description"));
			myList.put("Keyword", request.getParameter("Keyword"));
			myList.put("Project_Announced",
					request.getParameter("Project_Announced"));
			myList.put("Tender_Date", request.getParameter("Tender_Date"));
			myList.put("Borrowing_Entity",
					request.getParameter("Borrowing_Entity"));
			myList.put("Implementing_Entity",
					request.getParameter("Implementing_Entity"));
			myList.put("Link_To_Project",
					request.getParameter("Link_To_Project"));
			myList.put("Business_URL", request.getParameter("Business_URL"));
			myList.put("Submitting_Officer",
					request.getParameter("Submitting_Officer"));
			myList.put("Submitting_Officer_Contact",
					request.getParameter("Submitting_Officer_Contact"));
			myList.put("Submitting_Officer_Contact",
					request.getParameter("Submitting_Officer_Contact2"));
			myList.put("Project_POCs", request.getParameter("Project_POCs"));
			myList.put("Post_Comments", request.getParameter("Post_Comments"));

			Set<String> keys = myList.keySet();

			for (String key : keys) {
				String val = myList.get(key);
				val = val.replace("'", "&#39;");
				val = val.replace("\"", "&#34;");
				val = val.replace("\\", "&#92;");
				myList.put(key, val);
			}

			while (paramNames.hasMoreElements()) {
				String paramName = (String) paramNames.nextElement();
				String[] paramValues = request.getParameterValues(paramName);

				String paramValue = paramValues[0];

				paramValue = paramValue.replace("'", "''");
				paramValue = paramValue.replace('"', '\"');
				paramValue = paramValue.replace("\\", "\\\\");
				paramValue = paramValue.replace("\r", " ");
				paramValue = paramValue.replace("\n", " ");
				paramValue = paramValue.replace("\t", " ");
				paramValue = paramValue.replace("\f", " ");

				// myList.add(paramName + " : " + paramValue);

				if (paramName.equals("editType")) {
				} else if (paramName.equals("Clear")) {
				} else if (paramName.equals("fid")) {
				} else if (paramName.startsWith("ch")) {
				} else if (paramName.equals("Tender_Date")
						&& paramValue.equals("")) {
				} else if (paramName.equals("Project_Announced")
						&& paramValue.equals("")) {
				} else if (paramName.startsWith("Country")) {

					String wkt = Geocode(lat, lon);

					if (wkt.equals("0")) {
					} else {

						update += "\"" + paramName + "\"=\'" + paramValue
								+ "\',";
						update += "\"" + "the_geom" + "\"=" + wkt + ",";
					}
				} else if (paramName.equals("Submitting_Officer_Contact2")) {
				} else {
					update += "\"" + paramName + "\"=\'" + paramValue + "\',";
				}
			}

			update = update.substring(0, update.length() - 1);
			update = update + " where fid = " + fid;
			update = "update Opengeo.\"DATATABLE\" set " + update;
			out.println(update);

		} else {
			myList.clear();
			myList.put("Project_Title", request.getParameter("Project_Title"));
			myList.put("Specific_Location",
					request.getParameter("Specific_Location"));
			myList.put("Country", request.getParameter("Country"));
			myList.put("Lat", request.getParameter("Lat"));
			myList.put("Lon", request.getParameter("Lon"));
			myList.put("Sector", request.getParameter("Sector"));
			myList.put("Project_Size", request.getParameter("Project_Size"));
			myList.put("Status", request.getParameter("Status"));
			myList.put("Project_Number", request.getParameter("Project_Number"));
			myList.put("Project_Funding_Source",
					request.getParameter("Project_Funding_Source"));
			myList.put("Source", request.getParameter("Source"));
			myList.put("Project_Description",
					request.getParameter("Project_Description"));
			myList.put("Keyword", request.getParameter("Keyword"));
			myList.put("Project_Announced",
					request.getParameter("Project_Announced"));
			myList.put("Tender_Date", request.getParameter("Tender_Date"));
			myList.put("Borrowing_Entity",
					request.getParameter("Borrowing_Entity"));
			myList.put("Implementing_Entity",
					request.getParameter("Implementing_Entity"));
			myList.put("Link_To_Project",
					request.getParameter("Link_To_Project"));
			myList.put("Business_URL", request.getParameter("Business_URL"));
			myList.put("Submitting_Officer",
					request.getParameter("Submitting_Officer"));
			myList.put("Submitting_Officer_Contact",
					request.getParameter("Submitting_Officer_Contact"));
			myList.put("Submitting_Officer_Contact",
					request.getParameter("Submitting_Officer_Contact2"));
			myList.put("Project_POCs", request.getParameter("Project_POCs"));
			myList.put("Post_Comments", request.getParameter("Post_Comments"));

			Set<String> keys = myList.keySet();

			for (String key : keys) {
				String val = myList.get(key);
				val = val.replace("'", "&#39;");
				val = val.replace("\"", "&#34;");
				val = val.replace("\\", "&#92;");
				myList.put(key, val);
			}

			while (paramNames.hasMoreElements()) {
				String paramName = (String) paramNames.nextElement();
				String[] paramValues = request.getParameterValues(paramName);

				if (paramName.equals("editType")) {
				} else if (paramName.equals("fid")) {
				} else if (paramName.equals("Submitting_Officer_Contact2")) {
				} else if (paramValues.length > 0) {
					String paramValue = paramValues[0];

					paramValue = paramValue.replace("'", "''");
					paramValue = paramValue.replace('"', '\"');
					paramValue = paramValue.replace("\\", "\\\\");
					paramValue = paramValue.replace("\r", " ");
					paramValue = paramValue.replace("\n", " ");
					paramValue = paramValue.replace("\t", " ");
					paramValue = paramValue.replace("\f", " ");

					if (paramValue.length() > 0) {
						if (paramName.startsWith("ch")) {
							
						} else {
							if (paramName.startsWith("Country")) {
								String wkt = Geocode(lat, lon);

								if (wkt.equals("0")) {
								} else {
									names += "\"" + paramName + "\"" + ",";
									values += "\'" + paramValue + "\'" + ",";
									names += "\"" + "the_geom" + "\"" + ",";
									values += wkt + ",";
								}
							} else {
								names += "\"" + paramName + "\"" + ",";
								values += "\'" + paramValue + "\'" + ",";
							}
						}
					}
				}
			}

			names = names.substring(0, names.length() - 1);
			values = values.substring(0, values.length() - 1);
		}
		try {

			Class.forName("org.postgresql.Driver");

			con = DriverManager.getConnection(
					"jdbc:postgresql://localhost:54321/geoserver", "postgres",
					"postgres");
			stmt = con.createStatement();

			String poc = request.getParameter("Submitting_Officer_Contact");
			String fs = request.getParameter("Source");
			String mid = request.getParameter("fid");

			if (editType.equals("clear")) {

				send(poc, fs, mid, "clear");
			} else if (editType.equals("edit")) {

				popupUpdateEdit = "update Opengeo.\"DATATABLE\" set "
						+ "\"popup_HTML\" = '<div class=\"popupLead\"><div class=\"popupLeadTitle\">' || \"Project_Title\" || '</div>' || '<div class=\"popupLeadDetails\">'	|| '<b>Country: </b>' || \"Country\" || '<br>'	|| '<b>Sector: </b>' || \"Sector\" || '<br>' || '<b>Date Added: </b>' || \"Timestamp\"::timestamp::date || '<br>' || '<b>Primary Funding Source: </b>' || \"Project_Funding_Source\" || '<br>' || '<b>Project Size (USD): </b>' || \"Project_Size\" || '<br>' || '<b>Status: </b>' || \"Status\" || '<br>' || CASE WHEN \"Archived\" = '0' THEN '' ELSE '<br><b>Archived: </b>' END || CASE WHEN \"Archived\" = '0' THEN '' ELSE 'Yes' END || CASE WHEN \"Archived\" IS NULL THEN '<br>' ELSE '<br>' END || CASE WHEN \"Project_Description\" IS NULL THEN '' ELSE '<b>Description: </b><br>' END || CASE WHEN \"Project_Description\" IS NULL THEN '' ELSE \"Project_Description\" END || CASE WHEN \"Project_Description\" IS NULL THEN '<br>' ELSE '<br>' END || CASE WHEN \"Post_Comments\" IS NULL THEN '' ELSE '<br><b>Post Comments: </b><br>' END || CASE WHEN \"Post_Comments\" IS NULL THEN '' ELSE \"Post_Comments\" END || CASE WHEN \"Post_Comments\" IS NULL THEN '<br>' ELSE '<br><br>' END || CASE WHEN \"Link_To_Project\" IS NULL THEN '' ELSE '<a href=\"' END || CASE WHEN \"Link_To_Project\" IS NULL THEN '' ELSE \"Link_To_Project\" END || CASE WHEN \"Link_To_Project\" IS NULL THEN '' ELSE '\" target=\"_blank\" ' END || CASE WHEN \"Link_To_Project\" IS NULL THEN '' ELSE ' onclick=\"javascript:ga(''send'', ''event'', ''External_Link'', ''' END || CASE WHEN \"Link_To_Project\" IS NULL THEN '' ELSE \"Project_Title\" END || CASE WHEN \"Link_To_Project\" IS NULL THEN '' ELSE '_Lead_Details'', {''nonInteraction'': 1});\">Project Website</a>&nbsp;&nbsp;&nbsp;' END || CASE WHEN \"Business_URL\" IS NULL THEN '' ELSE '<a href=\"' END || CASE WHEN \"Business_URL\" IS NULL THEN '' ELSE \"Business_URL\" END || CASE WHEN \"Business_URL\" IS NULL THEN '' ELSE '\" target=\"_blank\" ' END || CASE WHEN \"Business_URL\" IS NULL THEN '' ELSE ' onclick=\"javascript:ga(''send'', ''event'', ''Business_Tab_Link'', ''' END || CASE WHEN \"Business_URL\" IS NULL THEN '' ELSE \"Project_Title\" END || CASE WHEN \"Business_URL\" IS NULL THEN '' ELSE '_Lead_Details'', {''nonInteraction'': 1});\">Embassy Website</a>&nbsp;&nbsp;&nbsp;' END || CASE WHEN \"Submitting_Officer_Contact\" IS NULL THEN '' ELSE '<a href=\"mailto:' END || CASE WHEN \"Submitting_Officer_Contact\" IS NULL THEN '' ELSE \"Submitting_Officer_Contact\" END || CASE WHEN \"Submitting_Officer_Contact\" IS NULL THEN '' ELSE '\" ' END || CASE WHEN \"Submitting_Officer_Contact\" IS NULL THEN '' ELSE ' onclick=\"javascript:ga(''send'', ''event'', ''Contact'', ''' END || CASE WHEN \"Submitting_Officer_Contact\" IS NULL THEN '' ELSE \"Project_Title\" END || CASE WHEN \"Submitting_Officer_Contact\" IS NULL THEN '' ELSE '_Lead_Details'', {''nonInteraction'': 1});\">Contact</a></font></div></div>' END;";
				int resUpdate = stmt.executeUpdate(update);
				int resultPopupUpdateEdit = stmt.executeUpdate(popupUpdateEdit);
				send(poc, fs, mid, "edit");

				// printWriter.close ();
			} else {

				String f = "select max(fid) from Opengeo.\"DATATABLE\"";
				rs = stmt.executeQuery(f);

				while (rs.next()) {
					mid = rs.getString(1);
				}

				int hid = Integer.parseInt(mid);
				hid++;
				mid = Integer.toString(hid);

				String insert = "INSERT INTO Opengeo.\"DATATABLE\" (" + names
						+ ") VALUES(" + values + ")";

				popupUpdateAdd = "update Opengeo.\"DATATABLE\" set "
						+ "\"popup_HTML\" = '<div class=\"popupLead\"><div class=\"popupLeadTitle\">' || \"Project_Title\" || '</div>' || '<div class=\"popupLeadDetails\">'	|| '<b>Country: </b>' || \"Country\" || '<br>'	|| '<b>Sector: </b>' || \"Sector\" || '<br>' || '<b>Date Added: </b>' || \"Timestamp\"::timestamp::date || '<br>' || '<b>Primary Funding Source: </b>' || \"Project_Funding_Source\" || '<br>' || '<b>Project Size (USD): </b>' || \"Project_Size\" || '<br>' || '<b>Status: </b>' || \"Status\" || '<br>' || CASE WHEN \"Archived\" = '0' THEN '' ELSE '<br><b>Archived: </b>' END || CASE WHEN \"Archived\" = '0' THEN '' ELSE 'Yes' END || CASE WHEN \"Archived\" IS NULL THEN '<br>' ELSE '<br>' END || CASE WHEN \"Project_Description\" IS NULL THEN '' ELSE '<b>Description: </b><br>' END || CASE WHEN \"Project_Description\" IS NULL THEN '' ELSE \"Project_Description\" END || CASE WHEN \"Project_Description\" IS NULL THEN '<br>' ELSE '<br>' END || CASE WHEN \"Post_Comments\" IS NULL THEN '' ELSE '<br><b>Post Comments: </b><br>' END || CASE WHEN \"Post_Comments\" IS NULL THEN '' ELSE \"Post_Comments\" END || CASE WHEN \"Post_Comments\" IS NULL THEN '<br>' ELSE '<br><br>' END || CASE WHEN \"Link_To_Project\" IS NULL THEN '' ELSE '<a href=\"' END || CASE WHEN \"Link_To_Project\" IS NULL THEN '' ELSE \"Link_To_Project\" END || CASE WHEN \"Link_To_Project\" IS NULL THEN '' ELSE '\" target=\"_blank\" ' END || CASE WHEN \"Link_To_Project\" IS NULL THEN '' ELSE ' onclick=\"javascript:ga(''send'', ''event'', ''External_Link'', ''' END || CASE WHEN \"Link_To_Project\" IS NULL THEN '' ELSE \"Project_Title\" END || CASE WHEN \"Link_To_Project\" IS NULL THEN '' ELSE '_Lead_Details'', {''nonInteraction'': 1});\">Project Website</a>&nbsp;&nbsp;&nbsp;' END || CASE WHEN \"Business_URL\" IS NULL THEN '' ELSE '<a href=\"' END || CASE WHEN \"Business_URL\" IS NULL THEN '' ELSE \"Business_URL\" END || CASE WHEN \"Business_URL\" IS NULL THEN '' ELSE '\" target=\"_blank\" ' END || CASE WHEN \"Business_URL\" IS NULL THEN '' ELSE ' onclick=\"javascript:ga(''send'', ''event'', ''Business_Tab_Link'', ''' END || CASE WHEN \"Business_URL\" IS NULL THEN '' ELSE \"Project_Title\" END || CASE WHEN \"Business_URL\" IS NULL THEN '' ELSE '_Lead_Details'', {''nonInteraction'': 1});\">Embassy Website</a>&nbsp;&nbsp;&nbsp;' END || CASE WHEN \"Submitting_Officer_Contact\" IS NULL THEN '' ELSE '<a href=\"mailto:' END || CASE WHEN \"Submitting_Officer_Contact\" IS NULL THEN '' ELSE \"Submitting_Officer_Contact\" END || CASE WHEN \"Submitting_Officer_Contact\" IS NULL THEN '' ELSE '\" ' END || CASE WHEN \"Submitting_Officer_Contact\" IS NULL THEN '' ELSE ' onclick=\"javascript:ga(''send'', ''event'', ''Contact'', ''' END || CASE WHEN \"Submitting_Officer_Contact\" IS NULL THEN '' ELSE \"Project_Title\" END || CASE WHEN \"Submitting_Officer_Contact\" IS NULL THEN '' ELSE '_Lead_Details'', {''nonInteraction'': 1});\">Contact</a></font></div></div>' END;";

				int result = stmt.executeUpdate(insert);
				 int resultPopupUpdateAdd =
				 stmt.executeUpdate(popupUpdateAdd);

				send(poc, fs, mid, "insert");

		
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

	public void send(String em, String fs, String mid, String edit) {
		Properties prop = new Properties();

		String message1subject = "";
		String message1text = "";
		String message1to = "";
		String message2subject = "";
		String message2editSubject = "";
		String message3subject = "";
		String message2text = "";
		String message3text = "";
		String message3text2 = "";

		try {
			 String propertiesFilePath = getServletContext().getRealPath("WEB-INF/config.properties");
			
			prop.load(new FileInputStream(propertiesFilePath));

			message1subject = prop.getProperty("message1subject");
			message1text = prop.getProperty("message1text");
			message1to = prop.getProperty("message1to");
			message2subject = prop.getProperty("message2subject");
			message2editSubject = prop.getProperty("message2editSubject");
			message2text = prop.getProperty("message2text");
			message3subject = prop.getProperty("message3subject");
			message3text = prop.getProperty("message3text");
			message3text2 = prop.getProperty("message3text2");

		} catch (IOException ex) {
			ex.printStackTrace();
		}

		message1text += "<br/>";
		message2editSubject += fs;
		message2subject += fs;
		message2text += "<br/>";

		String title = (String) myList.get("Project_Title");
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

		message1text += "<br/>Project Title: <b>"
				+ title
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
				+ mid
				+ "</b><br/><p>Please also confirm the location details. You entered: <br/>Country: <b>"
				+ country + "</b><br/><br/>Geographic Location: <b>" + spec
				+ "</b><br/></p>";
		message2text += "<br/>Project Title: <b>"
				+ title
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
				+ mid
				+ "</b><br/><p>Please also confirm the location details. You entered: <br/>Country: <b>"
				+ country
				+ "</b><br/><br/>Geographic Location: <b>"
				+ spec
				+ "</b><br/></p><a href=\"http://bids.state.gov/servlet/Clear?fid="
				+ mid + "&amp;type=clear\">Click here to Clear</a>";

		message3text = message3text + " " + message3text2;

		myList.clear();

		String[] recipients;

		try {
			if (edit.equals("edit") || edit.equals("insert")) {
				recipients = new String[2];
				recipients[0] = em;
				recipients[1] = message1to;
				sendEmail.SendingEmail(recipients, message1subject, message1text);
			}
			if (edit.equals("edit")) {
				recipients = new String[1];
				recipients[0] = message1to;
				sendEmail.SendingEmail(recipients, message2editSubject, message2text);
			} else if (edit.equals("insert")) {
				recipients = new String[1];
				recipients[0] = message1to;
				sendEmail.SendingEmail(recipients, message2subject, message2text);
			} else if (edit.equals("clear")) {
				recipients = new String[1];
				recipients[0] = message1to;
				sendEmail.SendingEmail(recipients, message3subject, message3text);
			}
		} catch (AddressException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public String Geocode(String lat, String lon) {
		String wkt = "ST_GeomFromText(\'POINT(" + lon + " " + lat
				+ ")\', 4326)";

		return wkt;
	}

}
