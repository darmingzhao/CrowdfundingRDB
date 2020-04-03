import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()


def init_db():
    db = get_db()

    with current_app.open_resource('DDL/schema.sql') as f:
        db.executescript(f.read().decode('utf8'))
        click.echo('Database and Schema Initialized...')
    with current_app.open_resource('DDL/insert.sql') as f:
        db.executescript(f.read().decode('utf8'))
        click.echo('Dummy Data Inserted...')
    with current_app.open_resource('DDL/views.sql') as f:
        db.executescript(f.read().decode('utf8'))
        click.echo('Views Created...')


@click.command('init-db')
@with_appcontext
def init_db_command():
    init_db()


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)


def query_db(query, args=(), one=False):
    db = get_db()
    db.execute('PRAGMA foreign_keys = ON')
    cur = db.execute(query, args)
    rv = cur.fetchall()
    res = [dict(zip([key[0] for key in cur.description], row)) for row in rv]
    cur.close()
    return (res[0] if res else []) if one else res
