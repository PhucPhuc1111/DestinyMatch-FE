using System;
using System.Collections.Generic;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public partial class DestinyMatchContext : DbContext
{
    public DestinyMatchContext()
    {
    }

    public DestinyMatchContext(DbContextOptions<DestinyMatchContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Authentication> Authentications { get; set; }

    public virtual DbSet<Conversation> Conversations { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Hobby> Hobbies { get; set; }

    public virtual DbSet<Major> Majors { get; set; }

    public virtual DbSet<MatchRequest> MatchRequests { get; set; }

    public virtual DbSet<Member> Members { get; set; }

    public virtual DbSet<MemberPackage> MemberPackages { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<Package> Packages { get; set; }

    public virtual DbSet<Picture> Pictures { get; set; }

    public virtual DbSet<University> Universities { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=(local);database=DestinyMatch;uid=sa;pwd=12345;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Account__3214EC07FCB2A511");

            entity.ToTable("Account");

            entity.HasIndex(e => e.Email, "UQ__Account__A9D1053492D835A5").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreateAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Role)
                .HasMaxLength(20)
                .HasDefaultValue("member");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("newbie");
        });

        modelBuilder.Entity<Authentication>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Authenti__3214EC07586EF641");

            entity.ToTable("Authentication");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Status)
                .HasMaxLength(30)
                .HasDefaultValue("Chưa Duyệt");
            entity.Property(e => e.TimeStamp).HasColumnType("datetime");

            entity.HasOne(d => d.Member).WithMany(p => p.Authentications)
                .HasForeignKey(d => d.MemberId)
                .HasConstraintName("FK__Authentic__Membe__7D439ABD");
        });

        modelBuilder.Entity<Conversation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Conversa__3214EC071DBFBC58");

            entity.ToTable("Conversation");

            entity.HasIndex(e => e.FirstMemberId, "idx_FirstMemberId");

            entity.HasIndex(e => e.SecondMemberId, "idx_SecondMemberId");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Name).HasMaxLength(50);

            entity.HasOne(d => d.FirstMember).WithMany(p => p.ConversationFirstMembers)
                .HasForeignKey(d => d.FirstMemberId)
                .HasConstraintName("FK__Conversat__First__6B24EA82");

            entity.HasOne(d => d.SecondMember).WithMany(p => p.ConversationSecondMembers)
                .HasForeignKey(d => d.SecondMemberId)
                .HasConstraintName("FK__Conversat__Secon__6C190EBB");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Feedback__3214EC07B33B0391");

            entity.ToTable("Feedback");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Status)
                .HasMaxLength(30)
                .HasDefaultValue("Đã Gửi");
            entity.Property(e => e.TimeStamp)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Sender).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.SenderId)
                .HasConstraintName("FK__Feedback__Sender__787EE5A0");
        });

        modelBuilder.Entity<Hobby>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Hobby__3214EC075FDE25D1");

            entity.ToTable("Hobby");

            entity.HasIndex(e => e.Name, "UQ__Hobby__737584F61B5D1FB3").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Name).HasMaxLength(50);

            entity.HasMany(d => d.Members).WithMany(p => p.Hobbies)
                .UsingEntity<Dictionary<string, object>>(
                    "HobbyMember",
                    r => r.HasOne<Member>().WithMany()
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__HobbyMemb__Membe__52593CB8"),
                    l => l.HasOne<Hobby>().WithMany()
                        .HasForeignKey("HobbyId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__HobbyMemb__Hobby__5165187F"),
                    j =>
                    {
                        j.HasKey("HobbyId", "MemberId").HasName("PK__HobbyMem__9A710F7E2E67A6B8");
                        j.ToTable("HobbyMember");
                        j.HasIndex(new[] { "HobbyId" }, "idx_HobbyId");
                    });
        });

        modelBuilder.Entity<Major>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Major__3214EC07223E0C60");

            entity.ToTable("Major");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
        });

        modelBuilder.Entity<MatchRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MatchReq__3214EC0739B0DE03");

            entity.ToTable("MatchRequest");

            entity.HasIndex(e => e.FromId, "idx_FromId");

            entity.HasIndex(e => e.ToId, "idx_ToId");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreateAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(30)
                .HasDefaultValue("Chưa Phản Hồi");

            entity.HasOne(d => d.From).WithMany(p => p.MatchRequestFroms)
                .HasForeignKey(d => d.FromId)
                .HasConstraintName("FK__MatchRequ__FromI__656C112C");

            entity.HasOne(d => d.To).WithMany(p => p.MatchRequestTos)
                .HasForeignKey(d => d.ToId)
                .HasConstraintName("FK__MatchReque__ToId__66603565");
        });

        modelBuilder.Entity<Member>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Member__3214EC07367D0B9F");

            entity.ToTable("Member");

            entity.HasIndex(e => e.Gender, "idx_Gender");

            entity.HasIndex(e => e.MajorId, "idx_MajorId");

            entity.HasIndex(e => e.UniversityId, "idx_UniversityId");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Fullname).HasMaxLength(100);
            entity.Property(e => e.Introduce).HasDefaultValue("Tên này rất lười, chả để lại lời nói gì cả!");
            entity.Property(e => e.Status)
                .HasMaxLength(30)
                .HasDefaultValue("Chưa Xác Thực");
            entity.Property(e => e.Surplus).HasDefaultValue(0);

            entity.HasOne(d => d.Account).WithMany(p => p.Members)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Member__AccountI__4CA06362");

            entity.HasOne(d => d.Major).WithMany(p => p.Members)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__Member__MajorId__4E88ABD4");

            entity.HasOne(d => d.University).WithMany(p => p.Members)
                .HasForeignKey(d => d.UniversityId)
                .HasConstraintName("FK__Member__Universi__4D94879B");
        });

        modelBuilder.Entity<MemberPackage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MemberPa__3214EC071C745173");

            entity.ToTable("MemberPackage");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.EndDate).HasColumnType("datetime");
            entity.Property(e => e.StartDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Member).WithMany(p => p.MemberPackages)
                .HasForeignKey(d => d.MemberId)
                .HasConstraintName("FK__MemberPac__Membe__5EBF139D");

            entity.HasOne(d => d.Package).WithMany(p => p.MemberPackages)
                .HasForeignKey(d => d.PackageId)
                .HasConstraintName("FK__MemberPac__Packa__5FB337D6");
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Message__3214EC078E828C2F");

            entity.ToTable("Message");

            entity.HasIndex(e => e.SenderId, "idx_SenderId");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.SentAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(30)
                .HasDefaultValue("Đã gửi");

            entity.HasOne(d => d.Conversation).WithMany(p => p.Messages)
                .HasForeignKey(d => d.ConversationId)
                .HasConstraintName("FK__Message__Convers__71D1E811");

            entity.HasOne(d => d.Sender).WithMany(p => p.Messages)
                .HasForeignKey(d => d.SenderId)
                .HasConstraintName("FK__Message__SenderI__72C60C4A");
        });

        modelBuilder.Entity<Package>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Package__3214EC071ABB359D");

            entity.ToTable("Package");

            entity.HasIndex(e => e.Code, "UQ__Package__A25C5AA75CA22A4C").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Code).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Picture>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Picture__3214EC07F6F75F02");

            entity.ToTable("Picture");

            entity.HasIndex(e => e.MemberId, "idx_MemberId");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

            entity.HasOne(d => d.Member).WithMany(p => p.Pictures)
                .HasForeignKey(d => d.MemberId)
                .HasConstraintName("FK__Picture__MemberI__5629CD9C");
        });

        modelBuilder.Entity<University>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Universi__3214EC07581BA507");

            entity.ToTable("University");

            entity.HasIndex(e => e.Code, "UQ__Universi__A25C5AA7DE86E3AE").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Code).HasMaxLength(20);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
