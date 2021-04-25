# Collecting each of the following features for all the flood incidents in Flood_Incidents.csv

# - Water Body Data: proximity to water bodies
# - Dam data: proximity to dams
# - Lithology Data: Different types of rocks have different porousness

# Other file collects these:
# - Precipitation Data: Antecedent Rainfall Index
# - Elevation Data: is there a water body nearby with elevation higher than city location?
# - Deforestation Data: Trees absorb water and hold soil in place. When they're cut down, erosion increases risk of floods

import os
import numpy as np
import pandas as pd
from tqdm import tqdm

from math import cos, asin, sqrt, pi

def distance(lat1, lon1, lat2, lon2):
    p = pi/180
    a = 0.5 - cos((lat2-lat1)*p)/2 + cos(lat1*p) * cos(lat2*p) * (1-cos((lon2-lon1)*p))/2
    return 12742 * asin(sqrt(a))

class FeatureCollector():
    def __init__(self):
        self.base_dir = "data"
        self.floods_dir = "data/Flood_Incidents.csv"
        self.dams_dir = "data/Dams.csv"
        self.litho_dir = "data/litho"
        self.water_dir = "data/water"

        self.floods = pd.read_csv(self.floods_dir)
        self.dataset = self.floods.copy()
    
    def collect_dams(self):
        min_dists = [-1 for _ in range(len(self.floods))]
        self.dams = np.array(pd.read_csv(self.dams_dir))
        
        print("Collecting dam data...")
        for idx, row in tqdm(self.floods.iterrows(), total=len(self.floods), leave=False):
            lat = row['BEGIN_LAT']
            lon = row['BEGIN_LON']
            distances = [distance(lat, lon, damlat, damlon) for damlat, damlon in self.dams]

            min_dists[idx] = np.min(distances)
            # print(min_dists[idx])
            
        self.dataset['DAMS'] = min_dists
        print("Finished!\n")
    
    def collect_water(self):
        pass
    
    def to_csv(self, dir):
        self.dataset.to_csv(dir)




collector = FeatureCollector()
collector.collect_dams()

# export to a Global Flood Incidents and Features dataset
collector.to_csv("data/GFIF.csv")