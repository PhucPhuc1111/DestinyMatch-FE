﻿using System;
using System.Collections.Generic;

namespace FPTIU_Domain.Models;

public partial class Account
{
    public Guid Id { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public virtual ICollection<Member> Members { get; set; } = new List<Member>();
}
