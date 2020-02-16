import { BASE_URL } from './env.js';

let userId;
let isSearching = false;

let lastLong = 0;
let lastLat = 0;

const createNewUser = (long, lat) => {
  console.log(long, lat);
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
        alert('Found someone!');
      }
      console.log(obj.isnear);
    })
    .catch((err) => console.log(err));
};

//
const startSearch = () => {
  fetch(`${BASE_URL}/api/startsearch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: userId,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((obj) => {
      isSearching = true;
      if (obj.isnear) {
        alert('Found someone!');
      }
      console.log(obj.isnear);
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

const stopSearchInterval = () => {
  clearInterval();
};

export { startSearch, stopSearch, pushNewLocation, createNewUser };
