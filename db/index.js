const { Pool } = require('pg');
const uuidv4 = require('uuid').v4;
require('dotenv').config();
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
})

//AUTOMATICALLY CREATE TABLE IF IT DOESN'T EXIST
pool.query('SELECT * FROM products LIMIT 1', []).then(result => {
}).catch(err => {
    console.error(err)
    //'42P01' - table doesn't exist
    if (err.code == '42P01') {
        pool.query('CREATE TABLE products (id text PRIMARY KEY, title text, img_src text, price float)').catch(console.error)
    }
})


const addToDatabase = async ({ title, price, imgUrl }) => {
    if (!title || !price || !imgUrl) console.error("There is a null value!")
    const random_id = uuidv4();
    return pool.query("INSERT INTO products (id, title, price, img_src) VALUES ($1, $2, $3, $4)", [random_id, title, price, imgUrl])
        .then(() => {
         return {id: random_id, title, price, imgUrl}   
        })
        .catch(err => {
            console.error(err)
            //23505 - duplicate key violates unique constraint
            if (err.code == 23505) {
                console.log('retrying to generate key')
                addToDatabase({ title, price, imgUrl })
            }
        })
}

const getProductById = async id => {
    return pool.query('SELECT * FROM products WHERE id = $1', [id])
        .then(result => {
            return result.rows[0]
        })
}

const getAllProducts = async () => {
    return pool.query('SELECT * FROM products')
        .then(response => response.rows)
}

module.exports = {
    db: pool,
    addToDatabase,
    getProductById,
    getAllProducts
}