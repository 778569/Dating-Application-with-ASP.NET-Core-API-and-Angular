using API.DTOs;
using API.Entites;
using API.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MemberDto> GetMemberAcync(string username)
        {
            //var user = await _context.User.FirstOrDefaultAsync(x => x.UserName == username);

            //var mapuser = _mapper.Map<MemberDto>(user);

            //return mapuser;

            return await _context.User
                                       .Where(u => u.UserName == username)
                                       .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                                       .SingleOrDefaultAsync();


        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            //var users = await _context.User.ToListAsync();

            //var mapuser = _mapper.Map<IEnumerable<MemberDto>>(users);

            //return mapuser;

            return await _context.User.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<IEnumerable<AppUser>> GetUserAsync()
        {
            return await _context.User.Include(p=>p.Photos).
                ToListAsync();
        }

        public async Task<AppUser> GetUserById(int id)
        {
           return await _context.User.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUserName(string username)
        {
            return await _context.User.Include(p => p.Photos).
                SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
            
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
