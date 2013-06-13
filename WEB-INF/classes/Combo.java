import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;


public class Combo extends HttpServlet {

	public void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
Connection con = null;
Statement stmt = null;
ResultSet rs = null;

res.setContentType("text/html");
PrintWriter out = res.getWriter();

try {
// Load (and therefore register) the Oracle Driver
Class.forName("org.postgresql.Driver");

// Get a Connection to the database
con = DriverManager.getConnection(
"jdbc:postgresql://localhost:54321/geoserver", "postgres", "postgres");

// Create a Statement object
stmt = con.createStatement();

// Execute an SQL query, get a ResultSet
rs = stmt.executeQuery("SELECT  \"Country\", \"Sector\" FROM Opengeo.\"BIDS\"");

// Display the result set as a list
out.println("<HTML><HEAD><TITLE>Phonebook</TITLE></HEAD>");
out.println("<BODY>");
out.println("<UL>");
while(rs.next()) {
out.println("<LI>" + rs.getString("Country") + " " + rs.getString("Sector"));
}
out.println("</UL>");
out.println("</BODY></HTML>");
}
catch(ClassNotFoundException e) {
out.println("Couldn't load database driver: " + e.getMessage());
}
catch(SQLException e) {
out.println("SQLException caught: " + e.getMessage());
}
finally {
// Always close the database connection.
try {
if (con != null) con.close();
}
catch (SQLException ignored) { }
}
}
	
}
