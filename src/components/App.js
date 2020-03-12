import React from 'react';
import Currencies from './Currencies';
import News from './News';
import '../styles/App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Currencies />
        <News />
      </div>
    );
  }
}

export default App;