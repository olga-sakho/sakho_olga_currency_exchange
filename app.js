var express = require('express');
const app = express();
const port = 5000;
const fs = require('fs');
const axios = require('axios').default;
var request = require("request");
var cheerio = require("cheerio");

app.set('view engine', 'pug');

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 



app.get('/', function (req, res) {
      res.render('index');
});

app.get('/list', function (req, res){
  request('https://www.iban.ru/currency-codes', function (error, response, body) {
    if (!error) {
      var arrCode = []
      var $ = cheerio.load(body)
            $('tbody tr').each(function (i, tr) {
              var trResult = $(tr).text()
              var trSplit = trResult.split("\n");
              var trFilter = trSplit.filter(element => element !== '');

             
              let tableCode = {
                  nameOfCurrency: trFilter[1],
                  countryCode: trFilter[2],
                  currencyCode: +trFilter[3]
                }
                arrCode.push(tableCode)
                
                //console.log(arrCode)


                /*fs.writeFile('codeAndCountry.json', JSON.stringify(arrCode.reverse()), (err) => {
                    if (err) console.log(err);
                    else {
                      console.log('successfully write');
                    }
                  });*/
              
                  //fs.writeFileSync('codeAndCountry.json', JSON.stringify(arrCode.reverse()));
                  //console.log("The file was saved!");
              })
    
      
    } else {
        console.log("Произошла ошибка: " + error); 
    }

  });
});



/*app.post('/list', function (req, res) {
  res.json(req.body)
  const fileObject = fs.readFileSync('C:/Users/olga/myRepo/JS_curses/cinema/public/js/orderSeat.json', 'utf8');

  try {
    fs.writeFileSync('C:/Users/olga/myRepo/JS_curses/cinema/public/js/orderSeat.json', JSON.stringify(req.body, 'utf8'));
    console.log("The file was saved!");
  }
  catch(err) {
    console.log(err);
  }
})*/



app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})