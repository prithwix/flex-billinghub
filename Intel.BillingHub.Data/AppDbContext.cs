using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;

namespace Intel.BillingHub.Data
{
    public class AppDbContext : DbContext
    {
        private string ConnectionString = null;

        public SqlConnection GetConnection()
        {
            SqlConnection Conn = null;
            try
            {
                if (ConnectionString == null)
                {
                    ConnectionString = Database.GetConnectionString();
                }

                Conn = new SqlConnection(ConnectionString);
                Conn.Open();
                return Conn;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
