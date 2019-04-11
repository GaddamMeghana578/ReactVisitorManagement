import React, { Component } from 'react';
import CoverPage from "./views/coverpage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>This is a MERN stack project</h1>
        <CoverPage />
      </div>
    );
  }
}

export default App;
