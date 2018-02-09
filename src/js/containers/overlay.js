import {connect} from 'react-redux';

import Overlay from '../components/overlay';

const mapStateToProps = (state) => state.video;

export default connect(mapStateToProps)(Overlay);
