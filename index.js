const {fetchEtsyProduct} = require('./util/webscrape')
const {db, addToDatabase} = require('./db/index'); 
const express = require('express');

const app = express()
const PORT = process.env.PORT || 3000


app.use(express.static('public'))
app.use(express.urlencoded())
app.use(express.json())
app.set('view engine', 'ejs')

const productsRouter = require('./routes/productsRouter');
app.use('/products', productsRouter)

app.post('/', (req, res, next) => {
    console.log(req.body)
    itemUrlRegexp = new RegExp(/((https?:\/\/|)(www\.)?etsy\.com\/\w+\/listing\/\d+\/(\w+-*)+)/g)
    itemUrl = req.body.product_url.match(itemUrlRegexp)[0]
    fetchEtsyProduct(itemUrl).then(addToDatabase).then(response => {
        res.sendStatus(201)
    }).catch(err => {
        console.error(err)
        res.sendStatus(500);
    });
    
})


app.listen(PORT, () => {
    console.log(PORT + ' is listening!')
})