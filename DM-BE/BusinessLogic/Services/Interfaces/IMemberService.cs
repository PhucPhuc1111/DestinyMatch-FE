using DataAccess.Models;

namespace BusinessLogic.Services.Interfaces
{
    public interface IMemberService
    {
        Task<IEnumerable<Member>> getListMember();
    }
}
