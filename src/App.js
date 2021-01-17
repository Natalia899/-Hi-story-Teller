import React from 'react';
// import NavBar from './components/navBar/NavBar';
import MyGlobe from './components/home/WorldMap';
import {Home} from './components/home/Home'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


export default function App() {
  return (
    <Router>
      <div className="App">
        <Home />
      </div>
    </Router>
  );
}


