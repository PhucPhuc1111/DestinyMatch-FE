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

    public string? Status { get; set; }

    public Guid? AccountId { get; set; }

    public string? UniversityCode { get; set; }

    public string? MajorCode { get; set; }

    public virtual Account? Account { get; set; }

    public virtual ICollection<Authentication> Authentications { get; set; } = new List<Authentication>();

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual Major? MajorCodeNavigation { get; set; }

    public virtual ICollection<MatchActivity> MatchActivities { get; set; } = new List<MatchActivity>();

    public virtual ICollection<Match> Matches { get; set; } = new List<Match>();

    public virtual ICollection<MemberPackage> MemberPackages { get; set; } = new List<MemberPackage>();

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual ICollection<Picture> Pictures { get; set; } = new List<Picture>();

    public virtual University? UniversityCodeNavigation { get; set; }

    public virtual ICollection<Hobby> Hobbies { get; set; } = new List<Hobby>();
}
