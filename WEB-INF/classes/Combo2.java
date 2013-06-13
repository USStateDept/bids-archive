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
			rs = stmt.executeQuery("SELECT DISTINCT \"Sector\" FROM Opengeo.\"BIDS3\" where \"Sector\" is not null and \"Sector\" <> '' order by \"Sector\" asc");
			}else if(col.equals("DOSReg")){
				
				rs = stmt.executeQuery("SELECT DISTINCT \"DOSReg\" FROM Opengeo.\"BIDS3\" where \"DOSReg\" is not null and \"DOSReg\" <> '' order by \"DOSReg\" asc");
			}else if(col.equals("SubOff")){
				
				rs = stmt.executeQuery("SELECT DISTINCT \"SubOff\" FROM Opengeo.\"BIDS3\" where \"SubOff\" is not null and \"SubOff\" <> '' order by \"SubOff\" asc");
			}else if(col.equals("PrFSrc")){
				
				rs = stmt.executeQuery("SELECT DISTINCT \"PrFSrc\" FROM Opengeo.\"BIDS3\" where \"PrFSrc\" is not null and \"PrFSrc\" <> '' order by \"PrFSrc\" asc");
			}else if(col.equals("Source")){
				
				rs = stmt.executeQuery("SELECT DISTINCT \"Source\" FROM Opengeo.\"BIDS3\" where \"Source\" is not null and \"Source\" <> '' order by \"Source\" asc");
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
