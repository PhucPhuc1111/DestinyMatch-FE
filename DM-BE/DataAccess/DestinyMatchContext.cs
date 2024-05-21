using System;
using System.Collections.Generic;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

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

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Hobby> Hobbies { get; set; }

    public virtual DbSet<Major> Majors { get; set; }

    public virtual DbSet<Match> Matches { get; set; }

    public virtual DbSet<MatchActivity> MatchActivities { get; set; }

    public virtual DbSet<Member> Members { get; set; }

    public virtual DbSet<MemberPackage> MemberPackages { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<Package> Packages { get; set; }

    public virtual DbSet<Picture> Pictures { get; set; }

    public virtual DbSet<University> Universities { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer(GetConnectionString());
    private string GetConnectionString()
    {
        string root = Directory.GetParent(Directory.GetCurrentDirectory())?.FullName ?? "";
        string apiDirectory = Path.Combine(root, "DestinyMatch-API");
        IConfiguration config = new ConfigurationBuilder()
        .SetBasePath(apiDirectory)
        .AddJsonFile("appsettings.Development.json", true, true)
        .Build();
        var strConn = config["ConnectionStrings:DefaultConnectionStringDB"];

        return strConn;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Account__3214EC07D154088A");

            entity.ToTable("Account");

            entity.HasIndex(e => e.Email, "UQ__Account__A9D105342FE40758").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Status).HasMaxLength(20);
            entity.Property(e => e.TimeStamp).HasColumnType("datetime");
        });

        modelBuilder.Entity<Authentication>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Authenti__3214EC07CD30C1CA");

            entity.ToTable("Authentication");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Status).HasMaxLength(20);
            entity.Property(e => e.TimeStamp).HasColumnType("datetime");

            entity.HasOne(d => d.Member).WithMany(p => p.Authentications)
                .HasForeignKey(d => d.MemberId)
                .HasConstraintName("FK__Authentic__Membe__6EF57B66");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Feedback__3214EC07DF383E5F");

            entity.ToTable("Feedback");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.TimeStamp).HasColumnType("datetime");

            entity.HasOne(d => d.Member).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.MemberId)
                .HasConstraintName("FK__Feedback__Member__6B24EA82");
        });

        modelBuilder.Entity<Hobby>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Hobby__3214EC076A3E8BE5");

            entity.ToTable("Hobby");

            entity.HasIndex(e => e.Name, "UQ__Hobby__737584F6F1501B90").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Name).HasMaxLength(50);

            entity.HasMany(d => d.Members).WithMany(p => p.Hobbies)
                .UsingEntity<Dictionary<string, object>>(
                    "HobbyMember",
                    r => r.HasOne<Member>().WithMany()
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__HobbyMemb__Membe__4D94879B"),
                    l => l.HasOne<Hobby>().WithMany()
                        .HasForeignKey("HobbyId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__HobbyMemb__Hobby__4CA06362"),
                    j =>
                    {
                        j.HasKey("HobbyId", "MemberId").HasName("PK__HobbyMem__9A710F7E95DC0BBD");
                        j.ToTable("HobbyMember");
                    });
        });

        modelBuilder.Entity<Major>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Major__3214EC0772596637");

            entity.ToTable("Major");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

            entity.HasOne(d => d.University).WithMany(p => p.Majors)
                .HasForeignKey(d => d.UniversityId)
                .HasConstraintName("FK__Major__Universit__3C69FB99");
        });

        modelBuilder.Entity<Match>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Match__3214EC077774D1A9");

            entity.ToTable("Match");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Status).HasMaxLength(20);

            entity.HasOne(d => d.Member).WithMany(p => p.Matches)
                .HasForeignKey(d => d.MemberId)
                .HasConstraintName("FK__Match__MemberId__5DCAEF64");
        });

        modelBuilder.Entity<MatchActivity>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MatchAct__3214EC077E96B934");

            entity.ToTable("MatchActivity");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.TimeStamp).HasColumnType("datetime");
            entity.Property(e => e.Type).HasMaxLength(20);

            entity.HasOne(d => d.Match).WithMany(p => p.MatchActivities)
                .HasForeignKey(d => d.MatchId)
                .HasConstraintName("FK__MatchActi__Membe__619B8048");

            entity.HasOne(d => d.Member).WithMany(p => p.MatchActivities)
                .HasForeignKey(d => d.MemberId)
                .HasConstraintName("FK__MatchActi__Membe__628FA481");
        });

        modelBuilder.Entity<Member>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Member__3214EC0790BD4740");

            entity.ToTable("Member");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Fullname).HasMaxLength(100);
            entity.Property(e => e.Status).HasMaxLength(20);

            entity.HasOne(d => d.Account).WithMany(p => p.Members)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Member__AccountI__47DBAE45");

            entity.HasOne(d => d.Major).WithMany(p => p.Members)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__Member__MajorId__49C3F6B7");

            entity.HasOne(d => d.University).WithMany(p => p.Members)
                .HasForeignKey(d => d.UniversityId)
                .HasConstraintName("FK__Member__Universi__48CFD27E");
        });

        modelBuilder.Entity<MemberPackage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MemberPa__3214EC07F5B366A7");

            entity.ToTable("MemberPackage");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.EndDate).HasColumnType("datetime");
            entity.Property(e => e.StartDate).HasColumnType("datetime");

            entity.HasOne(d => d.Member).WithMany(p => p.MemberPackages)
                .HasForeignKey(d => d.MemberId)
                .HasConstraintName("FK__MemberPac__Membe__59063A47");

            entity.HasOne(d => d.Package).WithMany(p => p.MemberPackages)
                .HasForeignKey(d => d.PackageId)
                .HasConstraintName("FK__MemberPac__Packa__59FA5E80");
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Message__3214EC072ED12F50");

            entity.ToTable("Message");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.TimeStamp).HasColumnType("datetime");

            entity.HasOne(d => d.Match).WithMany(p => p.Messages)
                .HasForeignKey(d => d.MatchId)
                .HasConstraintName("FK__Message__MemberI__66603565");

            entity.HasOne(d => d.Member).WithMany(p => p.Messages)
                .HasForeignKey(d => d.MemberId)
                .HasConstraintName("FK__Message__MemberI__6754599E");
        });

        modelBuilder.Entity<Package>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Package__3214EC07376FA702");

            entity.ToTable("Package");

            entity.HasIndex(e => e.Code, "UQ__Package__A25C5AA724118AC9").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Code).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Picture>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Picture__3214EC070732C357");

            entity.ToTable("Picture");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

            entity.HasOne(d => d.Member).WithMany(p => p.Pictures)
                .HasForeignKey(d => d.MemberId)
                .HasConstraintName("FK__Picture__MemberI__5165187F");
        });

        modelBuilder.Entity<University>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Universi__3214EC07A901442A");

            entity.ToTable("University");

            entity.HasIndex(e => e.Code, "UQ__Universi__A25C5AA72D06EDBA").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Code).HasMaxLength(20);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
