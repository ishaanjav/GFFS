from operator import le
import pandas as pd
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import json
from tqdm import tqdm
import numpy as np

cred_obj = firebase_admin.credentials.Certificate('flooddetection-710f1-firebase-adminsdk-ry9mj-cbc3f6466f.json')
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL':'https://flooddetection-710f1-default-rtdb.firebaseio.com/warnings'
	})

df = pd.read_csv("../modeling/data/dashboard_data.csv")
df = df.dropna()
df = df.sample(n=729)

flood_dashboard = {}

for idx, row in tqdm(df.iterrows(), total=len(df), leave=False):
    lat=row['lat']
    lon=row['lon']
    flood_dashboard[idx] = {"lat": lat, "lon": lon, "estimated_severity": np.random.randint(0, 10), "country": row["country"],
    }

flood_dashboard = json.loads(json.dumps(flood_dashboard))
ref = db.reference("/dashboard_floods")
ref.set(flood_dashboard)

# print(flood_dashboard)
print(df['lat'].describe())