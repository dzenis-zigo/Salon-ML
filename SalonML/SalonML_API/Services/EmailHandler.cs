using Microsoft.AspNetCore.WebUtilities;
using System.Text.Json;
using System.Runtime.CompilerServices;
using System.Text;
using System.Web;
using System.Text.RegularExpressions;

namespace SalonML_API.Services
{
    public class EmailHandler
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;

        public EmailHandler(
            IHttpClientFactory httpClientFactory,
            IConfiguration configuration) 
        {
            _httpClientFactory = httpClientFactory;
            _config = configuration;
        }

        public async void SendContactUsEmail(string name, string email, string message)
        {
            string adminEmail = "frizerml@gmail.com";

            message = Regex.Replace(message, @"\n", "<br>");
            string htmlContent = $"<html><head></head><body><p>Name: {name}</p><br><p>Email: {email}</p><br><p>Message: {message}</p></body></html>";

            SendEmail(adminEmail, "Admin", "Message received from user", htmlContent);
        }

        public async void SendPasswordResetLink(string recipientEmail, string userId, string token)
        {
            /* todo delete this
            var requestContent = $@"{{  
                ""sender"":
                {{  
                    ""name"":""Frizerski Salon ML"",
                    ""email"":""no-reply@salonmlsarajevo.com""
                }},
                ""to"":[  
                    {{  
                        ""email"":""{email}"",
                        ""name"":""Admin""
                    }}
                ],
                ""subject"":""Password reset link"",
                ""htmlContent"":""<html><head></head><body><a href=\""{resetUrl}\"">{resetLinkText}</a></body></html>""
                }}";
            */

            // Url Encode the token because it has slashes - slashes mess with the angular routing
            var resetUrl = _config["AppUrl"] + "new-password/" + userId + "/" + HttpUtility.UrlEncode(token);
            var resetLinkText = "Please follow this link to reset your password";
            var htmlContent = $"<html><head></head><body><a href=\"{ resetUrl }\">{ resetLinkText }</a></body></html>";

            var subject = "Password reset link";

            SendEmail(recipientEmail, "Admin", subject, htmlContent);
        }

        private async void SendEmail(string recipientEmail, string recipientName, string subject, string htmlContent)
        {
            Email emailConfig = new Email()
            {
                sender = new Sender()
                {
                    email = "no-reply@salonmlsarajevo.com",
                    name = "Frizerski Salon ML"
                },
                to = new Recipient[] { new Recipient()
                {
                    email = recipientEmail,
                    name = recipientName
                } },
                subject = subject,
                htmlContent = htmlContent
            };

            var request = new HttpRequestMessage()
            {
                RequestUri = new Uri("https://api.sendinblue.com/v3/smtp/email"),
                Method = HttpMethod.Post,
                Content = new StringContent(JsonSerializer.Serialize(emailConfig), Encoding.UTF8, "application/json")
            };

            request.Headers.Add("Accept", "application/json");
            request.Headers.Add("api-key", _config["SendInBlue:APIKey"]);

            var httpClient = _httpClientFactory.CreateClient();

            await httpClient.SendAsync(request);
        }

        private class Email
        {
            public Sender sender { get; set; }

            public Recipient[] to { get; set; }

            public string subject { get; set; }

            public string htmlContent { get; set; }
        }

        private class Recipient
        {
            public string email { get; set; }
            public string name { get; set; }
        }

        private class Sender
        {
            public string email { get; set; }
            public string name { get; set; }
        }
    }
}
