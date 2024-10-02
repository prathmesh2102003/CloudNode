const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./app');
const { expect } = chai;

chai.use(chaiHttp);

describe('Real-time Application Test Suite', () => {
  it('should return welcome message at "/" route', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include("Welcome! This CI/CD pipeline (Node.js) was deployed by Prathmesh using GitHub Actions!!!");
        done();
      });
  });

  it('should return 404 for invalid route', (done) => {
    chai.request(server)
      .get('/invalid')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.text).to.equal("404 Not Found\n");
        done();
      });
  });
});
