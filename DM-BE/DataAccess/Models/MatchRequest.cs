using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class MatchRequest
{
    public Guid Id { get; set; }

    public DateTime? CreateAt { get; set; }

    public Guid? FromId { get; set; }

    public Guid? ToId { get; set; }

    public string? Status { get; set; }

    public virtual Member? From { get; set; }

    public virtual Member? To { get; set; }
}
