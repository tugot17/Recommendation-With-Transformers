from pytorch_lightning import LightningDataModule
from torch.utils.data import DataLoader
from .dataset import SteamDataset


class SteamDataloader(LightningDataModule):
    def __init__(self, data_path, batch_size, num_workers):
        super().__init__()
        self.data_path = data_path
        self.batch_size = batch_size
        self.num_workers = num_workers

    def setup(self, stage=None):
        dataset = SteamDataset(self.data_path)
        train_size = int(0.9 * len(dataset))
        self.train_set = dataset[:train_size]
        self.val_set = dataset[train_size:]

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