using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Message
{
    public Guid Id { get; set; }

    public string Content { get; set; } = null!;

    public DateTime? SentAt { get; set; }

    public string? Status { get; set; }

    public Guid? ConversationId { get; set; }

    public Guid? SenderId { get; set; }

    public virtual Conversation? Conversation { get; set; }

    public virtual Member? Sender { get; set; }
}
