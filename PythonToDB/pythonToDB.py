import firebase_admin
from firebase_admin import db
import json

def createJson(location: str, date: str, lat: float, long: float, severity: int, status: bool, time: int):
	floodInstance = {
		"location" : location,
		"date" : date,
		"latitude" : lat,
		"longitude" : long,
		"severity" : severity,
		"status" : status,
		"time" : time
	}
	floodInstanceJSON = json.dumps(floodInstance)
	return floodInstanceJSON

cred_obj = firebase_admin.credentials.Certificate('flooddetection-710f1-default-rtdb-export.json')
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL':'https://flooddetection-710f1-default-rtdb.firebaseio.com/warnings'
	})

ref = db.reference("https://flooddetection-710f1-default-rtdb.firebaseio.com/warnings")

