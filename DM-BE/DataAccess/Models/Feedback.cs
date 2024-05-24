using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Feedback
{
    public Guid Id { get; set; }

    public string Title { get; set; } = null!;

    public string Content { get; set; } = null!;

    public DateTime? TimeStamp { get; set; }

    public string? Status { get; set; }

    public Guid? SenderId { get; set; }

    public virtual Member? Sender { get; set; }
}
