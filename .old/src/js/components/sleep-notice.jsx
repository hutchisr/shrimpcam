/**
 * Notice about the state of the shrimps :)
 * @module notice 
 */

import React from 'react';

/**
 * Describes state (sleeping or not sleeping) of shrimps!
 */
export default class SleepNotice extends React.Component {
  /**
   * @param {React.Props} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
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
      <span>The shrimps' lights are on from {this.props.wakeAt} to {this.props.sleepAt}. The current time is {this.props.time}. </span>
      {!this.props.awake ? <span><strong>Shrimps are sleeping. Good night!</strong></span> : null}
    </div>;
  }
}
