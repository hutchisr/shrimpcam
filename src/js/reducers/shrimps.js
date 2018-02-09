export default (state = { awake: false }, action) => {
  switch (action.type) {
    case 'SHRIMPS_AWAKE_SET':
      return {
        ...state,
        awake: action.value
      };
    case 'SHRIMPS_TIME_SET':
      return {
        ...state,
        time: action.value,
      };
    default:
      return state;
  }
}
;
