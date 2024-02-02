using Intel.BillingHub.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Intel.BillingHub.Data
{
    public class SCPR01DbContext : AppDbContext
    {
        private readonly IConfiguration _configuration;

        public SCPR01DbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var connStr = _configuration.GetConnectionString("SCPR01OnestopConnection");
            var key = _configuration["ExternalKey"];

            connStr = EncryptionUtility.GetConnectionString(connStr, key);
            options.UseSqlServer(connStr);
        }
    }
}
