namespace Intel.BillingHub.CustomExceptionMiddleware
{
    public class ErrorResponseModel
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public int StatusCode { get; set; }
    }
}
