const http = require('http');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

const server = http.createServer((req, res) => {
    let filePath = '';

    if (req.url === '/') {
        filePath = path.join(__dirname, 'home.html');
    } else if (req.url === '/projects') {
        filePath = path.join(__dirname, 'project.html');
    } else if (req.url === '/registration') {
        filePath = path.join(__dirname, 'registration.html');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
        return;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>500 Internal Server Error</h1>');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please try a different port.`);
    } else {
        console.error(`Server error: ${err.message}`);
    }
});
