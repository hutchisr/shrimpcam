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

  componentDidMount() {
    this.props.initPlayer(this.playerHtmlNode);
    this.bindVideoEventHandlers(this.playerHtmlNode);    
  }

  /**
   * 
   * @param {HTMLVideoElement} node 
   */
  bindVideoEventHandlers(node) {
    document.onkeypress = ev => this.handleKeyPress(node, ev);
    if (screen.orientation) { screen.orientation.onchange = () => { 
      const orientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {}).type;
      switch (orientation.split('-')[0]) {
        case 'landscape':
          this.toggleFullscreen(node, true);
          break;
        default:
          this.toggleFullscreen(node, false);
      }
    }; }
    node.onclick = () => this.togglePlayPause(node);
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
    if (node.paused || node.ended) {
      node.play();
    } else if (!node.paused) {
      node.pause();
    }
  }

  /**
   * @param {HTMLElement} node 
   */
  toggleFullscreen(node, fullscreen='auto') {
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
    if (fullscreenElement && fullscreenElement !== null && (fullscreen === false || fullscreen === 'auto')) {
      exitFullscreen && exitFullscreen.call(document);
    } else if (fullscreen === true || fullscreen === 'auto') {
      requestFullScreen && requestFullScreen.call(node);
    }
  }
  /**
   * 
   * @param {Event} ev 
   * @param {boolean} canPlay
   */
  handleCanPlay = (canPlay, ev) => {
    this.props.setCanPlay(canPlay);
    if (canPlay) {
      ev.target.classList.add('active');
    }
  }

  componentWillUnmount() {
    this.props.destroyVideo(this.playerHtmlNode);
  }
  
  componentDidUpdate() {
    this.props.changeVideo(this.playerHtmlNode);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.player !== nextProps.player ||
      this.props.channel !== nextProps.channel;
  }

  render() {
    return <div style={{position: 'relative', display: 'table', margin: 'auto'}}>
      <Overlay ref={node => this.loadingComponent = node} />
      <video 
        ref={node => this.playerHtmlNode = node} 
        onWaiting={this.handleCanPlay.bind(this, false)} 
        onCanPlayThrough={this.handleCanPlay.bind(undefined, true)}
        onPause={() => this.props.setPaused(true)}
        onPlay={() => this.props.setPaused(false)}
        autoPlay muted
      />
    </div>;
  }
}
