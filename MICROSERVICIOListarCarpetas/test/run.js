
let chai = require("chai");
const expect = chai.expect;
const should = chai.should();
let chaiHttp = require("chai-http");
let server = require("../routes/users");

chai.should();
chai.use(chaiHttp);

describe("Pruebas unitarias: Listar Carpeta", () => {

  it ("Prueba unitaria listar carpetas del usuario correctamente", async function () {
      chai.request('http://localhost:3400')
          .get("/func/g2/listarcarpetas/usuario1")
          .end((err, res) => {
            res.should.have.status(200);
          });
  });

  it ("Prueba unitaria listar carpetas,error controlado: usuario no existe", async function () {
    chai.request('http://localhost:3400')
        .get("/func/g2/listarcarpetas/noexiste")
        .end((err, res) => {
          res.should.have.status(500);
        });
});

it ("Prueba unitaria listar carpetas,error controlado: ruta incorrecta ", async function () {
  chai.request('http://localhost:3400')
      .get("/func/g2/listarcarpeta/usuario1")
      .end((err, res) => {
        res.should.have.status(404);
      });
});

  /*it ("Prueba unitaria eliminar un usuario", async function () {
    chai
        .request('http://localhost:3700')
        .delete("/api/v1/usuarios/mariotest")
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
        });
});*/


});