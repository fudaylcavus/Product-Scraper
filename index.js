const {fetchEtsyProduct} = require('./util/webscrape')
const {db, saveToDatabase} = require('./db/index'); 

const testURL = "https://www.etsy.com/uk/listing/772695061/brass-or-silver-leaf-bookmark-set"
const testURL2 = "https://www.etsy.com/uk/listing/593579116/plant-enthusiast-bookmarks"// fetchItemWithURL(testURL2);
const response = fetchEtsyProduct('https://www.etsy.com/uk/listing/787909515/vintage-womens-scarf-pink-gray-black?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=kevser&ref=sr_gallery-1-2&organic_search_click=1').then(saveToDatabase).then(
db.query('SELECT * FROM products', []).then(result => {
    console.log(result.rows)
}).catch(err => {

        console.error(err)
        db.query('CREATE TABLE products (id text PRIMARY KEY, name varchar(100), img_src text, price float)').then(result => {
            console.log(result.rows[0])
        })
    })
)
// fetchEtsyProduct('https://www.etsy.com/uk/listing/677809167/pride-and-prejudice-book-bag-jane-austen?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=book&ref=sc_gallery-1-3&plkey=149723c4f25698af696915355a48ccafb93b6c86%3A677809167&frs=1&pop=1

