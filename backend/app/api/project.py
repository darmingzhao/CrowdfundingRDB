from flask import abort, jsonify, request
from flask_cors import cross_origin
from ..db import query_db
from . import api


# Update Operation
@api.route('/project/ongoing', methods=['PUT'])
def update_ongoing_project():
    num = request.get_json()['NumInvestors']

    res_query = 'SELECT * FROM OngoingProject'
    before = query_db(res_query)
    print(num)
    update_query = 'UPDATE OngoingProject \
      SET NumInvestors=NumInvestors + ?'
    args = [num]

    try:
      query_db(update_query, args)
    except Exception as e:
      print(str(e))
      abort(400)

    after = query_db(res_query)

    resp = jsonify({'Before': before, 'After': after})
    resp.status_code = 200 

    return resp


# Selection Operation
@api.route('/project/ongoing', methods=['GET'])
@cross_origin()
def get_ongoing_details():
    num = request.args.get('NumInvestors')
    query = 'SELECT O.NumInvestors, O.ProjectID, P.OrganizerEmail, P.Title, P.Goal, P.Description\
      FROM OngoingProject O, Project P \
      WHERE O.ProjectID=P.ProjectID AND O.NumInvestors >= + ?'
    args = [num]
    try:
      result = query_db(query, args)
    except Exception as e:
      print(str(e))
      abort(400)

    resp = jsonify({'projects': result})
    resp.status_code = 200

    return resp
