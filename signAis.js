import puppeteer, { Keyboard } from 'puppeteer'

const aisUrl = 'https://ais.semuniver.kz/login.php'
export let verification 

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
    
    // await delay(10000)
    await page.click(submitButtonSelector)
    try {
        await page.waitForNavigation()
        await page.waitForSelector('.box-body.box-profile', {timeout: 1000})
        verification = true
    } catch (err){verification = false} 
    finally{
        delay(1000)
        await browser.close()
    }
    return verification
}
