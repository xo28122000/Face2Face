const baseUrl = 'http://10.3.17.13:5000';

let userId;

const createNewUser = (long, lat) => {
  fetch(`${baseUrl}/api/newUser?long=${long}&lat=${lat}`)
    .then((response) => {
      return response.json();
    })
    .then((newUser) => {
      console.log(newUser);
    })
    .catch((err) => {
      console.log(error);
      userId = 1;
    });
};

const pushNewLocation = (long, lat) => {
  if (!userId) {
    console.warn('Would send new location, but no userId found');
    return;
  }
  console.log(userId);

  fetch(`${baseUrl}/api/changeLoc?id=${userId}&long=${long}&lat=${lat}`)
    .then((response) => {
      return response.json();
    })
    .then((isNear) => {
      if (isNear) {
        alert('Found someone!');
      }
      console.log(isNear);
    })
    .catch((err) => console.log(error));
};

//
const startSearch = () => {
  fetch(`${baseUrl}/api/startSearch?id=${userId}&long=${long}&lat=${lat}`)
    .then((response) => {
      return response.json();
    })
    .then((isNear) => {
      if (isNear) {
        alert('Found someone!');
      }
      console.log(isNear);
    })
    .catch((err) => console.log(error));
};

export { startSearch, pushNewLocation, createNewUser };
