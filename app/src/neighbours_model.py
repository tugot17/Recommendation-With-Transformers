import pytorch_lightning as pl
import torch
from torch.optim import Adam

from app.src import NUM_GAMES
from app.src.metrics import NDCGMetric, MAPMetric
from app.src.model import HIDDEN_SIZE, loss_fcn



class NeighboursrModel(pl.LightningModule):
    lr = 1e-5

    def __init__(self):
        """
        Model as an input takes embedding generated by transformer model, and and average embedding of people
        to which he/she is connected in the steam database. Based on that the final pred is made.
        """
        super().__init__()
#        self.save_hyperparameters()

        self.dense = torch.nn.Linear(HIDDEN_SIZE*2, NUM_GAMES)
        self.ndcg = NDCGMetric(k=20)
        self.map = MAPMetric()

    def forward(self,  user_and_neighbours_embedding):
        return self.dense(user_and_neighbours_embedding)

    def configure_optimizers(self):
        optimizer = Adam(self.parameters(), self.lr)
        return optimizer

    def training_step(self, batch, batch_idx):
        user_and_neighbours_embedding, positive, negative = batch
        output = self.forward(user_and_neighbours_embedding)

        loss = loss_fcn(user_and_neighbours_embedding.shape[0], positive, negative, output)

        self.log("train/loss", loss.item())
        return loss

    def validation_step(self, batch, batch_idx):
        user_and_neighbours_embedding, positive, negative = batch
        output = self.forward(user_and_neighbours_embedding)

        loss = loss_fcn(user_and_neighbours_embedding.shape[0], positive, negative, output)

        self.log("val/loss", loss.item())
        self.ndcg(positive, negative, output)
        self.log("val/ndcg", self.ndcg, on_step=True, on_epoch=True)
        self.map(positive, negative, output)
        self.log("val/map", self.map, on_step=True, on_epoch=True)

        return loss
