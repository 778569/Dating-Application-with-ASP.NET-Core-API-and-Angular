using API.Entites;

namespace API.Interface
{
    public interface IUserRepository
    {
        void Update(AppUser user);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<AppUser>> GetUserAsync();

        Task<AppUser> GetUserById(int id);

        Task<AppUser> GetUserByUserName(string username);
    }
}
