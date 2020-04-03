from flask import jsonify, request
from ..db import query_db
from . import api


# Join Operation
@api.route('/investor/donations', methods=['GET'])
def get_donated_projects():
    username = request.get_json()['InvestorUsername']

    query = 'SELECT P.Title \
      FROM Project P, Donation D \
      WHERE P.ProjectId = D.ProjectId AND D.InvestorUsername = ?'
    args = [username]
    result = query_db(query, args)

    resp = jsonify({'Projects': result})
    resp.status_code = 200

    return resp


# Nested Aggregation with Group-By Operation
# TODO:
@api.route('/investor/maximum', methods=['GET'])
def get_max_donated():
    # TODO: Put this in insert.sql?
    query_view = 'CREATE VIEW TotalDonatedPerInvestor(InvestorUsername, Total) as \
	  SELECT D.InvestorUsername, SUM(D.Amount) AS Total \
	  FROM Donation D \
	  GROUP BY D.InvestorUsername'
    query_db(query_view)
    
    query_select = 'SELECT InvestorUsername, Total \
      FROM TotalDonatedPerInvestor \
      WHERE Total = (SELECT MAX(Total) FROM TotalDonatedPerInvestor)'
    result = query_db(query_select, one=True)

    resp = jsonify({'TopDonation': result})
    resp.stauts_code = 200

    return resp


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
    result = query_db(query)

    resp = jsonify({'Investors': result})
    resp.status_code = 200

    return resp
