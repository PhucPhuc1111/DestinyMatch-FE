using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Member
{
    public Guid Id { get; set; }

    public string? Fullname { get; set; }

    public string? Introduce { get; set; }

    public DateOnly? Dob { get; set; }

    public bool? Gender { get; set; }

    public string? Address { get; set; }

    public int? Surplus { get; set; }

    public string? Status { get; set; }

    public Guid? AccountId { get; set; }

    public Guid? UniversityId { get; set; }

    public Guid? MajorId { get; set; }

    public virtual Account? Account { get; set; }

    public virtual ICollection<Authentication> Authentications { get; set; } = new List<Authentication>();

    public virtual ICollection<Conversation> ConversationFirstMembers { get; set; } = new List<Conversation>();

    public virtual ICollection<Conversation> ConversationSecondMembers { get; set; } = new List<Conversation>();

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual Major? Major { get; set; }

    public virtual ICollection<MatchRequest> MatchRequestFroms { get; set; } = new List<MatchRequest>();

    public virtual ICollection<MatchRequest> MatchRequestTos { get; set; } = new List<MatchRequest>();

    public virtual ICollection<MemberPackage> MemberPackages { get; set; } = new List<MemberPackage>();

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual ICollection<Picture> Pictures { get; set; } = new List<Picture>();

    public virtual University? University { get; set; }

    public virtual ICollection<Hobby> Hobbies { get; set; } = new List<Hobby>();
}
