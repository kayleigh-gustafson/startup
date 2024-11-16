const express = require('express');
const uuid = require('uuid');
const app = express();

// The scores and users are saved in memory and disappear whenever the service is restarted.
let userData = {};
let users = {};

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  console.log("users", users)
  const user = users[req.body.email];
  if (user && req.body.email !== 0) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
    console.log("user", user);
    users[user.email] = user;
    userData[user.email] = (
      {
        "username": req.body.username,
        "email": req.body.email,
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
    )

    res.send({ token: user.token });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

// Get user data
apiRouter.get('/userdata/:userId', (req, res) => {
  // res.send({name: req.params.userId});
  if (userData.hasOwnProperty(req.params.userId)) {
    res.send(JSON.stringify(userData[req.params.userId]));
  } else {
    res.send(JSON.stringify(
        {
            "username": "Unknown",
            "email": "Unknown",
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
    ));
  }
  
});

// Submit user data
apiRouter.post('/setuserdata', (req, res) => {
  // scores = updateScores(req.body, scores);
//   res.send({name: req.params.userId});
    userData[req.body.data.email] = req.body.data;
    res.send(req.body)
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// updateScores considers a new score for inclusion in the high scores.
function updateScores(newScore, scores) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}
