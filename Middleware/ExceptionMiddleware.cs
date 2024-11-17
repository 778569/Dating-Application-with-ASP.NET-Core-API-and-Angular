using API.Errors;
using System.Net;
using System.Text.Json;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        //public async Task InvokeAsync(HttpContext context)
        //{
        //    try
        //    {
        //        await _next(context);
        //        //throw new Exception("Bad request");
        //        //if (context.Response.StatusCode >= 400)
        //        //{
        //        //    var message = context.Response.StatusCode == 400 ? "Bad Request" : "Error occurred";
        //        //    _logger.LogWarning("Handled response with status code: {StatusCode}, Message: {Message}",
        //        //                       context.Response.StatusCode, message);
        //        //}
        //    }
        //    catch (Exception ex)
        //    {

        //        _logger.LogError(ex, ex.Message);
        //        context.Response.ContentType = "application/json";
        //        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        //        var response = _env.IsDevelopment() ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString()) :
        //            new AppException(context.Response.StatusCode, ex.Message, "Internal Server Eroor");

        //        var options = new JsonSerializerOptions
        //        {
        //            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        //        };

        //        var json = JsonSerializer.Serialize(response, options);

        //        await context.Response.WriteAsync(json);
        //    }
        //}

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context); // Proceed to the next middleware
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            var response = new
            {
                StatusCode = context.Response.StatusCode,
                Messages = "Internal Server Error",
                Details = _env.IsDevelopment() ? exception.StackTrace : null
            };

            return context.Response.WriteAsJsonAsync(response);
        }
    }
}
