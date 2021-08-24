const puppeteer = require('puppeteer')
const testURL = "https://www.etsy.com/uk/listing/772695061/brass-or-silver-leaf-bookmark-set"
const testURL2 = "https://www.etsy.com/uk/listing/593579116/plant-enthusiast-bookmarks"
const fetchItemWithURL = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [titleEl] = await page.$x('//*[@id="listing-page-cart"]/div[2]/h1')
    const titleText = await titleEl.getProperty("innerText") 
    const title = await titleText.jsonValue();

    const [priceEl] = await page.$x('//*[@id="listing-page-cart"]/div[3]/div[1]/div[1]/div/div[1]/p')
    const priceText = await priceEl.getProperty('innerText')
    const price = await priceText.jsonValue();
    // const priceText = await

    const [imgEl] = await page.$x('//*[@id="listing-right-column"]/div/div[1]/div[1]/div/div/div/div/div[1]/ul/li[1]/img')
    const imgText = await imgEl.getProperty('src')
    const imgUrl = await imgText.jsonValue();

    console.log({title, price, imgUrl})


    
    await browser.close();
}


fetchItemWithURL('https://www.etsy.com/uk/listing/893937810/any-3-bookmarks-botanical-bookmark-set?ref=sold_out-16')
// fetchItemWithURL(testURL2);