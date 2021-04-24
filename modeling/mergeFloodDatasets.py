import pandas as pd
import os
from tqdm import tqdm

detdfs = {}

floodcsv = [os.path.join("data", i) for i in os.listdir("data") if "details" in i]

for csvname in tqdm(floodcsv, leave=False):
    year = csvname.split("_")[3][1:]
    detdfs[year] = pd.read_csv(csvname, low_memory=False)
detdf = pd.concat(detdfs)

detdf = detdf[(detdf['EVENT_TYPE']=="Flash Flood") | (detdf['EVENT_TYPE']=="Flood")]

detdf = detdf[['BEGIN_YEARMONTH', 'BEGIN_DAY', 'BEGIN_TIME', 'END_YEARMONTH',
       'END_DAY', 'END_TIME', 'EVENT_ID', "EVENT_TYPE", "DAMAGE_PROPERTY", "DAMAGE_CROPS", "DEATHS_DIRECT", "DEATHS_INDIRECT", "INJURIES_DIRECT", "INJURIES_INDIRECT", "BEGIN_LAT", "BEGIN_LON", "END_LAT", "END_LON"]]

detdf.dropna(inplace=True)

print("length: ", len(detdf))
print(detdf.head())

detdf.to_csv("data/Flood_Incidents.csv")
