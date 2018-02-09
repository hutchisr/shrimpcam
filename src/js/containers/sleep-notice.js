import {connect} from 'react-redux';
import SleepNotice from '../components/sleep-notice';

const mapStateToProps = state => state.shrimps;

export default connect(mapStateToProps)(SleepNotice);
