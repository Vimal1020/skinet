using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$\r\n",
        ErrorMessage ="Password must have 1 Uppercase, 1 Lowercase, 1 Number, 1 non alphanumeric and atleats 6 characters")]
        public string Password { get; set; }
    }
}