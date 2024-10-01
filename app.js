const http = require('http');
const port = 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("This CI/CD pipeline (using node.js) deployed by Prathmesh using GitHub_Action!!!\n'");
});
server.listen(port, () => {
    console.log(`Server running on port ${port}/`);
});
module.exports = server;
