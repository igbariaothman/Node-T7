//עותמאן אגבאריה 327809190
//214626913 אחמד חבשי

const http = require("http"); // HTTP server module
const url = require("url"); // Parse URLs
const fs = require("fs"); // Read files
const path = require("path"); // Handle file paths

const server = http.createServer(function (req, res) {
  let pathName = url.parse(req.url).pathname; // Get path
  console.log(pathName); // Log path

  if (pathName === "/") {
    // Serve index.html
    const htmlPath = path.join(__dirname, "templates", "index.html");
    fs.createReadStream(htmlPath, "UTF-8").pipe(
      res.writeHead(200, { "Content-Type": "text/html" })
    );
  } else if (req.url.match("[.]html$")) {
    // Serve HTML files
    const htmlPath = path.join(__dirname, "templates", req.url);
    fs.createReadStream(htmlPath, "UTF-8").pipe(
      res.writeHead(200, { "Content-Type": "text/html" })
    );
  } else if (req.url.match("[.]css$")) {
    // Serve CSS
    const cssPath = path.join(__dirname, "templates", req.url);
    fs.createReadStream(cssPath, "UTF-8").pipe(
      res.writeHead(200, { "Content-Type": "text/css" })
    );
  } else if (req.url.match("[.]jpg$")) {
    // Serve images
    const imagePath = path.join(__dirname, "templates", req.url);
    fs.createReadStream(imagePath).pipe(
      res.writeHead(200, { "Content-Type": "image/jpg" })
    );
  } else {
    // 404
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(3000); // Start server
console.log("Server running on port 3000");
