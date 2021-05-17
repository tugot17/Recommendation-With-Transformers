from fastapi import APIRouter, Query
from typing import List

from app.docker_logs import get_logger

router = APIRouter(
    prefix="/bert_recommendation_endpoint",
)

logger = get_logger("bert-recommendation-logger")


def convert_game_id_to_app_id(game_id: int):
    pass


def convert_app_id_to_game_id(game_id: int):
    pass


@router.post("/predict")
async def predict_best_games_for_user(game_ids: List[int] = Query([])) -> List[int]:
    """
    Json in: [1, 2, 3]
    Json out: [5, 6, 7]
    """

    best_games_for_user = [
        72850,
        550,
        400,
        105600,
        43110,
        55230,
        42910,
        4560,
        22380,
        9340,
        50620,
        49520,
    ]

    logger.info("Predicted games")

    return best_games_for_user
