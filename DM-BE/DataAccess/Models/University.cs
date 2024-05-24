using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class University
{
    public Guid Id { get; set; }

    public string? Code { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Member> Members { get; set; } = new List<Member>();
}
