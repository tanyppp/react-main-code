import React, { Component } from 'react';
import { Consumer } from './context';

class Redirect extends Component {

  render() {
    const { to = '' } = this.props;
    return (
      <Consumer>
        {
          (state) => {
            Promise.resolve().then(() => state.history.push(to));
            return null;
          }
        }
      </Consumer>
    )
  }

}

export default Redirect;
