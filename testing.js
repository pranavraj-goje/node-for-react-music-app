// // backend/server.js
// // import readXlsxFile from 'read-excel-file'

let allData

const readXlsxFile = require('read-excel-file/node')
// const express = require('express');
// const bodyParser = require('body-parser');

// File path.
readXlsxFile('menu.xlsx').then((rows) => {
    allData = rows
    console.log(rows)
    // `rows` is an array of rows
    // each row being an array of cells.
})

// // Set up the express app
// const app = express();
// const API_PORT = 3001;
// // Parse incoming requests data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// app.get("/bitmex", () => !async function () {
//     const api = new BitmexAPI({
//         "apiKeyID": "",
//         "apiKeySecret": ""
//     });
//     const chatMessage = await api.Position.get()
//     return (allData)
// }())

// app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));


const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: allData });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});