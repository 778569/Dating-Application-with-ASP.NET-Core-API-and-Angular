using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [MinLength(5)]
        public required string Username { get; set; }

        [Required]
        [MinLength(5)]
        public required string Password { get; set; }
    }
}
