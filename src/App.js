import React, { Component } from 'react';
import { Switch , Route } from "react-router-dom";
import Post from "./components/post";
import Query from "./components/query";
import View from "./components/view";
import Login from "./components/login";
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/post" component={Post} />
        <Route path="/query" component={Query} />
        <Route path="/dashboard" component={View} />
      </Switch>
    );
  }
}

export default App;
