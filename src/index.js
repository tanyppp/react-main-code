import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Redirect, Switch } from './react-router-dom';
import './test-dom-diff'

import './index.css';

import Home from './views/home';
import About from './views/about';
import Other from './views/other';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavLink to="/" exact>主页</NavLink>
          <NavLink to="/about">关于</NavLink>
          <NavLink to="/other">其他</NavLink>
        </div>
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/other" component={Other}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </Router>
    )
  }
}

render(<App></App>, window.root);
