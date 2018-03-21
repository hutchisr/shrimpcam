/**
 * @module dash
 */
import React from 'react';
import {MediaPlayer} from 'dashjs';
import Video from './video';

export default class Dash extends React.Component {
  /**
   * 
   * @param {React.Props} props 
   */
  constructor(props) {
    super(props);
  }
  /**
   * 
   * @param {HTMLVideoElement} node 
   */
  initPlayer(node) {
    if (!node) return;
    const domain = process.env.NODE_ENV === 'production' ? document.domain : 'shrimpcam.pw';    
    const url = `https://${domain}/dash/${this.props.channel}.mpd`;
    const player = this.player = MediaPlayer().create();
    player.getDebug().setLogToBrowserConsole(false);
    // player.setLiveDelayFragmentCount(3);
    player.initialize(node, url, true);
    
    this.bindVideoEventHandlers(node);
  }

  componentWillUnmount() {
    this.player && this.player.reset();
  }

  componentWillUpdate() {
    this.player && this.player.reset();
  }

  render() {
    return <Video {...this.props} initPlayer={this.initPlayer} componentWillUnmount={this.componentWillUnmount} componentWillUpdate={this.componentWillUpdate} />;
  }
}
