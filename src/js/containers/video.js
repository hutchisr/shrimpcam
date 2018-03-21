import { connect } from 'react-redux';

import VideoWrapper from '../components/video-wrapper';

import {
  setCanPlay,
  setPaused,
  setPlayer
} from '../actions/video';

const allowedProps = ['channel', 'player'];

const mapStateToProps = (state) => Object.keys(state.video).filter(
  key => allowedProps.includes(key)
).reduce((obj, key) => ({...obj, [key]: state.video[key]}), {});

const mapDispatchToProps = (dispatch) => ({
  setCanPlay: value => dispatch(setCanPlay(value)),
  setPaused: value => dispatch(setPaused(value)),
  setPlayer: value => dispatch(setPlayer(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoWrapper);
