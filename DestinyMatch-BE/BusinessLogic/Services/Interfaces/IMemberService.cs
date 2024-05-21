using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FPTIU_DataAccess.Services.Interfaces
{
    public interface IMemberService
    {
        Task<IEnumerable<Member>> getListMember();
    }
}
