/**
 * @module dash
 */
import {MediaPlayer} from 'dashjs';
import Video from './video';

export default class Dash extends Video {
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
    const url = `https://${document.domain}/dash/${this.props.channel}.mpd`;
    const player = this.player = MediaPlayer().create();
    player.getDebug().setLogToBrowserConsole(false);
    // player.setLiveDelayFragmentCount(3);
    player.initialize(node, url, true);
    
    this.bindVideoEventHandlers(node);
  }

  componentWillUnmount() {
    super.componentWillUnmount();    
    this.player && this.player.reset();
  }

  componentWillUpdate() {
    this.player && this.player.reset();
  }
}
