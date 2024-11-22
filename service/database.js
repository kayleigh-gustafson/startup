const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('users');
const dataCollection = db.collection('userdata');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

// async function addScore(score) {
//   return scoreCollection.insertOne(score);
// }

async function setUserData(email, data) {
  console.log(email, data);
  await dataCollection.findOneAndUpdate(
    { email: email },
    { $set: data },
    { upsert: true }
  );
}

async function getUserData(email) {
  console.log("Get user data from database")
  let result = await dataCollection.findOne({ email: email });
  console.log(result)
  if (result===null) {
    user = await getUser(email);
    console.log(user);
    return {
      "username":user.username,
      "email":email,
      "newTask": {},
      "terms": {
          "0": {
              "name": "My First Term",
              "start": "2000-01-01",
              "end": "2000-06-01"
          },
      },
      "classes": {
          "1": {
              "name": "My First Class",
              "color": "#2a9d8f",
              "term": "0"
          },
      },
      "assignments": {
        "2": {
          "completed": false,
          "name": "My First Assignment",
          "due": "2000-01-02",
          "finish": "2000-01-01",
          "classId": "1",
          "notifyDue": false,
          "notifyFinish": false,
          "notifyLate": false
        },
      },    
      "exams": {
        "3": {
          "completed": false,
          "name": "My First Exam",
          "open": "2000-01-01",
          "close": "2000-01-03",
          "finish": "2000-01-02",
          "classId": "1",
          "notifyOpen": false,
          "notifyFinish": false,
          "notifyClose": false
        },
      }
    }
  } else {
    return (result);
  }
  
}

// function getHighScores() {
//   const query = { score: { $gt: 0, $lt: 900 } };
//   const options = {
//     sort: { score: -1 },
//     limit: 10,
//   };
//   const cursor = scoreCollection.find(query, options);
//   return cursor.toArray();
// }

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  setUserData,
  getUserData
};
