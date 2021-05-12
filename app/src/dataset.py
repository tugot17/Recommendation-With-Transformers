from torch.utils.data import Dataset
import torch
import random

from app.src import NUM_GAMES, MAXLEN, PAD_TOKEN, CLS_TOKEN


class SteamDataset(Dataset):

    def __init__(self, sequences, lower_bound=0.5, upper_bound=0.8):
        self.sequences = sequences
        num_sequences = len(sequences)
        splits = []
        for i, seq in enumerate(sequences):
            split = int(len(seq) * random.uniform(lower_bound, upper_bound))
            if split > MAXLEN:
                split = MAXLEN
            splits.append(split)
        biggest_len = max(splits)

        data = torch.empty((num_sequences, biggest_len + 1), dtype=torch.int64)
        positive = torch.zeros((num_sequences, NUM_GAMES), dtype=torch.bool)
        negative = torch.ones((num_sequences, NUM_GAMES), dtype=torch.bool)

        for i, seq in enumerate(sequences):
            random.shuffle(seq)
            split = splits[i]

            data[i, 1:1 + split] = torch.tensor(seq[:split], dtype=torch.int64)
            data[i, 1 + split:] = PAD_TOKEN
            positive[i, seq[split:]] = True
            negative[i, seq] = False

        self.data = data
        self.positive = positive
        self.negative = negative

    def __getitem__(self, idx):
        return self.data[idx], self.positive[idx], self.negative[idx]

    def __len__(self):
        return len(self.sequences)
