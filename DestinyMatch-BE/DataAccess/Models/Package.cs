using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Package
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int? Price { get; set; }

    public virtual ICollection<MemberPackage> MemberPackages { get; set; } = new List<MemberPackage>();
}
