from flask import jsonify, request
from . import api
from .. import db


# Join Operation
@api.route('/investor/donations', methods=['GET'])
def get_donated_projects():
    username = request.args.get('InvestorUsername')

    query = 'SELECT P.Title \
      FROM Project P, Donation D \
      WHERE P.ProjectId = D.ProjectId AND D.InvestorUsername = ' + username
    query_db(query)

    return 200


# Nested Aggregation with Group-By Operation
@api.route('/investor/maximum', methods=['GET'])
def get_max_donated():
    query_view = 'CREATE VIEW TotalDonatedPerInvestor(InvestorUsername, Total) as \
	  SELECT D.InvestorUsername, SUM(D.Amount) AS Total \
	  FROM Donation D \
	  GROUP BY D.InvestorUsername'
    query_db(query_view)
    
    query_select = 'SELECT InvestorUsername, Total \
      FROM TotalDonatedPerInvestor \
      WHERE Total = (SELECT MAX(Total) FROM TotalDonatedPerInvestor)'
    query_db(query_select)

    return 200


# Division Operation
@api.route('/investor/all', methods=['GET'])
def get_all_donated():
    query = 'SELECT I.InvestorUsername \
      FROM Investor I \
      WHERE NOT EXISTS( \
	    SELECT P.ProjectID \
        FROM Project P \
	    EXCEPT \
	    SELECT D.ProjectID \
	    FROM Donation D \
	    WHERE D.InvestorUsername = I.InvestorUsername \
      )'
    query_db(query)

    return 200
