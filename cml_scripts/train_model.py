import os
import sys
from pytorch_lightning import Trainer, seed_everything
from pytorch_lightning.callbacks.early_stopping import EarlyStopping

from pathlib import Path
sys.path.append(str(Path(__file__).parent.parent))

from app.src.model import TransformerModel, bert_config
from app.src.datamodule import SteamDataloader



REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATA_DIR = os.path.join(REPO_ROOT, "data")
SEQUENCES_PATH = os.path.join(DATA_DIR, "sequences.pickle")
CHECKPOINTS_DIR = os.path.join(REPO_ROOT, "model_checkpoints")
BATCH_SIZE = 200
NUM_WORKERS = 1
TRAIN_RATIO = 0.9


if __name__ == "__main__":
    seed_everything(42)

    dm = SteamDataloader(SEQUENCES_PATH, TRAIN_RATIO, BATCH_SIZE, NUM_WORKERS)

    model = TransformerModel(bert_config)
    trainer = Trainer(
        default_root_dir=CHECKPOINTS_DIR,
        max_epochs=1,
        gpus=1,
        deterministic=True,
        accumulate_grad_batches=2,
        # callbacks=[EarlyStopping(monitor="val/loss")]
    )

    # Train model
    trainer.fit(model, dm)
