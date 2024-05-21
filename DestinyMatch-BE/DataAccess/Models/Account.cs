using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Account
{
    public Guid Id { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public DateTime? TimeStamp { get; set; }

    public int? Role { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<Member> Members { get; set; } = new List<Member>();
}
