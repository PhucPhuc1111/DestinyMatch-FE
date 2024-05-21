using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public interface IBaseRepository<T> where T : class
    {

    }
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {

    }
}
