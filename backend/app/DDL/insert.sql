/* Organization */

INSERT INTO Organization (
    CompanyName,
    Description
)
VALUES ("Google", "A large tech firm."),
("Amazon", "A large cloud service provider."),
("StartUp", "A small startup."),
("Microsoft", "Sells software."),
("UBC", "University of British Columbia");

/* OrganizerInfo */

INSERT INTO OrganizerInfo (
    OrganizerEmail,
    Name,
    Phone,
    Role
)
VALUES ("a@gmail.com", "John Doe", "2508200139", "Marketer"),
("b@gmail.com", "Mark Doe", "2504121512", "Marketer"),
("c@gmail.com", "Cool Doe", "2504250229", "Owner"),
("d@gmail.com", "Bob Doe", "2507877952", "CEO"),
("e@gmail.com", "Jake Doe", "2502400139", "Executive"),
("f@gmail.com", "Steve Doe", "2508203249", "Marketer"),
("g@gmail.com", "G Doe", "2509104812", "Marketer"),
("h@gmail.com", "Man Doe", "2504092851", "Owner"),
("i@gmail.com", "Woman Doe", "2506287462", "CEO"),
("j@gmail.com", "Hello Doe", "2501039288", "Executive");

/* OrganizerPhone */

INSERT INTO OrganizerPhone (
    Phone,
    CompanyName,
    Address
)
VALUES ("2508200139", "Google", "1600 Amphitheatre Parkway, Mountain View, California, United States"),
("2504121512", "Microsoft", "1950 Meadowvale Blvd. Mississauga, Ontario, Canada"),
("2504250229", "Amazon", "510 W Georgia St #14, Vancouver, British Columbia, Canada"),
("2507877952", "StartUp", "1000 Spooner Street, Quahog, Rhode Island, United States"),
("2502400139", "UBC", "170-6371 Crescent Road Vancouver, BC Canada");

/* InvestorPersonalInfo */

INSERT INTO InvestorPersonalInfo (
    CreditCardNum,
    Name
)
VALUES ("0000000000000000", "Investor San"),
("0000000000000001", "Investor Chan"),
("0000000000000002", "Investor Sun"),
("0000000000000003", "Investor Moon"),
("0000000000000004", "Investor Star");

/* Investor */

INSERT INTO Investor (
    InvestorUsername,
    Password,
    CreditCardNum
)
VALUES ("investorsan", "password", "0000000000000000"),
("investorchan", "password", "0000000000000001"),
("investorsun", "password", "0000000000000002"),
("investormoon", "password", "0000000000000003"),
("investorstar", "password", "0000000000000004");

/* Projects */

INSERT INTO Project (
    ProjectID,
    OrganizerEmail,
    Title,
    StartDate,
    Goal,
    Description
)
VALUES (1, "a@gmail.com", "Google Home V2", DATE(2), 10000, "A Google Home that prioritizes stealing private information over other features."),
(2, "b@gmail.com", "Microsoft Factory", DATE(2), 20000, "Software to help businesses manage factory technology."),
(3, "c@gmail.com", "Amazon Echo V2", DATE(2), 40000, "An Amazon Echo that prioritizes stealing private information over other features."),
(4, "d@gmail.com", "Handleless Cup", DATE(2), 30000, "A cup that helps minimize the spreading of germs through physical contact."),
(5, "e@gmail.com", "PencilMarker", DATE(2), 15000, "A whiteboard marker with an eraser on the back."),
(6, "f@gmail.com", "Project for F", DATE(2), 24000, "A glorious fund for F's college tuition."),
(7, "g@gmail.com", "Project for G", DATE(2), 48000, "A glorious fund for G's college tuition."),
(8, "h@gmail.com", "Project for H", DATE(2), 120000, "A glorious fund for H's college tuition."),
(9, "i@gmail.com", "Project for I", DATE(2), 160000, "A glorious fund for I's college tuition."),
(10, "j@gmail.com", "Project for J", DATE(2), 180000, "A glorious fund for J's college tuition.");

/* FinishedProject */

INSERT INTO FinishedProject (
    ProjectID,
    EndDate
)
VALUES (1, "2020-03-01"),
(2, "2020-03-02"),
(3, "2020-03-03"),
(4, "2020-03-04"),
(5, "2020-03-05");

/* OngoingProject */

INSERT INTO OngoingProject (
    ProjectID,
    NumInvestors
)
VALUES (6, 10),
(7, 20),
(8, 10),
(9, 40),
(10, 90);

/* Owns */

INSERT INTO Owns (
    CompanyName,
    ProjectID, 
    Relationship
)
VALUES ("Google", 1, "Owner"),
("Amazon", 2, "Organizer"),
("Microsoft", 3, "Owner"),
("UBC", 4, "Owner"),
("StartUp", 5, "Owner");

/* StatusUpdate */

INSERT INTO StatusUpdate (
    UpdateNum,
    ProjectID,
    DatePosted,
    Description
)
VALUES (1, 1, "2020-02-29", "Happy project launch!"),
(1, 6, "2020-03-01", "Unfortunately we did raise as much money as we needed in 1 day, so we're closing this project down."),
(1, 2, "2020-02-15", "Project Launch!"),
(2, 2, "2020-03-01", "Unfortunately the prototype has been delayed."),
(2, 3, "2020-03-15", "Project Finished! Thanks for your support.");

/* Message */

INSERT INTO Message (
    OrganizerEmail,
    InvestorUsername,
    Subject,
    Content,
    MessageDate
)
VALUES ("a@gmail.com", "investorsan", "Question about shipping", "Hi, how are you planning on shipping to people who live in AU?", DATE(2)),
("b@gmail.com", "investorchan", "Love it!", "Hope the project goes well, really great idea!", DATE(2)),
("c@gmail.com", "investorsun", "Copyright", "I think your idea is too close to Google's new idea?", DATE(2)),
("d@gmail.com", "investormoon", "Explanation", "Hi, could you explain this project in more detail", DATE(2)),
("e@gmail.com", "investorstar", "Cool!", "Can't wait to receive a unit!", DATE(2));

/* Donation */

INSERT INTO Donation (
    InvestorUsername,
    ProjectID,
    Amount,
    Message,
    DonationDate
)
VALUES ("investorsan", 6, 100, "Looks great!", "2020-02-29"),
("investorchan", 7, 150, "Perfect idea!", "2020-02-01"),
("investorsun", 8, 200, "Enclosed inquiry", "2020-02-03"),
("investormoon", 9, 250, "Enclosed inquiry", "2020-02-09"),
("investorstar", 10, 300, "Excellent!", "2020-03-01");

/* Reward */

INSERT INTO Reward (
    ProjectID,
    Amount,
    Description,
    Tier
)
VALUES (1, 100, "Thank you letter", 1),
(2, 15, "Thank you letter", 1),
(3, 27, "Thank you letter", 1),
(4, 75, "Thank you letter", 1),
(5, 100, "Thank you letter", 1);
