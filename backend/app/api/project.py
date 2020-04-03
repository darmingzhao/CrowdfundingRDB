from flask import jsonify, request
from ..db import query_db
from . import api


# Update Operation
@api.route('/project/ongoing', methods=['PUT'])
def update_ongoing_project():
    num = request.get_json()['NumInvestors']

    query = 'UPDATE OngoingProject \
      SET NumInvestors = NumInvestors + ?'
    args = [num]
    query_db(query, args)

    resp = jsonify({})
    resp.status_code = 200 

    return resp


# Selection Operation
@api.route('/project/ongoing', methods=['GET'])
def get_ongoing_details():
    num = request.get_json()['NumInvestors']
    
    query = 'SELECT * \
      FROM OngoingProject \
      WHERE NumInvestors >= + ?'
    args = [num]
    result = query_db(query, args)

    resp = jsonify({'projects': result})
    resp.status_code = 200

    return resp
