import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InterviewBoard from '../../components/InterviewBoard/InterviewBoard';
import WelcomePage from '../welcome/WelcomePage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: null,
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className='Logo'>
            <p><a href="/" className="logo-holder">IP</a></p>
          </div>
          <div className='banner'>
            <p>Interview Prepper (name change pending)</p>
          </div>
        </header>
        <Switch>
          <Route exact path = '/' render={() =>
          <WelcomePage/>
        }/>
          <Route exact path = '/demo' render={() =>
           <InterviewBoard />
        }/>
        </Switch>
      </div>
    );
    }
}

export default App;
