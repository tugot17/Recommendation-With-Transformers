import pytorch_lightning as pl
import torch
from transformers import BertConfig, BertModel

NUM_GAMES = 2691
PAD_TOKEN = NUM_GAMES
MASK_TOKEN = NUM_GAMES + 1
CLS_TOKEN = NUM_GAMES + 2

HIDDEN_SIZE = 256

bert_config = BertConfig(
    vocab_size=NUM_GAMES + 3,
    hidden_size=HIDDEN_SIZE,
    num_hidden_layers=4,
    num_attention_heads=4,
    pad_token_id=PAD_TOKEN,
)


class TransformerModel(pl.LightningModule):
    def __init__(self, config):
        super().__init__()
        self.save_hyperparameters()

        self.model = BertModel(config)
        self.dense = torch.nn.Linear(HIDDEN_SIZE, NUM_GAMES)

    def forward(self, x, position_ids=None):
        embedding = self.model(x, position_ids=position_ids).pooler_output
        return self.dense(embedding)
