const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const port = 8080;
const serv = require("http").Server(app);
const createQR = require("./client/js/createQR");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/qrcode", async (req, res) => {
  const qr = await createQR(req.query.data, res);
  res.json(qr);
});

app.get("/", (req, res) => res.sendFile(__dirname + "/client/index.html"));

app.use("/client", express.static(__dirname + "/client"));

serv.listen(port);
console.log(`'${__filename}' listening at http://localhost:${port}`);
