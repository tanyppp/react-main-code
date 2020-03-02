import React, { Component } from 'react';
import { NavLink } from '../../react-router-dom';

class Study extends Component {

  render() {
    return (
      <div>
        学习
        <br/>
        <NavLink to="/other/detail/1">详情1</NavLink>
        <br/>
        <NavLink to="/other/detail/2">详情2</NavLink>
        <br/>
        <NavLink to="/other/detail/3">详情3</NavLink>
      </div>
    )
  }

}

export default Study;
