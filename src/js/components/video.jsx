/**
 * @module video
 */

import React from 'react';

import Overlay from '../containers/overlay';

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
  initplayer(node) {}

  /**
   * 
   * @param {HTMLVideoElement} node 
   */
  bindVideoEventHandlers(node) {
    document.onkeypress = ev => this.handleKeyPress(node, ev);
    node.ondblclick = ev => this.toggleFullscreen(node);
    node.onclick = ev => this.togglePlayPause(node);
  }
  /**
   * @param {HTMLVideoElement} node 
   * @param {KeyboardEvent} ev 
   */
  handleKeyPress(node, ev) {
    if (ev.key === 'f') {
      ev.preventDefault();
      this.toggleFullscreen(node);
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

  componentWillUnmount() {}

  shouldComponentUpdate(nextProps) {
    return this.props.player !== nextProps.player ||
      this.props.channel !== nextProps.channel;
  }

  render() {
    return <div style={{position: 'relative'}}>
      <Overlay ref={node => this.loadingComponent = node} />
      <video 
        ref={node => this.initPlayer(node)} 
        onWaiting={() => this.props.setCanPlay(false)} 
        onCanPlayThrough={() => this.props.setCanPlay(true)}
        onPause={() => this.props.setPaused(true)}
        onPlay={() => this.props.setPaused(false)}
        autoPlay
      />
    </div>;
  }
}
