/**
 * Notice about the state of the shrimps :)
 * @module notice 
 */

import React from 'react';

import moment from 'moment-timezone';
/**
 * Describes state (sleeping or not sleeping) of shrimps!
 */
export class SleepNotice extends React.Component {
  /**
   * @param {React.Props} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      currentTime: '',
      sleepShrimps: false,
      visible: true
    }
  }
  /**
   * Update Time
   */
  timeUpdate() {
    let current = moment().tz(this.props.timezone);
    let state = {
      currentTime: current.format('HH:mm:ss')
    };
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
    if (current > wake && current < sleep) {
      Object.assign(state, { sleepShrimps: false })
    } else {
      Object.assign(state, { sleepShrimps: true });
    }
    this.setState(state);
  }

  componentDidMount() {
    this.timeUpdate();
    let intervalId = setInterval(() => {
      this.timeUpdate();
    }, 500);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  handleCloseBtnClick() {
    this.setState({
      visible: false
    });
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    return <div className="alert alert-info alert-dismissible" role="alert">
      <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleCloseBtnClick.bind(this)}><span aria-hidden="true">&times;</span></button>
      <span>The shrimps' lights are on from {this.props.wakeAt} to {this.props.sleepAt}. The current time is {this.state.currentTime}. </span>
      {this.state.sleepShrimps ? <span><strong>Shrimps are sleeping. Good night!</strong></span> : null}
    </div>
  }
}