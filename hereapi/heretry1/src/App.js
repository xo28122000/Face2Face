import React, { Component } from "react";

import logo from "./logo.svg";
import "./App.css";

import { HEREMap, Marker } from "here-maps-react";
import Map from "./Map";
// var platform = new window.H.service.Platform({
//   'apikey': '{YOUR_APIKEY}'
// });
const e = React.createElement;
class App extends Component {
  state = {};

  render() {
    return <Map />;
  }
}

export default App;
