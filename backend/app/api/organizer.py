from flask import jsonify, request
from . import api
from .. import db


# Delete Operation
@api.route('/organizer', methods=['DELETE'])
def delete_organizer():
    email = request.args.get('OrganizerEmail')

    query = 'DELETE \
      FROM OrganizerInfo\
      WHERE OrganizerEmail = ' + email
    query_db(query)

    return 200


# Projection Operation
@api.route('/organizer/details', methods=['GET'])
def get_organizer_details():
    email = request.args.get('OrganizerEmail')
    name = request.args.get('Name')
    phone = request.args.get('Phone')

    query = 'SELECT ' + email + ',' + name + ',' + phone + ' \
      FROM OrganizerInfo'
    query_db(query)

    return 200


# Aggregation Operation
@api.route('/organizer', methods=['GET'])
def get_num_organizers():
    query = 'SELECT COUNT(*) FROM OrganizerInfo'
    query_db(query)

    return 200
