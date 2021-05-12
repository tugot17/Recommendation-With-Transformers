from pytorch_lightning import LightningDataModule
from torch.utils.data import DataLoader
import pickle

from app.src.dataset import SteamDataset


class SteamDataloader(LightningDataModule):

    def __init__(self, data_path, train_ratio, batch_size, num_workers):
        super().__init__()
        self.data_path = data_path
        self.train_ratio = train_ratio
        self.batch_size = batch_size
        self.num_workers = num_workers

    def setup(self, stage=None):
        with open(self.data_path, 'rb') as f:
            sequences = pickle.load(f)
        train_size = int(self.train_ratio * len(sequences))
        self.train_set = SteamDataset(sequences[:train_size])
        self.val_set = SteamDataset(sequences[train_size:])

    def train_dataloader(self):
        return DataLoader(
            self.train_set, batch_size=self.batch_size,
            shuffle=True, num_workers=self.num_workers
        )

    def val_dataloader(self):
        return DataLoader(
            self.val_set, batch_size=self.batch_size,
            shuffle=False, num_workers=self.num_workers
        )