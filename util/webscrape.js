const puppeteer = require('puppeteer')

const fetchEtsyProduct = async (url) => {
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

    // console.log({title, price, imgUrl})

    await browser.close();
    return {title, price, imgUrl} 
}


module.exports = {
 fetchEtsyProduct
}