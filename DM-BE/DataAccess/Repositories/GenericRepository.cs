using DataAccess.Repo_Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly DestinyMatchContext _context;

        public GenericRepository(DestinyMatchContext context)
        {
            _context = context;
        }
    }
}
