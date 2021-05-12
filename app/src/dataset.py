from torch.utils.data import Dataset
import pickle


class SteamDataset(Dataset):
    def __init__(self, data_path):
        with open(data_path, 'rb') as f:
            sequences = pickle.load(f)
        self.sequences = sequences

    def __getitem__(self, idx):
        return self.sequences[idx]

    def __len__(self):
        return len(self.sequences)
