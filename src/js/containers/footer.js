import {connect} from 'react-redux';

import Footer from '../components/footer';
import {setPlayer} from '../actions/video';

const mapStateToProps = (state, ownProps) => state;

const mapDispatchToProps = (dispatch, ownProps) => ({
  setPlayer: value => dispatch(setPlayer(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
