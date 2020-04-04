from flask import abort, jsonify, request
from ..db import query_db
from . import api


# Delete Operation
@api.route('/organizer/', methods=['DELETE'])
def delete_organizer():
    email = request.get_json()['OrganizerEmail']

    res_query = 'SELECT * FROM OrganizerInfo'
    before = query_db(res_query)

    delete_query = 'DELETE \
      FROM OrganizerInfo\
      WHERE OrganizerEmail = ?'
    args = [email]

    try:
        query_db(delete_query, args)
    except:
        abort(400)

    after = query_db(res_query)

    resp = jsonify({'Before': before, 'After': after})
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

    try:
        result = query_db(query)
    except:
        abort(400)

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
