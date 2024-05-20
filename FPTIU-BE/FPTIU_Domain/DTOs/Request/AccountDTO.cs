using System.ComponentModel.DataAnnotations;

namespace FPTIU_Domain.DTOs.Request
{
    public class AccountDTO
    {
        [Required(ErrorMessage = "Email is require")]
        public required string Email { get; set; }
        [Required(ErrorMessage = "Password is require")]
        public required string Password { get; set; }
    }
}
