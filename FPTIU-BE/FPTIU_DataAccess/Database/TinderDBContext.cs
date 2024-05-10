using FPTIU_Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace FPTIU_DataAccess.Database
{
    public class TinderDBContext : DbContext
    {

        public TinderDBContext()
        {
        }

        public TinderDBContext(DbContextOptions<TinderDBContext> options) : base(options)
        {
        }

        public DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("server=localhost;database=Tinder;uid=sa;pwd=12345;TrustServerCertificate=True;MultipleActiveResultSets=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            DataSeeder.Seed(modelBuilder);
        }

    }
}
