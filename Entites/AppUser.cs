using API.Extentions;

namespace API.Entites
{
    public class AppUser     
    {
       
        public int Id { get; set; }

        //add 'required' to the list of modifiers in field_modifier and property_modifier. The required_member_list of a type is composed of all the members that have had required applied to them
        public required string UserName { get; set; }

        public byte[]? PasswordHash { get; set; }

        public byte[]? PasswordSalt { get; set; }

        public DateOnly DateOfBirth { get; set; }

        public string KnownAs { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;

        public DateTime LastActive { get; set; } = DateTime.UtcNow;

        public string Gender { get; set; }

        public string Introduction { get; set; }

        public string LookingFor { get; set; }

        public string Interests { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public List<Photo> Photos { get; set; } = new();


        public int GetAge()
        {
            return DateOfBirth.CalculateAge();
        }
    }
}
