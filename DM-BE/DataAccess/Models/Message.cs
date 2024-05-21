using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Message
{
    public Guid Id { get; set; }

    public string? Content { get; set; }

    public DateTime? TimeStamp { get; set; }

    public Guid? MatchId { get; set; }

    public Guid? MemberId { get; set; }

    public virtual Match? Match { get; set; }

    public virtual Member? Member { get; set; }
}
