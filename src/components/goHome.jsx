import React from 'react';
import { WithRouter } from '../react-router-dom';

const Cmp = props => {
  const { history } = props;
  return (
    <span
      onClick={() => history.push('/')}>
      回到首页
      </span>
  )
}

const GoHome = WithRouter(Cmp);

export default GoHome;
