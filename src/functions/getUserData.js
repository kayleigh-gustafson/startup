// import fetchedData from "./databasePlaceholder.json" assert {type: 'json'};

export default async function getUserData(userId) {
    // const fetchedData = require('./databasePlaceholder.json');
    fetch('/api/userdata/' + userId)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            return data[userId];
          });
}
