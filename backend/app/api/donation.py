import datetime

from flask import jsonify, request
from ..db import query_db
from . import api


# Insert Operation
@api.route('/donation/', methods=['POST'])
def add_donation():
    req = request.get_json()
    username = req['InvestorUsername']
    project = req['ProjectID']
    amount = req['Amount']
    message = req['Message']
    date = datetime.datetime.now().date()

    query = 'INSERT \
      INTO Donation(InvestorUsername, ProjectID, Amount, Message, DonationDate) \
      VALUES(?, ?, ?, ?, ?)'
    args = [username, project, amount, message, date]
    query_db(query, args)

    resp = jsonify({})
    resp.status_code = 201

    return resp
