DROP TABLE IF EXISTS Project;
DROP TABLE IF EXISTS FinishedProject;
DROP TABLE IF EXISTS OngoingProject;
DROP TABLE IF EXISTS Organization;
DROP TABLE IF EXISTS Owns;
DROP TABLE IF EXISTS StatusUpdate;
DROP TABLE IF EXISTS OrganizerPhone;
DROP TABLE IF EXISTS OrganizerInfo;
DROP TABLE IF EXISTS InvestorPersonalInfo;
DROP TABLE IF EXISTS Investor;
DROP TABLE IF EXISTS Message;
DROP TABLE IF EXISTS Donation;
DROP TABLE IF EXISTS Reward;

CREATE TABLE Project (
  ProjectID INTEGER PRIMARY KEY,
  OrganizerEmail CHAR(40) NOT NULL,
  Title CHAR(100),
  StartDate DATE,
  Goal INTEGER,
  Description CHAR(300),
  FOREIGN KEY(OrganizerEmail) REFERENCES Organizer2(OrganizerEmail) ON DELETE CASCADE
);

CREATE TABLE FinishedProject (
  ProjectID INTEGER PRIMARY KEY,
  EndDate DATE,
  FOREIGN KEY(ProjectID) REFERENCES Project(ProjectID) ON DELETE CASCADE
);

CREATE TABLE OngoingProject (
  ProjectID INTEGER PRIMARY KEY,
  NumInvestors INTEGER,
  FOREIGN KEY(ProjectID) REFERENCES Project(ProjectID) ON DELETE CASCADE
);

CREATE TABLE Organization (
  CompanyName CHAR(30) PRIMARY KEY,
  Description CHAR(300)
);

CREATE TABLE Owns (
  CompanyName CHAR(30),
  ProjectID INTEGER,
  Relationship CHAR(30),
  PRIMARY KEY (CompanyName, ProjectID),
  FOREIGN KEY (CompanyName) REFERENCES Organization(CompanyName) ON DELETE CASCADE,
  FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID) ON DELETE CASCADE
);

CREATE TABLE StatusUpdate(
  UpdateNum INTEGER,
  ProjectID INTEGER NOT NULL,
  DatePosted Date,
  Description CHAR(30),
  PRIMARY KEY(UpdateNum, ProjectID),
  FOREIGN KEY(ProjectID) REFERENCES Project ON DELETE CASCADE
);

CREATE TABLE OrganizerPhone(
  Phone CHAR(11) PRIMARY KEY,
  CompanyName CHAR(20),
  Address CHAR(30),
  FOREIGN KEY (CompanyName) REFERENCES Organization
);

CREATE TABLE OrganizerInfo(
  OrganizerEmail CHAR(30) PRIMARY KEY,
  Name CHAR(20),
  Phone CHAR(11),
  Role CHAR(20)
);

CREATE TABLE InvestorPersonalInfo(
  CreditCardNum CHAR(16) PRIMARY KEY,
  Name CHAR(30)
);

CREATE TABLE Investor(
  InvestorUsername CHAR(20) PRIMARY KEY,
  Password CHAR(20),
  CreditCardNum CHAR(16) NOT NULL,
  FOREIGN KEY (CreditCardNum) REFERENCES Investor1
);

CREATE TABLE Message(
  MessageID INTEGER PRIMARY KEY,
  OrganizerEmail CHAR(30) NOT NULL,
  InvestorUsername CHAR(20) NOT NULL,
  Subject CHAR(100),
  Content CHAR(300),
  MessageDate DATE,
  FOREIGN KEY(OrganizerEmail) REFERENCES OrganizerInfo ON DELETE CASCADE,
  FOREIGN KEY(InvestorUsername) REFERENCES Investor2 ON DELETE CASCADE
);

CREATE TABLE Donation(
  TransactionID INTEGER PRIMARY KEY,
  InvestorUsername CHAR(20) NOT NULL,
  ProjectID INTEGER NOT NULL,
  Amount INTEGER,
  Message CHAR(40),
  DonationDate DATE,
  FOREIGN KEY (InvestorUsername) REFERENCES Investor2,
  FOREIGN KEY (ProjectID) REFERENCES OngoingProject
);

CREATE TABLE Reward(
  RewardID INTEGER PRIMARY KEY,
  ProjectID INTEGER NOT NULL,
  Amount INTEGER NOT NULL,
  Description CHAR(30),
  Tier CHAR(10),
  FOREIGN KEY (ProjectID) REFERENCES Project
);
