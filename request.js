// const admin = require("firebase-admin");

// // Initialize Firebase admin SDK
// const serviceAccount = require("./react-music-app-b49e4-firebase-adminsdk-yboy3-1b7f79582e.json"); // replace with your service account key file path
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://react-music-app-b49e4-default-rtdb.firebaseio.com/" // replace with your database URL
// });

// // Get a database reference
// const db = admin.database();

// // Define the path to the data you want to retrieve
// const path = "/userDataRecords"; // replace with the path to your data

// // Retrieve the data

// let data;


// async function fetchData(path) {
//     try {
//         const snapshot = await db.ref(path).once("value");
//         data = snapshot.val()
//         console.log(snapshot.val()); // log the data to the console
//         // console.log(data);
//     } catch (error) {
//         console.error(error); // log any errors to the console
//     }
// }

// const activityNames = [];
// fetchData(path)
//     .then( () =>  {
//         if(data) {
//             for (const key in data) {
//                 if (data.hasOwnProperty(key)) {
//                     const activity = data[key];
//                     activityNames.push(activity.activityName);
//                 }
//             }
//         }
//         console.log(activityNames);
//     })


const admin = require("firebase-admin");

// Initialize Firebase admin SDK
const serviceAccount = require("./react-music-app-b49e4-firebase-adminsdk-yboy3-1b7f79582e.json"); // replace with your service account key file path
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://react-music-app-b49e4-default-rtdb.firebaseio.com/" // replace with your database URL
});

// Get a database reference
const db = admin.database();

async function getActivityNames(path) {
  try {
    // Retrieve the data
    const snapshot = await db.ref(path).once("value");
    const data = snapshot.val();

    // Extract activity names
    const activityNames = Object.values(data || {}).map(activity => activity.activityName);

    return activityNames;
  } catch (error) {
    console.error(error); // log any errors to the console
    return [];
  }
}

// Example usage: get activity names from the "userDataRecords" path
// getActivityNames("/userDataRecords").then(activityNames => {
//   console.log(activityNames);
// });

module.exports = {
    getActivityNames: getActivityNames,
}