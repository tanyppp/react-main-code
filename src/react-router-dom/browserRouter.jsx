import { Provider } from './context';
import React, { Component } from 'react';

class BrowerRouter extends Component {
  state = {
    pathname: ''
  }

  value = {
    mode: 'history',
    history: {
      push: (to, state = {}) => {
        window.history.pushState(state, null, to);
        this.value.location.state = state;
        this.setLocation();
      },
      replace: (to, state = {}) => {
        window.history.replaceState(state, null, to);
        this.value.location.state = state;
        this.setLocation();
      },
      length: window.history.length,
      go(n) {
        window.history.go(n);
      },
      forward() {
        window.history.forward();
      },
      back() {
        window.history.back();
      }
    },
    location: {
      hash: '',
      search: '',
      pathname: '',
      state: undefined
    },
    match: {
      isExact: false,
      params: {},
      path: '',
      url: ''
    }
  }

  setLocation = () => {
    const hash = window.location.hash;
    const search = window.location.search;
    const pathname = window.location.pathname;
    this.value = {
      ...this.value,
      history: {
        ...this.value.history,
        length: window.history.length
      },
      location: {
        ...this.value.location,
        hash,
        search,
        pathname
      },
      match: {
        ...this.value.match,
        path: pathname,
        url: pathname
      }
    }
    this.setState({
      pathname
    })
  }

  componentWillMount() {
    this.setLocation();
    window.addEventListener('popstate', (e) => {
      const state = e.state;
      this.value.location.state = state;
      this.setLocation();
    });
  }

  render() {
    return (
      <Provider value={this.value}>
        {this.props.children}
      </Provider>
    )
  }

}

export default BrowerRouter;
