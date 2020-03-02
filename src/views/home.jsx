import React, { Component } from 'react';

class Home extends Component {

  render() {
    console.log(this.props);
    return (
      <div>
        主页
        <div onClick={() => this.props.history.push('/about', {
          from: '/', to: '/about'
        })}>去关于</div>
      </div>
    )
  }
}

export default Home;
