import {connect} from 'react-redux';

import VideoWrapper from '../components/video-wrapper';

import {
  setCanPlay,
  setPaused,
  setPlayer
} from '../actions/video';

const mapStateToProps = (state) => state.video;

const mapDispatchToProps = (dispatch) => ({
  setCanPlay: value => dispatch(setCanPlay(value)),
  setPaused: value => dispatch(setPaused(value)),
  setPlayer: value => dispatch(setPlayer(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoWrapper);
