using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Match
{
    public Guid Id { get; set; }

    public string? Status { get; set; }

    public Guid? MemberId { get; set; }

    public virtual ICollection<MatchActivity> MatchActivities { get; set; } = new List<MatchActivity>();

    public virtual Member? Member { get; set; }

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
}
