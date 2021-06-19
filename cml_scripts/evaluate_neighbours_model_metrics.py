
import json
from time import time
from pathlib import Path

import yaml
from pytorch_lightning import Trainer, seed_everything

from app.src.neighbours_datamodule import SteamNeighboursDatamodule
from app.src.neighbours_model import NeighboursrModel

with open("params.yaml", "r") as fd:
    params = yaml.safe_load(fd)

epochs = params["train_neighbours"]["epochs"]
BATCH_SIZE = params["train_neighbours"]["batch_size"]
NUM_WORKERS = params["dataloader"]["num_workers"]

ROOT_DIR = Path(__file__).parent.parent
DATA_DIR = ROOT_DIR.joinpath("data")
TRAIN_DF_PATH = DATA_DIR.joinpath("train_data.pickle")
VAL_DF_PATH = DATA_DIR.joinpath("val_data.pickle")
CML_DIR = ROOT_DIR.joinpath("cml_scripts")

CHECKPOINT_PATH = Path("checkpoints_neighbours/epoch=9-step=2509.ckpt")
RESULTS_PATH = CML_DIR.joinpath("neighbours_metrics.json")

if __name__ == "__main__":
    seed_everything(42)

    dm = SteamNeighboursDatamodule(TRAIN_DF_PATH, VAL_DF_PATH, BATCH_SIZE, NUM_WORKERS)
    dm.setup()

    model = NeighboursrModel().load_from_checkpoint(CHECKPOINT_PATH)
    # model.load_from_checkpoint('checkpoints/epoch=4-step=64604.ckpt')

    trainer = Trainer(
        gpus=1,
        deterministic=True,
        logger=None,
    )

    # Test model
    val_dataloader = dm.val_dataloader()
    data_size = len(val_dataloader)*BATCH_SIZE
    start = time()
    val = trainer.validate(model, dm.val_dataloader())
    end = time()
    validation_time = (end - start)/(data_size)
    results = {'time': validation_time, 'mAP': val[0]['val/map'], 'NDCG': val[0]['val/ndcg']}
    with open(RESULTS_PATH, 'w') as fd:
        json.dump(results, fd, indent=4)
