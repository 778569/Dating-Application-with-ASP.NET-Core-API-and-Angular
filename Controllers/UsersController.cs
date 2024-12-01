using API.Data;
using API.DTOs;
using API.Entites;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{

    public class UsersController : BaseApiController
    {
        private DataContext _dbContext;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(DataContext dbContext, IUserRepository userRepository, IMapper mapper)
        {
            _dbContext = dbContext;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            //var users = await _dbContext.User.ToListAsync();

            var users = await _userRepository.GetUserAsync();

            var usertoReturn =  _mapper.Map<IEnumerable<MemberDto>>(users);


            return Ok(usertoReturn);
        }

        //[Authorize]
        [HttpGet("{id:int}")]

        public async Task<ActionResult<MemberDto>> GetUser(int id)
        {
            //var user = await _dbContext.User.FindAsync(id);
            var user = await _userRepository.GetUserById(id);
            if (user == null) return NotFound();

            var usertoReturn = _mapper.Map<MemberDto>(user);

            return Ok(usertoReturn);
        }


        //[Authorize]
        [HttpGet("{username}")]

        public async Task<ActionResult<MemberDto>> GetUserByName(string username)
        {
            //var user = await _dbContext.User.FindAsync(id);
            //var user = await _userRepository.GetUserByUserName(username);
            //if (user == null) return NotFound();

            //var usertoReturn = _mapper.Map<MemberDto>(user);

            var user = await _userRepository.GetMemberAcync(username);

            return Ok(user);
        }
    }
}
