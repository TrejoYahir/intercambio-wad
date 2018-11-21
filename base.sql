create database wadProyect;
use wadProyect;

create table Users (
	id int primary key not null auto_increment,
	email varchar(100) not null,
	firstName varchar(50) not null,
	lastName varchar(100) not null,
	alias varchar(20),
	pass varchar(30),
    external boolean
);

create table FriendList (
	id int not null auto_increment,
	idUser1 int not null,
	idUser2 int not null,
	primary key(id),
	foreign key(idUser1) references Users(id) ON DELETE CASCADE,
	foreign key(idUser2) references Users(id) ON DELETE CASCADE
);
            
create table Exchanges (
	id int primary key not null auto_increment,
	exchangeName varchar(100) not null,
	maxAmount float not null,
	limitDate varchar(20) not null,
    exchangeDate varchar(20) not null,
	exchangeDescription varchar(300) not null,
	accessCode char(8) not null,
	idCreator int not null,
    foreign key(idCreator) references Users(id) 
		ON DELETE CASCADE
        ON UPDATE CASCADE
);            
            
create table Themes (
	id int primary key not null auto_increment,
	themeName varchar(50) not null,
    idExchange int not null,
    foreign key(idExchange) references Exchanges (id) 
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

create table ParticipantList (
	id int primary key not null auto_increment,
    idUser int not null,
    idExchange int not null,
    acceptInvite boolean not null,
    isInGroup boolean not null,
    foreign key(idUser) references Users (id),
    foreign key(idExchange) references Exchanges (id) 
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

create table Pairs (
	id int primary key not null auto_increment,
    idUser1 int not null,
    idUser2 int not null,
    idExchange int not null,
    foreign key(idUser1) references Users (id),
    foreign key(idUser1) references Users (id),
    foreign key(idExchange) references Exchanges (id) 
		ON DELETE CASCADE
        ON UPDATE CASCADE
);


DELIMITER //
CREATE PROCEDURE saveFriendship (id1 int, id2 int) 
BEGIN
	INSERT INTO FriendList(idUser1, idUser2) VALUES (id1, id2);
    INSERT INTO FriendList(idUser1, idUser2) VALUES (id2, id1);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getFriendList (idUser int) 
BEGIN
	SELECT u2.* 
	FROM Users u1 
	LEFT JOIN  friendList f ON u1.id = f.idUser1
	RIGHT JOIN Users u2 ON f.idUser2 = u2.id
	WHERE u1.id = idUser;
	END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getExchangeInvites (idExchange1 int) 
BEGIN
	SELECT u.id, u.firstName, u.lastName, u.email, u.alias, p.acceptInvite, p.isInGroup FROM  
	ParticipantList p 
	LEFT JOIN Users u 
	ON p.idUser = u.id
	WHERE p.idExchange = idExchange1;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getExchangeInvited (idUser1 int) 
BEGIN
	SELECT e.* FROM  
	participantList p
	LEFT JOIN Exchanges e 
	ON e.id = p.idExchange
	WHERE p.idUser = idUser1;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getPairs (eCode varchar(8)) 
BEGIN	
		SELECT p.* FROM
		Pairs p JOIN Exchanges e
		ON p.idExchange = e.id  
		WHERE e.accessCode = eCode;
    END //
DELIMITER ;

select * from exchanges;
select * from Themes;

call getExchangeInvites(1);

call getExchangeInvited(3);
