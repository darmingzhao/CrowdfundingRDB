from flask import jsonify, request
from . import api
from .. import db


# Update Operation
@api.route('/project/ongoing', methods=['PUT'])
def update_ongoing_project():
    num = request.args.get('NumInvestors')

    query = 'UPDATE OngoingProject \
      SET NumInvestors = NumInvestors + ' + num
    query_db(query)

    return 200


# Selection Operation
@api.route('/project/ongoing', methods=['GET'])
def get_ongoing_details():
    num = request.args.get('NumInvestors')
    
    query = 'SELECT * \
      FROM OngoingProject \
      WHERE NumInvestors >= + ' + num
    query_db(query)

    return 200
