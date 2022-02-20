let chai = require("chai");
const expect = chai.expect;
const should = chai.should();
let chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("Pruebas unitarias: CRUD Archivos", () => {

    it ("Prueba unitaria eliminar archivo: unnamed en Root", async function () {

        chai
            .request('http://localhost:2300')
            .get("/files/delete/uno/123/Root/unnamed/1")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);

            });


    });

    it ("Prueba unitaria eliminar archivo: b en carpeta1", async function () {

        chai
            .request('http://localhost:2300')
            .get("/files/delete/uno/123/carpeta1/b/1")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);

            });


    });

    it ("Prueba unitaria restaurar archivo: b en carpeta1", async function () {

        chai
            .request('http://localhost:2300')
            .get("/files/delete/uno/123/carpeta1/b/0")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);

            });


    });

    it ("Prueba unitaria restaurar archivo: unnamed en Root", async function () {

        chai
            .request('http://localhost:2300')
            .get("/files/delete/uno/123/Root/unnamed/0")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);

            });


    });

    it ("Prueba unitaria eliminar archivo inexistente: unnamed en Root", async () => {

        chai
            .request('http://localhost:2300')
            .get("/files/delete/uno/123/Root/fakdsjf/1")
            .end((err, res) => {
                chai.expect(res).to.have.status(500);

            });
            

    });


});