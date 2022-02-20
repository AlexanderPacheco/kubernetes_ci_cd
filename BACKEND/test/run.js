let chai = require("chai");
const expect = chai.expect;
const should = chai.should();
let chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("Pruebas unitarias", () => {

    it ("Prueba unitaria eliminar archivo: unnamed en Root", async function () {
        /*
        chai
            .request('http://localhost:2300')
            .get("/files/delete/uno/123/Root/unnamed/1")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);

            });

         */


    });

    it ("Prueba unitaria eliminar archivo: b en carpeta1", async function () {
        /*
        chai
            .request('http://localhost:2300')
            .get("/files/delete/uno/123/carpeta1/b/1")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);

            });

         */


    });

    it ("Prueba unitaria restaurar archivo: b en carpeta1", async function () {
        /*
        chai
            .request('http://localhost:2300')
            .get("/files/delete/uno/123/carpeta1/b/0")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);

            });

         */


    });

    it ("Prueba unitaria restaurar archivo: unnamed en Root", async function () {
        /*
        chai
            .request('http://localhost:2300')
            .get("/files/delete/uno/123/Root/unnamed/0")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);

            });

         */


    });

    it ("Prueba unitaria eliminar archivo inexistente: unnamed en Root", async () => {
        /*
        chai
            .request('http://localhost:2300')
            .get("/files/delete/uno/123/Root/fakdsjf/1")
            .end((err, res) => {
                chai.expect(res).to.have.status(500);

            });

         */


    });

    it ("Prueba unitaria crear un usuario correctamente", async function () {
        /*
        chai.request('http://localhost:2300')
            .post("/api/v1/usuarios")
            .send({
              nickname: "mariotest",
              correo: "mariotest@gmail.com",
              fechaNacimiento: "30-04-1997",
              contrasena: "123",
              workspace: {
                  archivos: [],
                  carpetas: []
                  }

          }).end((err, res) => {
              res.should.have.status(200);
            });
        */
    });

    it ("Prueba unitaria verificar existencia usuario", async function () {
        /*
        chai
            .request('http://localhost:2300')
            .get("/api/v1/validar/mariotest")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
            });
        */
    });

    it ("Prueba unitaria eliminar un usuario", async function () {
        /*
          chai
            .request('http://localhost:2300')
            .delete("/api/v1/usuarios/mariotest")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
            });

         */
    });

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