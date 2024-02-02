using Intel.BillingHub.Business.JVService;
using Intel.BillingHub.Data;
using Intel.BillingHub.Data.JVData;

namespace Intel.BillingHub.Extensions
{
    public static class ConfigureDependency
    {
        public static void ConfigureServices(this IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddEntityFrameworkSqlServer().AddDbContext<SCPR01DbContext>();
            services.AddEntityFrameworkSqlServer().AddDbContext<AQMSDbContext>()
                .AddTransient<IJVService,JVService>()
                    .AddTransient<IJVData,JVData>();
        }
    }
}
