const { getProductById, getAllProducts } = require('../db');

const productsRouter =  require('express').Router();


module.exports = productsRouter;



productsRouter.get('/:id', async (req, res, next) => {
    let response = await getProductById(req.params.id)
    if (response) {
        res.render('pages/product', {product: response})
    } else {
        res.sendStatus(404);
    }
})


productsRouter.get('/', async (req, res, next) => {
    let response = await getAllProducts();
    if (response) {
        res.render('pages/products', {products: response})
    }
})

