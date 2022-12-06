using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SalonML_API.Data.Models;
using System.Diagnostics.Metrics;

namespace SalonML_API.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext() : base()
        {
        }

        public ApplicationDbContext(DbContextOptions options)
         : base(options)
        {
        }

        public DbSet<DynamicContent> DynamicContents => Set<DynamicContent>();
    }
}
