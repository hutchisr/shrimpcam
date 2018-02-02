/**
 * @module dash
 */
import React from 'react';
import {MediaPlayer} from 'dashjs';

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
    let url = `https://${document.domain}/dash/${this.props.channel}.mpd`;
    let player = MediaPlayer().create();
    player.getDebug().setLogToBrowserConsole(false);
    player.setLiveDelayFragmentCount(2);
    player.initialize(node, url, true);
  }

  render() {
    return <video ref={node => this.initPlayer(node)} controls autoPlay></video>
  }
}
