﻿using System;
using System.Collections.Generic;

namespace FPTIU_Domain.Models;

public partial class University
{
    public Guid Id { get; set; }

    public string? Code { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Major> Majors { get; set; } = new List<Major>();

    public virtual ICollection<Member> Members { get; set; } = new List<Member>();
}
