const express = require('express');
const uuid = require('uuid');
const app = express();

// The scores and users are saved in memory and disappear whenever the service is restarted.
let userData = {
  "test": {
    "username": "test",
    "newTask": {},
    "terms": {
        "10264": {
            "name": "Fall 2024",
            "start": "2024-09-03",
            "end": "2024-12-11"
        },
        "02621": {
            "name": "Winter 2025",
            "start": "2024-01-08",
            "end": "2024-04-16"
        },
        "81652": {
            "name": "Fall 2025",
            "start": "2024-09-03",
            "end": "2024-12-10"
        }
    },
    "classes": {
        "32913": {
            "name": "A HTG 100",
            "color": "#2a9d8f",
            "term": "10264"
        },
        "10394": {
            "name": "CS 260",
            "color": "#f4a261",
            "term": "10264"
        },
        "91263": {
            "name": "UNIV 101",
            "color": "#e76f51",
            "term": "10264"
        },
        "11234": {
            "name": "WRTG 150",
            "color": "#0081a7",
            "term": "02621"
        },
        "63234": {
            "name": "MATH 112",
            "color": "#2ec4b6",
            "term": "02621"
        },
        "94323": {
            "name": "REL A 250",
            "color": "#f07167",
            "term": "02621"
        },
        "75343": {
            "name": "REL A 275",
            "color": "#ffbc42",
            "term": "81652"
        },
        "98746": {
            "name": "BIO 100",
            "color": "#d81159",
            "term": "81652"
        },
        "23451": {
            "name": "MATH 113",
            "color": "#2f195f",
            "term": "81652"
        }
    },
    "assignments": {
        "02642": {
            "completed": false,
            "name": "Placeholder assignment #1",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "32913",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "23742": {
            "completed": false,
            "name": "Placeholder assignment #2",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "32913",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "64535": {
            "completed": true,
            "name": "Placeholder assignment #3",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "32913",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "24534": {
            "completed": false,
            "name": "Placeholder assignment #4",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "10394",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "96576": {
            "completed": false,
            "name": "Placeholder assignment #5",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "10394",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "23363": {
            "completed": true,
            "name": "Placeholder assignment #6",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "10394",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "62352": {
            "completed": false,
            "name": "Placeholder assignment #7",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "91263",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "95435": {
            "completed": false,
            "name": "Placeholder assignment #8",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "91263",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "02549": {
            "completed": true,
            "name": "Placeholder assignment #9",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "91263",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "14036": {
            "completed": false,
            "name": "Placeholder assignment #10",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "11234",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "83581": {
            "completed": false,
            "name": "Placeholder assignment #11",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "11234",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "92546": {
            "completed": true,
            "name": "Placeholder assignment #12",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "11234",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "23972": {
            "completed": false,
            "name": "Placeholder assignment #13",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "63234",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "72581": {
            "completed": false,
            "name": "Placeholder assignment #14",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "63234",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "98125": {
            "completed": true,
            "name": "Placeholder assignment #15",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "63234",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "19351": {
            "completed": false,
            "name": "Placeholder assignment #16",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "94323",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "26021": {
            "completed": false,
            "name": "Placeholder assignment #17",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "94323",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "13684": {
            "completed": true,
            "name": "Placeholder assignment #18",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "94323",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "23832": {
            "completed": false,
            "name": "Placeholder assignment #19",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "75343",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "85432": {
            "completed": false,
            "name": "Placeholder assignment #20",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "75343",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "67439": {
            "completed": true,
            "name": "Placeholder assignment #21",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "75343",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "24949": {
            "completed": false,
            "name": "Placeholder assignment #22",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "98746",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "10371": {
            "completed": false,
            "name": "Placeholder assignment #23",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "98746",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "19943": {
            "completed": true,
            "name": "Placeholder assignment #24",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "98746",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "01261": {
            "completed": false,
            "name": "Placeholder assignment #25",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "23451",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "36252": {
            "completed": false,
            "name": "Placeholder assignment #26",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "23451",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        },
        "82457": {
            "completed": true,
            "name": "Placeholder assignment #27",
            "due": "2024-10-02",
            "finish": "2024-10-01",
            "classId": "23451",
            "notifyDue": false,
            "notifyFinish": false,
            "notifyLate": false
        }
    },
    "exams": {
        "17235": {
            "completed": false,
            "name": "Placeholder exam #1",
            "open": "2024-10-01",
            "close": "2024-10-03",
            "finish": "2024-10-02",
            "classId": "32913",
            "notifyOpen": false,
            "notifyFinish": false,
            "notifyClose": false
        },
        "01823": {
            "completed": false,
            "name": "Placeholder exam #2",
            "open": "2024-10-01",
            "close": "2024-10-03",
            "finish": "2024-10-02",
            "classId": "10394",
            "notifyOpen": false,
            "notifyFinish": false,
            "notifyClose": false
        },
        "62135": {
            "completed": false,
            "name": "Placeholder exam #3",
            "open": "2024-10-01",
            "close": "2024-10-03",
            "finish": "2024-10-02",
            "classId": "91263",
            "notifyOpen": false,
            "notifyFinish": false,
            "notifyClose": false
        },
        "91241": {
            "completed": false,
            "name": "Placeholder exam #4",
            "open": "2024-10-01",
            "close": "2024-10-03",
            "finish": "2024-10-02",
            "classId": "11234",
            "notifyOpen": false,
            "notifyFinish": false,
            "notifyClose": false
        },
        "86242": {
            "completed": false,
            "name": "Placeholder exam #5",
            "open": "2024-10-01",
            "close": "2024-10-03",
            "finish": "2024-10-02",
            "classId": "63234",
            "notifyOpen": false,
            "notifyFinish": false,
            "notifyClose": false
        },
        "92341": {
            "completed": false,
            "name": "Placeholder exam #6",
            "open": "2024-10-01",
            "close": "2024-10-03",
            "finish": "2024-10-02",
            "classId": "94323",
            "notifyOpen": false,
            "notifyFinish": false,
            "notifyClose": false
        },
        "63245": {
            "completed": false,
            "name": "Placeholder exam #7",
            "open": "2024-10-01",
            "close": "2024-10-03",
            "finish": "2024-10-02",
            "classId": "75343",
            "notifyOpen": false,
            "notifyFinish": false,
            "notifyClose": false
        },
        "09326": {
            "completed": false,
            "name": "Placeholder exam #8",
            "open": "2024-10-01",
            "close": "2024-10-03",
            "finish": "2024-10-02",
            "classId": "98746",
            "notifyOpen": false,
            "notifyFinish": false,
            "notifyClose": false
        },
        "02351": {
            "completed": false,
            "name": "Placeholder exam #9",
            "open": "2024-10-01",
            "close": "2024-10-03",
            "finish": "2024-10-02",
            "classId": "23451",
            "notifyOpen": false,
            "notifyFinish": false,
            "notifyClose": false
        }
    }
}
};
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
  if (user) {
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
        "username": "",
        "newTask": {},
        "terms": {
            "0": {
                "name": "New Term",
                "start": "2000-01-01",
                "end": "2000-06-01"
            },
        },
        "classes": {
            "0": {
                "name": "New Class",
                "color": "#2a9d8f",
                "term": "0"
            },
        },
        "assignments": {},    
        "exams": {}
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
