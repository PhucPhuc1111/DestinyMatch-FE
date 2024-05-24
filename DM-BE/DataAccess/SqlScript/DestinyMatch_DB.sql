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
	[Name] nvarchar(max)
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
	[CreateAt] datetime default CURRENT_TIMESTAMP,
	[Role] nvarchar(20) not null default 'member',				--1:admin   2:moderator   3:member
	[Status] nvarchar(20) default 'newbie'
);
go

create table [Member]
(
	Id uniqueidentifier default newid() primary key,
	Fullname nvarchar(100),
	Introduce nvarchar(max) default N'Tên này rất lười, chả để lại lời nói gì cả!',
	Dob date,
	Gender bit,					--0:girl   1:boy
	[Address] nvarchar(max),
	Surplus int default 0,				--money bag
	[Status] nvarchar(30) default N'Chưa Xác Thực',

	AccountId uniqueidentifier foreign key references [Account](Id),
	UniversityId uniqueidentifier foreign key references [University](Id),
	MajorId uniqueidentifier foreign key (MajorId) references [Major](Id)
);
--increase query speed , decrease insert, update speed
create index idx_UniversityId on [Member](UniversityId);
create index idx_MajorId on [Member](MajorId);
create index idx_Gender on [Member](Gender);
go

create table [HobbyMember]
(
	HobbyId uniqueidentifier,
	MemberId uniqueidentifier,

	primary key (HobbyId, MemberId),
	foreign key (HobbyId) references [Hobby](Id),
	foreign key (MemberId) references [Member](Id)
);
create index idx_HobbyId on [HobbyMember](HobbyId);
go

create table [Picture]
(
	Id uniqueidentifier default newid() primary key,
	UrlPath nvarchar(max),
	IsAvatar bit,

	MemberId uniqueidentifier foreign key references [Member](Id)
);
create index idx_MemberId on [Picture](MemberId);
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
	StartDate datetime default CURRENT_TIMESTAMP,
	EndDate datetime,
	
	MemberId uniqueidentifier,
	PackageId uniqueidentifier,

	foreign key (MemberId) references [Member](Id),
	foreign key (PackageId) references [Package](Id)
);
go

create table [MatchRequest]
(
	Id uniqueidentifier default newid() primary key,
	[CreateAt] datetime default CURRENT_TIMESTAMP,

	FromId uniqueidentifier foreign key references [Member](Id),
	ToId uniqueidentifier foreign key references [Member](Id),
	[Status] nvarchar(30) default N'Chưa Phản Hồi'
);
create index idx_FromId on [MatchRequest](FromId);
create index idx_ToId on [MatchRequest](ToId);
go

create table [Conversation]
(
	Id uniqueidentifier default newid() primary key,
	[Name] nvarchar(50),
	[CreatedAt] datetime default CURRENT_TIMESTAMP,

	FirstMemberId uniqueidentifier references [Member](Id),
	SecondMemberId uniqueidentifier references [Member](Id)
);
create index idx_FirstMemberId on [Conversation](FirstMemberId);
create index idx_SecondMemberId on [Conversation](SecondMemberId);
go

create table [Message]
(
	Id uniqueidentifier default newid() primary key,
	Content nvarchar(max) not null,
	[SentAt] datetime default CURRENT_TIMESTAMP,
	[Status] nvarchar(30) default N'Đã gửi',

	ConversationId uniqueidentifier references [Conversation](Id),
	SenderId uniqueidentifier foreign key references [Member](Id),
	ReceiverId uniqueidentifier foreign key references [Member](Id)
);
create index idx_SenderId on [Message](SenderId);
create index idx_ReceiverId on [Message](ReceiverId);
go

create table [Feedback]
(
	Id uniqueidentifier default newid() primary key,
	Title nvarchar(max) not null,
	Content nvarchar(max) not null,
	[TimeStamp] datetime default CURRENT_TIMESTAMP,
	[Status] nvarchar(30) default N'Đã Gửi',

	SenderId uniqueidentifier foreign key references [Member](Id)
);
go

create table [Authentication]
(
	Id uniqueidentifier default newid() primary key,
	SubmittedPicture nvarchar(max),
	[TimeStamp] datetime,
	[Status] nvarchar(30) default N'Chưa Duyệt',

	MemberId uniqueidentifier foreign key (MemberId) references [Member](Id)
);