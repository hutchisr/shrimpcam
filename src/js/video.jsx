/**
 * @module video
 */

import React from 'react';
import PropTypes from 'prop-types';
import Hls from 'hls.js';

/**
 * Manages HTML5 Video
 */
export default class Video extends React.Component {
  static defaultProps = {
    bufferLength: 5
  }

  /**
   * @param {React.Props} props 
   */
  constructor(props) {
    super(props);

    this.initPlayer = this.initPlayer.bind(this);
  }
  /**
   * @param {HTMLVideoElement} node The component's <video> Element 
   */
  initPlayer(node) {
    if (!node) return;
    const domain = process.env.NODE_ENV === 'production' ? document.domain : 'shrimpcam.pw';
    const source = `https://${domain}/hls/${this.props.channel}.m3u8`;

    if (Hls.isSupported()) {
      const hls = this.hls = new Hls({
        // debug: true,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 5,
        liveDurationInfinity: true,
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
  /**
   * 
   * @param {HTMLVideoElement} node 
   */
  bindVideoEventHandlers(node) {
    document.onkeypress = ev => this.handleKeyPress(node, ev);
    node.ondblclick = ev => this.toggleFullscreen(node);
  }
  /**
   * @param {HTMLVideoElement} node 
   * @param {KeyboardEvent} ev 
   */
  handleKeyPress(node, ev) {
    if (ev.key === 'f') {
      ev.preventDefault();
      this.toggleFullscreen(node)
    }
    // if (['p', ' '].indexOf(ev.key) >= 0) {
    //   ev.preventDefault();
    //   this.togglePlayPause(node);
    // }
  }
  /**
   * 
   * @param {HTMLVideoElement} node 
   */
  togglePlayPause(node) {
    if (node.paused) {
      node.play();
    } else {
      node.pause();
    }
  }

  /**
   * @param {HTMLElement} node 
   */
  toggleFullscreen(node) {
    const requestFullScreen = node.requestFullscreen
      || node.msRequestFullscreen
      || node.mozRequestFullScreen
      || node.webkitRequestFullscreen;
    const exitFullscreen = document.exitFullscreen
      || document.msExitFullscreen
      || document.mozCancelFullScreen
      || document.webkitExitFullscreen;
    const fullscreenElement = document.fullscreenElement
      || document.msFullscreenElement
      || document.mozFullScreenElement
      || document.webkitFullscreenElement;
    if (fullscreenElement && fullscreenElement !== null) {
      exitFullscreen.call(document);
    } else {
      requestFullScreen.call(node);
    }
  }

  componentWillUnmount() {
    this.hls && this.hls.destroy();
  }

  render() {
    return <video ref={node => this.initPlayer(node)} controls autoPlay></video>;
  }
}
