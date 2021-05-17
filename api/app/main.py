from fastapi import FastAPI
import uvicorn
from starlette.responses import RedirectResponse

from app.endpoints import bert_recommendation_endpoint


def create_app():
    app = FastAPI()
    app.include_router(
        bert_recommendation_endpoint.router,
        tags=["model_1_tags"],
        responses={404: {"description": "Not found"}},
    )
    return app


app = create_app()


@app.get("/")
async def main():
    url = "/docs"
    response = RedirectResponse(url=url)
    return response


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8011)
