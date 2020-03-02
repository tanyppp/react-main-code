import { Consumer } from './context';
import React, { Component } from 'react';
import pathToReg from 'path-to-regexp';

class NavLink extends Component {

  render() {
    return (
      <Consumer>
        {
          (state) => {
            const { to="", exact } = this.props;
            const reg = pathToReg(to, [], { end: !!exact });
            return (
              <a href={to}
                className={reg.test(state.location.pathname) ? 'active' : ''}
                onClick={(e) => {
                  if (e.preventDefault) {
                    e.preventDefault();
                  } else {
                    window.event.returnValue = false;
                  }
                  state.history.push(to);
                  return false;
                }}>
                {this.props.children}
              </a>
            )
          }
        }
      </Consumer>
    )
  }
}

export default NavLink;
