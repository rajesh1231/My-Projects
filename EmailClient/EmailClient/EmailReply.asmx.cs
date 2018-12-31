using System;
using System.Web.Services;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Text;
using OpenPop.Mime;
using OpenPop.Mime.Header;
using OpenPop.Pop3;
using OpenPop.Pop3.Exceptions;
using OpenPop.Common.Logging;
using Message = OpenPop.Mime.Message;
using System.Configuration;
using System.Net.Mail;
using System.Globalization;
using System.Net;
using EmailClient.Helper;

namespace EmailClient
{
   // /// <summary>
   // /// Summary description for EmailReply
   // /// </summary>
   // [WebService(Namespace = "http://tempuri.org/")]
   // [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
   // [System.ComponentModel.ToolboxItem(false)]
   // // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
   //// [System.Web.Script.Services.ScriptService]
    public class EmailReply : System.Web.Services.WebService
    {
        private readonly Dictionary<int, Message> messages = new Dictionary<int, Message>();
        private readonly Pop3Client pop3Client = new Pop3Client();
        [WebMethod]
        public  string SendAutoReply()
        {
            return ReceiveMails();
        }
        private string ReceiveMails()
        {
            try
            {
                if (pop3Client.Connected)
                    pop3Client.Disconnect();
                pop3Client.Connect(ConfigurationManager.AppSettings["Server"], int.Parse(ConfigurationManager.AppSettings["Port"]), Convert.ToBoolean(ConfigurationManager.AppSettings["SSL"]));
                pop3Client.Authenticate(ConfigurationManager.AppSettings["Login"], ConfigurationManager.AppSettings["Password"]);
                int count = pop3Client.GetMessageCount();
                messages.Clear();
                int success = 0;
                int fail = 0;
                for (int i = count; i >= 1; i -= 1)
                {
                    try
                    {
                        Message message = pop3Client.GetMessage(i);
                        // Add the message to the dictionary from the messageNumber to the Message

                        //check if the message id is present in the database 

                        DataSet ds = new DataSet();//GetAllMessageID();//Database call for getting all the messageid stored in database
                        ds = FileController.GETMessagesByMsgID(message.Headers.MessageId);                        
                        if(ds.Tables[0].Rows.Count==0)
                        {
                            messages.Add(i, message);
                            //GetAttachmentsFromMessage(message);
                        }
                        success++;
                    }
                    catch (Exception e)
                    {
                        DefaultLogger.Log.LogError(
                            "TestForm: Message fetching failed: " + e.Message + "\r\n" +
                            "Stack trace:\r\n" +
                            e.StackTrace);
                        fail++;
                    }
                }
                if (messages.Count>0)
                {

                    // Create message replies
                    List<MailMessage> replies = new List<MailMessage>();
                    foreach (var msg in messages)
                    {
                        replies.Add(CreateReply(msg.Value));
                    }

                    // Send replies
                    SendReplies(replies);
                }
                if (fail > 0)
                {
                    return "Failed to fetch the mails from pop3 server";
                }
                else
                {
                    return "Mails received successfully";
                }
            }
            catch (InvalidLoginException)
            {
                return "The server did not accept the user credentials!";
            }
            catch (PopServerNotFoundException)
            {
                return "The server could not be found";
            }
            catch (PopServerLockedException)
            {
                return "The mailbox is locked. It might be in use or under maintenance. Are you connected elsewhere?";
            }
            catch (LoginDelayException)
            {
                return "Login not allowed. Server enforces delay between logins. Have you connected recently?";
            }
            catch (Exception e)
            {
                return "Error occurred retrieving mail. " + e.Message;
            }
            finally
            {
            }
        }

        public static string GeneratePasscode()
        {
            string allowedChars = "a,b,c,d,e,f,g,h,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,";
            allowedChars += "A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,U,V,W,X,Y,Z,";
            allowedChars += "2,3,4,5,6,7,8,9";
            char[] sep = { ',' };
            string[] arr = allowedChars.Split(sep);
            string passcode = "";
            string temp;
            Random rand = new Random();
            for (int i = 0; i < 6; i++)
            {
                temp = arr[rand.Next(0, arr.Length)];
                passcode += temp;
            }
            return passcode;
        }

