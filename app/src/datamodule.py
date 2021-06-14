import pickle

from pytorch_lightning import LightningDataModule
from torch.nn.utils.rnn import pad_sequence
from torch.utils.data import DataLoader

from app.src import PAD_TOKEN
from app.src.dataset import SteamDataset


def apply_padding(data):
    seqs, positive, negative = zip(*data)
    return (
        pad_sequence(seqs, batch_first=True, padding_value=PAD_TOKEN),
        positive,
        negative,
    )


class SteamDataloader(LightningDataModule):
    def __init__(self, data_path, train_ratio, batch_size, num_workers):
        super().__init__()
        self.data_path = data_path
        self.train_ratio = train_ratio
        self.batch_size = batch_size
        self.num_workers = num_workers

    def setup(self, stage=None):
        with open(self.data_path, "rb") as f:
            sequences = pickle.load(f)
        train_size = int(self.train_ratio * len(sequences))
        train_sequences = sequences[:train_size]
        val_sequences = sequences[train_size:]
        del sequences
        self.train_set = SteamDataset(train_sequences)
        self.val_set = SteamDataset(val_sequences)

    def train_dataloader(self):
        return DataLoader(
            self.train_set,
            batch_size=self.batch_size,
            shuffle=True,
            num_workers=self.num_workers,
            collate_fn=apply_padding,
        )

    def val_dataloader(self):
        return DataLoader(
            self.val_set,
            batch_size=self.batch_size,
            shuffle=False,
            num_workers=self.num_workers,
            collate_fn=apply_padding,
        )
