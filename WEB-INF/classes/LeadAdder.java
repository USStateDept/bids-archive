import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.*;
import java.net.*;
import java.util.Properties;

public class LeadAdder extends HttpServlet {
	
	List<String> myList = new ArrayList<String>();
	
	public static class ShellOut {

		public void shell(String to,String sub, String text) {  
			try {  

				String command = "cmd /c cd C:\\SendMail && set CLASSPATH=%CLASSPATH%;C:\\Program Files (x86)\\OpenGeo\\OpenGeo Suite\\webapps\\root\\WEB-INF\\lib\\javax.mail.jar;. && java SendMail " + to + " \"" + sub + "\" \"" + text + "\"";
				//String command = "cmd /c cd C:\\SendMail && set CLASSPATH=%CLASSPATH%;C:\\\\OpenGeo\\webapps\\root\\WEB-INF\\lib\\javax.mail.jar;. && java SendMail " + to + " \"" + sub + "\" \"" + text + "\"";
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

	public void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		

		res.setContentType("text/html");
		PrintWriter out = res.getWriter();

		String query = "";
		String names = "\"Timestamp\",\"Contact_Timestamp\",";
		String values = "\'NOW()\',\'NOW()\',";
		String sectors = "";		
		boolean isUpdate=false;

		Enumeration paramNames = req.getParameterNames();

		myList.clear();
		
		String editType = req.getParameter("editType");
		//REPEAT these next three lines per field in table
		String lat = req.getParameter("Lat");
		String[] latValues = req.getParameterValues("Lat");
		String latVal = latValues[0];
		myList.add(lat);
		//Those 3 lines
		String lon = req.getParameter("Lon");
		String fid = req.getParameter("fid");
		String update="";

		fid = fid.substring(fid.indexOf('.')+1);

		
		if(editType.equals("edit")){
			isUpdate=true;
			
			while (paramNames.hasMoreElements()) {
				String paramName = (String) paramNames.nextElement();
				String[] paramValues = req.getParameterValues(paramName);


				String paramValue = paramValues[0];
				
				paramValue = paramValue.replace("'", "''");
				paramValue = paramValue.replace('"', '\"');
				paramValue = paramValue.replace("\\", "\\\\");
				paramValue = paramValue.replace("\r", " ");
				paramValue = paramValue.replace("\n", " ");
				paramValue = paramValue.replace("\t", " ");
				paramValue = paramValue.replace("\f", " ");
				
				//myList.add(paramName + " : " + paramValue);

				if(paramName.equals("editType")){

				}
				else if(paramName.equals("Clear")){

				}
				else if(paramName.equals("fid")){

				}
				else if(paramName.startsWith("ch")){

				}
				else if(paramName.equals("Tender_Date")&&paramValue.equals("")){

				}
				else if(paramName.equals("Project_Announced")&&paramValue.equals("")){

				}
				else{
					update+= "\"" + paramName +"\"=\'" + paramValue + "\',";
				}
			}

			update = update.substring(0, update.length()-1);
			update = update + " where fid = " + fid;
			update = "update Opengeo.\"DATATABLE\" set " + update;
			out.print(update);


		}
		else{
			
			while (paramNames.hasMoreElements()) {
				String paramName = (String) paramNames.nextElement();
				String[] paramValues = req.getParameterValues(paramName);

				if(paramName.equals("editType")){

				}
	
				else if(paramName.equals("fid")){

				}

				else if (paramValues.length > 0) {

					String paramValue = paramValues[0];
					
					paramValue = paramValue.replace("'", "''");
					paramValue = paramValue.replace('"', '\"');
					paramValue = paramValue.replace("\\", "\\\\");
					paramValue = paramValue.replace("\r", " ");
					paramValue = paramValue.replace("\n", " ");
					paramValue = paramValue.replace("\t", " ");
					paramValue = paramValue.replace("\f", " ");
					
					myList.add(paramName + " : " + paramValue);
					
					if (paramValue.length() > 0) {

						if (paramName.startsWith("ch")) {

							String newName = checkName(paramName);

							sectors += newName + " ";
							
						} else {

							if (paramName.startsWith("Spec")) {
								
								String wkt = Geocode(lat, lon);
								out.println(wkt);
								if (wkt.equals("0")) {

								}
								else{
									names += "\"" + paramName + "\"" + ",";
									values += "\'" + paramValue + "\'" + ",";
									names += "\"" + "the_geom" + "\"" + ",";
									values +=  wkt +  ",";
								}
							} else {
								names += "\"" + paramName + "\"" + ",";
								values += "\'" + paramValue + "\'" + ",";
							}
						}

					}
				}

			}

			if (sectors.length() > 0) {
				names += "\"Sector\"" + ",";
				values += "\'" + sectors + "\'" + ",";
			}

			names = names.substring(0, names.length() - 1);
			values = values.substring(0, values.length() - 1);
			out.println(names + ":" + values);
		}

		try {

			Class.forName("org.postgresql.Driver");

			con = DriverManager.getConnection(
					"jdbc:postgresql://localhost:54321/geoserver", "postgres",
					"postgres");
			stmt = con.createStatement();
			
			String poc = req.getParameter("Submitting_Officer_Contact");
			String fs = req.getParameter("Source");
			String mid = req.getParameter("fid");
			
			if(editType.equals("clear")){
			
			send(poc,fs,mid,"clear");
			}
			else if(editType.equals("edit")){
				
				send(poc,fs,mid,"edit");
				out.print(update);
				rs = stmt.executeQuery(update);
			}else{
				
				String f = "select max(fid) from Opengeo.\"DATATABLE\"";
				rs = stmt.executeQuery(f);
				
				while (rs.next()) {
				mid = rs.getString(1);
				}

				int hid = Integer.parseInt(mid);
				hid++;
				mid = Integer.toString(hid);
				
				out.print(f);
				out.print(mid);
				send(poc,fs,mid,"insert");
				
				String insert = "INSERT INTO Opengeo.\"DATATABLE\" (" + names
						+ ") VALUES(" + values + ")";
				out.print(insert);
				rs = stmt.executeQuery(insert);
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

	public void send(String em, String fs, String mid, String edit){

		Properties prop = new Properties();

		String m1sub="";
		String m1text="";
		String m1to="";
		String m2sub="";
		String m2esub=""; 
		String m3sub="";
		String m2text="";
		String m3text="";
		String m3text2="";
		
		try {

			String propertiesFilePath = getServletContext().getRealPath("WEB-INF/config.properties");
			prop.load(new FileInputStream(propertiesFilePath));

			m1sub = prop.getProperty("m1sub");
			m1text = prop.getProperty("m1text");
			m1to = prop.getProperty("m1to");
			m2sub = prop.getProperty("m2sub");
			m2esub = prop.getProperty("m2esub");
			m2text = prop.getProperty("m2text");
			m3sub = prop.getProperty("m3sub");
			m3text = prop.getProperty("m3text");
			m3text2 = prop.getProperty("m3text2");

		} catch (IOException ex) {
			ex.printStackTrace();
		}
		
		m1text+="<br/>";
		m2esub+=fs;
		m2sub+=fs;
		m2text+="<br/>";
		
		myList.add("Project_Title");
		myList.add("Specific_Location");
		myList.add("Country");
		myList.add("Lat");
		myList.add("Lon");
		myList.add("Sector");
		myList.add("Project_Size");
		myList.add("Status");
		myList.add("Project_Number");
		myList.add("Project_Funding_Source");
		myList.add("Source");
		myList.add("Project_Description");
		myList.add("Keyword");
		myList.add("Project_Announced");
		myList.add("Tender_Date");
		myList.add("Borrowing_Entity");
		myList.add("Implementing_Entity");
		myList.add("Link_To_Project");
		myList.add("Business_URL");
		myList.add("Submitting_Officer");
		myList.add("Submitting_Officer_Contact");
		myList.add("Project_POCs");
		myList.add("Post_Comments");
		myList.add("fid");
		
		int titleIndex = myList.indexOf("Project_Title");
		String title = myList.get(titleIndex);
		
		int specIndex = myList.indexOf("Specific_Location");
		String spec = myList.get(specIndex);
		
		int countryIndex = myList.indexOf("Country");
		String country = myList.get(countryIndex);
		
		int latIndex = myList.indexOf("Lat");
		String lat = myList.get(latIndex);
		
		int lonIndex = myList.indexOf("Lon");
		String lon = myList.get(lonIndex);
		
		int sectorIndex = myList.indexOf("Sector");
		String sector = myList.get(sectorIndex);
		
		int sizeIndex = myList.indexOf("Project_Size");
		String size = myList.get(sizeIndex);
		
		int statusIndex = myList.indexOf("Status");
		String status = myList.get(statusIndex);
		
		int numberIndex = myList.indexOf("Project_Number");
		String number = myList.get(numberIndex);
		
		int fundSourceIndex = myList.indexOf("Project_Funding_Source");
		String fundSource = myList.get(fundSourceIndex);
		
		int sourceIndex = myList.indexOf("Source");
		String source = myList.get(sourceIndex);
		
		int descripIndex = myList.indexOf("Project_Description");
		String descrip = myList.get(descripIndex);
		
		int keywordsIndex = myList.indexOf("Keyword");
		String keywords = myList.get(keywordsIndex);
		
		int announDateIndex = myList.indexOf("Project_Announced");
		String announDate = myList.get(announDateIndex);
		
		int tenderDateIndex = myList.indexOf("Tender_Date");
		String tenderDate = myList.get(tenderDateIndex);
		
		int borrowEntityIndex = myList.indexOf("Borrowing_Entity");
		String borrowEntity = myList.get(borrowEntityIndex);
		
		int impleEntityIndex = myList.indexOf("Implementing_Entity");
		String impleEntity = myList.get(impleEntityIndex);
		
		int projLinkIndex = myList.indexOf("Link_To_Project");
		String projLink = myList.get(projLinkIndex);
		
		int busURLIndex = myList.indexOf("Business_URL");
		String busURL = myList.get(busURLIndex);
		
		int subOffIndex = myList.indexOf("Submitting_Officer");
		String subOff = myList.get(subOffIndex);
		
		int subOffEmailIndex = myList.indexOf("Submitting_Officer_Contact");
		String subOffEmail = myList.get(subOffEmailIndex);
		
		int pocsIndex = myList.indexOf("Project_POCs");
		String pocs = myList.get(pocsIndex);
		
		int commentsIndex = myList.indexOf("Post_Comments");
		String comments = myList.get(commentsIndex);
		
		int fidIndex = myList.indexOf("fid");
		String fid = myList.get(fidIndex);
		
		m1text+="<br/>Project Title: <b>"+title+"</b><br/>Sector: <b>"+sector+"</b><br/>Project Size: US$<b>"+size+"</b><br/>Status: <b>"+status+"</b><br/>Project Number: <b>"+number+"</b><br/>Funding Source: <b>"+fundSource+"</b><br/>Information Source: <b>"+source+"</b><br/>Project Description: <b>"+descrip+"</b><br/>Keywords: <b>"+keywords+"</b><br/>Announced Date: <b>"+announDate+"</b><br/>Tender Date: <b>"+tenderDate+"</b><br/>Borrowing Entity: <b>"+borrowEntity+"</b><br/>Implementing Entity: <b>"+impleEntity+"</b><br/>Project Website: <b>"+projLink+"</b><br/>Business Tab: <b>"+busURL+"</b><br/>Submitting Officer: <b>"+subOff+"</b><br/>Submitting Officer Email: <b>"+subOffEmail+"</b><br/>Project Point of Contacts: <b>"+pocs+"</b><br/>Post Comments: <b>"+comments+"</b><br/>Tracking ID: <b>"+fid+"</b><br/><p>Please also confirm the location details. You entered: <br/>Country: <b>"+country+"</b><br/><br/>Geographic Location: <b>"+spec+"</b><br/></p>";
		m2text+="<br/>Project Title: <b>"+title+"</b><br/>Sector: <b>"+sector+"</b><br/>Project Size: US$<b>"+size+"</b><br/>Status: <b>"+status+"</b><br/>Project Number: <b>"+number+"</b><br/>Funding Source: <b>"+fundSource+"</b><br/>Information Source: <b>"+source+"</b><br/>Project Description: <b>"+descrip+"</b><br/>Keywords: <b>"+keywords+"</b><br/>Announced Date: <b>"+announDate+"</b><br/>Tender Date: <b>"+tenderDate+"</b><br/>Borrowing Entity: <b>"+borrowEntity+"</b><br/>Implementing Entity: <b>"+impleEntity+"</b><br/>Project Website: <b>"+projLink+"</b><br/>Business Tab: <b>"+busURL+"</b><br/>Submitting Officer: <b>"+subOff+"</b><br/>Submitting Officer Email: <b>"+subOffEmail+"</b><br/>Project Point of Contacts: <b>"+pocs+"</b><br/>Post Comments: <b>"+comments+"</b><br/>Tracking ID: <b>"+fid+"</b><br/><p>Please also confirm the location details. You entered: <br/>Country: <b>"+country+"</b><br/><br/>Geographic Location: <b>"+spec+"</b><br/></p><a href=\"http://bids.state.gov/servlet/Clear?fid="+mid+"\">Click here to Clear</a>";
		
		/*for (String s : myList){
			m1text+=s+"<br/>";
			m2text+=s+"<br/>";
		}*/
		
		//m2text+="<a href=\"http://bids.state.gov/servlet/Clear?fid="+mid+"\">Click here to Clear</a>";
		m3text = m3text + " " + m3text2;
		
		LeadAdder.ShellOut b = new LeadAdder.ShellOut();
		if(edit.equals("edit")||edit.equals("insert"))
		b.shell(em+","+m1to,m1sub,m1text);
		if(edit.equals("edit"))
		b.shell(m1to,m2esub,m2text);
		else if(edit.equals("insert"))
		b.shell(m1to,m2sub,m2text);
		else if(edit.equals("clear"))
		b.shell(m1to,m3sub,m3text);
	}

	public String checkName(String ch) {

		String newCheck = "";

		if (ch.equals("chAg")) {
			newCheck = "Ag and Environment";
		} else if (ch.equals("chICT")) {
			newCheck = "ICT";
		} else if (ch.equals("chGovernance")) {
			newCheck = "Governance and Services";
		} else if (ch.equals("chInfrasctructure")) {
			newCheck = "Infrastructure";
		} else if (ch.equals("chNatural")) {
			newCheck = "Natural Resources";
		}
		return newCheck;
	}

	public String Geocode(String lat, String lon) {
		
		String wkt = "ST_GeomFromText(\'POINT(" + lon + " " + lat + ")\', 4326)";
		return wkt;
	}

}
