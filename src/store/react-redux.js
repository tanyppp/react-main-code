import React, {Component} from 'react';
import { bindActionCreators } from './redux';

const Context = React.createContext();

const Provider = (props) => {
  return (
    <Context.Provider value={ props.store }>
      { props.children }
    </Context.Provider>
  )
}

const connect = (mapStateToProps, mapDispatchToProps) => (Cmp) => () => {

  class Connect extends Component {

    render () {
      const { store } = this.props;
      const state = mapStateToProps(store.getState());
      let dispatchMethods = {};
      if (typeof mapDispatchToProps === 'function') {
        dispatchMethods = mapDispatchToProps(store.dispatch);
      }else if(typeof mapDispatchToProps === 'object') {
        dispatchMethods = bindActionCreators(mapDispatchToProps, store.dispatch);
      }else {
        throw new Error(`传入的${mapDispatchToProps}不是一个正确的参数，应为对象或者函数`);
      }
      return (
        <Cmp {...state} {...dispatchMethods}></Cmp>
      )
    }

    componentDidMount() {
      const { store } = this.props;
      this.unsub = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
      this.unsub();
    }

  }

  return (
    <Context.Consumer>
      {
        store => <Connect store={store}></Connect>
      }
    </Context.Consumer>
  )

}

export { Provider, connect };