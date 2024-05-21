using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Authentication
{
    public Guid Id { get; set; }

    public string? SubmittedPicture { get; set; }

    public DateTime? TimeStamp { get; set; }

    public string? Status { get; set; }

    public Guid? MemberId { get; set; }

    public virtual Member? Member { get; set; }
}
