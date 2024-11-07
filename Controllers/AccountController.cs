using API.Data;
using API.DTOs;
using API.Entites;
using API.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    
    public class AccountController : BaseApiController
    {
        private readonly DataContext _dataContext;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext dataContext, ITokenService tokenService)
        {
            _dataContext = dataContext;
            _tokenService = tokenService;
        }

        [HttpPost("register")]

        public async Task<ActionResult<UserDto>> Register([FromBody] RegisterDto registerDto)
        {
           
            if (await UserExist(registerDto.Username) == true)
            {
                return BadRequest("Username is already Taken");
            }

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDto.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _dataContext.Add(user);
            await _dataContext.SaveChangesAsync();

            return new UserDto
            {
                Token = _tokenService.CreateToken(user),
                UserName = registerDto.Username,
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody] LoginDto loginDto)
        {
            var user = await _dataContext.User.FirstOrDefaultAsync(x => x.UserName.ToLower() == loginDto.Username);

            if (user == null) return Unauthorized("Invalid user name");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserDto
            {
                Token = _tokenService.CreateToken(user),
                UserName = loginDto.Username,
            }; 
        }


        private async Task<bool> UserExist(string username)
        {
            return await _dataContext.User.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
        }

        
    }
}
