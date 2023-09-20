namespace API.Errors
{
    public class ApiException : ApiResponse
    {
        public ApiException(int statusCode, string Message = null,string details = null) : base
        (statusCode,Message)
        {
            Details = details;
        }

        public string Details { get; set; }
    }
}