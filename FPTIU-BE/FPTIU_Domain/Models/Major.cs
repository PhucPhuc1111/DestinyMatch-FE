using System;
using System.Collections.Generic;

namespace FPTIU_Domain.Models;

public partial class Major
{
    public Guid Id { get; set; }

    public string? Code { get; set; }

    public string? Name { get; set; }

    public Guid? UniversityId { get; set; }

    public virtual ICollection<Member> Members { get; set; } = new List<Member>();

    public virtual University? University { get; set; }
}
