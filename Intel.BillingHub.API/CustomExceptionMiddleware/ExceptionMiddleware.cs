using System.Net;
using System.Text.Json;

namespace Intel.BillingHub.CustomExceptionMiddleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _logger = logger;
            _next = next;

        }
        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Onestop api exception: {ex}");
                //await HandleExceptionAsync(httpContext, ex, errorLogService);
                httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                // Return a formatted error response
                var response = new ErrorResponseModel
                {
                    StatusCode = 500,
                    Message = ex.Message
                };

                // Serialize the response to JSON
                var json = JsonSerializer.Serialize(response);

                // Write the response to the body of the HTTP response
                httpContext.Response.ContentType = "application/json";
                await httpContext.Response.WriteAsync(json);

            }
        }        
    }
}
