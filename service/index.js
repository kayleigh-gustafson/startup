const express = require('express');
const uuid = require('uuid');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

let users = {};
let data = {};

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    const user = users[req.body.email];
    if (user) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
      users[user.email] = user;
  
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
  
  // GetData
  apiRouter.get('/data', (_req, res) => {
    res.send(data);
  });
  
  // SubmitData
  apiRouter.post('/data', (req, res) => {
    data = updateData(req.body, data);
    res.send(data);
  });
  
  // updateScores considers a new score for inclusion in the high scores.
  function updateData(newData, currentData) {
    // {id: 12345, data: {...}}
    tempData = {...currentData};
    tempData[newData.id] = newData.data;
  
    return tempData;
  }

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});