
import json
from time import time
from pathlib import Path

# from pytorch_lightning.loggers import WandbLogger
import yaml
from pytorch_lightning import Trainer, seed_everything
from pytorch_lightning.callbacks import ModelCheckpoint
from pytorch_lightning.callbacks.early_stopping import EarlyStopping

from app.src.datamodule import SteamDataloader
from app.src.model import TransformerModel, bert_config

with open("params.yaml", "r") as fd:
    params = yaml.safe_load(fd)

epochs = params["train"]["epochs"]
BATCH_SIZE = params["train"]["batch_size"]
TRAIN_SIZE_RATIO = params["train"]["train_size_ratio"]
NUM_WORKERS = params["dataloader"]["num_workers"]


ROOT_DIR = Path(__file__).parent.parent
DATA_DIR = ROOT_DIR.joinpath("data")
CML_DIR = ROOT_DIR.joinpath("cml_scripts")
SEQUENCES_PATH = DATA_DIR.joinpath("sequences.pickle")
RESULTS_PATH = CML_DIR.joinpath("transformer_metrics.json")


if __name__ == "__main__":
    seed_everything(42)

    dm = SteamDataloader(SEQUENCES_PATH, TRAIN_SIZE_RATIO, BATCH_SIZE, NUM_WORKERS)
    dm.setup()

    model = TransformerModel(bert_config).load_from_checkpoint('checkpoints/epoch=4-step=64604.ckpt')
    # model.load_from_checkpoint('checkpoints/epoch=4-step=64604.ckpt')

    logger = None

    trainer = Trainer(
        gpus=1,
        deterministic=True,
        accumulate_grad_batches=2,
        logger=logger,
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
