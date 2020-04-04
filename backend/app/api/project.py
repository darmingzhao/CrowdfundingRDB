from flask import abort, jsonify, request
from ..db import query_db
from . import api


# Update Operation
@api.route('/project/ongoing', methods=['PUT'])
def update_ongoing_project():
    num = request.get_json()['NumInvestors']

    res_query = 'SELECT * FROM OngoingProject'
    before = query_db(res_query)

    update_query = 'UPDATE OngoingProject \
      SET NumInvestors = NumInvestors + ?'
    args = [num]

    try:
      query_db(update_query, args)
    except:
      abort(400)

    after = query_db(res_query)
    resp = jsonify({'before': before, 'after': after})
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

    try:
      result = query_db(query, args)
    except:
      abort(400)

    resp = jsonify({'projects': result})
    resp.status_code = 200

    return resp