        private static MailMessage CreateReply(Message source)
        {
            MailMessage reply = new MailMessage(new MailAddress(ConfigurationManager.AppSettings["Login"], "Sender"), source.Headers.From.MailAddress);
            try
            {              
                // Get message id and add 'In-Reply-To' header
                string id = source.Headers.MessageId;
                reply.Headers.Add("In-Reply-To", id);

                // Try to get 'References' header from the source and add it to the reply
                string references = source.Headers.References.ToString();

                if (!string.IsNullOrEmpty(references))
                    references += ' ';

                reply.Headers.Add("References", references + id);

                // Add subject
                if (!source.Headers.Subject.StartsWith("Re:", StringComparison.OrdinalIgnoreCase))
                    reply.Subject = "Re: ";

                reply.Subject += source.Headers.Subject;

                // Add body
                StringBuilder body = new StringBuilder();
                string passcode = GeneratePasscode();
                //Insert a Message ID and Generate passcode here into the database            
                FileController.InsertMessages(source.Headers.MessageId, passcode);

                body.Append("<p>Thank you for your email!</p>");
                body.Append("<p>Here is your passcode <b>" + passcode + "</b> for accessing the attachements,please note it down to access the email in future.</p>");
                body.Append("<p>Best regards,<br>");
                body.Append("Rajesh Kumar");
                body.Append("</p>");
                body.Append("<br>");

                body.Append("<div>");
                body.AppendFormat("On {0}, ", DateTime.Today.Date.ToShortDateString());
                if (!string.IsNullOrEmpty(source.Headers.From.DisplayName))
                    body.Append(source.Headers.From.DisplayName + ' ');

                body.AppendFormat("<<a href=\"mailto:{0}\">{0}</a>> wrote:<br/>", source.Headers.From.Address);
                MessagePart selectedMessagePart = (MessagePart)source.MessagePart;                
                if (selectedMessagePart.Body!=null)
                {
                    body.Append("<blockqoute style=\"margin: 0 0 0 5px;border-left:2px blue solid;padding-left:5px\">");
                    body.Append(selectedMessagePart.GetBodyAsText());
                    body.Append("</blockquote>");
                }

                body.Append("</div>");

                reply.Body = body.ToString();
                reply.IsBodyHtml = true;
                return reply;
            }
            catch(Exception ex)
            {
                return reply;
            }
           
        }

        private static void SendReplies(IEnumerable<MailMessage> replies)
        {
            using (SmtpClient client = new SmtpClient(ConfigurationManager.AppSettings["SMTPServer"], int.Parse(ConfigurationManager.AppSettings["SMTPPort"])))
            {
                // Set SMTP client properties
                client.EnableSsl = true;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(ConfigurationManager.AppSettings["Login"], ConfigurationManager.AppSettings["Password"]);

                // Send
                bool retry = true;
                foreach (MailMessage msg in replies)
                {
                    try
                    {
                        client.Send(msg);
                        retry = true;
                    }
                    catch (Exception ex)
                    {
                        if (!retry)
                        {
                            Console.WriteLine("Failed to send email reply to " + msg.To.ToString() + '.');
                            Console.WriteLine("Exception: " + ex.Message);
                            return;
                        }

                        retry = false;
                    }
                    finally
                    {
                        msg.Dispose();
                    }
                }

                Console.WriteLine("All email replies successfully sent.");
            }
        }

        private void GetAttachmentsFromMessage(Message message)
        {
            try
            {                
                // Clear the attachment list from any previus shown attachments           
                List<MessagePart> attachments = message.FindAllAttachments();

                foreach (MessagePart attachment in attachments)
                {
                    string filepath = ConfigurationManager.AppSettings["AttachmentsPath"];
                    filepath = System.IO.Path.Combine(filepath, attachment.FileName);
                    if (attachment != null)
                    {
                        // Now we want to save the attachment
                        FileInfo file = new FileInfo(filepath);//need to change it to seleced path or from configuration

                        // Check if the file already exists
                        if (file.Exists)
                        {
                            // User was asked when he chose the file, if he wanted to overwrite it
                            // Therefore, when we get to here, it is okay to delete the file
                            file.Delete();
                        }

                        // Lets try to save to the file
                        try
                        {
                            attachment.Save(file);
                            FileController.Insattachements(message.Headers.MessageId, attachment.FileName);
                        }
                        catch (Exception e)
                        {
                            //MessageBox.Show(this, "Attachment saving failed. Exception message: " + e.Message, "Information!", MessageBoxButton.OK, MessageBoxImage.Information);
                        }
                    }
                    else
                    {
                       // MessageBox.Show(this, "Attachment object was null!", "Information!", MessageBoxButton.OK, MessageBoxImage.Information);
                    }
                }
            }
            catch (Exception ex)
            {

            }
        }
    }
}
