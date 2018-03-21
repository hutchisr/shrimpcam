/**
 * @module hls
 */
import React from 'react';
import Hls from 'hls.js';
import Video from './video';


export default class HlsVideo extends React.Component {
  initPlayer(node) {
    if (!node) return;
    const domain = process.env.NODE_ENV === 'production' ? document.domain : 'shrimpcam.pw';
    const source = `https://${domain}/hls/${this.props.channel}.m3u8`;

    if (Hls.isSupported()) {
      const hls = this.hls = new Hls({
        // debug: true,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 5,
        enableWorker: true,
      });
      window.hls = hls;
      hls.on(Hls.Events.ERROR, (evt, data) => {
        switch (data.details) {
          case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
            setTimeout(() => hls.loadSource(source), 2000);
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
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        node.play();
      });
      hls.loadSource(source);
      hls.attachMedia(node);
    }
    else {
      node.setAttribute('src', source);
    }

    this.bindVideoEventHandlers(node);
  }

  componentWillUnmount() {
    this.hls && this.hls.destroy();
  }

  componentWillUpdate() {
    this.hls && this.hls.destroy();
  }

  render() {
    return <Video {...this.props} initPlayer={this.initPlayer} componentWillUnmount={this.componentWillUnmount} componentWillUpdate={this.componentWillUpdate} />;
  }
}
