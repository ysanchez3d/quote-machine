var express = require('express');
var router = express.Router();
const axios = require("axios");


const API = "https://api.api-ninjas.com/v1/quotes?";


let favoriteQuotes = [
  {
    quote:
      "There are two ways of spreading light: to be the candle or the mirror that reflects it.",
    author: "Edith Wharton",
    category: "inspirational",
  },
  {
    quote:
      "There are two ways of spreading light: to be the candle or the mirror that reflects it.",
    author: "Edith Wharton",
    category: "inspirational",
  }
];

const getNewQuote = async function(category) {
  const response = await axios.get(API + `category=${category}`, {
     headers: {
      "x-api-key": process.env.API_KEY
    }
  });

  return response.data[0];
}

/* GET home page. */
router.get('/quote', async function(req, res, next) {
  const category = req.query.category || "inspirational"
  currentQuote = await getNewQuote(category);
  return res.json(currentQuote);
});

module.exports = router;
