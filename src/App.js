import React from 'react';
// import NavBar from './components/navBar/NavBar';
import MyGlobe from './components/home/WorldMap';
import {Home} from './components/home/Home'
import AddSuggestion from './components/suggestions/AddSuggestion'
import SuggestionsList from './components/suggestions/SuggestionsList'
import About from './components/navBar/About'
import Support from './components/navBar/Support'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './components/authorization/Login'


export default function App() {
  return (
    <Router>
    
      <Route exact path="/home" component={Home} />
      <Route exact path="/about"  component={About} />
      <Route exact path="/support"  component={Support} />
      <Route exact path="/"  component={Login} />
      <Route exact path="/addSuggestion" component={AddSuggestion} />
      <Route exact path="/suggestionsList" component={SuggestionsList} />

    </Router>
  );
}


