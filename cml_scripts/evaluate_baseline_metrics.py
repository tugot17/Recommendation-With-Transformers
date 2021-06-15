import yaml
from pathlib import Path
from time import time
import json

from app.src.baseline import JaccardModel

with open("params.yaml", "r") as fd:
    params = yaml.safe_load(fd)

TRAIN_SIZE_RATIO = params["train"]["train_size_ratio"]
N_NEIGHBORS = params["baseline"]["n_neighbors"]

ROOT_DIR = Path(__file__).parent.parent
DATA_DIR = ROOT_DIR.joinpath("data")
CML_DIR = ROOT_DIR.joinpath("cml_scripts")
SEQUENCES_PATH = DATA_DIR.joinpath("sequences.pickle")
RESULTS_PATH = CML_DIR.joinpath("baseline_metrics.json")

if __name__ == "__main__":
    baseline = JaccardModel(SEQUENCES_PATH, TRAIN_SIZE_RATIO, N_NEIGHBORS)
    start = time()
    ndcg, mAP, n = baseline.validate()
    end = time()
    validation_time = (end - start) / n
    results = {'time': validation_time, 'mAP': mAP, 'NDCG': ndcg}
    with open(RESULTS_PATH, "w") as fd:
        json.dump(results, fd, indent=4)
