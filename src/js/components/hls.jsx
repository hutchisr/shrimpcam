/**
 * @module hls
 */
import React from 'react';
import Hls from 'hls.js';
import Video from './video';

const domain = process.env.NODE_ENV === 'production' ? document.domain : 'shrimpcam.pw';

export default class HlsVideo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      source: `https://${domain}/hls/${props.channel}.m3u8`
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      source: `https://${domain}/hls/${nextProps.channel}.m3u8`
    };
  }

  initPlayer = (node) => {
    if (Hls.isSupported()) {
      const hls = this.hls = new Hls({
        // debug: true,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 5,
        enableWorker: true,
      });
      window.hls = hls; // debug
      hls.on(Hls.Events.ERROR, (evt, data) => {
        switch (data.details) {
          case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
            setTimeout(() => hls.loadSource(this.state.source), 2000);
            break;
        }
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
      hls.loadSource(this.state.source);
      hls.attachMedia(node);
    }
    else {
      node.setAttribute('src', source);
    }
  }

  destroyVideo = (node) => {
    if (Hls.isSupported()) {
      this.hls.destroy();
    }
  }

  changeVideo = (node) => {
    if (Hls.isSupported()) {
      this.hls.loadSource(this.state.source);
      this.hls.attachMedia(node);
    } else {
      node.setAttribute('src', this.state.source);
    }
  }

  render() {
    return <Video {...this.props} initPlayer={this.initPlayer} destroyVideo={this.destroyVideo} changeVideo={this.changeVideo} />;
  }
}
