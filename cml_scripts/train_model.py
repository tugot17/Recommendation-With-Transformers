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
SEQUENCES_PATH = DATA_DIR.joinpath("sequences.pickle")
CHECKPOINTS_DIR = Path("checkpoints")


if __name__ == "__main__":
    seed_everything(42)

    dm = SteamDataloader(SEQUENCES_PATH, TRAIN_SIZE_RATIO, BATCH_SIZE, NUM_WORKERS)

    model = TransformerModel(bert_config)

    checkpoint_callback = ModelCheckpoint(
        dirpath=CHECKPOINTS_DIR,
        save_top_k=1,
        verbose=True,
        monitor="val/loss",
        mode="min",
    )

    logger = None

    trainer = Trainer(
        max_epochs=epochs,
        gpus=1,
        deterministic=True,
        accumulate_grad_batches=2,
        checkpoint_callback=checkpoint_callback,
        callbacks=[EarlyStopping(monitor="val/loss", patience=5)],
        logger=logger,
    )

    # Train model
    trainer.fit(model, dm)
