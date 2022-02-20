/*
const {Builder, By, Key, util} = require('selenium-webdriver');
const firefox = require("selenium-webdriver/firefox");
const options = new firefox.Options();

//const driver2 = new Builder().forBrowser("firefox").build();

async function example(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://google.com");
    await driver.findElement(By.name("q")).sendKeys("Selenium", Key.RETURN);

    //driver.quit();
}
example();

 */

const { describe, it, after, before } = require('mocha');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function example() {
    let driver = await new Builder().forBrowser("firefox").build();
    try {
        describe ('Google search automated testing', async function () {
            this.timeout(50000);
            //let page;

            beforeEach (async () => {
                await driver.get("http://google.com");
            });

            afterEach (async () => {
                await driver.quit();
            });

            it ('find the input box and google search button', async () => {
                let driver = await new Builder().forBrowser("firefox").build();
                await driver.get("http://google.com");
            });

            /*
            it ('find the input box and google search button', async () => {
                const result = await page.findInputAndButton();
                expect(result.inputEnabled).to.equal(true);
                expect(result.buttonText).to.include('Google');
            });

            it ('put keyword in search box and click search button', async () => {
                const result = await page.submitKeywordAndGetResult();
                expect(result.length).to.be.above(10);
            });
            */

        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();