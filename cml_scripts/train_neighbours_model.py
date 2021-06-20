from pathlib import Path

import yaml
from pytorch_lightning import Trainer, seed_everything
from pytorch_lightning.callbacks import ModelCheckpoint
from pytorch_lightning.callbacks.early_stopping import EarlyStopping

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
CHECKPOINTS_DIR = params["neighbours_checkpoints_dir"]


if __name__ == "__main__":
    seed_everything(42)

    dm = SteamNeighboursDatamodule(TRAIN_DF_PATH, VAL_DF_PATH, BATCH_SIZE, NUM_WORKERS)
    
    print(len(dm.val_df))


    model = NeighboursrModel()

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
        callbacks=[checkpoint_callback, EarlyStopping(monitor="val/loss", patience=5)],
        # resume_from_checkpoint=Path("checkpoints_neighbours/epoch=9-step=2509.ckpt"),
        logger=logger
    )

    # Train model
    trainer.fit(model, dm)
