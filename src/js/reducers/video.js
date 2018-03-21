export default (state = {player: 'hls', paused: true}, action) => {
  switch (action.type) {
    case 'VIDEO_CANPLAY_SET':
      return {
        ...state,
        canPlay: action.value,
      };
    case 'VIDEO_PAUSED_SET':
      return {
        ...state,
        paused: action.value,
      };
    case 'VIDEO_PLAYER_SET':
      return {
        ...state,
        player: action.value,
      };
    case 'VIDEO_CHANNEL_SET':
      return {
        ...state,
        channel: action.value,
      };
    default:
      return state;
  }
};

