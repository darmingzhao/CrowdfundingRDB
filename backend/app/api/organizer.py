from flask import abort, jsonify, request
from ..db import query_db
from . import api


# Delete Operation
@api.route('/organizer/', methods=['DELETE'])
def delete_organizer():
    email = request.get_json()['OrganizerEmail']

    res_query = 'SELECT * FROM OrganizerInfo'
    before = query_db(res_query)
    print(email)
    delete_message_query = """
      DELETE
      FROM Message
      WHERE OrganizerEmail = ?;"""
    args = [email]
    delete_project_query = """
      DELETE
      FROM Project
      WHERE OrganizerEmail = ?;"""
    args = [email]
    delete_organizer_query = """
      DELETE
      FROM OrganizerInfo
      WHERE OrganizerEmail = ?;"""
    args = [email]

    try:
        query_db(delete_message_query, args)
        query_db(delete_project_query, args)
    except Exception as e:
        print(str(e))
        abort(400)

    after = query_db(res_query)
    resp = jsonify({'before': before, 'after': after})
    resp.status_code = 200

    return resp


# Projection Operation
@api.route('/organizer/details', methods=['GET'])
def get_organizer_details():
    select = request.args.get('Select')
    print(select)
    query = None
    if select == 'email':
        query = 'SELECT OrganizerEmail FROM OrganizerInfo'
    elif select == 'name':
        query = 'SELECT Name FROM OrganizerInfo'
    elif select == 'phone':
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
