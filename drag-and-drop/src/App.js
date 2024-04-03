// App.js
import React from 'react';
import './App.css';
import Page from './components/Page';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Page />
    </div>
  );
}

export default App;
