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
        describe ('Pruebas funcionales con Selenium Webdriver', async function () {
            this.timeout(50000);
            let driver;

            beforeEach (async  () => {

                driver = await new Builder().forBrowser(browser)
                    //.usingServer("http://localhost:4444/wd/hub")
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
            it ('Prueba funcional Selenium: crear archivo', async () => {

                await driver.get("http://localhost:4200/");
                await driver.findElement(By.id("nickname")).sendKeys("uno");
                await driver.findElement(By.id("contrasena")).sendKeys("123");
                await driver.findElement(By.id("btn_inicio_sesion")).sendKeys(Key.RETURN);
                await driver.sleep(5000);
                await driver.findElement(By.id("gestor_carpetas")).sendKeys(Key.RETURN);
                await driver.findElement(By.id("input_crearcarpeta")).sendKeys("SOG2_2");
                await driver.findElement(By.id("btn_creararchvio")).sendKeys(Key.RETURN);
                //await driver.close();
            });

            it ('Prueba funcional Selenium: crear eliminar archivo', async () => {

                await driver.get("http://localhost:4200/");
                await driver.findElement(By.id("nickname")).sendKeys("uno");
                await driver.findElement(By.id("contrasena")).sendKeys("123");
                await driver.findElement(By.id("btn_inicio_sesion")).sendKeys(Key.RETURN);
                await driver.sleep(5000);
                await driver.findElement(By.id("gestor_carpetas")).sendKeys(Key.RETURN);
                await driver.findElement(By.id("input_crearcarpeta")).sendKeys("SOG2_2");
                await driver.findElement(By.id("btn_eliminararchivo")).sendKeys(Key.RETURN);
                //await driver.close();
            });

            it ('Prueba funcional Selenium: registro de usuario', async () => {

                await driver.get("http://localhost:4200/");
                await driver.findElement(By.id("btn_redreg")).sendKeys(Key.RETURN);
                await driver.sleep(5000);
                await driver.findElement(By.id("inp_nick")).sendKeys("PruebaUser001");
                await driver.findElement(By.id("inp_correo")).sendKeys("PruebaUser001@gmail.com");
                await driver.findElement(By.id("inp_fnace")).sendKeys("01-01-2001");
                await driver.findElement(By.id("inp_pass")).sendKeys("PruebaUser001");
                await driver.findElement(By.id("inp_confpass")).sendKeys("PruebaUser001");
                await driver.findElement(By.id("btn_registro")).sendKeys(Key.RETURN);
                //await driver.close();
            });

            it ('Prueba funcional Selenium: login correcto', async () => {

                await driver.get("http://localhost:4200/");
                await driver.findElement(By.id("nickname")).sendKeys("uno");
                await driver.findElement(By.id("contrasena")).sendKeys("123");
                await driver.findElement(By.id("btn_inicio_sesion")).sendKeys(Key.RETURN);
                //await driver.close();
            });

            it ('Prueba funcional Selenium: login incorrecto', async () => {

                await driver.get("http://localhost:4200/");
                await driver.findElement(By.id("nickname")).sendKeys("uno");
                await driver.findElement(By.id("contrasena")).sendKeys("fdasfa");
                await driver.findElement(By.id("btn_inicio_sesion")).sendKeys(Key.RETURN);
                //await driver.close();
            });

            it ('Prueba funcional Selenium: crear carpeta', async () => {

                await driver.get("http://localhost:4200/");
                await driver.findElement(By.id("nickname")).sendKeys("uno");
                await driver.findElement(By.id("contrasena")).sendKeys("123");
                await driver.findElement(By.id("btn_inicio_sesion")).sendKeys(Key.RETURN);
                await driver.sleep(5000);
                await driver.findElement(By.id("gestor_carpetas")).sendKeys(Key.RETURN);
                await driver.findElement(By.id("input_crearcarpeta")).sendKeys("cnx");
                await driver.findElement(By.id("btn_crearcarpeta")).sendKeys(Key.RETURN);
                //await driver.close();
            });

            it ('Prueba funcional Selenium: eliminar carpeta', async () => {

                await driver.get("http://localhost:4200/");
                await driver.findElement(By.id("nickname")).sendKeys("uno");
                await driver.findElement(By.id("contrasena")).sendKeys("123");
                await driver.findElement(By.id("btn_inicio_sesion")).sendKeys(Key.RETURN);
                await driver.sleep(5000);
                await driver.findElement(By.id("gestor_carpetas")).sendKeys(Key.RETURN);
                await driver.findElement(By.id("input_crearcarpeta")).sendKeys("cnx");
                await driver.findElement(By.id("btn_eliminarcarpeta")).sendKeys(Key.RETURN);

            });

            it ('Prueba funcional Selenium: eliminar carpeta, buscar componente', async () => {

                await driver.get("http://localhost:4200/");
                await driver.findElement(By.id("nickname")).sendKeys("uno");
                await driver.findElement(By.id("contrasena")).sendKeys("123");
                await driver.findElement(By.id("btn_inicio_sesion")).sendKeys(Key.RETURN);
                await driver.sleep(5000);
                await driver.findElement(By.id("gestor_carpetas")).sendKeys(Key.RETURN);
                await driver.findElement(By.id("input_crearcarpeta"));

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
        //driver.quit();
    }
}
example("firefox");
//example("chrome")