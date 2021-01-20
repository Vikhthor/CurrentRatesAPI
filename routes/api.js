const { default: axios } = require('axios');
const express = require('express');
const https = require('https');

const router = express.Router();

/* GET Rates. */
router.get('/rates', async (req, res, next) => {
  if(!req.query.base || !req.query.currency){
    res.status(400).json({message: "Base and Currency required"});
    return;
  }
  try{
    const base = req.query.base;
    const currencies = req.query.currency.split(',');

    const options = {
      hostname: 'api.exchangeratesapi.io',
      path: '/latest/?base=' + base + '&currency=' + req.query.currency,
      method: "GET",
    }
    //res.send(options.hostname+options.path)
    let data = '';
    let rates = {};
    const curRates = await https.request(options, function(resp){
      resp.on('data', async function(chunk){
        data += chunk;
      });
      resp.on('end', async () =>{
        data = JSON.parse(data)
        if(data.error){
          res.status(404).json(data);
        }
        await currencies.map((cur) => {
          if(typeof data.rates[cur] == 'undefined'){
            res.status(404).json({error: cur + ' is currently not supported'});
            return;
          }
          return rates[cur] = data.rates[cur];
        });
        const fxRates = {
          results: {
            base,
            date: new Date(),
            rates
          },
        }
        res.status(201).json(fxRates);
      })
    });
    curRates.on('error', function(err){
      console.error(err)
    })
    curRates.end();

  } catch{
    res.status(500).json({error: "Something went wrong"});
  }
});

module.exports = router;
