using FPTIU_DataAccess.Services.Interfaces;
using FPTIU_Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace FPTIU_DataAccess.Services
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
