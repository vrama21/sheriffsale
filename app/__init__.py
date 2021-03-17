import os
from pathlib import Path
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_sqlalchemy import SQLAlchemy

ROOT_DIR = Path(__file__).parent.parent.absolute()
BUILD_DIR = str(ROOT_DIR / 'build')

cors = CORS()
db = SQLAlchemy()
migrate = Migrate()


def create_app():
    app = Flask(__name__, static_folder='/build/', static_url_path='/')

    flask_env = os.environ.get('FLASK_ENV')
    if flask_env == 'development':
        app.config.from_object('app.config.DevelopmentConfig')
        cors.init_app(app)
    elif flask_env == 'production':
        app.config.from_object('app.config.ProductionConfig')

    # Initialize Plugins
    db.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        db.create_all()
        from .commands import cli
        from .routes import routes

        app.cli.add_command(cli)

        app.register_blueprint(routes.main_bp)

        return app
