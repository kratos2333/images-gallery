import os

import flask
import requests
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from mongo_client import mongo_client

# create database and collection if not there
# if there the api will just fetch the existing one
gallery = mongo_client.gallery
images_collection = gallery.images

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = os.environ.get("DEBUG", False).upper() == "TRUE"

if not UNSPLASH_KEY:
    raise EnvironmentError("Please create .env.local fle and insert the key")

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG


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


@app.route("/images", methods=["GET", "POST"])
def images():
    # read from db
    if request.method == "GET":
        images = images_collection.find({})
        # flask won't convert list to json so we need to have the jsonify
        return jsonify([image for image in images])
    if request.method == "POST":
        image = request.get_json()
        # this will tell mongo not auto generate _id
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5050)
