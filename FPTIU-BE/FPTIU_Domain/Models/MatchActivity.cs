using System;
using System.Collections.Generic;

namespace FPTIU_Domain.Models;

public partial class MatchActivity
{
    public Guid Id { get; set; }

    public string? Type { get; set; }

    public DateTime? TimeStamp { get; set; }

    public Guid? MatchId { get; set; }

    public Guid? MemberId { get; set; }

    public virtual Match? Match { get; set; }

    public virtual Member? Member { get; set; }
}
