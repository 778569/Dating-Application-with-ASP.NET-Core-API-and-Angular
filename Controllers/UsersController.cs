using API.Data;
using API.Entites;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{

    public class UsersController : BaseApiController
    {
        private DataContext _dbContext;
        public UsersController(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _dbContext.User.ToListAsync();

            return Ok(users);
        }

        [HttpGet("{id:int}")]

        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var user = await _dbContext.User.FindAsync(id);

            if (user == null) return NotFound();

            return Ok(user);
        }
    }
}
