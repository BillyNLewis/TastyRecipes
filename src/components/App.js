import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import '../styles.css';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import Title from './Title';
import Recipe from '../pages/Recipe';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Title />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/recipe">
            <Recipe />
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}
export default App;
