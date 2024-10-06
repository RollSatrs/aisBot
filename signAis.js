import puppeteer, { Keyboard } from 'puppeteer'

const aisUrl = 'https://ais.semuniver.kz/login.php'
function delay(ms){
    return new Promise(resolve =>{setTimeout(resolve, ms)})
}

 export async function signAis(login, password){
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto(aisUrl)
    const loginSelector = 'input[name="login"]'
    const passwordSelector = 'input[name="password"]'
    const submitButtonSelector = 'button[type=submit]'
    await page.type(loginSelector, login)
    await page.type(passwordSelector, password)
    
    delay(10000)
    await page.click(submitButtonSelector)
    await page.waitForNavigation()
    await page.screenshot({path: `./screenShot/${login}.jpg`})
    delay(10000)
    await browser.close()
}
