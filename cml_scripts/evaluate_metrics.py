import json
from os.path import join, realpath, dirname

METRICS_PATH = join(dirname(realpath(__file__)), "metrics.json")

my_metric = 0.0

with open(METRICS_PATH, "w") as outfile:
    json.dump({"my_metric": my_metric}, outfile)
