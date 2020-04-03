DROP VIEW IF EXISTS TotalDonatedPerInvestor; 

CREATE VIEW TotalDonatedPerInvestor(InvestorUsername, Total) AS
  SELECT D.InvestorUsername, SUM(D.Amount) AS Total
  FROM Donation D
  GROUP BY D.InvestorUsername;
