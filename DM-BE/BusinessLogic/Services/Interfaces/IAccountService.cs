using DataAccess.DTOs.Request;
using DataAccess.Models;

namespace BusinessLogic.Services.Interfaces
{
    public interface IAccountService
    {
        Task<IEnumerable<Account>> getListAccount();

        Task<Account> Login(AccountDTO account);

        Task Register(AccountDTO account);

        Task<Account> Update(AccountDTO account);

        Task Delete(Guid id);
        Task<string> GenerateJSONWebTokenAsync(Account acc);
    }
}
