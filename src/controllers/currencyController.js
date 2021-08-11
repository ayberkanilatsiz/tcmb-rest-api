const { Router } = require('express');
const moment = require('moment')
const { getCurrenciesWithDate, getCurrenciesWithSelectedDate, getCurrenciesWithMonth } = require('../helpers/tcmbWrapper');

const router = Router();

router.get('/yestarday', async (req, res) => {
  const yestarday = moment().subtract(1,"days");
  try{
    const currencies = await getCurrenciesWithDate(yestarday);
    res.send({
      currencies,
      done:true
    });
  }catch(e){
    res.status(400);
    res.send({
      done:false,
      error:e.message
    })
  }
});

router.get('/month',async(req,res) => {
  const { query } = req;
  const { date } = query;
  try{
    const currencies = await getCurrenciesWithMonth(date);
    res.send({
      months:currencies,
      done:true
    })
  }catch(e){
    res.status(400);
    res.send({
      done:false,
      error:e.message
    })
  }
  
})

router.get('/', async (req,res) => {
  const { query } = req;
  const { date } = query;
  try{
    const {currencies} = await getCurrenciesWithSelectedDate(date);

    res.send({
      currencies,
      date,
      done:true
    })
  }catch(e){
    res.status(400);
    res.send({
      done:false,
      error:e.message
    })
  }
})

module.exports = router;