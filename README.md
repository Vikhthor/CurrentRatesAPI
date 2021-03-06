# CurrencyRates API

The CurrencyRates API is a simple RESTful API that uses Nodejs for the HTTP server and a third-party API [exchangeratesapi.io](https://exchangeratesapi.io) which is used for getting latest exchange rate for for specific currencies against a base currency. Currencies are represented by their 3-lettered symbol e.g GBP, USD.

## Using the API

You can access the live API on Heroku using https://intense-ravine-77632.herokuapp.com/ as the base URI (e.g https://intense-ravine-77632.herokuapp.com/api/rates?base=EUR&currency=GBP,USD)


### Local Machine

Clone the repository [here](https://github.com/Vikhthor/CurrentRatesAPI).

To run the API on the local host, you need to have Nodejs and npm installed installed and running.

In the cloned repository directory, run the commands:

1. Install dependencies

> $ npm install

2. Start the application

> $ npm start

The API endpoints will then be exposed on:

> http://localhost:3000

(e.g localhost:3000/api/rates?base=EUR&currency=GBP,USD)

(Note that the API does not currently support all currencies. The API notifies you if a given base currency is not supported)
