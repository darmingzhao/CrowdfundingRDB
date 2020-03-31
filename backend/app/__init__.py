from flask import Flask
from app import db
from app import routes

def create_app():
    app = Flask(__name__)
    db.init_app(app)

    return app
