const {Pool} = require('pg');
const  uuidv4 = require('uuid').v4;
require('dotenv').config();
const pool = new Pool({
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASS,
       port: process.env.DB_PORT,
    })

const saveToDatabase = async ({title, price, imgUrl}) => {
    const random_id = uuidv4();
    const priceRegExp = /\d+.\d*/g;
    console.log(price)
    const fixedPrice = price.match(priceRegExp)[0]
    const num_price = Number(fixedPrice);
    console.log(fixedPrice)
    pool.query("INSERT INTO products (id, name, price, img_src) VALUES ($1, $2, $3, $4)", [random_id, title, num_price, imgUrl]).
    catch(err => console.error(err))
}

module.exports = {
    db: pool,
    saveToDatabase
}