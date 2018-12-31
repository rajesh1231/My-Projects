using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Data;
using System.IO;
using OpenPop.Mime;
using OpenPop.Mime.Header;
using OpenPop.Pop3;
using OpenPop.Pop3.Exceptions;
using OpenPop.Common.Logging;
using Message = OpenPop.Mime.Message;
using System.Configuration;
using System.Collections.Specialized;
using EmailClientPC.Helper;
using System.Net;
using System.Diagnostics;

namespace EmailClientPC
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly Dictionary<int, Message> messages = new Dictionary<int, Message>();
        private readonly Pop3Client pop3Client = new Pop3Client();
        public MainWindow()
        {
            InitializeComponent();
        }

        private void btnDownload_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                if (txtPasscode.Text.Trim() != "")
                {
                    string result = "";
                    //if passcode found in the database 
                    result = ReceiveMailsfromPOPServer(txtPasscode.Text.Trim());
                    // result = ReceiveMailsfromOwnServer(txtPasscode.Text.Trim());
                    if (result != "")
                    {
                        MessageBox.Show(result, "Information!", MessageBoxButton.OK, MessageBoxImage.Information);
                    }
                    else
                    {
                        MessageBox.Show("Passcode not match", "Information!", MessageBoxButton.OK, MessageBoxImage.Information);
                    }

                    //if passcode not found in the database 
                }
                else
                {
                    MessageBox.Show("Enter the Passcode", "Information!", MessageBoxButton.OK, MessageBoxImage.Information);
                    txtPasscode.Visibility = Visibility.Visible;
                }
            }
            catch (Exception ex)
            {

            }


        }

        private string ReceiveMailsfromPOPServer(string passcode)
        {
            try
            {
                // Get message Unique ID from the database using the Passcode mapped.
                //SQL call 
                DataSet ds = FileController.GETMessagesByPassCode(passcode);

                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    if (dr["Active"].ToString().ToUpper() == "FALSE")

                    {
                        return "Invalid Passcode";
                    }
                }
                string messageID = "";
                if (ds.Tables[0].Rows.Count > 0)
                {
                    messageID = ds.Tables[0].Rows[0][1].ToString();
                    if (messageID != "")
                    {
                        if (pop3Client.Connected)
                            pop3Client.Disconnect();
                        pop3Client.Connect(ConfigurationManager.AppSettings["Server"], int.Parse(ConfigurationManager.AppSettings["Port"]), Convert.ToBoolean(ConfigurationManager.AppSettings["SSL"]));
                        pop3Client.Authenticate(ConfigurationManager.AppSettings["Login"], ConfigurationManager.AppSettings["Password"]);
                        int count = pop3Client.GetMessageCount();
                        messages.Clear();
                        for (int i = count; i >= 1; i -= 1)
                        {
                            try
                            {
                                Message message = pop3Client.GetMessage(i);
                                if (message.Headers.MessageId == messageID)
                                {
                                    messages.Add(i, message);
                                    GetAttachmentsFromMessage(messages, i);
                                    FileController.UpdByPassCode(passcode);
                                    pop3Client.DeleteMessage(i);
                                    break;
                                }
                            }
                            catch (Exception e)
                            {
                                MessageBox.Show("Exception occured while reading emails", "Information!", MessageBoxButton.OK, MessageBoxImage.Information);
                            }

                        }
                        return "Attachments for the given passcode has been downloaded in the Standard path";
                    }
                    else
                    {
                        return "";

                    }
                }
                else
                {
                    return "";
                }
            }

            catch (Exception e)
            {
                return "";
            }
        }
        private void GetAttachmentsFromMessage(Dictionary<int, Message> messages, int index)
        {
            try
            {
                // Fetch out the selected message
                Message message = messages[index];
                // Clear the attachment list from any previus shown attachments           
                List<MessagePart> attachments = message.FindAllAttachments();
                List<string> liAttachements = new List<string>();
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
                            liAttachements.Add(attachment.FileName);
                        }
                        catch (Exception e)
                        {
                            MessageBox.Show(this, "Attachment saving failed. Exception message: " + e.Message, "Information!", MessageBoxButton.OK, MessageBoxImage.Information);
                        }
                    }
                    else
                    {
                        MessageBox.Show(this, "Attachment object was null!", "Information!", MessageBoxButton.OK, MessageBoxImage.Information);
                    }
                }

                lstattachments.ItemsSource = liAttachements;
               
            }
            catch (Exception ex)
            {

            }
        }


        private string ReceiveMailsfromOwnServer(string passcode)
        {
            try
            {
                List<string> filepaths = new List<string>();
                DataSet ds = FileController.GETMessagesByPassCode2(passcode);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        string filepath = ConfigurationManager.AppSettings["AttachmentsPath"];
                        filepath = System.IO.Path.Combine(filepath, dr["AttachmentName"].ToString());
                        filepaths.Add(filepath);

                    }
                    return GetAttachmentsFromServer(filepaths);
                }
                else
                {
                    return "";
                }
            }

            catch (Exception e)
            {
                return "";
            }
        }
        private string GetAttachmentsFromServer(List<string> Pathlist)
        {
            try
            {

                foreach (var item in Pathlist)
                {
                    string filepath = ConfigurationManager.AppSettings["AttachmentsPath"];
                    filepath = System.IO.Path.Combine(filepath, System.IO.Path.GetFileName(item));
                    WebClient webClient = new WebClient();
                    webClient.DownloadFile(item, filepath);
                }
                return "Downlaod Attachements success";
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        private void lstattachments_PreviewMouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            var item = (sender as ListView).SelectedItem;
            if (item != null)
            {
                Process.Start(ConfigurationManager.AppSettings["AttachmentsPath"]);
            }
        }
    }
}
