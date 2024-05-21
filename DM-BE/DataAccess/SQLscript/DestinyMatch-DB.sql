use master;
go
if exists (select name from sys.databases where name = 'DestinyMatch')
begin
	drop database DestinyMatch;
end;
go
create database DestinyMatch;
go
use DestinyMatch;
go

--=====================================================================

create table [University]
(
	Id uniqueidentifier default newid() primary key,
	Code nvarchar(20) unique,
	[Name] nvarchar(max)
);
go

create table [Major]
(
	Id uniqueidentifier default newid() primary key,
	Code nvarchar(max),
	[Name] nvarchar(max),
);
go

create table [Hobby]
(
	Id uniqueidentifier default newid() primary key,
	[Name] nvarchar(50) unique,
	[Description] nvarchar(max)
);
go

create table [Account]
(
	Id uniqueidentifier default newid() primary key,
	Email nvarchar(100) unique,
	[Password] nvarchar(max),
	[TimeStamp] datetime,
	[Role] int,--1:Admin   2:Moderator   3:User
	[Status] nvarchar(20)
);
go

create table [Member]
(
	Id uniqueidentifier default newid() primary key,
	Fullname nvarchar(100),
	Introduce nvarchar(max),
	Dob date,
	Gender bit,
	[Address] nvarchar(max),
	Surplus int,
	[Status] nvarchar(20),

	AccountId uniqueidentifier,
	UniversityId uniqueidentifier,
	MajorId uniqueidentifier,
	
	foreign key (AccountId) references [Account](Id),
	foreign key (UniversityId) references [University](Id),
	foreign key (MajorId) references [Major](Id)
);
go

create table [HobbyMember]
(
	HobbyId uniqueidentifier,
	MemberId uniqueidentifier,

	primary key (HobbyId, MemberId),
	foreign key (HobbyId) references [Hobby](Id),
	foreign key (MemberId) references [Member](Id)
);
go

create table [Picture]
(
	Id uniqueidentifier default newid() primary key,
	UrlPath nvarchar(max),
	IsAvatar bit,

	MemberId uniqueidentifier,
	
	foreign key (MemberId) references [Member](Id),
);
go

create table [Package]
(
	Id uniqueidentifier default newid() primary key,
	Code nvarchar(20) unique,
	[Name] nvarchar(50),
	[Description] nvarchar(max),
	Price int
);
go

create table [MemberPackage]
(
	Id uniqueidentifier default newid() primary key,--Buy again same Package
	StartDate datetime,
	EndDate datetime,
	
	MemberId uniqueidentifier,
	PackageId uniqueidentifier,

	foreign key (MemberId) references [Member](Id),
	foreign key (PackageId) references [Package](Id)
);
go

create table [Match]
(
	Id uniqueidentifier default newid() primary key,
	[Status] nvarchar(20),

	MemberId uniqueidentifier,

	foreign key (MemberId) references [Member](Id)
);
go

create table [MatchActivity]
(
	Id uniqueidentifier default newid() primary key,
	[Type] nvarchar(20),--friend or lover
	[TimeStamp] datetime,

	MatchId uniqueidentifier,
	MemberId uniqueidentifier

	foreign key (MatchId) references [Match](Id),
	foreign key (MemberId) references [Member](Id)
);
go

create table [Message]
(
	Id uniqueidentifier default newid() primary key,
	Content nvarchar(max),
	[TimeStamp] datetime,

	MatchId uniqueidentifier,
	MemberId uniqueidentifier

	foreign key (MatchId) references [Match](Id),
	foreign key (MemberId) references [Member](Id)
);
go

create table [Feedback]
(
	Id uniqueidentifier default newid() primary key,
	Title nvarchar(max),
	Content nvarchar(max),
	[TimeStamp] datetime,
	[Status] nvarchar(20),

	MemberId uniqueidentifier,--Sender

	foreign key (MemberId) references [Member](Id)
);
go

create table [Authentication]
(
	Id uniqueidentifier default newid() primary key,
	SubmittedPicture nvarchar(max),
	[TimeStamp] datetime,
	[Status] nvarchar(20),

	MemberId uniqueidentifier,

	foreign key (MemberId) references [Member](Id)
);