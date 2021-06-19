import torch
from torch.utils.data import Dataset

from app.src import NUM_GAMES


class SteamNeighbourDataset(Dataset):
    def __init__(self, df):
        self.df = df

    def __getitem__(self, idx):
        user_embedding = torch.tensor(self.df["embeddings"][idx])
        neighbours_embedding = torch.tensor(self.df["neigbours embeddings"][idx])

        games = self.df["games"][idx]
        games = list(map(lambda s: int(s), games.replace("[", "").replace("]", "").replace(",", "").split(" ")))

        to_predict = self.df["to predict"][idx]
        to_predict = list(
            map(lambda s: int(s), to_predict.replace("[", "").replace("]", "").replace(",", "").split(" ")))

        user_and_neighbours_embedding = torch.cat((user_embedding, neighbours_embedding), dim=0)

        positive = torch.zeros(NUM_GAMES, dtype=torch.bool)
        negative = torch.ones(NUM_GAMES, dtype=torch.bool)

        positive[to_predict] = True

        negative[games] = False
        negative[to_predict] = False

        return user_and_neighbours_embedding, positive, negative

    def __len__(self):
        return len(self.df)