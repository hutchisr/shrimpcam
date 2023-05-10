/**
 * @module dash
 */
import React from 'react';
import { MediaPlayer } from 'dashjs';
import Video from './video';

const domain = process.env.NODE_ENV === 'production' ? document.domain : 'shrimpcam.pw';
export default class Dash extends React.Component {
  /**
   *
   * @param {React.Props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      source: `https://${domain}/dash/${props.channel}.mpd`
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      source: `https://${domain}/dash/${nextProps.channel}.mpd`
    };
  }
  /**
   *
   * @param {HTMLVideoElement} node
   */
  initPlayer = (node) => {
    const player = this.player = MediaPlayer().create();
    player.initialize(node, this.state.source, true);
  }

  destroyVideo = (node) => {
    this.player.reset();
  }

  changeVideo = (node) => {
    this.player.reset();
    this.player.initialize(node, this.state.source, true);

  }

  render() {
    return <Video {...this.props} initPlayer={this.initPlayer} destroyVideo={this.destroyVideo} changeVideo={this.changeVideo} />;
  }
}
