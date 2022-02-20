let chai = require("chai");
const expect = chai.expect;
const should = chai.should();
let chaiHttp = require("chai-http");
let server = require("../app/routers/s3.router");

chai.should();
chai.use(chaiHttp);

describe("Pruebas unitarias: CRUD Carpetas", () => {

    it("Prueva unitaria crear carpeta nueva, error controlado: conexion carpeta ya existe", async () => {
        /*
        chai.request('http://localhost:2300')
            .post("/ccarpeta/uno/cn1")
            .end((err, res) => {
                res.should.have.status(200);
            });

         */
    });

    it("Prueva unitaria crear carpeta nueva, error controlado: respuesta carpeta ya existe", async () =>  {
        /*
        chai.request('http://localhost:2300')
            .post("/ccarpeta/uno/cn1")
            .end((err, res) => {
                res.text.should.be.eq("ERROR: No se pudo crear la carpeta. DETALLE: La carpeta ya existe.");
            });

         */
    });



    it("Prueva unitaria crear carpeta nueva exitosamente", async () => {
        /*
        chai.request('http://localhost:2300')
            .post("/ccarpeta/uno/cn2")
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eq("CORRECTO: La carpeta fue creada exitosamente");
            });

         */
    });

});
