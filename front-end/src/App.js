import React, { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Components import */
import Login from "./Components/Login";
import Overview from "./Components/Overview";

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Login />
          </Route>
          <Route path='/:torreUsername' component={Overview} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
