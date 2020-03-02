import React, { Component } from 'react';
import { Consumer } from './context';
import pathToReg from 'path-to-regexp';

class Switch extends Component {

  render() {
    return (
      <Consumer>
        {
          (state) => {
            const { pathname } = state.location;
            const children = this.props.children;
            for (let i = 0; i < children.length; i++) {
              const { path = ''/**兼容redirect */, exact } = children[i].props;
              const reg = pathToReg(path, [], { end: !!exact });
              if (reg.test(pathname)) {
                return children[i];
              }

            }
            return null;
          }
        }
      </Consumer>
    )
  }

}

export default Switch;
