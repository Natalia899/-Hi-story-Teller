import React from "react";
// import NavBar from './components/navBar/NavBar';

import MyGlobe from './components/home/WorldMap';
import {Home} from './components/home/Home'
import AddSuggestion from './components/suggestions/AddSuggestion'
import SuggestionsList from './components/suggestions/SuggestionsList'
import About from './components/navBar/About'
import Support from './components/navBar/Support'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
 import VerifySuggest from "./components/suggestions/VerifySuggest";
import Events from './components/events/Events'
import Login from './components/authorization/Login'
import Signup from './components/authorization/SignUp'
import Event from './components/events/Event';
import QuizStart from './components/quiz/QuizStart';
import QuizQuestion from './components/quiz/QuizQuestion';


export default function App() {
  return (
    <Router>
      <Route exact path="/home" component={Home} />
      <Route exact path="/about"  component={About} />
      <Route exact path="/support"  component={Support} />
      <Route exact path="/"  component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/addSuggestion" component={AddSuggestion} />
      <Route exact path="/suggestionsList" component={SuggestionsList} />
      <Route exact path="/events" component={Events} />
      <Route exact path="/event/:id" component={Event} />
    	<Route exact path='/verifySuggestion' component={VerifySuggest} />
      <Route exact path="/quiz" component={QuizStart} />
      <Route exact path="/quiz/:eventId" component={QuizQuestion} />
    </Router>
  );


}
