from pathlib import Path

import torch
import yaml
from app.src.model import TransformerModel, bert_config

with open("params.yaml", "r") as fd:
    params = yaml.safe_load(fd)

CHECKPOINTS_DIR = Path(params["checkpoints_dir"])

BATCH_SIZE = params["train"]["batch_size"]
TRAIN_SIZE_RATIO = params["train"]["train_size_ratio"]
NUM_WORKERS = params["dataloader"]["num_workers"]


ROOT_DIR = Path(__file__).parent.parent
DATA_DIR = ROOT_DIR.joinpath("data")
SEQUENCES_PATH = DATA_DIR.joinpath("sequences.pickle")


def save_model_from_last_checkpoint_as_state_dict(checkpoints_dir: Path) -> None:
    list_of_checkpoints = checkpoints_dir.glob("*.ckpt")

    latest_checkpoint_path = max(list_of_checkpoints, key=lambda p: p.stat().st_ctime)

    lightning_model = TransformerModel(bert_config)

    lightning_model = lightning_model.load_from_checkpoint(latest_checkpoint_path)
    lightning_model.eval()
    lightning_model = lightning_model.cpu()

    torch.save(lightning_model.state_dict(), params["best_model_save_path"])
    print("Saved the latest model at:", params["best_model_save_path"])

if __name__ == "__main__":
    save_model_from_last_checkpoint_as_state_dict(checkpoints_dir=CHECKPOINTS_DIR)
