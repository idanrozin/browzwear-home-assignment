import React, { Component } from 'react';

import MainTable from './MainTable';
import MapContainer from './MapContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <MapContainer long={36.8233}/> */}
        <MainTable/>
      </div>
    );
  }
}

export default App;
