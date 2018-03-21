/**
 * @module index
 */
import React from 'react';

import moment from 'moment-timezone';
import * as queryString from 'query-string';

import {createStore} from 'redux';

import Video from '../containers/video';
import SleepNotice from '../containers/sleep-notice';
import Footer from '../containers/footer';

export default class App extends React.Component {
  state = {
    intervalId: null
  }

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.timeCheck();
    const intervalId = setInterval(this.timeCheck.bind(this), 1000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  
  timeCheck() {
    if (this.props.channel !== 'shrimpcam') return;
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
    if (shrimpsAwake !== this.props.awake) {
      this.props.setAwake(shrimpsAwake);
    }
    this.props.setTime(current.format('HH:mm:ss'));
  }

  render() {
    return <div>
      <div className="text-center">
        {this.props.channel !== 'shrimpcam' ? 
          <h1>{this.props.channel}</h1>
          :
          <h1>
            Shrimpcam 
            <img src="shrimpicon/android-icon-96x96.png" />
          </h1>
        }
      </div>
      {this.props.channel === 'shrimpcam' &&
        <div className="container">
          <SleepNotice {...this.props} />
        </div>
      }
      {this.props.awake || this.props.channel !== 'shrimpcam' ? 
        <div>
          <Video />
          <Footer />
        </div>
        : null
      }
    </div>;
  }
}
