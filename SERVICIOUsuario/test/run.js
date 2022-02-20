/*
npm i chai@4.1.2 chai-as-promised@7.1.1 mocha@5.2.0 mochawesome@3.0.3 selenium-webdriver@4.0.0-alpha.1 --save-dev --unsafe-perm=true --allow-root\n
*/

let chai = require("chai");
const expect = chai.expect;
const should = chai.should();
let chaiHttp = require("chai-http");
let server = require("../routes/users");

chai.should();
chai.use(chaiHttp);

describe("Pruebas unitarias: CRUD Usuario", () => {

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


});