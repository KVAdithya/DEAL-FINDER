const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

const url = 'paste the amazon product link you want to checkout ';
let productName = "";
let counter = 0;

async function configureBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
}

async function checkPrice(page) {
    try {
        await page.reload();
        const result = await page.evaluate(() => {
            const nameElement = document.querySelector("#productTitle");
            const priceElement = document.querySelector('.a-section.a-spacing-none.aok-align-center.aok-relative');
            const priceWholeElement = priceElement ? priceElement.querySelector('.a-price-whole') : null;
            
            const productName = nameElement ? nameElement.textContent.trim() : null;
            const price = priceWholeElement ? priceWholeElement.textContent.replace(',', '') : null;
            
            return { productName, price };
        });

        console.log(result);

        if (result.price) {
            let currentPrice = parseInt(result.price, 10);
            productName = result.productName; // Store the product name globally
            console.log(`Current price of "${productName}" is ${currentPrice}`);
            
            if (currentPrice < "enter the desired price") {
                console.log("BUY!!!! " + currentPrice);
                await sendNotification(productName, currentPrice);
            }
        } else {
            console.log('Price not found.');
        }
    } catch (error) {
        console.error("Error checking price: ", error);
    }
}

async function startTracking() {
    try {
        const page = await configureBrowser();
        await checkPrice(page);
        
        let job = new CronJob('*/30 * * * *', function() { // runs every 30 SECONDS 
            checkPrice(page);
        }, null, true, null, null, true);
        job.start();
    } catch (error) {
        console.error("Error starting tracking: ", error);
    }
}

async function sendNotification(productName, price) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'enter your email id',
                pass: 'enter the passkey password for this email id' // replace with your email password or app password
            }
        });

        // const textToSend = ``;
        const htmlText = `The price of this product "${productName}" has dropped to ${price}. Do Checkout!!! <a href="${url}">Link</a>`;
        if (counter<=0) {
            let info = await transporter.sendMail({
                from: '"Price Tracker" <enter the same mail id given above in  user>',
                to: "enter the mail id that you want to receive notifications",
                subject: 'Price dropped to ' + price, 
                // text: "textToSend",
                html: htmlText
        });
        console.log("Message sent: %s", info.messageId);

        counter+=1;

        } else {
            console.log("The mail was already sent")
            process.exit(0)
         }

    } catch (error) {
        console.error("Error sending notification: ", error);
    }
}

startTracking();
