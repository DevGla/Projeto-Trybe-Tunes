import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Home />
      </BrowserRouter>
    );
  }
}

export default App;
