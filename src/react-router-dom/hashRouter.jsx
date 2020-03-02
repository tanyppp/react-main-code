import { Provider } from './context';
import React, { Component } from 'react';

class HashRouter extends Component {
  state = {
    pathname: ''
  }

  value = {
    mode: 'hash',
    history: {
      push: (to, state = {}) => {
        window.location.hash = "#" + to;
        this.value.location.state = state;
      },
      replace: (to, state = {}) => {
        window.history.replaceState({}, null, "#" + to);
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
    const searchIndex = window.location.hash.indexOf('?');
    const hashIndex = window.location.hash.slice(1).indexOf('#');
    const len = window.location.hash.length;
    const hash = hashIndex === -1 ? '' : window.location.hash.slice(hashIndex + 1);
    const search = searchIndex === -1 ? '' : window.location.hash.slice(searchIndex, hashIndex === -1 ? len : hashIndex + 1);
    const pathname = window.location.hash.slice(1, searchIndex === -1 ? len : searchIndex);
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
    window.location.hash = window.location.hash || '#/';
    this.setLocation();
    window.onhashchange = () => {
      this.setLocation();
    }
  }

  render() {
    return (
      <Provider value={this.value}>
        {this.props.children}
      </Provider>
    )
  }

}

export default HashRouter;
