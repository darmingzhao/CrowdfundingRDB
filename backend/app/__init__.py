import os
from flask import Flask
from . import db

app = Flask(__name__)
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'cpsc304.db'),
    SECRET_KEY='DEVKEY',
    USERNAME='admin',
    PASSWORD='default'
))
db.init_app(app)

from app import routes