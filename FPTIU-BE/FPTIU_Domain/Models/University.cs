using System;
using System.Collections.Generic;

namespace FPTIU_Domain.Models;

public partial class University
{
    public string Code { get; set; } = null!;

    public string? Name { get; set; }

    public virtual ICollection<Major> Majors { get; set; } = new List<Major>();

    public virtual ICollection<Member> Members { get; set; } = new List<Member>();
}
