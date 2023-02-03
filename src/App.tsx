import React from 'react';
import logo from './logo.svg';
import './App.css';
import BullBearIndicator from './BullBearIndicator';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Bitcoin Bull vs Bear Indicators</h1> */}
      </header>
      <main>
        <BullBearIndicator />
      </main>
      <footer>
        <div id="copySection">
          <a href="https://causewaysoft.com/">
            <img src="https://causewaysoft.com/assets/img/logo.svg" className="App-logo" alt="logo" />
            <p>
              Made by Mateusz Cichy
            </p>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
