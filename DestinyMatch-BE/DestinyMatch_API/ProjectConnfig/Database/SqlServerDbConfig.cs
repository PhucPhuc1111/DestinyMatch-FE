using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DestinyMatch_API.ProjectConnfig.Database
{
    public static class SqlServerDbConfig
    {
        public static IServiceCollection ConfigureServices(IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DestinyMatchContext>(options => options.UseSqlServer(config["ConnectionStrings:OnlineConnection"]));
            return services;
        }
    }
}
