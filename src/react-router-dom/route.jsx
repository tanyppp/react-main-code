import { Consumer } from './context';
import React, { Component } from 'react';
import pathToReg from 'path-to-regexp';

class Route extends Component {

  render() {
    const { path = "", component: Component, exact = false, ...props } = this.props;
    return (
      <Consumer>
        {
          (state) => {
            const { pathname } = state.location;
            let keys = [];
            const reg = pathToReg(path, keys, { end: !!exact });
            const result = pathname.match(reg) || [];
            const [url, ...values] = result;
            if (url != null) {
              keys = keys.map(item => item.name);
              state.match.params = values.reduce((next, value, i) => {
                next[keys[i]] = value;
                return next;
              }, {});
              if (state.mode === 'hash') {
                if (window.location.hash.slice(1) === path) {
                  state.match.isExact = true;
                }
              } else {
                if (window.location.pathname === path) {
                  state.match.isExact = true;
                }
              }
              return <Component {...state} {...props}></Component>;
            } else {
              return null;
            }
          }
        }
      </Consumer>
    )
  }

}

export default Route;
