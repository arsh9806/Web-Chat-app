import React, { useState } from 'react';
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Chat from "./components/Chat";
import { useDataLayerValue } from "./StateManagement/StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';

function App() {

  const [{user}, dispatch] = useDataLayerValue(true);
  return (
    <div className="app">
      {
        (!user) ? (
          <Login />
        ) : (
            <div className="app__body">
              <Router>
                <Sidebar />
                <Switch>
                  <Route path="/rooms/:roomId">
                    <Chat />
                  </Route>
                  <Route path="/">
                    <Chat />
                  </Route>
                </Switch>
              </Router>
            </div>
          )
      }

    </div>
  );
}

export default App;
