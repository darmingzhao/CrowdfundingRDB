import os
from flask import Flask
from flask_cors import CORS
from . import db


def create_app(config_name):
    app = Flask(__name__)
    app.config.update(dict(
        DATABASE=os.path.join('cpsc304.sqlite'),
        SECRET_KEY='DEVKEY',
        USERNAME='admin',
        PASSWORD='default'
    ))

    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'

    db.init_app(app)

    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api/v1')

    return app
