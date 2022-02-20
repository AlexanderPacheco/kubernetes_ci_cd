let chai = require("chai");
const expect = chai.expect;
const should = chai.should();
let chaiHttp = require("chai-http");
let server = require("../routes/users");

chai.should();
chai.use(chaiHttp);

describe("Pruebas unitarias: Editar Carpeta", () => {

  it ("Prueba unitaria editar nombre carpeta", async function () {
      chai.request('http://localhost:3300')
          .post("/func/g2/editarcarpeta/usuario1/carpeta1")
          .send({
            nuevo_nombre:"carpeta1_test"

        }).end((err, res) => {
            res.should.have.status(500);
            
          });
  });

  it ("Prueba unitaria editar carpeta ,error controlado: mensaje de carpeta no existe", async function () {
      chai
          .request('http://localhost:3300')
          .post("/func/g2/editarcarpeta/usuario1/noexiste")
          .end((err, res) => {
            res.should.have.status(500);
            
            //res.text.should.be.eq("ERROR: No se pudo editar la carpeta. DETALLE: La carpeta no existe.");
          });
  });

  it ("Prueba unitaria editar carpeta ,error controlado: mensaje de propietario no existe", async function () {
    chai
        .request('http://localhost:3300')
        .post("/func/g2/editarcarpeta/noexiste/carpeta1_test")
        .end((err, res) => {
          res.should.have.status(500);
          
          //chai.expect(res).to.have.status(500);
          //res.text.should.be.eq("ERROR: No se pudo editar la carpeta. DETALLE: El propietario no existe.");
        });
});

/*it ("Prueba unitaria editar nombre carpeta por segunda vez", async function () {
  chai.request('http://localhost:3300')
      .post("/func/g2/editarcarpeta/usuario1/carpeta1_test")
      .send({
        nuevo_nombre:"carpeta1"

    }).end((err, res) => {
        res.should.have.status(200);
        
      });
});*/

});