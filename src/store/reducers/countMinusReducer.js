const initState = {
  count: 100
}

const countMinusReducer = (state = initState, action) => {
  const newState = JSON.parse( JSON.stringify(state) );

  switch (action.type) {
    case 'count_minus':
      newState.count -= action.n;
      break;
    default:
      break;
  }

  return newState;
}

export default countMinusReducer;