using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Major
{
    public string Code { get; set; } = null!;

    public string? Name { get; set; }

    public string? UniversityCode { get; set; }

    public virtual ICollection<Member> Members { get; set; } = new List<Member>();

    public virtual University? UniversityCodeNavigation { get; set; }
}
