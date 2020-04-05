import traceback

from flask import abort, jsonify, request
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

    try:
      result = query_db(query, args)
    except Exception:
      traceback.print_exc()
      abort(400)

    resp = jsonify({'Projects': result})
    resp.status_code = 200

    return resp


# Nested Aggregation with Group-By Operation
@api.route('/investor/maximum', methods=['GET'])
def get_max_donated():
    query = 'SELECT InvestorUsername, Total \
      FROM TotalDonatedPerInvestor \
      WHERE Total = (SELECT MAX(Total) FROM TotalDonatedPerInvestor)'
    result = query_db(query, one=True)

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
