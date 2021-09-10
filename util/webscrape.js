const puppeteer = require('puppeteer')

const fetchEtsyProduct = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [errMsgEl] = await page.$x('/html/body/div/main/div/div/h2/span');
    const errMsg = await (await errMsgEl.getProperty('innerText')).jsonValue();

    if (errMsg) {
        return null;
    } else {
        const [titleEl] = await page.$x('//*[@id="listing-page-cart"]/div[2]/h1')
        const titleText = await titleEl.getProperty("innerText") 
        const title = await titleText.jsonValue();

        const [priceEl] = await page.$x('//*[@id="listing-page-cart"]/div[3]/div[1]/div[1]/div/div[1]/p')
        const priceText = await priceEl.getProperty('innerText')
        let price = await priceText.jsonValue(); //£23.40
        const priceRegExp = /\d+.\d*/g;
        price = Number(price.match(priceRegExp)[0]) //'23.40'

        const [imgEl] = await page.$x('//*[@id="listing-right-column"]/div/div[1]/div[1]/div/div/div/div/div[1]/ul/li[1]/img')
        const imgText = await imgEl.getProperty('src')
        const imgUrl = await imgText.jsonValue();
    }

    await browser.close();

   
    return {title, price, imgUrl} 
}


module.exports = {
 fetchEtsyProduct
}