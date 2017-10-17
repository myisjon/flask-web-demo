from flask_api import FlaskAPI
from flask_sqlalchemy import SQLAlchemy

app = FlaskAPI(__name__)

# SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'
# RUN_CONFIG = {
#     'host': '127.0.0.1',
#     'port': 5000,
#     'debug': True,
# }

try:
    from config import *
except Exception as e:
    print('not found config file')
finally:
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

    DB = SQLAlchemy(app)
    # SESSION = SignallingSession(DB)
    # session = SESSION()

app.config['DEFAULT_RENDERERS'] = [
    'flask.ext.api.renderers.JSONRenderer',
    'flask.ext.api.renderers.BrowsableAPIRenderer',
]
