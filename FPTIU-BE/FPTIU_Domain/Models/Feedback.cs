using System;
using System.Collections.Generic;

namespace FPTIU_Domain.Models;

public partial class Feedback
{
    public Guid Id { get; set; }

    public string? Title { get; set; }

    public string? Content { get; set; }

    public DateTime? TimeStamp { get; set; }

    public Guid? MemberId { get; set; }

    public virtual Member? Member { get; set; }
}
