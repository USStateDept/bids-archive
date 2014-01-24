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

		String editType = req.getParameter("editType");
		String lat = req.getParameter("Lat");
		String lon = req.getParameter("Lon");
		String fid = req.getParameter("fid");
		String update="";

		fid = fid.substring(fid.indexOf('.')+1);

		if(editType.equals("edit")){
			isUpdate=true;

			myList.clear();

			while (paramNames.hasMoreElements()) {
				String paramName = (String) paramNames.nextElement();
				String[] paramValues = req.getParameterValues(paramName);


				String paramValue = paramValues[0];
				
				myList.add(paramName + " : " + paramValue);

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
			
			myList.clear();
			
			while (paramNames.hasMoreElements()) {
				String paramName = (String) paramNames.nextElement();
				String[] paramValues = req.getParameterValues(paramName);

				if(paramName.equals("editType")){

				}
	
				else if(paramName.equals("fid")){

				}

				else if (paramValues.length > 0) {

					String paramValue = paramValues[0];
					
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
		
		for (String s : myList){
			m1text+=s+"<br/>";
			m2text+=s+"<br/>";
		}
		
		m2text+="<a href=\"http://bids.state.gov/servlet/Clear?fid="+mid+"\">Click here to Clear</a>";
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
