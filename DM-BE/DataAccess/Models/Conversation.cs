using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Conversation
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public DateTime? CreatedAt { get; set; }

    public Guid? FirstMemberId { get; set; }

    public Guid? SecondMemberId { get; set; }

    public virtual Member? FirstMember { get; set; }

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual Member? SecondMember { get; set; }
}
