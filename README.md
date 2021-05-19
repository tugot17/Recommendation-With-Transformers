[![GitHub last commit](https://img.shields.io/github/last-commit/tugot17/Data-Science-Project-Template)](https://github.com/tugot17/Data-Science-Project-Template/)

# Transformers for recommendation systems

DESCRIPTION

## TL;DR

```
pip install -r app/requirements.txt
```

```
dvc pull
```

```
dvc repro
```

```
jupyter notebook
```

more details below

## How to obtain the dataset

The dataset used in this project comes from [...]()

It was prefiltered to reduce its size (...)

Currently the dataset consist of the following files:

* data.csv.gz - DESCRIPTION
* steamids.json - DESCRIPTION
* appids.json - DESCRIPTION

All of them are stored in the [data](data) directory

The simples way to get it is to use the DVC, just run 

```
dvc pull
```

If you need to pull just one of this files run

```
dvc pull -d data/name_of_your_file
```

## How to run it


and install [requirements.txt](app/requirements.txt)

```
pip install -r app/requirements.txt
```

## Web App

#### Requirements:
- [Node 14.x](https://nodejs.org/en/)

Run:
```
cd webapp
npm install
npm run start
```

#### Mock API

Run:
```
cd mock-api
npm install
npm run start
```


Application should start at `http://localhost:3000/Recommendation-With-Transformers`

## Continuous machine learning


## Authors

* [Kemal Erdem](https://github.com/burnpiro)
* [Piotr Mazurek](https://github.com/tugot17)
* [Marek Pokropiński](https://github.com/MarekPokropinski)
* [Daria Puchalska](https://github.com/d4ria)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
