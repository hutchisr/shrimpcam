/**
 * @module index
 */
import ReactDOM from 'react-dom';
import React from 'react';

import moment from 'moment-timezone';
import * as queryString from 'query-string';

import Video from './video';
import Dash from './dash';
import { SleepNotice } from './notice';
import Footer from './footer';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      shrimpsAwake: false,
      dash: false,
    }
  }
  
  componentDidMount() {
    this.timeCheck();
    let intervalId = setInterval(this.timeCheck.bind(this), 2000);
    this.setState({ intervalId });
    this.setState({ channel: queryString.parse(location.search).v });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  
  timeCheck() {
    let current = moment().tz(this.props.timezone);
    let wake = this.props.wakeAt.split(':');
    wake = moment().tz(this.props.timezone).set({
      hour: wake[0],
      minute: wake[1],
      second: wake[2]
    });
    let sleep = this.props.sleepAt.split(':');
    sleep = moment().tz(this.props.timezone).set({
      hour: sleep[0],
      minute: sleep[1],
      second: sleep[2]
    });
    let shrimpsAwake = current > wake && current < sleep;
    if (shrimpsAwake !== this.state.shrimpsAwake) {
      this.setState({ shrimpsAwake });
    }
  }
  /**
   * 
   * @param {MouseEvent} ev 
   */
  togglePlayer(ev) {
    ev.preventDefault();
    if (this.state.dash) {
      this.setState({ dash: false});
    } else {
      this.setState({ dash: true });
    }
  }

  render() {
    const VideoPlayer = this.state.dash ? Dash : Video;
    return <div>
      <div className="text-center">
        {this.state.channel ? 
          <h1>{this.state.channel}</h1>
          :
          <h1>
            Shrimpcam 
            <img src="shrimpicon/android-icon-96x96.png" />
          </h1>
        }
      </div>
      {!this.state.channel &&
        <div className="container">
          <SleepNotice {...this.props} {...this.state} />
        </div>
      }
      {this.state.shrimpsAwake || this.state.channel ? 
        <div>
          <VideoPlayer channel={this.state.channel || 'shrimpcam'} /> 
          <Footer togglePlayer={this.togglePlayer.bind(this)} {...this.state} />
        </div>
        : null
      }
    </div>;
  }
}

ReactDOM.render(<App wakeAt="12:00" sleepAt="21:30" timezone="America/Los_Angeles" />, document.getElementById('react'));
