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