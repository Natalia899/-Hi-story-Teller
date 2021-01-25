import React, { useEffect, useState } from "react";
import { Home } from './components/home/Home'
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
import EndGame from './components/quiz/EndGame'
//import QuizSocket from './components/quiz/QuizSocket';
// import EndGameSocket from "./components/quiz/EndGameSocket";
// import { Match } from './components/quiz/MatchType'
// const socketIOClient = require('socket.io-client');
// const ENDPOINT = 'ws://localhost:4200';



export default function App() {


  return (
    <div>
      <Router>
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/support" component={Support} />
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/addSuggestion" component={AddSuggestion} />
        <Route exact path="/suggestionsList" component={SuggestionsList} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/event/:id" component={Event} />
        <Route exact path='/verifySuggestion' component={VerifySuggest} />
        <Route exact path="/quiz" component={QuizStart} />
        <Route exact path="/quiz/:eventId" component={QuizQuestion} />
        <Route exact path="/endGame" component={EndGame} />
        {/* <Route exact path="/quizSocket/:eventId" component={QuizSocket} /> */}
        {/* <Route exact path="/endGameSocket" component={EndGameSocket} />
        <Route exact path="/matchType" component={Match} /> */}
      </Router>

    </div>






  );


}
