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

const {Builder, By, Key, util} = require('selenium-webdriver');
const firefox = require("selenium-webdriver/firefox");
const chrome = require("selenium-webdriver/chrome");
const options = new firefox.Options();

const { describe, it, after, before } = require('mocha');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const should = chai.should();
let chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

process.on('unhandledRejection', () => {});

async function example(browser) {

    try {
        describe ('Pruebas funcionales con Selenium Grid', async function () {
            this.timeout(50000);
            let driver;

            beforeEach (async  () => {

                driver = await new Builder().forBrowser(browser)
                    .usingServer("http://localhost:4444/wd/hub")
                    .build();
            });

            afterEach (async () => {
                //await driver.close();
            });
            /*
                        it ('Prueba funcional Selenium: encontrar componente crear carpeta', async () => {

                            await driver.get("https://www.google.com");
                            await driver.findElement(By.name("q"));

                        });

             */

            it ('Prueba funcional Selenium Grid: login', async () => {

                await driver.get("http://172.17.0.1:8080/");
                await driver.manage().window().maximize();
                await driver.findElement(By.id("nickname")).sendKeys("uno");
                await driver.findElement(By.id("contrasena")).sendKeys("123");
                await driver.findElement(By.id("btn_inicio_sesion")).sendKeys(Key.RETURN);
                //await driver.sleep(7000);
                //await driver.findElement(By.id("gestor_carpetas")).sendKeys(Key.RETURN);
                //await driver.findElement(By.id("input_crearcarpeta")).sendKeys("cnx");
                //await driver.findElement(By.id("btn_eliminarcarpeta")).sendKeys(Key.RETURN);
                //await driver.close();
            });


        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {
        //driver.quit();
    }
}
example("firefox");
example("chrome");