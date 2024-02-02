using Intel.BillingHub.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


namespace Intel.BillingHub.Data
{
    public class AQMSDbContext : AppDbContext
    {
        private readonly IConfiguration _configuration;

        public AQMSDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var connStr = _configuration.GetConnectionString("AQMSOnestopConnection");
            var key = _configuration["ExternalKey"];
            connStr = EncryptionUtility.GetConnectionString(connStr, key);

            options.UseSqlServer(connStr);
        }
    }
}
