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
    bufferLength: 2
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
    const source = `https://${document.domain}/hls/${this.props.channel}.m3u8`;

    if (Hls.isSupported()) {
      let hls = new Hls({
        // debug: true,
        maxBufferLength: 10,
      });
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

    document.onkeypress = ev => this.handleKeyPress(node, ev);
    node.onplay = ev => node.removeAttribute('controls');
    // node.onclick = ev => this.togglePlay(node);
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
    if (['p', ' '].indexOf(ev.key) >= 0) {
      ev.preventDefault();
      this.togglePlay(node);
    }
  }
  /**
   * 
   * @param {HTMLVideoElement} node 
   */
  togglePlay(node) {
    if (node.paused) {
      node.currentTime = node.duration - this.props.bufferLength;
      node.play();
    } else {
      node.pause();
    }
  }

  /**
   * @param {HTMLElement} node 
   */
  toggleFullscreen(node) {
    if ((document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (node.requestFullscreen) {
        node.requestFullscreen();
      } else if (node.mozRequestFullScreen) {
        node.mozRequestFullScreen();
      } else if (node.webkitRequestFullscreen) {
        node.webkitRequestFullscreen();
      } else if (node.msRequestFullscreen) {
        node.msRequestFullscreen();
      }
    }
  }

  render() {
    return <video ref={node => this.initPlayer(node)} controls autoPlay></video>;
  }
}
