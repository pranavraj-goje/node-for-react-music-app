

const readXlsxFile = require('read-excel-file/node')
// // backend/server.js
// import readXlsxFile from 'read-excel-file'
const requests = require('./request')
const express = require("express");
const cors = require("cors");
const app = express();


let localActivityNames

async function getUserActivity() {
    await requests.getActivityNames('/userDataRecords').then((activityNames) => {
        localActivityNames = activityNames;
        // console.log(activityNames);
        // console.log(localActivityNames);
    });
}

let clusterNumber = -1

let activityAndClusterMap = new Map()
let activityAndMoodMap = new Map()
let activityAndSongsMap = new Map()
let jsonDataActivityAndSongs;

let clusterMoodMap = new Map()
clusterMoodMap.set('Sad', 0);
clusterMoodMap.set('Calm', 1);
clusterMoodMap.set('Happy', 2);
clusterMoodMap.set('Energetic', 3);


async function getSongsFromExcel(key, value) {

    let moodSong = new Set();

    await readXlsxFile(`${value}.xlsx`, { Range: 'A1:A50' }).then((rows) => {

        while (moodSong.size < 20) {

            const randomIndex = Math.floor(Math.random() * 500);
            moodSong.add(rows[randomIndex][0]);

        }

    })

    activityAndSongsMap.set(key, Array.from(moodSong));
    // moodSong = null;
    // global.gc();

}

async function generateActivitySongsMap() {
    await getUserActivity().then(async () => {
        let allData

        // const express = require('express');
        // const bodyParser = require('body-parser');

        // File path.
        await readXlsxFile('activityData.xlsx').then((rows) => {
            allData = rows
            // console.log(allData)
            // console.log(allData.length)
            // `rows` is an array of rows
            // each row being an array of cells.
        })

        for (let index = 0; index < localActivityNames.length; index++) {
            let temp = localActivityNames[index];
            let flag = 1;
            for (let i = 0; i < allData.length; i++) {
                if (temp == allData[i][1]) {
                    activityAndClusterMap.set(temp, allData[i][3]);
                    flag = 0;
                }
            }
            if (flag == 1) {
                activityAndClusterMap.set(temp, 2);
            }
        }

        console.log(activityAndClusterMap);
        console.log(clusterMoodMap);


        for (let [key, value] of activityAndClusterMap.entries()) {
            for (let [key2, value2] of clusterMoodMap.entries()) {
                if (value == value2) {
                    activityAndMoodMap.set(key, key2);
                }
            }
        }
        //deleting map to free up memory of heap
        // activityAndClusterMap = null;
        // clusterMoodMap = null;
        // global.gc();

        console.log(activityAndMoodMap);

        for (let [key, value] of activityAndMoodMap.entries()) {
            await getSongsFromExcel(key, value);
            console.log(activityAndSongsMap);
            console.log("Done")
        }
        console.log('Last')
        // activityAndMoodMap = null;
        // global.gc();

        const myObj = Object.fromEntries(activityAndSongsMap);
        jsonDataActivityAndSongs = JSON.stringify(myObj);
        console.log(jsonDataActivityAndSongs)
        // activityAndSongsMap = null;
        // global.gc();

    })
}

app.use(cors());
app.use(express.json());


app.get("/message", async (req, res) => {
    await generateActivitySongsMap()
    console.log('Inside App . Get A Life')
    res.send(jsonDataActivityAndSongs);
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});



































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