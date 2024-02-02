using Microsoft.AspNetCore.Http;
using Microsoft.Graph;

namespace Intel.BillingHub.Helpers
{
    public static class CustomIdentity
    {
        public async static Task<string> Idsid(this HttpContext httpContext)
        {
            var graphServiceClient = (GraphServiceClient)httpContext.RequestServices.GetService(typeof(GraphServiceClient));
            var claim = await graphServiceClient.Me.Request().GetAsync();
            return claim.MailNickname;
        }
    }
}
