import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.*;

public class Combo2 extends HttpServlet {

	public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;

		res.setContentType("text/xml");
		PrintWriter out = res.getWriter();
		
		String col = req.getParameter("col");
		String label = req.getParameter("label");

		try {
			
			Class.forName("org.postgresql.Driver");

			con = DriverManager.getConnection(
					"jdbc:postgresql://localhost:54321/geoserver", "postgres",
					"postgres");

			stmt = con.createStatement();
			
			if(col.equals("Sector")){
			rs = stmt.executeQuery("SELECT DISTINCT \"Sector\" FROM Opengeo.\"DATATABLE\" where \"Sector\" is not null and \"Sector\" <> '' order by \"Sector\" asc");
			}else if(col.equals("DOS_Region")){
				
				rs = stmt.executeQuery("SELECT DISTINCT \"DOS_Region\" FROM Opengeo.\"DATATABLE\" where \"DOS_Region\" is not null and \"DOS_Region\" <> '' order by \"DOS_Region\" asc");
			}else if(col.equals("Submitting_Officer")){
				
				rs = stmt.executeQuery("SELECT DISTINCT \"Submitting_Officer\" FROM Opengeo.\"DATATABLE\" where \"Submitting_Officer\" is not null and \"Submitting_Officer\" <> '' order by \"Submitting_Officer\" asc");
			}else if(col.equals("Project_Funding_Source")){
				
				rs = stmt.executeQuery("SELECT DISTINCT \"Project_Funding_Source\" FROM Opengeo.\"DATATABLE\" where \"Project_Funding_Source\" is not null and \"Project_Funding_Source\" <> '' order by \"Project_Funding_Source\" asc");
			}else if(col.equals("Source")){
				
				rs = stmt.executeQuery("SELECT DISTINCT \"Source\" FROM Opengeo.\"DATATABLE\" where \"Source\" is not null and \"Source\" <> '' order by \"Source\" asc");
			}
			
			out.println("<XML>");

			while (rs.next()) {
				out.println("<Row><" + label + ">" + rs.getString(col)
						+ "</" + label + "></Row>");
			}
			out.println("</XML>");
		} catch (ClassNotFoundException e) {
			out.println("Couldn't load database driver: " + e.getMessage());
		} catch (SQLException e) {
			out.println("SQLException caught: " + e.getMessage());
		} finally {
			// Always close the database connection.
			try {
				if (con != null)
					con.close();
			} catch (SQLException ignored) {
			}
		}
	}

}
