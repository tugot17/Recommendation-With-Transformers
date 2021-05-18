import os
import pickle
import pandas as pd
import tqdm


REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATA_DIR = os.path.join(REPO_ROOT, "data")
SEQUENCES_PATH = os.path.join(DATA_DIR, "sequences.pickle")
DATA_PATH = os.path.join(DATA_DIR, "data.csv.gz")


df = pd.read_csv(DATA_PATH, compression="gzip")
grouped = df.groupby("steamid")
sequences = [list(v) for k, v in tqdm.tqdm(grouped["appid"])]
with open(SEQUENCES_PATH, "wb") as f:
    pickle.dump(sequences, f)
