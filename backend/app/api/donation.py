from flask import jsonify, request
from . import api
from .. import db

import datetime


# Insert Operation
@api.route('/donation/', methods=['POST'])
def add_donation():
    username = request.args.get('InvestorUsername')
    project = request.args.get('ProjectId')
    amount = request.args.get('Amount')
    message = request.args.get('Message')
    date = datetime.datetime.now().date()

    query = 'INSERT \
      INTO donation \
      VALUES(' + username + ','+ project + ',' + amount + ',' + message + ',' + date + ')'
    query_db(query)

    return 200
