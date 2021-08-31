const {Pool} = require('pg');
const  uuidv4 = require('uuid').v4;
const pool = new Pool({
       host: "localhost",
       user: "postgres",
       password: "Ed1102375",
       port: 5432,
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