from flask import jsonify, request
from ..db import query_db
from .errors import bad_request
from . import api


# Delete Operation
# TODO:
@api.route('/organizer', methods=['DELETE'])
def delete_organizer():
    email = request.args.get('OrganizerEmail')

    query = 'DELETE \
      FROM OrganizerInfo\
      WHERE OrganizerEmail = ?'
    args = [email]
    query_db(query, args)

    return 200


# Projection Operation
@api.route('/organizer/details', methods=['GET'])
def get_organizer_details():
    select = request.get_json()['Select']

    query = None
    if select == 1:
        query = 'SELECT OrganizerEmail FROM OrganizerInfo'
    elif select == 2:
        query = 'SELECT Name FROM OrganizerInfo'
    elif select == 3:
        query = 'SELECT Phone FROM OrganizerInfo'
    else:
        return bad_request('Invalid Selection') 
    result = query_db(query)

    resp = jsonify({'details': result})
    resp.status_code = 200

    return resp


# Aggregation Operation
@api.route('/organizer', methods=['GET'])
def get_num_organizers():
    query = 'SELECT COUNT(*) AS Count FROM OrganizerInfo'
    count = query_db(query, one=True)

    resp = jsonify({'organizers': count})
    resp.status_code = 200

    return resp
