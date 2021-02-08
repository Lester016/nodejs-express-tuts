// This file is nodejs app only without any frameworks.
const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  // ladash
  const num = _.random(0, 20);
  console.log(num);
  const greet = _.once(() => {
    console.log("Greeted once");
  });
  greet();
  greet();

  // set response header content type
  res.setHeader("Content-Type", "json");

  let path = "./views";

  switch (req.url) {
    case "/":
      path += "/index.html";
      res.statusCode = 200;
      break;

    case "/about":
      path += "/about.html";
      res.statusCode = 200;
      break;

    case "/about-sme":
      res.statusCode = 301;
      res.setHeader("Location", "/about"); // redirect by changing the route location.
      res.end();
      break;

    default:
      path += "/404.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for request on port 3000");
});
