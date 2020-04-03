import os
from flask import Flask
from . import db


def create_app(config_name):
    app = Flask(__name__)
    app.config.update(dict(
        DATABASE=os.path.join(app.instance_path, 'cpsc304.sqlite'),
        SECRET_KEY='DEVKEY',
        USERNAME='admin',
        PASSWORD='default'
    ))

    db.init_app(app)

    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api/v1')

    return app