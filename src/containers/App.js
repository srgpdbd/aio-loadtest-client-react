import React, { Component } from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import AppBar from 'material-ui/AppBar';
import '../styles/App.css';
import history from '../history';
import CreateTest from './CreateTest';

class App extends Component {

  render() {
    return (
      <div className="App">
        <AppBar title="Aio LoadTest" />
        <ConnectedRouter history={history}>
          <Route exact path="/" component={CreateTest} />
        </ConnectedRouter>
      </div>
    );
  }

}

export default App;
