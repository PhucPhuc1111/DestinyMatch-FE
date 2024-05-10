using FPTIU_Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FPTIU_DataAccess.Database
{
    public static class DataSeeder
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>().HasData(
                new Users
                {
                    Id = 1,
                    Address = "Hanoi",
                    Email = "trinh@gmail.com",
                    FullName = "trinh Son Tung",
                    Password = "123"
                }
            );
        }
    }
}
