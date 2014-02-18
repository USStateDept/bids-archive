import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.*;
import java.net.*;
import java.util.Properties;

public class Reopen extends HttpServlet {
	
	public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		

		res.setContentType("text/html");
		PrintWriter out = res.getWriter();

		Enumeration paramNames = req.getParameterNames();
		
		String fid = req.getParameter("fid");

		try {

			Class.forName("org.postgresql.Driver");

			con = DriverManager.getConnection(
					"jdbc:postgresql://localhost:54321/geoserver", "postgres",
					"postgres");
			stmt = con.createStatement();
			
			String update="";
			
			update="update Opengeo.\"DATATABLE\" set \"Archived\" = 0 where fid =" + fid;
			out.print("Lead Reopened");
						
			rs = stmt.executeQuery(update);

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

}
