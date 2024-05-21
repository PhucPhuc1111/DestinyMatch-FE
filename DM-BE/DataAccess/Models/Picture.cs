using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Picture
{
    public Guid Id { get; set; }

    public string? UrlPath { get; set; }

    public bool? IsAvatar { get; set; }

    public Guid? MemberId { get; set; }

    public virtual Member? Member { get; set; }
}
