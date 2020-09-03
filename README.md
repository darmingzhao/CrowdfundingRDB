# Crowdfunding Relational Database
Design and implementation of a crowdfunding relational database using SQLite, Flask, and React.

## Design
### Entity-Relationship Diagram
![CrowdfundingER](https://user-images.githubusercontent.com/31530273/92048941-2c99ec00-ed46-11ea-933a-49e51e881b21.png)

### Schema and Functional Dependencies
*Underlined Text*
: Primary Key

*Bolded Text*
: Foreign Key

Project(<ins>ProjectID</ins>, **OrganizerEmail**, Title, StartDate, Goal, Description)
- ProjectID -> OrganizerEmail, Title, StartDate, Goal, Description

FinishedProject(**<ins>ProjectID</ins>**, EndDate)
- ProjectID -> EndDate

OngoingProject(**<ins>ProjectID</ins>**, NumInvestors)
- ProjectID -> NumInvestors

Organization(<ins>CompanyName</ins>, Description)
- CompanyName -> Description

Owns(**<ins>CompanyName</ins>**, **<ins>ProjectID</ins>**, Relationship)
- CompanyName, ProjectID -> Relationship

StatusUpdate(<ins>UpdateNum</ins>, **<ins>ProjectID</ins>**, PostedDate, Description)
- UpdateNum, ProjectID -> OrganizerEmail, PostedDate, Description

Organizer(<ins>OrganizerEmail</ins>, **CompanyName**, Name, Phone, Address, Role)
- OrganizerEmail -> CompanyName, Name, Phone, Address, Role
- Phone -> CompanyName, Address

Investor(<ins>InvestorUsername</ins>, Password, CreditCardNum, Name)
- InvestorUsername -> Password, CreditCardNum, Name
- CreditCardNum -> Name

Message(<ins>MessageID</ins>, **OrganizerEmail**, **InvestorUsername**, Subject, Content, MessageDate)
- MessageID -> OrganizerEmail, InvestorUsername, Subject, Content, Date

Donation(<ins>TransactionID</ins>, **InvestorUsername**, **ProjectID**, Amount, Message, DonationDate)
- TransactionID -> InvestorUsername, ProjectID, Amount, Message, Date

Reward(<ins>RewardID</ins>, **ProjectID**, Description, Tier)
- RewardID -> ProjectID, Description, Tier

### Normalization into BCNF
Project(<ins>ProjectID</ins>, **OrganizerEmail**, Title, StartDate, Goal, Description)

FinishedProject(**<ins>ProjectID</ins>**, EndDate)

OngoingProject(**<ins>ProjectID</ins>**, NumInvestors)

Organization(<ins>CompanyName</ins>, Description)

Owns(**<ins>CompanyName</ins>**, **<ins>ProjectID</ins>**, Relationship) 

StatusUpdate(<ins>UpdateNum</ins>, **<ins>ProjectID</ins>**, Date, Description)

Organizer1(<ins>Phone</ins>, **CompanyName**, Address)

Organizer2(<ins>OrganizerEmail</ins>, Name, **Phone**, Role)

Investor1(<ins>CreditCardNum</ins>, Name)

Investor2(<ins>InvestorUsername</ins>, Password, **CreditCardNum**)

Message(<ins>MessageID</ins>, **OrganizerEmail**, **InvestorUsername**, Subject, Content, MessageDate)

Donation(<ins>TransactionID</ins>, **InvestorUsername**, **ProjectID**, Amount, Message, DonationDate)

Reward(<ins>RewardID</ins>, **ProjectID**, Description, Tier) 

## Frontend
<img width="931" alt="Screen Shot 2020-09-02 at 6 27 59 PM" src="https://user-images.githubusercontent.com/31530273/92051803-3aea0700-ed4a-11ea-9506-6cb1940d92e3.png">

<img width="927" alt="Screen Shot 2020-09-02 at 6 28 26 PM" src="https://user-images.githubusercontent.com/31530273/92051839-50f7c780-ed4a-11ea-885a-bb42c6f3752f.png">

<img width="930" alt="Screen Shot 2020-09-02 at 6 28 47 PM" src="https://user-images.githubusercontent.com/31530273/92051976-64a32e00-ed4a-11ea-96ba-f4a92321730c.png">
