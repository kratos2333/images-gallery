import distutils
import os
import flask
from flask import Flask, request
import requests
from dotenv import load_dotenv

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")

if not UNSPLASH_KEY:
    raise EnvironmentError("Please create .env.local fle and insert the key")

app = Flask(__name__)

app.config["DEBUG"] = os.environ.get("DEBUG", False).upper() == "TRUE"


@app.route("/new-image")
def new_image():
    word = request.args.get("query")

    headers = {
        "Authorization": f'Client-ID {UNSPLASH_KEY}',
        "Accept-Version": "v1"
    }
    payload = {"query": word}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=payload)
    try:
        data = response.json()
    except ValueError as err:
        flask.abort("Not a valid json")
    return data


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5050)
