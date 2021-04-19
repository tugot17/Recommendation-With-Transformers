import os
import gzip
import shutil

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATA_DIR = os.path.join(REPO_ROOT, "data")
FILE_DIR_IN = os.path.join(DATA_DIR, "data.csv.gz")
FILE_DIR_OUT = os.path.join(DATA_DIR, "data.csv")

with gzip.open(FILE_DIR_IN, 'rb') as f_in:
    with open(FILE_DIR_OUT, 'wb') as f_out:
        shutil.copyfileobj(f_in, f_out)

