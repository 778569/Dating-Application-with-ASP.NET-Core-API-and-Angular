namespace API.Entites
{
    public class AppUser     
    {
       
        public int Id { get; set; }

        //add 'required' to the list of modifiers in field_modifier and property_modifier. The required_member_list of a type is composed of all the members that have had required applied to them
        public required string UserName { get; set; }

        public required byte[] PasswordHash { get; set; }

        public required byte[] PasswordSalt { get; set; }
    }
}
