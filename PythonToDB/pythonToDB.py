import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import json

def createJson(location: str, date: str, lat: float, long: float, severity: int, status: bool, time: int):
	floodInstance = {
		"date" : date,
		"latitude" : lat,
		"longitude" : long,
		"severity" : severity,
		"status" : status,
		"time" : time
	}
	floodInstanceJSON = json.dumps(floodInstance)
	return floodInstanceJSON

cred_obj = firebase_admin.credentials.Certificate('PythonToDB\\flooddetection-710f1-firebase-adminsdk-ry9mj-cbc3f6466f.json')
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL':'https://flooddetection-710f1-default-rtdb.firebaseio.com/warnings'
	})

# ref = db.reference("https://flooddetection-710f1-default-rtdb.firebaseio.com/warnings")

sampleJson = createJson("plano", "4-24-2021:", 33.0198, 96.6989, 8, True, 2213)
ref = db.reference("/warnings/" + "plano")
ref.push().set(sampleJson)
