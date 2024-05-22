using BusinessLogic.Services;
using BusinessLogic.Services.Interfaces;

namespace DestinyMatch_API.ProjectConnfig.ServiceExtension
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<IAccountService, AccountService>();
            return services;
        }
    }
}
