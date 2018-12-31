using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

namespace EmailClientPC.Helper
{
    public class FileController
    {

        public static int InsertMessages(string _messageID, string _passCode)
        {
            SqlParameter[] p = new SqlParameter[2];
            p[0] = new SqlParameter("@PassCode", SqlDbType.VarChar);
            p[0].Value = _passCode;
            p[1] = new SqlParameter("@MSGID", SqlDbType.VarChar);
            p[1].Value = _messageID;
            return SqlHelper.ExecuteNonQuery(ConnectionString.GetConnectionString(), CommandType.StoredProcedure, "spInsMessages", p);

        }

        public static int Insattachements(string _messageID, string _attachmentname)
        {
            SqlParameter[] p = new SqlParameter[2];
            p[0] = new SqlParameter("@MSGID", SqlDbType.VarChar);
            p[0].Value = _messageID;
            p[1] = new SqlParameter("@AttachmentName", SqlDbType.VarChar);
            p[1].Value = _attachmentname;
            return SqlHelper.ExecuteNonQuery(ConnectionString.GetConnectionString(), CommandType.StoredProcedure, "spInsattachements", p);

        }


        public static DataSet GETMessagesByMsgID(string _messageID)
        {
            SqlParameter[] p = new SqlParameter[1];
            p[0] = new SqlParameter("@MSGID", SqlDbType.VarChar);
            p[0].Value = _messageID;
            return (SqlHelper.ExecuteDataset(ConnectionString.GetConnectionString(), CommandType.StoredProcedure, "spGETMessagesByMsgID", p));
        }
        public static DataSet GETMessagesByPassCode(string _passCode)
        {
            SqlParameter[] p = new SqlParameter[1];
            p[0] = new SqlParameter("@PassCode", SqlDbType.VarChar);
            p[0].Value = _passCode;
            return (SqlHelper.ExecuteDataset(ConnectionString.GetConnectionString(), CommandType.StoredProcedure, "spGETMessagesByPassCode", p));
        }

        public static DataSet GETMessagesByPassCode2(string _passCode)
        {
            SqlParameter[] p = new SqlParameter[1];
            p[0] = new SqlParameter("@PassCode", SqlDbType.VarChar);
            p[0].Value = _passCode;
            return (SqlHelper.ExecuteDataset(ConnectionString.GetConnectionString(), CommandType.StoredProcedure, "spGETMessagesByPasscode2", p));
        }
        public static int UpdByPassCode(string _passCode)
        {
            SqlParameter[] p = new SqlParameter[1];
            p[0] = new SqlParameter("@PassCode", SqlDbType.VarChar);
            p[0].Value = _passCode;          
            return SqlHelper.ExecuteNonQuery(ConnectionString.GetConnectionString(), CommandType.StoredProcedure, "spUpdByPassCode", p);

        }
        
    }
}