import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendEmail {
	public void SendingEmail(String[] Email, String Subject, String Body) throws AddressException, MessagingException
    {
			 String pass=null;
             String host ="";//IP
             String from ="";  //Your mail id
             Properties props = System.getProperties();
             //props.put("mail.smtp.starttls.enable", "true"); // added this line
             props.put("mail.smtp.host", host);
             props.put("mail.smtp.user", from);
             //props.put("mail.smtp.password", pass);
             //props.put("mail.smtp.port", "587");
             props.put("mail.smtp.auth", "false");
             String[] to = Email; // To Email address
             Session session = Session.getDefaultInstance(props, null);
             MimeMessage message = new MimeMessage(session);
             message.setFrom(new InternetAddress(from));
             InternetAddress[] toAddress = new InternetAddress[to.length];        
             // To get the array of addresses
             for( int i=0; i < to.length; i++ )
             { // changed from a while loop
                toAddress[i] = new InternetAddress(to[i]);
             }
             System.out.println(Message.RecipientType.TO);
             System.out.println(toAddress[0].toString() + " and etc.");
             for( int j=0; j < toAddress.length; j++)
             { // changed from a while loop
             message.addRecipient(Message.RecipientType.TO, toAddress[j]);
             }
             message.setSubject(Subject);

             message.setContent(Body,"text/html");
             Transport transport = session.getTransport("smtp");
             transport.connect(host, from, pass);
             transport.sendMessage(message, message.getAllRecipients());
                 transport.close();
        }
}
