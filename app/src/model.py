from transformers import BertConfig, BertModel
from torch.optim import Adam
import pytorch_lightning as pl
import torch

from app.src import NUM_GAMES, MAXLEN, PAD_TOKEN, MASK_TOKEN, CLS_TOKEN

HIDDEN_SIZE = 256

bert_config = BertConfig(
    vocab_size=NUM_GAMES+3,
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
        x_ij = (pos.unsqueeze(-1) - neg)
        bpr_loss += -torch.log(torch.sigmoid(x_ij)).sum()
    bpr_loss = bpr_loss / x.shape[0]
    return bpr_loss.item()


class TransformerModel(pl.LightningModule):
    lr = 1e-5

    def __init__(self, config):
        super().__init__()

        self.model = BertModel(config)
        self.dense = torch.nn.Linear(HIDDEN_SIZE, NUM_GAMES)

    def forward(self, x, position_ids=None):
        embedding = self.bert_model(x, position_ids=position_ids).pooler_output
        return self.dense(embedding)

    def configure_optimizers(self):
        optimizer = Adam(self.parameters(), self.lr)
        return optimizer

    def training_step(self, batch, batch_idx):
        x, positive, negative = batch
        output = self.forward(x, position_ids=torch.zeros_like(x))
        loss = loss_fcn(x, positive, negative, output)

        self.log("train/loss", loss)
        return loss

    def validation_step(self, batch, batch_idx):
        x, positive, negative = batch
        output = self.forward(x, position_ids=torch.zeros_like(x))
        loss = loss_fcn(x, positive, negative, output)

        self.log("val/loss", loss)
        return loss
