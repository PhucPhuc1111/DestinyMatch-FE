using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DataAccess.Models;
using DataAccess.DTOs.Request;
using BusinessLogic.Services.Interfaces;

namespace BusinessLogic.Services
{
    public class AccountService : IAccountService
    {
        private readonly DestinyMatchContext _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public AccountService(DestinyMatchContext context, IMapper mapper, IConfiguration config)
        {
            _context = context;
            _mapper = mapper;
            _config = config;
        }

        public async Task<string> GenerateJSONWebTokenAsync(Account acc)
        {
            var member = await _context.Members.FirstOrDefaultAsync(x => x.AccountId == acc.Id);
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, acc.Email ?? string.Empty),
                new Claim(ClaimTypes.Role, acc.Role.ToString() ?? string.Empty)
            };

            if (member != null)
            {
                claims.Add(new Claim(ClaimTypes.Name, member.Fullname ?? string.Empty));
                claims.Add(new Claim(ClaimTypes.StreetAddress, member.Address ?? string.Empty));
                claims.Add(new Claim(ClaimTypes.Gender, member.Gender.HasValue ? (member.Gender.Value ? "male" : "female") : "unknown"));
            }
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("thisiskeynhamaybanyeuoi123456789012"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(securityKey.ToString(),
              securityKey.ToString(),
              claims,
              expires: DateTime.Now.AddDays(1),
              signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task Delete(int id)
        {
            var acc = await _context.Accounts.FindAsync(id);
            if (acc == null)
            {
                throw new Exception("Account not found");
            }
            _context.Accounts.Remove(acc);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Account>> getListAccount()
        {
            return await _context.Accounts.ToListAsync();
        }

        public async Task<Account> Login(AccountDTO account)
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == account.Email && x.Password == account.Password);

            if (acc == null)
            {
                throw new Exception("Account not found");
            }
            return acc;
        }

        public async Task Register(AccountDTO account)
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(x => x.Email == account.Email);
            if (acc != null)
            {
                throw new Exception("Account already exists");
            }
            else
            {

                await _context.Accounts.AddAsync(_mapper.Map<Account>(account));
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Account> Update(AccountDTO account)
        {
            var acc = await _context.Accounts.FindAsync(account.Email);
            if (acc == null)
            {
                throw new Exception("Account not found");
            }
            _mapper.Map(account, acc);
            await _context.SaveChangesAsync();
            return acc;
        }

        public async Task Delete(Guid accountid)
        {
            var acc = await _context.Accounts.FindAsync(accountid);
            if (acc == null)
            {
                throw new Exception("Account not found");
            }
            else
            {
                _context.Accounts.Remove(acc);
                await _context.SaveChangesAsync();
            }
        }
    }
}
