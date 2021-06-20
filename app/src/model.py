import pytorch_lightning as pl
import torch
from torch.optim import Adam
from transformers import BertConfig, BertModel

from app.src import CLS_TOKEN, MASK_TOKEN, MAXLEN, NUM_GAMES, PAD_TOKEN
from app.src.metrics import NDCGMetric, MAPMetric

HIDDEN_SIZE = 256

bert_config = BertConfig(
    vocab_size=NUM_GAMES + 3,
    hidden_size=HIDDEN_SIZE,
    num_hidden_layers=4,
    num_attention_heads=4,
    pad_token_id=PAD_TOKEN,
)


def loss_fcn(batch_size, positive, negative, output):
    bpr_loss = 0
    for i in range(batch_size):
        pos = output[i][positive[i]]
        neg = output[i][negative[i]]
        x_ij = pos.unsqueeze(-1) - neg
        bpr_loss += -torch.log(torch.sigmoid(x_ij)).sum()
    bpr_loss = bpr_loss / batch_size
    return bpr_loss


class TransformerModel(pl.LightningModule):
    lr = 1e-5

    def __init__(self, config):
        super().__init__()
        self.save_hyperparameters()

        self.model = BertModel(config)
        self.dense = torch.nn.Linear(HIDDEN_SIZE, NUM_GAMES)
        self.ndcg = NDCGMetric(k=20)
        self.map = MAPMetric()

    def forward(self, x, position_ids=None):
        embedding = self.model(x, position_ids=position_ids).pooler_output
        return self.dense(embedding)

    def configure_optimizers(self):
        optimizer = Adam(self.parameters(), self.lr)
        return optimizer

    def training_step(self, batch, batch_idx):
        x, positive, negative = batch
        output = self.forward(x, position_ids=torch.zeros_like(x))
        loss = loss_fcn(x.shape[0], positive, negative, output)

        self.log("train/loss", loss.item())
        return loss

    def validation_step(self, batch, batch_idx):
        x, positive, negative = batch
        output = self.forward(x, position_ids=torch.zeros_like(x))
        loss = loss_fcn(x.shape[0], positive, negative, output)

        self.log("val/loss", loss.item())

        self.ndcg(positive, negative, output)
        self.log("val/ndcg", self.ndcg, on_step=True, on_epoch=True)
        self.map(positive, negative, output)
        self.log("val/map", self.map, on_step=True, on_epoch=True)

        return loss
