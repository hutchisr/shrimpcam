import {connect} from 'react-redux';
import {setAwake, setTime} from '../actions/shrimps';
import App from '../components/app';

const mapStateToProps = ({shrimps: {awake}, video: {channel}}) => ({ awake, channel });

const mapDispatchToProps = dispatch => ({
  /**
   * @param {boolean} value
   */
  setAwake: value => dispatch(setAwake(value)),
  setTime: value => dispatch(setTime(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
