import torch
import numpy as np
from torchmetrics import Metric
from sklearn.metrics import ndcg_score, average_precision_score


def get_relevance(i, positive, negative, output):
    all_predictions = torch.logical_or(positive[i], negative[i])

    # True relevance is 1 for games that user bought and 0 for other
    true_relevance = torch.ones_like(output[i])
    true_relevance[negative[i]] = 0

    # Remove scores for games used for prediction
    true_relevance = true_relevance[all_predictions].cpu().numpy()[np.newaxis, ...]
    predicted_relevance = torch.sigmoid(output[i][all_predictions]).cpu().numpy()[np.newaxis, ...]

    return true_relevance, predicted_relevance


class NDCGMetric(Metric):
    def __init__(self, k=20, dist_sync_on_step=False):
        super().__init__(dist_sync_on_step=dist_sync_on_step)
        self.k = k
        self.add_state("scores", default=torch.tensor(0.0), dist_reduce_fx="sum")
        self.add_state("total", default=torch.tensor(0.0), dist_reduce_fx="sum")

    def update(self, positive, negative, output):
        for i in range(len(positive)):
            true_relevance, predicted_relevance = get_relevance(i, positive, negative, output)

            score = ndcg_score(true_relevance, predicted_relevance, k=self.k)
            self.scores += torch.tensor(score)
            self.total += torch.tensor(1.0)

    def compute(self):
        return self.scores.float() / self.total


class MAPMetric(Metric):
    def __init__(self, dist_sync_on_step=False):
        super().__init__(dist_sync_on_step=dist_sync_on_step)
        self.add_state("AP", default=torch.tensor(0.0), dist_reduce_fx="sum")
        self.add_state("total", default=torch.tensor(0.0), dist_reduce_fx="sum")

    def update(self, positive, negative, output):
        for i in range(len(positive)):
            true_relevance, predicted_relevance = get_relevance(i, positive, negative, output)
            true_relevance, predicted_relevance = true_relevance[0].astype(bool), predicted_relevance[0]

            ap = average_precision_score(true_relevance, predicted_relevance)
            #print(f'True rel shape: {true_relevance.shape}, pred shape: {predicted_relevance.shape}, AP: {ap}')
            self.AP += torch.tensor(ap)
            self.total += torch.tensor(1.0)

    def compute(self):
        return self.AP.float() / self.total
