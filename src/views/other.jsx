import React, { Component } from 'react';
import { Route, NavLink, Redirect, Switch } from '../react-router-dom';

import Study from './other/study';
import Life from './other/life';
import Work from './other/work';
import Detail from './detail';

class Other extends Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          <NavLink to="/other/study">学习</NavLink>
          <NavLink to="/other/life">生活</NavLink>
          <NavLink to="/other/work">工作</NavLink>
        </div>
        <Switch>
          <Route path="/other/study" component={Study}></Route>
          <Route path="/other/life" component={Life}></Route>
          <Route path="/other/work" component={Work}></Route>
          <Route path="/other/detail/:id" component={Detail}></Route>
          <Redirect to="/other/study"></Redirect>
        </Switch>
      </div>
    )
  }

}

export default Other;
