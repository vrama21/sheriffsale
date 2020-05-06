from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"] = "17a202d87bb99ee84fd5ebbec5130e0f"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///main.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

from . import routes