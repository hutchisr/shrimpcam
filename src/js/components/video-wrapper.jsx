import React from 'react';

import Hls from './hls';
import Dash from './dash';

const VideoWrapper = props => props.player === 'hls' ? <Hls {...props} /> : <Dash {...props} />;

export default VideoWrapper;
