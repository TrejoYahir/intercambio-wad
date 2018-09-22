create database exchangesProyect;
use exchangesProyect;

create table Users (
	id int primary key not null auto_increment,
	email varchar(100) not null,
	firstName varchar(50) not null,
	lastName varchar(100) not null,
	alias varchar(20) not null,
	pass varchar(30) not null
);

create table FriendList (
	id int not null auto_increment,
	idUser1 int not null,
	idUser2 int not null,
	primary key(id),
	foreign key(idUser1) references Users(id),
	foreign key(idUser2) references Users(id)
);
            
create table Exchanges (
	id int primary key not null auto_increment,
	exchangeName varchar(100) not null,
	maxAmount float not null,
	limitDate dateTime not null,
    exchangeDate dateTime not null,
	exchangeDescription varchar(300) not null,
	accessCode char(8) not null,
	idCreator int not null,
    foreign key(idCreator) references Users(id)
);            
            
create table Themes (
	id int primary key not null auto_increment,
	themeName varchar(50) not null,
    idExchange int not null,
    foreign key(idExchange) references Exchanges (id)
);

create table ParticipantList (
	id int primary key not null auto_increment,
    idUser int not null,
    idExchange int not null,
    acceptInvite boolean not null,
    isInGroup boolean not null,
    foreign key(idUser) references Users (id),
    foreign key(idExchange) references Exchanges (id)
);

create table Pairs (
	id int primary key not null auto_increment,
    idUser1 int not null,
    idUser2 int not null,
    idExchange int not null,
    foreign key(idUser1) references Users (id),
    foreign key(idUser1) references Users (id),
    foreign key(idExchange) references Exchanges (id)
);

            
show tables;