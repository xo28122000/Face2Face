import { BASE_URL } from './env.js';

const USER_ID = 'user-id';

let userId;
let isSearching = false;

let lastLong = 0;
let lastLat = 0;

const createNewUser = (long, lat) => {
  const storedId = window.localStorage.getItem(USER_ID);
  console.log(storedId);

  if (storedId) {
    userId = storedId;
  } else {
    createUserOnServer(long, lat);
  }
};

const createUserOnServer = (long, lat) => {
  fetch(`${BASE_URL}/api/newuser`, {
    method: 'POST',
    body: JSON.stringify({ long, lat }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      return response.json();
    })
    .then((newUser) => {
      console.log(newUser);
      userId = newUser.id;
      window.localStorage.setItem(USER_ID, userId);
    })
    .catch((err) => {
      console.log(err);
    });
};

const pushNewLocation = (long, lat) => {
  lastLong = long;
  lastLat = lat;
  if (!isSearching) return;
  if (!userId) {
    console.warn('Would send new location, but no userId found');
    return;
  }
  console.log(userId);

  fetch(`${BASE_URL}/api/changeloc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: userId,
      long,
      lat,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((obj) => {
      if (obj.isnear) {
        handleUsersInArea(obj.usersInArea);
      }
    })
    .catch((err) => console.log(err));
};

//
const startSearch = (params) => {
  fetch(`${BASE_URL}/api/startsearch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: userId,
      ...params,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((obj) => {
      console.log(obj);
      isSearching = true;
      if (obj.isnear) {
        handleUsersInArea(obj.usersInArea);
      }
      startSearchInterval();
    })
    .catch((err) => console.log(err));
};

const stopSearch = () => {
  clearInterval();
  fetch(`${BASE_URL}/api/stopsearch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: userId,
    }),
  })
    .then((_) => {
      isSearching = false;
      console.log('Stopped searching');
    })
    .catch((err) => console.log(err));
};

const startSearchInterval = () => {
  setInterval(() => {
    pushNewLocation(lastLong, lastLat);
  }, 20000);
};

const handleUsersInArea = (usersInArea) => {
  $('#result-list').empty();
  $('#result-list').append('<ul id="list"></ul>');
  usersInArea.forEach((user) => {
    console.log(user);
    $('#list').append(
      `<li>User ${user.id} says: ${user.description}. They're up to: ${user.topics}</li>`
    );
  });
};

const stopSearchInterval = () => {
  clearInterval();
};

export { startSearch, stopSearch, pushNewLocation, createNewUser };
