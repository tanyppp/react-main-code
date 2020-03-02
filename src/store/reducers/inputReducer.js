const initState = {
  iptVal: ''
}

const inputReducer = (state = initState, action) => {
  const newState = JSON.parse( JSON.stringify(state) );

  switch (action.type) {
    case 'change_val':
      newState.iptVal = action.value;
      break;
    default:
      break;
  }

  return newState;
}

export default inputReducer;