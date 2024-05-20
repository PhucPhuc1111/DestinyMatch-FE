using AutoMapper;
using FPTIU_DataAccess.Services.Interfaces;
using FPTIU_Domain.DTOs;
using FPTIU_Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace FPTIU_DataAccess.Services
{
    public class AccountService : IAccountService
    {
        private readonly DestinyMatchContext _context;
        private readonly IMapper _mapper;

        public AccountService(DestinyMatchContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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
                await _context.Accounts.AddAsync(acc);
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
    }
}
