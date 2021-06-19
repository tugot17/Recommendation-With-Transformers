import pickle

from pytorch_lightning import LightningDataModule
from torch.utils.data import DataLoader

from app.src.dataset import SteamDataset
from pathlib import Path


class SteamNeighboursDatamodule(LightningDataModule):
    def __init__(
        self, train_df_path: Path, val_df_path: Path, batch_size: int, num_workers: int
    ):
        super().__init__()
        self.batch_size = batch_size
        self.num_workers = num_workers

        with open(train_df_path, "rb") as f:
            self.train_df = pickle.load(f)

        with open(val_df_path, "rb") as f:
            self.val_df = pickle.load(f)

    def setup(self, stage=None):
        self.train_set = SteamDataset(self.train_df)
        self.val_set = SteamDataset(self.val_df)

    def train_dataloader(self):
        return DataLoader(
            self.train_set,
            batch_size=self.batch_size,
            shuffle=True,
            num_workers=self.num_workers,
        )

    def val_dataloader(self):
        return DataLoader(
            self.val_set,
            batch_size=self.batch_size,
            shuffle=False,
            num_workers=self.num_workers,
        )
