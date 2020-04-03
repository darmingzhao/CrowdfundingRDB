from flask import jsonify
from . import api


def bad_request(message):
    resp = jsonify({ 'error': 'bad request', 'message': message })
    resp.status_code = 400
    return resp
