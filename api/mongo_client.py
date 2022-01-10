from dotenv import load_dotenv
from pymongo import MongoClient
import os

from pymongo.collection import Collection

load_dotenv(dotenv_path="./.env.local")

MONGO_URL = os.environ.get("MONGO_URL", "mongo")
MONGO_USERNAME = os.environ.get("MONGO_USERNAME", "kevinjia")
MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD", "19840619")
MONGO_PORT = os.environ.get("MONGO_PORT", 27017)


mongo_client = MongoClient(
    host=MONGO_URL,
    username=MONGO_USERNAME,
    password=MONGO_PASSWORD,
    port=MONGO_PORT
)


def insert_test_document():
    """Insert sample document to the test_collection"""
    # create test database if absent
    db = mongo_client.test
    test_collection: Collection = db.test_collection
    res = test_collection.insert_one({"name": "kevinjia", "student": True})
    print(res)