import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../styles.css';
import Home from '../pages/Home';
import Title from './Title';
import Recipe from '../pages/Recipe';

function App() {
  return (
    <Router>
      <div className="App">
        <Title />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/recipe">
            <Recipe />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
