import datetime
import time
from flask import abort, jsonify, request
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

    res_query = 'SELECT * FROM Donation'
    before = query_db(res_query)

    insert_query = "INSERT \
      INTO Donation(InvestorUsername, ProjectID, Amount, Message, DonationDate) \
      VALUES(?, ?, ?, ?, ?)"
    args = [username, project, amount, message, date]

    try:
      print(args)
      query_db(insert_query, args)
    except Exception as e:
      print(e)
      abort(400)

    after = query_db(res_query)
    resp = jsonify({'before': before, 'after': after})
    resp.status_code = 201

    return resp
