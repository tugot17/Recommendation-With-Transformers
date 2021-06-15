from typing import List

import pandas as pd
from pathlib import Path
import uvicorn
from fastapi import FastAPI, Query
from starlette.middleware.cors import CORSMiddleware
from model import TransformerModel, bert_config, CLS_TOKEN
import torch

import os

os.environ["KMP_DUPLICATE_LIB_OK"] = "True"

NUMBER_OF_RECOMMENDATIONS = 10

df = pd.read_csv(Path(__file__).parent.joinpath("appids.csv"))
TRANSFORMER_MODEL_PATH = (
    Path(__file__)
    .parent.parent.parent.joinpath("model_state_dicts")
    .joinpath("bert_model.pth")
)

app_to_game_dict = dict(zip(df.appid, df.gameid))
game_to_app_dict = dict(zip(df.gameid, df.appid))

model = TransformerModel(bert_config)
model.load_state_dict(torch.load(TRANSFORMER_MODEL_PATH))
model.eval()


def create_app():
    app = FastAPI()
    # origins = [
    #     "http://localhost:3001",
    #     "https://tugot17.github.io/Recommendation-With-Transformers/",
    # ]

    origins = ["*"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app


app = create_app()


@app.post("/")
def main(app_ids: List[int]) -> List[int]:
    """
    Json in: [1, 2, 3]
    Json out: [5, 6, 7]
    """
    print(f"Games: {app_ids}")
    app_ids = list(filter(lambda app_id: app_id in app_to_game_dict.keys(), app_ids))
    print(f"Games after filtration of those not in database: {app_ids}")

    oiginal_game_ids = list(map(lambda app_id: app_to_game_dict[app_id], app_ids))
    game_ids = [CLS_TOKEN] + oiginal_game_ids
    game_ids = torch.tensor(game_ids)
    game_ids = torch.unsqueeze(game_ids, 0)

    with torch.no_grad():
        output = model(game_ids)

    # remove games already possessed by a user
    output[:, oiginal_game_ids] = -float("inf")

    best_games_for_user = (
        torch.argsort(output, descending=True)[:, :NUMBER_OF_RECOMMENDATIONS]
        .flatten()
        .tolist()
    )
    best_games_for_user = list(
        map(lambda game_id: game_to_app_dict[game_id], best_games_for_user)
    )

    return best_games_for_user


if __name__ == "__main__":
    # print(main([237570, 65560, 24610, 8230, 254000, 8250, 98400]))
    uvicorn.run(app, host="localhost", port=3001)
