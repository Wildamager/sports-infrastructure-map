import json
import os
from pathlib import Path

from flask import Flask, jsonify, render_template

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / 'static' / 'map' / 'test_map.geojson'

app = Flask(__name__)
application = app

_data_cache = None


def load_data() -> dict:
    """Read the GeoJSON once and keep it in memory for the process lifetime."""
    global _data_cache
    if _data_cache is None:
        with open(DATA_FILE, encoding='utf-8') as source:
            _data_cache = json.load(source)
    return _data_cache


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@app.route('/analytics')
def analytics():
    return render_template('analytics.html')


@app.route('/recommendations')
def recommendations():
    return render_template('recommendations.html')


@app.route('/data')
def data():
    return jsonify(load_data())


if __name__ == '__main__':
    app.run(
        host=os.environ.get('HOST', '127.0.0.1'),
        port=int(os.environ.get('PORT', 5000)),
        debug=os.environ.get('FLASK_DEBUG', '0') == '1',
    )