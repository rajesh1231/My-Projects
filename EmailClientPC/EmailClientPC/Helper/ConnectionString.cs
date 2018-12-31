using System;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Configuration;

namespace EmailClientPC.Helper
{
    static class ConnectionString
    {
        public static string GetConnectionString()
        {
            return System.Configuration.ConfigurationSettings.AppSettings["CONSTR"];
        }
    }
}