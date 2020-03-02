const actionType = {
  INIT: '@@redux/init'
}

const createStore = (reducer, preloadState, inhancer) => {
  let state;
  let listeners = [];
  let isDispatching = false;
  // reducer函数校验
  if (typeof reducer !== 'function') {
    throw new Error('传入的reducer必须为一个函数');
  }
  // 对第三个参数进行处理，如果传入的是函数，则第三个参数接收
  if (typeof preloadState === 'function' && inhancer == null) {
    inhancer = preloadState;
    preloadState = null;
  }
  // 接收到函数的处理，传入createStore
  if (typeof inhancer === 'function') {
    return inhancer(createStore)(reducer, preloadState);
  }

  const getState = () => state;

  const dispatch = (action) => {
    // action校验
    if (typeof action !== 'object') {
      throw new Error('action需要为一个简单的对象');
    }
    // type校验
    if (typeof action.type === 'undefined') {
      throw new Error('action.type的值不能为undefined');
    }
    // 如果在reducer中分发任务，则报错
    if (isDispatching) {
      throw new Error('不能在reducer中调用dispatch');
    }

    try {
      isDispatching = true;
      state = reducer(state, action);
      listeners.forEach(fn => fn());
    } finally {
      isDispatching = false;
    }
  }

  const subscribe = (fn) => {
    listeners.push(fn);
    return () => {
      const index  = listeners.indexOf(fn);
      listeners.splice(index, 1);
    }
  }
  // 初始化state的处理
  dispatch({
    type: actionType.INIT
  })

  return {
    getState,
    dispatch,
    subscribe
  }
}

const combineReducers = (reducers) => {
  const finalReducers = {};

  for(let key in reducers) {
    const reducer = reducers[key];
    // reducer函数校验
    if (typeof reducer !== 'function') {
      console.error(`reducer: ${key}应该是一个函数 `);
    } else {
      const state = reducers[key](undefined, {});
      // reducer函数返回的状态校验
      if (typeof state === 'undefined') {
        throw new Error(`reducer: ${key}返回的状态为undefined`);
      }
      finalReducers[key] = reducers[key];
    }
  }

  return (state = {}, action) => {
    for(let _key in finalReducers) {
      const finalReducer = finalReducers[_key];
      state[_key] = finalReducer(state[_key], action);
    }
    return state;
  }
}

const bindActionCreators = (action, dispatch) => {
  const boundActions = {};

  if (typeof action !== 'object' || action === null) {
    throw new Error('action必须是一个对象且不能为null');
  }

  for (let key in action) {
    if (typeof action[key] !== 'function') {
      throw new Error(`action: ${key}应该是一个函数`);
    }
    boundActions[key] = (...args) => dispatch(action[key](...args));
  }

  return boundActions;
}

const compose = (...middlewareAPIs) => {
  return middlewareAPIs.reduce((last, now) => {
    return (...args) => {
      return last(now(...args));
    }
  })
}

const applyMiddleware = (...middlewares) => (createStore) => (reducer, preloadState) => {
  const store = createStore(reducer, preloadState);
  let dispatch = store.dispatch;
  const middlewareAPIs = middlewares.map(item => item({
    getState: store.getState,
    diapatch: dispatch
  }));

  dispatch = compose(...middlewareAPIs)(dispatch);

  return {
    ...store,
    dispatch
  }
}

export { createStore, combineReducers, bindActionCreators, applyMiddleware, compose };