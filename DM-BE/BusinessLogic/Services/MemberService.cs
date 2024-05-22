using BusinessLogic.Services.Interfaces;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services
{
    public class MemberService : IMemberService
    {
        private readonly DestinyMatchContext _context;
        public MemberService(DestinyMatchContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Member>> getListMember()
        {
            return await _context.Members.ToListAsync();
        }
    }
}
