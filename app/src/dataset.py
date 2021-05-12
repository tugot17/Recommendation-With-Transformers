from torch.utils.data import Dataset


class SteamDataset(Dataset):
    def __init__(self, data):
        self.sequences = data

    def __getitem__(self, idx):
        return self.sequences[idx]

    def __len__(self):
        return len(self.sequences)
