from flask import abort, jsonify, request
from ..db import query_db
from . import api


# Delete Operation
@api.route('/organizer/', methods=['DELETE'])
def delete_organizer():
    email = request.get_json()['OrganizerEmail']

    query = 'DELETE \
      FROM OrganizerInfo\
      WHERE OrganizerEmail = ?'
    args = [email]
    query_db(query, args)

    resp = jsonify({})
    resp.status_code = 200

    return resp


# Projection Operation
@api.route('/organizer/details', methods=['GET'])
def get_organizer_details():
    select = request.get_json()['Select']

    query = None
    if select == 'OrganizerEmail':
        query = 'SELECT OrganizerEmail FROM OrganizerInfo'
    elif select == 'Name':
        query = 'SELECT Name FROM OrganizerInfo'
    elif select == 'Phone':
        query = 'SELECT Phone FROM OrganizerInfo'
    else:
        abort(400, 'Invalid Selection')
    result = query_db(query)

    resp = jsonify({'details': result})
    resp.status_code = 200

    return resp


# Aggregation Operation
@api.route('/organizer/', methods=['GET'])
def get_num_organizers():
    query = 'SELECT COUNT(*) AS Count FROM OrganizerInfo'
    count = query_db(query, one=True)

    resp = jsonify({'organizers': count})
    resp.status_code = 200

    return resp
