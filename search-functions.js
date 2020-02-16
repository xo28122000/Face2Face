import { BASE_URL } from './env.js';

let userId;

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
    .then((isnear) => {
      if (isnear) {
        alert('Found someone!');
      }
      console.log(isnear);
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
    .then((isnear) => {
      if (isnear) {
        alert('Found someone!');
      }
      console.log(isnear);
    })
    .catch((err) => console.log(err));
};

const stopSearch = () => {
  fetch(`${BASE_URL}/api/stopsearch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: userId,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((_) => {
      console.log('Stopped searching');
    })
    .catch((err) => console.log(err));
};

export { startSearch, stopSearch, pushNewLocation, createNewUser };
