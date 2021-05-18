import pytorch_lightning as pl
import torch
from sklearn.metrics import ndcg_score
from torch.optim import Adam
from torchmetrics import Metric
from transformers import BertConfig, BertModel

from app.src import CLS_TOKEN, MASK_TOKEN, MAXLEN, NUM_GAMES, PAD_TOKEN

HIDDEN_SIZE = 256

bert_config = BertConfig(
    vocab_size=NUM_GAMES + 3,
    hidden_size=HIDDEN_SIZE,
    num_hidden_layers=4,
    num_attention_heads=4,
    pad_token_id=PAD_TOKEN,
)


def loss_fcn(x, positive, negative, output):
    bpr_loss = 0
    for i in range(x.shape[0]):
        pos = output[0][positive[0]]
        neg = output[0][negative[0]]
        x_ij = pos.unsqueeze(-1) - neg
        bpr_loss += -torch.log(torch.sigmoid(x_ij)).sum()
    bpr_loss = bpr_loss / x.shape[0]
    return bpr_loss


class NDCGMetric(Metric):
    def __init__(self, k=20, dist_sync_on_step=False):
        super().__init__(dist_sync_on_step=dist_sync_on_step)
        self.k = k
        self.add_state("scores", default=torch.tensor(0.0), dist_reduce_fx="sum")
        self.add_state("total", default=torch.tensor(0.0), dist_reduce_fx="sum")

    def update(self, positive, negative, output):
        true_relevance = positive[negative]
        predicted_relevance = torch.sigmoid(output[negative])
        for i in range(positive.shape[0]):
            score = ndcg_score(true_relevance[i], predicted_relevance[i], k=self.k)
            self.scores += torch.tensor(score)
            self.total += torch.tensor(1.0)

    def compute(self):
        return self.scores.float() / self.total


class TransformerModel(pl.LightningModule):
    lr = 1e-5

    def __init__(self, config):
        super().__init__()
        self.save_hyperparameters()

        self.model = BertModel(config)
        self.dense = torch.nn.Linear(HIDDEN_SIZE, NUM_GAMES)
        self.ndcg = NDCGMetric(k=20)

    def forward(self, x, position_ids=None):
        embedding = self.model(x, position_ids=position_ids).pooler_output
        return self.dense(embedding)

    def configure_optimizers(self):
        optimizer = Adam(self.parameters(), self.lr)
        return optimizer

    def training_step(self, batch, batch_idx):
        x, positive, negative = batch
        output = self.forward(x, position_ids=torch.zeros_like(x))
        loss = loss_fcn(x, positive, negative, output)

        self.log("train/loss", loss.item())
        return loss

    def validation_step(self, batch, batch_idx):
        x, positive, negative = batch
        output = self.forward(x, position_ids=torch.zeros_like(x))
        loss = loss_fcn(x, positive, negative, output)

        self.log("val/loss", loss.item())
        # self.ndcg(positive, negative, output)
        # self.log("val/ndcg", self.ndcg, on_step=True, on_epoch=True)

        return loss
