import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.*;
import java.net.*;

//import java.io.FileInputStream;
//import java.io.IOException;
import java.util.Properties;

//import ShellOut;

public class Clear extends HttpServlet {
	
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
				
			String update="update Opengeo.\"DATATABLE\" set \"Cleared\" = 1 where fid =" + fid;
				
			//out.print(update);
			out.print("Lead Cleared");
			rs = stmt.executeQuery(update);

		} catch (ClassNotFoundException e) {
			out.println("Couldn't load database driver: " + e.getMessage());
		} catch (SQLException e) {
			//out.println("SQLException caught: " + e.getMessage());
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
