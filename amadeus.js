fetch("https://test.api.amadeus.com/v1/security/oauth2/token ", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body:
    "grant_type=client_credentials&client_id={apikey}&client_secret={apisecret}"
})
  .then(res => {
    // console.log(res);
    return res.json();
  })
  .then(resobj => {
    console.log(resobj);
    var actoken = "Bearer " + resobj.access_token;
    fetch(
      "https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873",
      { headers: { Authorization: actoken } }
    )
      .then(res => {
        return res.json();
      })
      .then(x => {
        console.log(x);
      });
  });
