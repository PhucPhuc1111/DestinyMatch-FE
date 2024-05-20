using FPTIU_Domain.DTOs;
using FPTIU_Domain.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace FPTIU_DataAccess.Services.Interfaces
{
    public interface IAccountService
    {
        Task<IEnumerable<Account>> getListAccount();

        Task<Account> Login(AccountDTO account);

        Task Register(AccountDTO account);

        Task<Account> Update(AccountDTO account);

        Task Delete(int id);
    }
}
