import numpy as np
import torch
import pickle
import tqdm
from scipy.spatial.distance import cdist

from app.src import NUM_GAMES
from app.src.dataset import SteamDataset
from app.src.metrics import NDCGMetric, MAPMetric


class JaccardModel:

    def __init__(self, data_path, train_ratio, n_neighbors=20):
        self.data_path = data_path
        self.train_ratio = train_ratio
        self._n_neighbors = n_neighbors
        self.ndcg = NDCGMetric(k=20)
        self.map = MAPMetric()
        train, val = self.setup()
        self._train_set = train
        self._val_set = SteamDataset(val)

    def setup(self):
        with open(self.data_path, "rb") as f:
            sequences = pickle.load(f)
        train_size = int(self.train_ratio * len(sequences))
        train_sequences = sequences[:train_size]
        train = torch.zeros((len(train_sequences), NUM_GAMES), dtype=torch.bool)
        for i, seq in enumerate(train_sequences):
            train[i, torch.tensor(seq)] = True
        val_sequences = sequences[train_size:]
        return train, val_sequences

    def validate(self):
        n = len(self._val_set)
        for i in tqdm.tqdm(range(n)):
            data, positive, negative = self._val_set[i]
            data = data[1:]  # drop the CLS token
            recommendations = self.predict(data).reshape(1, -1)
            positive, negative = positive.reshape(1, -1), negative.reshape(1, -1)
            ndcg = self.ndcg(positive, negative, recommendations)
            map = self.map(positive, negative, recommendations)
        total_ndcg = self.ndcg.compute()
        total_mAP = self.map.compute()
        return total_ndcg.item(), total_mAP.item(), n

    def predict(self, sequence):
        binary_games = torch.zeros((1, NUM_GAMES), dtype=torch.bool)
        binary_games[0, sequence] = True
        jaccard_similarity_scores = cdist(binary_games, self._train_set, metric='jaccard').squeeze()
        sorted_indices = np.argsort(jaccard_similarity_scores)
        # exclude perfect match cause they don't give recommendations
        sorted_indices = sorted_indices[jaccard_similarity_scores[sorted_indices] > 0]
        closest_sequences_indices = sorted_indices[:self._n_neighbors]
        # get recommendations
        recommendations = self._train_set[closest_sequences_indices]
        recommendations = recommendations.sum(dim=0)
        return recommendations



