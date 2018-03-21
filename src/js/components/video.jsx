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
  }

  /**
   * @param {HTMLVideoElement} node The component's <video> Element 
   */
  initPlayer(node) {
    this.props.initPlayer.call(this, node);
  }

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
  /**
   * 
   * @param {Event} ev 
   * @param {boolean} canPlay
   */
  handleCanPlay(canPlay, ev) {
    this.props.setCanPlay(canPlay);
    if (canPlay) {
      ev.target.classList.add('active');
    }
  }

  componentWillUnmount() {
    this.props.componentWillUnmount.call(this);
  }

  componentWillUpdate() {
    this.props.componentWillUpdate.call(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.player !== nextProps.player ||
      this.props.channel !== nextProps.channel;
  }

  render() {
    return <div style={{position: 'relative', display: 'table', margin: 'auto'}}>
      <Overlay ref={node => this.loadingComponent = node} />
      <video 
        ref={node => this.initPlayer(node)} 
        onWaiting={this.handleCanPlay.bind(this, false)} 
        onCanPlayThrough={this.handleCanPlay.bind(this, true)}
        onPause={() => this.props.setPaused(true)}
        onPlay={() => this.props.setPaused(false)}
        autoPlay
      />
    </div>;
  }
}
