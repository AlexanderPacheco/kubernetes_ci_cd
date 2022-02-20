let chai = require("chai");
const expect = chai.expect;
const should = chai.should();
let chaiHttp = require("chai-http");
let server = require("../routes/users");

chai.should();
chai.use(chaiHttp);

describe("Pruebas unitarias: CRUD Carpetas", () => {

    it ("Prueba unitaria eliminar carpeta correctamente", async function () {
        /*
        chai
            .request('http://localhost:2300')
            .get("/api/v1/eliminarCarpeta/uno/cn2")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                res.text.should.be.eq("CORRECTO: La carpeta fue eliminada exitosamente");

            });

         */
    });
    


    it ("Prueba unitaria eliminar carpeta, error controlado: conexion carpeta no existe", async function () {
        /*
        chai
            .request('http://localhost:2300')
            .get("/api/v1/eliminarCarpeta/uno/carpetainexistentedslfjak")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
            });

         */
    });



    it ("Prueba unitaria eliminar carpeta, error controlado: mensaje de carpeta no existe", async function () {
        /*
        chai
            .request('http://localhost:2300')
            .get("/api/v1/eliminarCarpeta/uno/carpetainexistentedslfjak")
            .end((err, res) => {
                res.text.should.be.eq("ERROR: No se pudo eliminar la carpeta. DETALLE: La carpeta no existe.");
            });

         */
    });

});